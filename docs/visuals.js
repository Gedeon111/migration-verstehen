'use strict';

// Facts stay in app.js. Visual transitions are optional progressive enhancement.
const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
let visualMotion = !systemMotion.matches;
let preferredMotion = true;
try { preferredMotion = localStorage.getItem('weiter-motion') !== 'off'; } catch {}
visualMotion = visualMotion && preferredMotion;
const activeVisualAnimations = new Set();
let stopHeroScroll;

const imageCheck = document.querySelectorAll('.cause-photo');
const illustrationLabels = {
  cooperation: 'Legale Wege verbinden Orte',
  borders: 'Grenzkontrollen erschweren den Weg',
  climate: 'Klimarisiken verändern Lebensorte'
};

// The selected photo is also a keyboard-accessible tab in the existing tab pattern.
function updatePhotoSelection() {
  imageCheck.forEach(button => {
    button.querySelector('.photo-select-icon').textContent = button.getAttribute('aria-selected') === 'true' ? '✓' : '+';
  });
}

function trackedAnimation(target, keyframes, options) {
  if (!visualMotion || !window.Motion) return null;
  const animation = Motion.animate(target, keyframes, options);
  activeVisualAnimations.add(animation);
  Promise.resolve(animation).then(() => activeVisualAnimations.delete(animation)).catch(() => activeVisualAnimations.delete(animation));
  return animation;
}

function drawRoutes(scope) {
  if (!visualMotion || !window.Motion) return;
  scope.querySelectorAll('.draw-route').forEach(path => {
    path.setAttribute('pathLength', '1');
    path.style.strokeDasharray = '1';
    trackedAnimation(path, { strokeDashoffset: [1, 0] }, { duration: .65, ease: 'easeInOut' });
  });
}

function animatePanel(panel) {
  trackedAnimation(panel, { opacity: [.6, 1], y: [7, 0] }, { duration: .24, ease: 'easeOut' });
  drawRoutes(panel);
}

// A disclosure keeps the scenario assumptions beside the other detailed analysis.
const assumption = document.querySelector('#scenario-assumption');
document.querySelector('.scenario-analysis').prepend(assumption);

const controlledPanels = [
  ['#cause-panel', () => updatePhotoSelection()],
  ['#effect-panel', () => drawRoutes(document.querySelector('.country-connection'))],
  ['#timeline-panel', () => { document.querySelector('.timeline-more').open = false; }],
  ['#scenario-panel', () => {
    const key = document.querySelector('[data-scenario][aria-selected=true]').dataset.scenario;
    const illustration = document.querySelector('#scenario-illustration');
    illustration.dataset.state = key;
    document.querySelector('#scenario-picture-label').textContent = illustrationLabels[key];
    document.querySelector('.scenario-details').open = false;
    // The small person moves once, in response to choosing a scenario.
    const person = illustration.querySelector('.scene-person');
    trackedAnimation(person, { x: [0, key === 'borders' ? 25 : 105] }, { duration: .8, ease: 'easeInOut' });
  }]
];
controlledPanels.forEach(([selector, update]) => {
  const panel = document.querySelector(selector);
  new MutationObserver(() => { update(); animatePanel(panel); }).observe(panel, { attributes: true, attributeFilter: ['aria-labelledby'] });
});
updatePhotoSelection();

function configureMotion() {
  visualMotion = preferredMotion && !systemMotion.matches;
  document.documentElement.dataset.motion = visualMotion ? 'on' : 'off';
  const toggle = document.querySelector('#motion-toggle');
  toggle.setAttribute('aria-pressed', String(visualMotion));
  toggle.textContent = visualMotion ? 'Animationen an' : 'Animationen aus';
  if (stopHeroScroll) { stopHeroScroll(); stopHeroScroll = null; }
  if (!visualMotion) {
    activeVisualAnimations.forEach(animation => { try { animation.complete(); } catch {} });
    activeVisualAnimations.clear();
    document.querySelectorAll('.draw-route').forEach(path => { path.style.strokeDashoffset = '0'; });
    const photo = document.querySelector('.hero-photo-main img');
    photo.style.transform = 'none';
    document.querySelector('.scene-person').style.transform = 'none';
  } else if (window.Motion) {
    const photoAnimation = Motion.animate('.hero-photo-main img', { y: [0, -38] }, { ease: 'linear' });
    const stop = Motion.scroll(photoAnimation, { target: document.querySelector('.hero'), offset: ['start start', 'end start'] });
    stopHeroScroll = () => { stop(); photoAnimation.cancel(); activeVisualAnimations.delete(photoAnimation); };
    // Scroll controls the photograph; it does not play on an endless timer.
    activeVisualAnimations.add(photoAnimation);
  }
  document.dispatchEvent(new CustomEvent('weiter:motionchange', { detail: { enabled: visualMotion } }));
}
document.querySelector('#motion-toggle').addEventListener('click', () => {
  preferredMotion = !visualMotion;
  try { localStorage.setItem('weiter-motion', preferredMotion ? 'on' : 'off'); } catch {}
  configureMotion();
});
systemMotion.addEventListener('change', configureMotion);
configureMotion();

if (window.Motion) {
  Motion.inView('.population-track', element => {
    trackedAnimation(element.firstElementChild, { scaleX: [0, 1] }, { duration: .65, ease: 'easeOut' });
  }, { amount: .7 });
  Motion.inView('.country-connection', element => drawRoutes(element), { amount: .5 });
}

// Reading position is useful with or without animation support.
let progressScheduled = false;
const chapterLinks = [...document.querySelectorAll('.chapter-nav a')];
const chapterSections = chapterLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
function updateReadingProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  document.querySelector('.reading-progress span').style.transform = `scaleX(${progress})`;
  let currentSection;
  chapterSections.forEach(section => { if (section.getBoundingClientRect().top <= 115) currentSection = section; });
  chapterLinks.forEach(link => {
    if (currentSection && link.getAttribute('href') === '#' + currentSection.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  progressScheduled = false;
}
addEventListener('scroll', () => {
  if (!progressScheduled) { progressScheduled = true; requestAnimationFrame(updateReadingProgress); }
}, { passive: true });
addEventListener('resize', updateReadingProgress);
updateReadingProgress();

// Expanded disclosures update the reading progress without changing scroll position.
document.addEventListener('toggle', updateReadingProgress, true);
