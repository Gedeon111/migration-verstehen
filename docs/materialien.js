'use strict';

// Values share the same SEM population definition. Half-year data stays separate.
const reportYears = {
  '2023': { value: '98’851', title: 'Der Ausgangspunkt des Vergleichs', text: 'Von diesem Wert sinkt der Wanderungssaldo in den folgenden zwei Jahren. Ein positiver Saldo bedeutet weiterhin mehr Zu- als Abwanderung, einschliesslich statistischer Bereinigungen.' },
  '2024': { value: '83’392', title: 'Der Saldo wird kleiner', text: 'Gegenüber 2023 liegt die Nettozuwanderung rund 15,6 Prozent tiefer. Das bedeutet weniger Nettozuwanderung, nicht einen Rückgang der gesamten Bevölkerung.' },
  '2025': { value: '74’675', title: '10,5 % weniger als im Vorjahr', text: 'Seit 2023 ist der Wanderungssaldo um rund 24,5 Prozent gesunken. Er bleibt positiv. Gleichzeitig braucht es weiterhin Planung für Wohnraum, Schulen und Verkehr.' }
};
const reportBars = [...document.querySelectorAll('[data-report-year]')];
reportBars.forEach(button => button.addEventListener('click', () => {
  reportBars.forEach(bar => bar.setAttribute('aria-pressed', String(bar === button)));
  const year = button.dataset.reportYear;
  const data = reportYears[year];
  document.querySelector('#report-year').textContent = year;
  document.querySelector('#report-value').textContent = data.value;
  document.querySelector('#report-reading-title').textContent = data.title;
  document.querySelector('#report-reading-text').textContent = data.text;
}));

const arrivalIllustration = document.querySelector('.arrival-illustration');
document.querySelectorAll('[data-interview-theme]').forEach(topic => {
  topic.addEventListener('toggle', () => {
    if (topic.open) arrivalIllustration.dataset.theme = topic.dataset.interviewTheme;
  });
});

// Native controls remain usable without JavaScript. Chapter playback requires a click.
const interviewAudio = document.querySelector('#interview-audio');
const audioChapterButtons = [...document.querySelectorAll('[data-audio-start]')];
const audioStatus = document.querySelector('#interview-audio-status');
let pendingAudioSeek = null;
let audioPlayRequest = 0;
document.querySelector('.interview-audio-chapters').hidden = false;

function applyAudioSeek() {
  if (pendingAudioSeek === null || interviewAudio.readyState < 1) return;
  interviewAudio.currentTime = Math.min(pendingAudioSeek, interviewAudio.duration || pendingAudioSeek);
  pendingAudioSeek = null;
}
interviewAudio.addEventListener('loadedmetadata', applyAudioSeek);
audioChapterButtons.forEach(button => button.addEventListener('click', () => {
  const request = ++audioPlayRequest;
  pendingAudioSeek = Number(button.dataset.audioStart);
  document.querySelector(`[data-interview-theme="${button.dataset.audioTheme}"]`).open = true;
  applyAudioSeek();
  audioStatus.textContent = `Ab ${button.innerText.trim().replace(/\s+/g, ' ')}.`;
  interviewAudio.play().catch(error => {
    if (request === audioPlayRequest && error.name !== 'AbortError') {
      audioStatus.textContent = 'Bitte starte die Wiedergabe über Play im Audioplayer. Du kannst die MP3 auch herunterladen.';
    }
  });
}));
interviewAudio.addEventListener('timeupdate', () => {
  const current = audioChapterButtons.filter(button => Number(button.dataset.audioStart) <= interviewAudio.currentTime).at(-1);
  audioChapterButtons.forEach(button => {
    if (button === current) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
});
interviewAudio.addEventListener('error', () => {
  audioStatus.textContent = 'Die Audiodatei konnte nicht geladen werden. Versuche es erneut oder nutze den MP3-Download.';
});

// Reveal the measured bars once; never hide data when motion or scripting is off.
let reportAnimation;
let reportSeen = false;
const reportObserver = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  if (!reportSeen && document.documentElement.dataset.motion === 'on' && window.Motion) {
    reportAnimation = Motion.animate('.migration-bar-fill', { scaleX: [0, 1] }, { duration: .7, delay: Motion.stagger(.12), ease: 'easeOut' });
  }
  reportSeen = true;
  reportObserver.disconnect();
}, { threshold: .35 });
reportObserver.observe(document.querySelector('.migration-chart'));
document.addEventListener('weiter:motionchange', event => {
  if (!event.detail.enabled && reportAnimation) reportAnimation.complete();
});
