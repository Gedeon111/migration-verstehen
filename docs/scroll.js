'use strict';

// Scroll effects enhance the existing content; content starts fully readable.
const journey = document.querySelector('.journey-section');
const journeyFigure = document.querySelector('.journey-sticky');
const journeySteps = [...document.querySelectorAll('[data-journey-step]')];
const journeyImages = [...document.querySelectorAll('.journey-frames>img')];
const journeyLinks = [...document.querySelectorAll('.journey-stage-links>a')];
const journeyStops = [...document.querySelectorAll('.journey-stop')];
const journeyRoute = document.querySelector('.journey-route-fill');
const traveller = document.querySelector('.journey-traveller');
const stageLabels = ['Den Aufbruch planen', 'Unterwegs zum neuen Ort', 'Einen neuen Alltag finden'];
const scrollEffects = [];
const entranceAnimations = new Set();
const seenEntrances = new WeakSet();
const smallScreen = matchMedia('(max-width: 600px)');
let journeyStage = -1;
let scrollFrame = 0;
let scrollEffectsEnabled = document.documentElement.dataset.motion === 'on';
const clampProgress = value => Math.min(1, Math.max(0, value));

function stageFromPosition() {
  const focusLine = smallScreen.matches ? journeyFigure.getBoundingClientRect().height + 95 : innerHeight * .53;
  const centers = journeySteps.map(step => {
    const bounds = step.getBoundingClientRect();
    return bounds.top + bounds.height * (smallScreen.matches ? .28 : .5);
  });
  let progress;
  if (focusLine <= centers[1]) progress = clampProgress((focusLine - centers[0]) / Math.max(1, centers[1] - centers[0])) * .5;
  else progress = .5 + clampProgress((focusLine - centers[1]) / Math.max(1, centers[2] - centers[1])) * .5;
  const nearest = centers.reduce((best, center, index) => Math.abs(center - focusLine) < Math.abs(centers[best] - focusLine) ? index : best, 0);
  return { index: nearest, progress };
}

function selectJourneyStage(index) {
  if (index === journeyStage) return;
  journeyStage = index;
  journeyFigure.dataset.stage = String(index);
  journeyImages.forEach((image, i) => image.classList.toggle('is-active', i === index));
  journeySteps.forEach((step, i) => step.classList.toggle('is-current', i === index));
  journeyStops.forEach((stop, i) => stop.classList.toggle('is-reached', i <= index));
  journeyLinks.forEach((link, i) => {
    if (i === index) link.setAttribute('aria-current', 'step');
    else link.removeAttribute('aria-current');
  });
  document.querySelector('#journey-stage-number').textContent = `${index + 1} von ${journeySteps.length}`;
  document.querySelector('#journey-photo-label').textContent = stageLabels[index];
}

function updateJourney() {
  scrollFrame = 0;
  if (!scrollEffectsEnabled) return;
  const bounds = journey.getBoundingClientRect();
  if (bounds.bottom < 0 || bounds.top > innerHeight) return;
  const state = stageFromPosition();
  selectJourneyStage(state.index);
  journeyRoute.style.strokeDashoffset = String(1 - state.progress);
  traveller.setAttribute('cx', String(28 + state.progress * 424));
}

function requestJourneyFrame() {
  if (!scrollFrame && scrollEffectsEnabled) scrollFrame = requestAnimationFrame(updateJourney);
}
addEventListener('scroll', requestJourneyFrame, { passive: true });
addEventListener('resize', requestJourneyFrame);
document.addEventListener('toggle', requestJourneyFrame, true);
journeyLinks.forEach((link, index) => link.addEventListener('click', () => {
  selectJourneyStage(index);
}));

function bindScrollAnimation(element, keyframes, target = element, offset = ['start end', 'end start']) {
  const animation = Motion.animate(element, keyframes, { ease: 'linear' });
  const stop = Motion.scroll(animation, { target, offset });
  scrollEffects.push(() => { stop(); animation.cancel(); });
}

function configureScrollEffects() {
  scrollEffectsEnabled = document.documentElement.dataset.motion === 'on';
  scrollEffects.splice(0).forEach(stop => stop());
  if (!scrollEffectsEnabled) {
    entranceAnimations.forEach(animation => { try { animation.complete(); } catch {} });
    entranceAnimations.clear();
    journeyRoute.style.strokeDashoffset = '0';
    traveller.setAttribute('cx', '452');
    selectJourneyStage(0);
    document.querySelectorAll('.scroll-reveal-heading,.scroll-photo-reveal').forEach(element => {
      element.style.opacity = '1'; element.style.transform = 'none'; element.style.clipPath = 'none';
    });
    return;
  }
  if (window.Motion) {
    const culture = document.querySelector('.culture-photo>img');
    bindScrollAnimation(culture, { y: [-24, 24] }, culture.parentElement);
    document.querySelectorAll('.cause-photo>img').forEach((image, index) => {
      bindScrollAnimation(image, { y: index === 1 ? [15, -15] : [-15, 15] }, document.querySelector('.cause-gallery'));
    });
    const inset = document.querySelector('.hero-photo-inset');
    bindScrollAnimation(inset, { y: [0, 34], rotate: [-4, 2] }, document.querySelector('.hero'), ['start start', 'end start']);
    const timeline = document.querySelector('.timeline-tabs');
    const timelineProgress = Motion.scroll(progress => timeline.style.setProperty('--timeline-scroll', String(clampProgress(progress * 1.6))), { target: timeline, offset: ['start 95%', 'end 25%'] });
    scrollEffects.push(() => { timelineProgress(); timeline.style.removeProperty('--timeline-scroll'); });
  }
  requestJourneyFrame();
}

const entranceObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || !scrollEffectsEnabled || !window.Motion || seenEntrances.has(entry.target)) return;
    const element = entry.target;
    seenEntrances.add(element);
    const type = element.dataset.scrollEntrance;
    let animation;
    if (type === 'photos') {
      animation = Motion.animate(element, { clipPath: ['inset(7% 0 7% 0 round 8px)', 'inset(0% 0 0% 0 round 8px)'], opacity: [.55, 1] }, { duration: .75, ease: [.2,.7,.2,1] });
    } else if (type === 'timeline') {
      animation = Motion.animate([...element.querySelectorAll('button')], { y: [15, 0], opacity: [.2, 1] }, { duration: .45, delay: Motion.stagger(.075), ease: 'easeOut' });
      drawRoutes(document.querySelector('.timeline-visual'));
    } else if (type === 'diagram') {
      drawRoutes(element);
      animation = Motion.animate(element, { opacity: [.45, 1], scale: [.96, 1] }, { duration: .65, ease: 'easeOut' });
    } else {
      animation = Motion.animate(element, { y: [18, 0], opacity: [.3, 1] }, { duration: .5, ease: [.2,.7,.2,1] });
    }
    entranceAnimations.add(animation);
    Promise.resolve(animation).then(() => entranceAnimations.delete(animation)).catch(() => entranceAnimations.delete(animation));
    entranceObserver.unobserve(element);
  });
}, { threshold: .15, rootMargin: '0px 0px -25px 0px' });

[
  ['.cause-gallery,.culture-photo,.journey-frames', 'photos'],
  ['.timeline-tabs', 'timeline'],
  ['.scenario-illustration', 'diagram'],
  ['#folgen .section-heading,#schweiz .section-heading,#wuerde .dignity-intro,#zukunft .section-heading,.quiz-card', 'content']
].forEach(([selector, type]) => document.querySelectorAll(selector).forEach(element => {
  element.dataset.scrollEntrance = type;
  element.classList.add(type === 'photos' ? 'scroll-photo-reveal' : 'scroll-reveal-heading');
  entranceObserver.observe(element);
}));

// Recalculate after the user turns animation on or off, including system changes.
document.addEventListener('weiter:motionchange', configureScrollEffects);
configureScrollEffects();
