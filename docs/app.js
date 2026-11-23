'use strict';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const setText = (selector, value) => { $(selector).textContent = value; };

// All examples below are fictional teaching examples, not individual biographies.
const causes = {
  political: {
    category: 'Sicherheit und Freiheit', title: 'Schutz vor Gewalt und Verfolgung',
    description: 'Krieg oder politische Verfolgung können Menschen zur Flucht zwingen. Sie suchen Sicherheit und ein Leben, in dem ihre Rechte geschützt sind.',
    push: 'Gewalt, Verfolgung, fehlende Rechte', pull: 'Sicherheit, Freiheit, Schutz der Familie',
    example: 'Eine Journalistin wird wegen ihrer Arbeit bedroht und sucht in einem anderen Land Schutz.'
  },
  economic: {
    category: 'Arbeit und Perspektiven', title: 'Arbeit und Ausbildung finden',
    description: 'Menschen ziehen für einen Job, einen höheren Lohn oder eine Ausbildung um. Ob sie gehen können, hängt auch von Geld, Kontakten und Einreiseregeln ab.',
    push: 'Arbeitslosigkeit, Armut, unsichere Einkommen', pull: 'Ausbildung, faire Löhne, berufliche Entwicklung',
    example: 'Ein ausgebildeter Elektriker findet zu Hause keine passende Stelle und nimmt ein Angebot im Ausland an.'
  },
  ecological: {
    category: 'Klima und Lebensgrundlagen', title: 'Wenn Lebensgrundlagen verloren gehen',
    description: 'Dürren oder Überschwemmungen können Wohnraum und Einkommen zerstören. Viele Betroffene ziehen innerhalb ihres Landes um. Wer keine Mittel hat, kann auch am Wegziehen gehindert sein.',
    push: 'Ernteausfälle, Wassermangel, zerstörter Wohnraum', pull: 'Sicherer Wohnort, Wasser, neue Lebensgrundlagen',
    example: 'Nach wiederholten Ernteausfällen zieht eine Familie vom Land in eine Stadt derselben Region.'
  }
};

const effects = {
  origin: {
    goodTitle: 'Geld und Wissen kommen zurück', badTitle: 'Fachkräfte und Angehörige fehlen',
    good: [ ['Rücküberweisungen', 'Geld an Angehörige hilft bei Lebenshaltung, Schule und Gesundheit.'], ['Wissen und Netzwerke', 'Rückkehrende und die Diaspora bringen Wissen und Kontakte ein.'], ['Neue Möglichkeiten', 'Auswanderung kann einzelne Haushalte wirtschaftlich entlasten.'] ],
    bad: [ ['Brain Drain', 'Fachkräfte fehlen etwa in Spitälern oder Schulen.'], ['Getrennte Familien', 'Eltern, Kinder und Paare leben teils lange getrennt.'], ['Abhängigkeiten', 'Rücküberweisungen ersetzen keine stabilen lokalen Arbeitsplätze.'] ]
  },
  destination: {
    goodTitle: 'Neue Arbeitskräfte und Erfahrungen', badTitle: 'Wohnen und Teilhabe organisieren',
    good: [ ['Arbeitsmarkt', 'Zugewanderte besetzen offene Stellen und gründen Unternehmen.'], ['Demografie', 'Jüngere Erwerbstätige können die Alterung abfedern. Auch sie werden später älter.'], ['Gesellschaft', 'Neue Erfahrungen prägen Kultur, Forschung und Alltag.'] ],
    bad: [ ['Infrastruktur', 'Mehr Menschen brauchen Wohnungen, Schulen und Verkehrsangebote.'], ['Faire Arbeit', 'Arbeitsschutz hilft gegen Lohndruck und Ausbeutung.'], ['Teilhabe', 'Sprache, nicht anerkannte Abschlüsse und Diskriminierung können den Einstieg erschweren.'] ]
  }
};

const timeline = {
  1850: { year: '19.', symbol: 'Jahrhundert', kicker: 'Von der Schweiz in die Welt', title: 'Auswandern, um Arbeit zu finden', description: 'Armut, knappe Erwerbsmöglichkeiten und Krisen bewegen Schweizerinnen und Schweizer zur Auswanderung. Viele ziehen in andere europäische Länder oder nach Nord- und Südamerika.', detail: 'Der Perspektivenwechsel: Menschen aus der Schweiz suchen im Ausland das, was später viele Menschen in der Schweiz suchen. eine Existenz und eine Zukunft.' },
  1900: { year: '1880', symbol: 'bis 1914', kicker: 'Industrie und Eisenbahn', title: 'Die Industrie braucht Arbeitskräfte', description: 'Mit Industrialisierung, Städtewachstum und Eisenbahnbau steigt der Bedarf an Arbeitskräften. Menschen aus Nachbarländern, darunter Italien und Deutschland, kommen in die Schweiz.', detail: 'Die Schweiz wandelt sich im späten 19. Jahrhundert zunehmend zum Einwanderungsland. Die Weltkriege und Wirtschaftskrisen unterbrechen diese Entwicklung.' },
  1945: { year: '1947', symbol: 'und die Nachkriegszeit', kicker: 'Arbeit auf Zeit', title: 'Arbeitsmigration nach dem Krieg', description: 'Nach dem Zweiten Weltkrieg werben Unternehmen Arbeitskräfte an, zuerst besonders aus Italien, später auch aus Spanien und Portugal. Sie arbeiten unter anderem im Bau, in Fabriken und im Gastgewerbe.', detail: 'Das Saisonnierstatut begrenzt Aufenthalte und erschwert das Familienleben. Der wirtschaftliche Beitrag geht lange mit eingeschränkten Rechten einher.' },
  1990: { year: '1990', symbol: 'die 1990er-Jahre', kicker: 'Kriege im ehemaligen Jugoslawien', title: 'Schutz vor Krieg und Verfolgung.', description: 'Die Kriege im ehemaligen Jugoslawien führen zu Flucht und Schutzsuche. In der Schweiz entstehen neue Gemeinschaften und familiäre Verbindungen, neben bereits bestehender Arbeitsmigration aus der Region.', detail: 'Migration aus einer Region hat keine einheitliche Ursache. Arbeitsmigration, Familiennachzug und Flucht können in verschiedenen Lebensgeschichten zusammenkommen.' },
  2002: { year: '2002', symbol: 'ein neues Kapitel', kicker: 'Das Freizügigkeitsabkommen tritt in Kraft', title: 'Personenfreizügigkeit mit der EU', description: 'Das Abkommen mit der EU erleichtert unter festgelegten Voraussetzungen den Zugang zu Arbeit und Aufenthalt. Auch Schweizerinnen und Schweizer profitieren von Mobilität. Das Saisonnierstatut wird abgeschafft.', detail: 'Die Rechte aus der Personenfreizügigkeit gelten nicht automatisch für alle Staatsangehörigkeiten. Für Menschen aus Drittstaaten bestehen andere Zulassungsregeln.' },
  2022: { year: '2022', symbol: 'und die folgenden Jahre', kicker: 'Krieg in der Ukraine', title: 'Vorübergehender Schutz.', description: 'Nach dem russischen Angriff auf die Ukraine aktiviert die Schweiz erstmals den Schutzstatus S. Er ermöglicht berechtigten Schutzsuchenden einen vorübergehenden Aufenthalt ohne ordentliches individuelles Asylverfahren.', detail: 'Aufnahme, Schule, Spracherwerb und Berufseinstieg werden wichtige Aufgaben. Die jeweils geltenden Voraussetzungen veröffentlicht das SEM in seinen Ukraine-Informationen.' }
};

const scenarios = {
  cooperation: { title: 'Mehr legale Wege durch Zusammenarbeit', description: 'Staaten erweitern legale Wege für Arbeit, Bildung und Schutz. Sie investieren in Integration und vereinbaren faire Regeln für die Anwerbung von Fachkräften.', assumption: 'Internationale Kooperation und Investitionen bleiben politisch tragfähig.', impact: 'Mehr planbare Wege können gefährliche Reisen reduzieren. Arbeitsmigration kann Engpässe abfedern.', tradeoff: 'Zielländer benötigen Fachkräfte; Herkunftsländer dürfen ihre Gesundheits- und Bildungssysteme nicht schwächen.', signal: 'Mehr Bildungsabkommen, zugängliche Verfahren und faire Rekrutierungsprogramme.' },
  borders: { title: 'Strengere Grenzen, andere Routen', description: 'Staaten verschärfen den Zugang und verlagern Kontrollen. Gleichzeitig bestehen Konflikte, Familienbindungen und wirtschaftliche Unterschiede weiter', assumption: 'Restriktive Politik setzt sich durch, während die Gründe für Migration fortbestehen.', impact: 'Migration kann sich auf andere Routen verlagern. Ohne sichere Alternativen können Abhängigkeit von Schleusern und Risiken zunehmen.', tradeoff: 'Staaten beanspruchen Kontrolle; gleichzeitig müssen Schutzrechte und die Prüfung individueller Gefährdung gewährleistet bleiben.', signal: 'Weniger legale Zugangswege, neue Grenzabkommen und Berichte über längere oder gefährlichere Routen.' },
  climate: { title: 'Umziehen wegen Klimarisiken', description: 'Hitze, Wassermangel und Überflutungen belasten Regionen unterschiedlich stark. Manche Menschen ziehen innerhalb ihres Landes um; andere bleiben, weil Mittel oder Möglichkeiten fehlen.', assumption: 'Klimarisiken nehmen zu; Klimaschutz, Infrastruktur und soziale Sicherheit fallen je nach Region unterschiedlich aus.', impact: 'Städte und sicherere Regionen benötigen mehr Wohnraum und Versorgung. Geplante Umsiedlung kann Menschen schützen, wenn sie mitentscheiden.', tradeoff: 'Schutz und Anpassung kosten Geld. Ein Umzug darf kulturelle Bindungen, Landrechte und Selbstbestimmung nicht übergehen.', signal: 'Häufigere Ernteausfälle, kommunale Anpassungspläne und steigender Bedarf an Unterstützung in besonders betroffenen Regionen.' }
};

function renderList(selector, items) {
  $(selector).replaceChildren(...items.map(([label, description]) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = label + ': ';
    li.append(strong, description);
    return li;
  }));
}

// Shared keyboard behavior for the WAI-ARIA tab pattern.
function initTabs(attribute, onSelect) {
  const buttons = $$(`[${attribute}]`);
  const select = (button) => {
    buttons.forEach((item) => {
      const selected = item === button;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    $('#' + button.getAttribute('aria-controls')).setAttribute('aria-labelledby', button.id);
    onSelect(button.getAttribute(attribute));
  };
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => select(button));
    button.addEventListener('keydown', (event) => {
      const vertical = button.parentElement.getAttribute('aria-orientation') === 'vertical';
      let next;
      if (event.key === (vertical ? 'ArrowDown' : 'ArrowRight')) next = (index + 1) % buttons.length;
      if (event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== undefined) { event.preventDefault(); select(buttons[next]); buttons[next].focus(); }
    });
  });
}

initTabs('data-cause', (key) => {
  const data = causes[key];
  ['category', 'title', 'description', 'push', 'pull'].forEach((field) => setText('#cause-' + field, data[field]));
  const strong = document.createElement('strong');
  strong.textContent = 'Beispiel: ';
  $('#cause-example').replaceChildren(strong, data.example);
});
initTabs('data-effect', (key) => {
  const data = effects[key];
  setText('#effect-good-title', data.goodTitle); setText('#effect-bad-title', data.badTitle);
  renderList('#effect-good-list', data.good); renderList('#effect-bad-list', data.bad);
});
initTabs('data-time', (key) => {
  const data = timeline[key];
  ['year', 'symbol', 'kicker', 'title', 'description', 'detail'].forEach((field) => setText('#timeline-' + field, data[field]));
});
initTabs('data-scenario', (key) => {
  const data = scenarios[key];
  ['title', 'description', 'impact', 'tradeoff', 'signal'].forEach((field) => setText('#scenario-' + field, data[field]));
  const strong = document.createElement('strong'); strong.textContent = 'Annahme: ';
  $('#scenario-assumption').replaceChildren(strong, data.assumption);
});

const menuToggle = $('.menu-toggle');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
  $('#mobile-nav').hidden = !open;
});
function closeMenu() { menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Menü öffnen'); $('#mobile-nav').hidden = true; }
$$('#mobile-nav a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !$('#mobile-nav').hidden) { closeMenu(); menuToggle.focus(); } });

const questions = [
  { question: 'Welche Situation ist ein ökologischer Migrationsgrund?', options: ['Eine Familie verliert durch wiederholte Dürren ihre Lebensgrundlage.', 'Eine Person möchte näher bei ihrem Partner leben.', 'Ein Unternehmen bietet eine besser bezahlte Stelle an.'], answer: 0, explanation: 'Dürre und Ernteausfälle sind ökologische Faktoren. Familie und Arbeitsangebote können ebenfalls zur Migration führen, gehören aber zu anderen Ursachen.' },
  { question: 'Was kann Migration für das Herkunftsland bedeuten?', options: ['Nur wirtschaftliche Nachteile.', 'Rücküberweisungen können helfen, gleichzeitig können Fachkräfte fehlen.', 'Das Herkunftsland ist von der Auswanderung nicht betroffen.'], answer: 1, explanation: 'Chancen und Herausforderungen bestehen nebeneinander: Geld und Wissen können zurückfliessen; abwandernde Fachkräfte können Lücken hinterlassen.' },
  { question: 'Welche Aussage zur Schweizer Geschichte stimmt?', options: ['Die Schweiz war schon immer ausschliesslich ein Einwanderungsland.', 'Migration in die Schweiz begann erst 2022.', 'Im 19. Jahrhundert wanderten viele Menschen aus der Schweiz aus.'], answer: 2, explanation: 'Armut und fehlende Erwerbsmöglichkeiten führten zur Auswanderung. Mit der Industrialisierung wurde die Schweiz zunehmend zum Einwanderungsland.' },
  { question: 'Welche Aussage zu Menschenrechten ist richtig?', options: ['Menschenrechte gelten nur bei einem gesicherten Aufenthaltsstatus.', 'Auch Menschen mit irregulärem Aufenthalt haben Menschenrechte.', 'Ein Asylgesuch bedeutet automatisch ein dauerhaftes Aufenthaltsrecht.'], answer: 1, explanation: 'Die Würde und die grundlegenden Rechte hängen nicht vom Aufenthaltsstatus ab. Ob eine Person bleiben darf, wird in den dafür vorgesehenen Verfahren entschieden.' },
  { question: 'Wie sollte man ein Zukunftsszenario lesen?', options: ['Als mögliche Entwicklung unter bestimmten Annahmen.', 'Als sichere Vorhersage für das Jahr 2050.', 'Als Beweis, dass politische Entscheidungen keine Rolle spielen.'], answer: 0, explanation: 'Szenarien zeigen Möglichkeiten und Zielkonflikte. Veränderte Annahmen, etwa zu Klimaschutz oder Zusammenarbeit, können zu anderen Entwicklungen führen.' },
  { question: 'Was zeigt die Zahl 74’675 im Trendreport für 2025?', options: ['Alle Menschen, die 2025 in die Schweiz einreisten.', 'Den Wanderungssaldo der ständigen ausländischen Wohnbevölkerung nach SEM.', 'Die Zahl der 2025 anerkannten Flüchtlinge.'], answer: 1, explanation: 'Der SEM-Saldo berücksichtigt Einwanderung, Auswanderung und statistische Bereinigungen. Er ist weder eine reine Einwanderungszahl noch eine Zahl anerkannter Flüchtlinge.' },
  { question: 'Was lässt sich aus dem bereitgestellten Interview ableiten?', options: ['Alle Zugewanderten erleben den Berufseinstieg gleich.', 'Das Gespräch beweist den statistischen Trend.', 'Es zeigt eine persönliche Erfahrung mit Sprache, Ausbildung und Zusammenleben.'], answer: 2, explanation: 'Das Einzelinterview ergänzt die Statistik um eine persönliche Perspektive. Es ist keine repräsentative Befragung und belegt nicht, wie häufig eine Erfahrung vorkommt.' }
];
let questionIndex = 0, score = 0, answered = false;
function renderQuestion() {
  const data = questions[questionIndex]; answered = false;
  $('#quiz-result').hidden = true; $('#quiz-options').hidden = false; $('#quiz-question').hidden = false;
  $('#quiz-feedback').hidden = true; $('#quiz-feedback').replaceChildren(); $('#quiz-next').hidden = true;
  setText('#quiz-progress-label', `Frage ${questionIndex + 1} von ${questions.length}`);
  setText('#quiz-score', `${score} richtig`);
  $('#quiz-progress-fill').style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  setText('#quiz-question', data.question);
  $('#quiz-options').replaceChildren(...data.options.map((option, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'quiz-option';
    const marker = document.createElement('span'); marker.textContent = String.fromCharCode(65 + index); marker.setAttribute('aria-hidden', 'true');
    button.append(marker, option);
    button.addEventListener('click', () => answerQuestion(index)); return button;
  }));
}
function answerQuestion(choice) {
  if (answered) return; answered = true;
  const data = questions[questionIndex], correct = choice === data.answer;
  if (correct) score++;
  $$('.quiz-option').forEach((button, index) => {
    button.disabled = true;
    if (index === data.answer) { button.classList.add('correct'); button.firstElementChild.textContent = '✓'; }
    else if (index === choice) { button.classList.add('incorrect'); button.firstElementChild.textContent = '×'; }
  });
  const title = document.createElement('strong'); title.textContent = correct ? 'Richtig.' : 'Diese Antwort passt nicht.';
  $('#quiz-feedback').replaceChildren(title, data.explanation);
  $('#quiz-feedback').hidden = false;
  setText('#quiz-score', `${score} richtig`);
  $('#quiz-next').replaceChildren(questionIndex === questions.length - 1 ? 'Ergebnis ansehen' : 'Nächste Frage');
  $('#quiz-next').hidden = false;
  $('#quiz-next').focus({ preventScroll: true });
}
$('#quiz-next').addEventListener('click', () => {
  if (!answered) return;
  if (questionIndex < questions.length - 1) { questionIndex++; renderQuestion(); $('.quiz-option').focus({ preventScroll: true }); return; }
  $('#quiz-question').hidden = true; $('#quiz-options').hidden = true; $('#quiz-feedback').hidden = true; $('#quiz-next').hidden = true;
  setText('#quiz-progress-label', 'Quiz abgeschlossen');
  const scoreElement = document.createElement('div'); scoreElement.className = 'result-score'; scoreElement.textContent = `${score} / ${questions.length}`;
  const heading = document.createElement('h3'); heading.textContent = score === questions.length ? 'Alle Antworten richtig.' : 'Dein Ergebnis';
  const explanation = document.createElement('p'); explanation.textContent = score === questions.length ? 'Alle Fragen richtig. Halte im Portfolio fest, welche Erkenntnis du mitnimmst.' : 'Jede Frage ist ein Anlass zum Weiterdenken. Lies die passenden Kapitel noch einmal und probiere es erneut.';
  const retry = document.createElement('button'); retry.type = 'button'; retry.className = 'button button-dark'; retry.textContent = 'Noch einmal testen';
  retry.addEventListener('click', () => { questionIndex = 0; score = 0; renderQuestion(); $('.quiz-option').focus({ preventScroll: true }); });
  const portfolioLink = document.createElement('a'); portfolioLink.href = '#portfolio'; portfolioLink.className = 'underlined-link'; portfolioLink.textContent = 'Im Portfolio weiterdenken'; portfolioLink.style.marginLeft = '16px';
  $('#quiz-result').className = 'quiz-result'; $('#quiz-result').replaceChildren(scoreElement, heading, explanation, retry, portfolioLink); $('#quiz-result').hidden = false;
  retry.focus({ preventScroll: true });
});
renderQuestion();

const portfolioKey = 'weiter-migration-portfolio-v1';
const fields = ['learning', 'analysis', 'future'];
const portfolioLabels = { learning: 'Was habe ich verstanden?', analysis: 'Welche Frage beschäftigt mich?', future: 'Mein Leben in zehn Jahren' };
let saveTimer;
function portfolioData() { return Object.fromEntries(fields.map((field) => [field, $(`[name="${field}"]`).value])); }
try {
  const raw = localStorage.getItem(portfolioKey);
  if (raw) {
    const data = JSON.parse(raw);
    fields.forEach((field) => { if (typeof data[field] === 'string') $(`[name="${field}"]`).value = data[field]; });
    if (fields.some((field) => typeof data[field] === 'string' && data[field].trim())) setText('#portfolio-status', 'Deine gespeicherten Notizen sind wieder da.');
  }
} catch { setText('#portfolio-status', 'Browserspeicher nicht verfügbar. Bitte exportiere deine Notizen.'); }
function savePortfolio() {
  try { localStorage.setItem(portfolioKey, JSON.stringify(portfolioData())); setText('#portfolio-status', 'Automatisch in diesem Browser gespeichert.'); }
  catch { setText('#portfolio-status', 'Speichern nicht möglich. Bitte sichere deine Notizen mit dem Download.'); }
}
$('#portfolio-form').addEventListener('submit', (event) => event.preventDefault());
$('#portfolio-form').addEventListener('input', () => { clearTimeout(saveTimer); setText('#portfolio-status', 'Wird gespeichert …'); saveTimer = setTimeout(savePortfolio, 400); });
window.addEventListener('pagehide', () => { if (saveTimer) { clearTimeout(saveTimer); savePortfolio(); } });
$('#portfolio-export').addEventListener('click', () => {
  const data = portfolioData();
  if (fields.every((field) => !data[field].trim())) { setText('#portfolio-status', 'Schreibe zuerst eine Notiz. Danach kannst du dein Portfolio herunterladen.'); $('#portfolio-learning').focus(); return; }
  clearTimeout(saveTimer); savePortfolio();
  const date = new Intl.DateTimeFormat('de-CH', { dateStyle: 'long' }).format(new Date());
  const text = ['Mein Portfolio. Migration verstehen', `Exportiert am ${date}`, '', ...fields.flatMap((field) => [portfolioLabels[field], data[field].trim() || '(Noch keine Notiz)', '']), 'Erstellt mit weiter. Der Lernatlas zur Migration'].join('\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF' + text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'Mein-Portfolio-Migration.txt'; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  setText('#portfolio-status', 'Portfolio-Download gestartet. Deine Notizen bleiben im Browser gespeichert.');
});
