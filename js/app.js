const $ = (selector) => document.querySelector(selector);
const screens = [...document.querySelectorAll(".screen")];
const navButtons = [...document.querySelectorAll("[data-nav]")];

function dismissSplash() {
  const splash = $("#splash-screen");
  if (!splash || splash.classList.contains("is-leaving")) return;
  splash.classList.add("is-leaving");
  splash.addEventListener("animationend", () => splash.classList.add("is-hidden"), { once: true });
}

window.addEventListener("load", () => window.setTimeout(dismissSplash, 850));
window.setTimeout(dismissSplash, 2500);

const modeCatalog = {
  walkthrough: { name: "Genomgång", description: "Lär dig steg för steg", icon: "▶" },
  rules: { name: "Regler och begrepp", description: "Välj rätt regel eller begrepp", icon: "?" },
  calculate: { name: "Räkna ut", description: "Välj rätt svar", icon: "=" },
  missing: { name: "Saknat tal", description: "Fyll i det som saknas", icon: "□" },
  truefalse: { name: "Sant eller falskt", description: "Bedöm matematiska påståenden", icon: "✓" },
  quick: { name: "Snabbträning", description: "Flera frågor i följd", icon: "⏱" },
  order: { name: "Ordna", description: "Hitta rätt ordning", icon: "↕" },
};

const q = (prompt, example, choices, correct, explanation, levels = ["high"]) => ({
  prompt, example, choices, correct, explanation, levels,
});

const topics = {
  powers10: {
    title: "Multiplicera med 10, 100 och 1000",
    description: "Förstå nollregeln och räkna med tiopotenser.",
    walkthrough: [
      ["Räkna nollorna", "10 · 100 · 1000", "10 har en nolla, 100 har två och 1000 har tre.", "För heltal visar antalet nollor hur många platser siffrorna flyttas åt vänster."],
      ["Multiplicera med 10", "7 × 10 = 70", "Lägg till en nolla efter heltalet.", "Sjuan går från entalsplatsen till tiotalsplatsen."],
      ["Multiplicera med 100", "7 × 100 = 700", "Lägg till två nollor efter heltalet.", "Sjuan får ett hundra gånger större platsvärde."],
      ["Multiplicera med 1000", "7 × 1000 = 7000", "Lägg till tre nollor efter heltalet.", "Sjuan hamnar på tusentalsplatsen."],
    ],
    modes: {
      rules: [q("Vilken regel gäller?", "7 × 100", ["Lägg till 1 nolla", "Lägg till 2 nollor", "Lägg till 3 nollor"], 1, "100 har två nollor, så 7 × 100 = 700."), q("Vilken regel gäller?", "9 × 1000", ["Lägg till 3 nollor", "Lägg till 2 nollor", "Lägg till 1 nolla"], 0, "1000 har tre nollor, så 9 × 1000 = 9000.")],
      calculate: [q("Vad blir svaret?", "8 × 10", ["80", "800", "18"], 0, "Multiplicera med 10 genom att lägga till en nolla."), q("Vad blir svaret?", "12 × 100", ["120", "1200", "12000"], 1, "100 har två nollor: 12 × 100 = 1200."), q("Vad blir svaret?", "6 × 1000", ["600", "6000", "60000"], 1, "1000 har tre nollor: 6 × 1000 = 6000.")],
      missing: [q("Vilket tal saknas?", "7 × □ = 700", ["10", "100", "1000"], 1, "700 är hundra gånger större än 7."), q("Vilket tal saknas?", "4 × □ = 4000", ["1000", "100", "10"], 0, "4 × 1000 = 4000.")],
      truefalse: [q("Sant eller falskt?", "15 × 100 = 1500", ["Sant", "Falskt"], 0, "Två nollor läggs efter 15."), q("Sant eller falskt?", "3 × 1000 = 300", ["Sant", "Falskt"], 1, "3 × 1000 är 3000, inte 300.")],
    },
  },
  area: {
    title: "Area och omkrets",
    description: "Räkna på rektanglar och skilj mellan yta och sträcka.",
    walkthrough: [
      ["Två olika mått", "Omkrets ≠ area", "Omkrets är sträckan runt en figur. Area är ytan inuti.", "Tänk staket för omkrets och gräs för area."],
      ["Rektangelns omkrets", "O = 2 × längd + 2 × bredd", "Lägg ihop figurens fyra sidor.", "Motstående sidor är lika långa."],
      ["Rektangelns area", "A = längd × bredd", "Multiplicera längden med bredden.", "Enheten blir kvadratisk, till exempel cm²."],
    ],
    modes: {
      rules: [q("Vilket begrepp beskriver ytan inuti?", "Ytan inuti figuren", ["Area", "Omkrets", "Diameter"], 0, "Area beskriver hur stor ytan är."), q("Vilken enhet passar för area?", "Area av ett rum", ["m", "m²", "m³"], 1, "Area mäts i kvadratenheter, exempelvis m².")],
      calculate: [q("Vad är rektangelns area?", "6 cm × 4 cm", ["10 cm²", "20 cm²", "24 cm²"], 2, "6 × 4 = 24 cm²."), q("Vad är omkretsen?", "Längd 5 m · bredd 3 m", ["8 m", "15 m", "16 m"], 2, "5 + 3 + 5 + 3 = 16 m.")],
      missing: [q("Vilken längd saknas?", "Area 24 cm² · bredd 4 cm", ["5 cm", "6 cm", "8 cm"], 1, "24 ÷ 4 = 6 cm.")],
      truefalse: [q("Sant eller falskt?", "Area mäts i cm²", ["Sant", "Falskt"], 0, "Area mäts i kvadratenheter."), q("Sant eller falskt?", "3 cm × 5 cm ger arean 8 cm²", ["Sant", "Falskt"], 1, "Arean är 3 × 5 = 15 cm².")],
    },
  },
  percent: {
    title: "Procent av ett tal",
    description: "Beräkna 10 %, 25 %, 50 % och andra vanliga andelar.",
    walkthrough: [
      ["Procent betyder hundradel", "1 % = 1/100", "Procent visar hur många hundradelar vi menar.", "25 % betyder 25 av 100, alltså en fjärdedel."],
      ["Hitta 10 procent", "10 % av 300 = 30", "Dela talet med 10.", "300 ÷ 10 = 30."],
      ["Hitta 50 procent", "50 % av 80 = 40", "50 procent är samma sak som hälften.", "Dela talet med 2."],
      ["Bygg fler procent", "20 % = 10 % + 10 %", "Använd enkla andelar för att bygga svaret.", "10 % av 150 är 15, alltså är 20 % 30."],
    ],
    modes: {
      rules: [q("Vad betyder 50 %?", "50 %", ["Hälften", "En fjärdedel", "Dubbelt"], 0, "50 av 100 är hälften."), q("Hur hittar du 10 %?", "10 % av ett tal", ["Dela med 10", "Multiplicera med 10", "Dela med 2"], 0, "En tiondel är 10 procent.")],
      calculate: [q("Hur mycket är 25 %?", "25 % av 200", ["25", "50", "75"], 1, "25 % är en fjärdedel och 200 ÷ 4 = 50."), q("Hur mycket är 10 %?", "10 % av 450", ["45", "4,5", "90"], 0, "450 ÷ 10 = 45."), q("Hur mycket är 50 %?", "50 % av 70", ["20", "35", "50"], 1, "Hälften av 70 är 35.")],
      missing: [q("Vilken procentsats saknas?", "□ av 80 = 40", ["10 %", "25 %", "50 %"], 2, "40 är hälften av 80, alltså 50 %.")],
      truefalse: [q("Sant eller falskt?", "20 % av 100 är 20", ["Sant", "Falskt"], 0, "20 hundradelar av 100 är 20."), q("Sant eller falskt?", "10 % av 60 är 10", ["Sant", "Falskt"], 1, "10 % av 60 är 6.")],
    },
  },
  statistics: {
    title: "Medelvärde, median och typvärde",
    description: "Sammanfatta och jämför tal i en datamängd.",
    walkthrough: [
      ["Tre lägesmått", "Medelvärde · median · typvärde", "De beskriver en datamängd på olika sätt.", "Vilket mått som passar bäst beror på talen och frågan."],
      ["Medelvärde", "(2 + 4 + 6) ÷ 3 = 4", "Addera talen och dela med hur många de är.", "Summan är 12 och det finns tre tal."],
      ["Median", "2, 5, 9 → 5", "Ordna talen och välj det mittersta.", "Vid jämnt antal tal tar du medelvärdet av de två mittersta."],
      ["Typvärde", "2, 3, 3, 7 → 3", "Typvärdet är talet som förekommer flest gånger.", "En datamängd kan ha flera typvärden eller inget alls."],
    ],
    modes: {
      rules: [q("Vilket mått är det mittersta talet?", "Tal i storleksordning", ["Median", "Medelvärde", "Typvärde"], 0, "Medianen är det mittersta talet."), q("Vilket mått förekommer flest gånger?", "Det vanligaste värdet", ["Medelvärde", "Typvärde", "Median"], 1, "Typvärdet är vanligast.")],
      calculate: [q("Vad är medelvärdet?", "2, 4, 6", ["3", "4", "6"], 1, "(2 + 4 + 6) ÷ 3 = 4."), q("Vad är medianen?", "1, 3, 8, 10, 12", ["3", "8", "10"], 1, "8 står i mitten.")],
      truefalse: [q("Sant eller falskt?", "Typvärdet i 2, 2, 5 är 2", ["Sant", "Falskt"], 0, "2 förekommer flest gånger."), q("Sant eller falskt?", "Medianen i 1, 4, 9 är 4", ["Sant", "Falskt"], 0, "4 är talet i mitten.")],
      order: [q("Vilken ordning är stigande?", "5 · 1 · 3", ["1, 3, 5", "5, 3, 1", "3, 1, 5"], 0, "Stigande ordning går från minst till störst."), q("Ordna inför medianen", "8 · 2 · 6", ["8, 6, 2", "2, 6, 8", "6, 2, 8"], 1, "2, 6, 8 är rätt ordning och medianen är 6.")],
    },
  },
  probability: {
    title: "Enkel sannolikhet",
    description: "Räkna möjliga och gynnsamma utfall.",
    walkthrough: [
      ["Möjliga utfall", "En tärning: 1, 2, 3, 4, 5, 6", "Börja med att hitta alla möjliga resultat.", "En vanlig tärning har sex lika sannolika utfall."],
      ["Gynnsamma utfall", "Jämnt tal: 2, 4, 6", "Gynnsamma utfall är de resultat vi vill få.", "Tre av tärningens sex utfall är jämna."],
      ["Skriv sannolikheten", "3 av 6 = 1/2 = 50 %", "Dela gynnsamma utfall med möjliga utfall.", "Bråket 3/6 kan förkortas till 1/2."],
    ],
    modes: {
      rules: [q("Vad är ett gynnsamt utfall?", "Vi vill slå en sexa", ["Att få 6", "Alla sex tal", "Att kasta tärningen"], 0, "Det gynnsamma utfallet är resultatet vi vill ha."), q("Vad betyder omöjlig händelse?", "Sannolikhet 0", ["Kan inte inträffa", "Inträffar alltid", "Inträffar hälften av gångerna"], 0, "Sannolikheten för en omöjlig händelse är 0.")],
      calculate: [q("Vad är sannolikheten?", "Få krona med ett rättvist mynt", ["1/2", "1/3", "1"], 0, "Ett av två möjliga utfall är krona."), q("Vad är sannolikheten?", "Slå en sexa med en tärning", ["1/2", "1/6", "6"], 1, "Ett av sex möjliga utfall är en sexa.")],
      missing: [q("Hur många gynnsamma utfall finns?", "Slå ett jämnt tal med en tärning", ["2", "3", "6"], 1, "De jämna utfallen är 2, 4 och 6.")],
      truefalse: [q("Sant eller falskt?", "Sannolikheten för krona är 50 %", ["Sant", "Falskt"], 0, "Ett rättvist mynt har två lika sannolika sidor."), q("Sant eller falskt?", "Man kan slå 7 med en vanlig tärning", ["Sant", "Falskt"], 1, "En vanlig tärning visar 1 till 6.")],
    },
  },
  algebra: {
    title: "Lösa enkla ekvationer",
    description: "Hitta det okända talet och kontrollera lösningen.",
    walkthrough: [
      ["En ekvation är en balans", "x + 3 = 8", "Båda sidor om likhetstecknet har samma värde.", "Gör du något på ena sidan måste du göra samma på den andra."],
      ["Använd motsatt räknesätt", "x + 3 − 3 = 8 − 3", "Ta bort 3 genom att subtrahera 3 på båda sidor.", "Plus och minus är motsatta räknesätt."],
      ["Lös och kontrollera", "x = 5 → 5 + 3 = 8", "Sätt in svaret för att se att likheten stämmer.", "Kontrollen visar att 5 är rätt lösning."],
    ],
    modes: {
      rules: [q("Vilket räknesätt löser ekvationen?", "x + 7 = 12", ["Subtrahera 7", "Addera 7", "Multiplicera med 7"], 0, "Använd motsatt räknesätt: subtrahera 7."), q("Vad måste bevaras?", "En ekvation", ["Balansen", "Talens ordning", "Det största talet"], 0, "Gör samma sak på båda sidor så bevaras balansen.")],
      calculate: [q("Vad är x?", "x + 4 = 11", ["5", "7", "15"], 1, "11 − 4 = 7."), q("Vad är x?", "3x = 18", ["6", "15", "54"], 0, "18 ÷ 3 = 6."), q("Vad är x?", "x − 5 = 9", ["4", "14", "45"], 1, "9 + 5 = 14.")],
      missing: [q("Vilket tal saknas?", "□ + 6 = 10", ["4", "6", "16"], 0, "10 − 6 = 4."), q("Vilket tal saknas?", "5 × □ = 20", ["2", "4", "15"], 1, "20 ÷ 5 = 4.")],
      truefalse: [q("Sant eller falskt?", "x + 2 = 7 ger x = 5", ["Sant", "Falskt"], 0, "5 + 2 = 7."), q("Sant eller falskt?", "2x = 10 ger x = 8", ["Sant", "Falskt"], 1, "10 ÷ 2 = 5, alltså är x = 5.")],
    },
  },
};

Object.values(topics).forEach((topic) => {
  topic.levels = ["high"];
  topic.modes.quick = [...(topic.modes.calculate || []), ...(topic.modes.truefalse || [])];
});

const highCategories = [
  { id: "numbers", title: "Tal", description: "Taluppfattning och räknesätt", topicIds: ["powers10"] },
  { id: "geometry", title: "Geometri", description: "Former, mått och samband", topicIds: ["area"] },
  { id: "percent", title: "Procent", description: "Andelar och förändringar", topicIds: ["percent"] },
  { id: "statistics", title: "Statistik", description: "Data och lägesmått", topicIds: ["statistics"] },
  { id: "probability", title: "Sannolikhet", description: "Slump och möjliga utfall", topicIds: ["probability"] },
  { id: "algebra", title: "Algebra", description: "Uttryck och ekvationer", topicIds: ["algebra"] },
];

const curriculum = {
  high: { name: "Högstadiet", categories: highCategories },
  middle: { name: "Mellanstadiet", categories: highCategories },
};

const wisdoms = [
  "Förklara lösningen högt för dig själv – då märker du snabbt vad du verkligen förstår.",
  "Ett fel är inte ett misslyckande. Det visar exakt vad du kan träna på härnäst.",
  "Rita en bild när talen känns abstrakta. En enkel skiss kan göra sambandet tydligt.",
  "Träna kort och ofta. Tio fokuserade minuter kan ge mer än ett långt pass ibland.",
  "Kontrollera svaret med en annan metod när du kan. Då tränar du både säkerhet och förståelse.",
  "Fråga inte bara vad svaret är – fråga varför metoden fungerar.",
];

let level = localStorage.getItem("mathclass-level") || "high";
let activeScreen = "home";
let selectedCategory = null;
let selectedTopic = null;
let currentMode = null;
let questionIndex = 0;
let walkthroughIndex = 0;
let quickScore = 0;
let topicsOrigin = "home";
let settingsOrigin = "home";
let touchStartY = null;
let touchCurrentY = null;
let touchStartedAt = 0;
let swipeAnimating = false;
let wheelLocked = false;

function showScreen(name) {
  screens.forEach((screen) => {
    const active = screen.id === `${name}-screen`;
    screen.hidden = !active;
    screen.classList.toggle("is-active", active);
  });
  activeScreen = name;
  navButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.nav === name));
  const heading = $(`#${name}-screen h1`);
  if (heading) setTimeout(() => heading.focus({ preventScroll: true }), 0);
}

function renderHome() {
  const data = progressData()[level] || {};
  const available = availableTopics();
  const latest = data.latestTopicId ? topics[data.latestTopicId] : null;
  const latestCategory = data.latestCategoryId ? categoryById(data.latestCategoryId) : null;
  const recommendation = available.find((item) => item.topicId !== data.latestTopicId) || available[0];
  configureFeaturedButton($("#continue-button"), latestCategory, data.latestTopicId, latest ? latest.title : "Börja träna", latest ? latest.description : `Öppna Bibliotek för material i ${curriculum[level].name.toLowerCase()}.`);
  configureFeaturedButton($("#recommendation-button"), recommendation?.category, recommendation?.topicId, recommendation ? topics[recommendation.topicId].title : "Nytt material kommer", recommendation ? topics[recommendation.topicId].description : "Det finns ännu inget material för den valda nivån.");
  $("#math-wisdom").textContent = wisdoms[Math.floor(Math.random() * wisdoms.length)];
}

function categoryById(id) {
  return curriculum[level].categories.find((category) => category.id === id);
}

function topicIdsFor(category) {
  return category.topicIds.filter((topicId) => topics[topicId].levels.includes(level));
}

function availableTopics() {
  return curriculum[level].categories.flatMap((category) => topicIdsFor(category).map((topicId) => ({ category, topicId })));
}

function configureFeaturedButton(button, category, topicId, title, description) {
  button.innerHTML = `<strong>${title}</strong><small>${description}</small>`;
  button.disabled = false;
  button.onclick = category && topicId ? () => { selectedCategory = category; topicsOrigin = "home"; openTopic(topicId); } : () => { renderLibrary(); showScreen("library"); };
}

function openCategory(categoryId, origin) {
  selectedCategory = curriculum[level].categories.find((item) => item.id === categoryId);
  topicsOrigin = origin;
  $("#topics-eyebrow").textContent = curriculum[level].name;
  $("#topics-heading").textContent = selectedCategory.title;
  $("#topics-introduction").textContent = selectedCategory.description;
  const list = $("#topic-list");
  list.replaceChildren();
  const availableIds = topicIdsFor(selectedCategory);
  $("#topics-empty").hidden = availableIds.length > 0;
  availableIds.forEach((topicId) => {
    const topic = topics[topicId];
    const button = document.createElement("button");
    button.className = "list-button";
    button.innerHTML = `<span><strong>${topic.title}</strong><small>${topic.description}</small></span><b>›</b>`;
    button.addEventListener("click", () => openTopic(topicId));
    list.append(button);
  });
  showScreen("topics");
}

function openTopic(topicId) {
  selectedTopic = topics[topicId];
  $("#mode-eyebrow").textContent = `${selectedCategory.title} · ${selectedTopic.title}`;
  $("#mode-introduction").textContent = "Välj hur du vill arbeta med momentet.";
  const grid = $("#mode-grid");
  grid.replaceChildren();
  const available = ["walkthrough", ...Object.keys(selectedTopic.modes).filter((mode) => modeQuestions(mode).length)];
  available.forEach((mode) => {
    const info = modeCatalog[mode];
    const button = document.createElement("button");
    button.className = "mode-button";
    button.innerHTML = `<span class="mode-icon">${info.icon}</span><span><strong>${info.name}</strong><small>${info.description}</small></span><b>›</b>`;
    button.addEventListener("click", () => startMode(mode));
    grid.append(button);
  });
  showScreen("mode");
}

function modeQuestions(mode) {
  return selectedTopic.modes[mode].filter((question) => question.levels.includes(level));
}

function startMode(mode) {
  currentMode = mode;
  questionIndex = 0;
  quickScore = 0;
  saveLastVisited();
  if (mode === "walkthrough") {
    walkthroughIndex = 0;
    renderWalkthrough();
    showScreen("walkthrough");
  } else {
    renderQuestion();
    showScreen("quiz");
  }
}

function renderQuestion() {
  const questions = modeQuestions(currentMode);
  const question = questions[questionIndex];
  $("#mode-label").textContent = currentMode === "quick" ? `Snabbträning · ${quickScore} rätt` : modeCatalog[currentMode].name;
  $("#question-progress").textContent = `Fråga ${questionIndex + 1} av ${questions.length}`;
  $("#question-heading").textContent = question.prompt;
  $("#question-example").textContent = question.example;
  $("#answer-instruction").textContent = "Välj ett svar.";
  $("#feedback").hidden = true;
  $("#explanation").hidden = true;
  $("#explanation-button").hidden = true;
  $("#next-question-button").hidden = true;
  const answers = $("#answers");
  answers.hidden = false;
  answers.replaceChildren();
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = choice;
    button.addEventListener("click", () => handleAnswer(index === question.correct));
    answers.append(button);
  });
}

function handleAnswer(correct) {
  const question = modeQuestions(currentMode)[questionIndex];
  $("#answers").hidden = true;
  $("#feedback").hidden = false;
  $("#feedback-heading").textContent = correct ? "Rätt!" : "Inte riktigt";
  $("#feedback-message").textContent = correct ? "Bra jobbat – du valde rätt svar." : "Öppna förklaringen för att se hur du kan tänka.";
  $("#explanation-message").textContent = question.explanation;
  $("#explanation-button").hidden = correct;
  $("#next-question-button").hidden = !correct;
  if (currentMode === "quick" && correct) quickScore += 1;
  saveAttempt(correct);
}

function nextQuestion() {
  const questions = modeQuestions(currentMode);
  questionIndex = (questionIndex + 1) % questions.length;
  if (questionIndex === 0 && currentMode === "quick") quickScore = 0;
  renderQuestion();
}

function changeQuestion(direction) {
  const questions = modeQuestions(currentMode);
  const step = direction < 0 ? 1 : -1;
  questionIndex = (questionIndex + step + questions.length) % questions.length;
  if (questionIndex === 0 && currentMode === "quick") quickScore = 0;
  renderQuestion();
}

function renderWalkthrough() {
  const step = selectedTopic.walkthrough[walkthroughIndex];
  $("#walkthrough-progress").textContent = `Steg ${walkthroughIndex + 1} av ${selectedTopic.walkthrough.length}`;
  $("#walkthrough-heading").textContent = step[0];
  $("#walkthrough-example").textContent = step[1];
  $("#walkthrough-text").textContent = step[2];
  $("#extra-explanation").textContent = step[3];
  $("#extra-explanation").hidden = true;
  $("#more-explanation").hidden = false;
  $("#previous-step").disabled = walkthroughIndex === 0;
  $("#next-step").textContent = walkthroughIndex === selectedTopic.walkthrough.length - 1 ? "Klar" : "Nästa";
}

function progressData() {
  try { return JSON.parse(localStorage.getItem("mathclass-progress") || "{}"); } catch { return {}; }
}

function saveAttempt(correct) {
  const all = progressData();
  const data = all[level] || { attempts: 0, correct: 0, latest: "" };
  data.attempts += 1;
  if (correct) data.correct += 1;
  data.latest = selectedTopic.title;
  data.latestTopicId = Object.keys(topics).find((id) => topics[id] === selectedTopic);
  data.latestCategoryId = selectedCategory.id;
  all[level] = data;
  localStorage.setItem("mathclass-progress", JSON.stringify(all));
}

function saveLastVisited() {
  const all = progressData();
  const data = all[level] || { attempts: 0, correct: 0, latest: "" };
  data.latest = selectedTopic.title;
  data.latestTopicId = Object.keys(topics).find((id) => topics[id] === selectedTopic);
  data.latestCategoryId = selectedCategory.id;
  all[level] = data;
  localStorage.setItem("mathclass-progress", JSON.stringify(all));
}

function renderProgress() {
  const data = progressData()[level] || { attempts: 0, correct: 0, latest: "" };
  $("#progress-level").textContent = curriculum[level].name;
  $("#attempt-count").textContent = data.attempts;
  $("#correct-count").textContent = data.correct;
  $("#accuracy-count").textContent = `${data.attempts ? Math.round(data.correct / data.attempts * 100) : 0} %`;
  $("#latest-progress").textContent = data.latest ? `Senast tränade du på ${data.latest}.` : "När du börjar träna visas dina resultat här.";
}

function renderLibrary() {
  $("#library-level").textContent = curriculum[level].name;
  $("#level-select").value = level;
  const grid = $("#library-categories");
  grid.replaceChildren();
  curriculum[level].categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = "category-button";
    const count = topicIdsFor(category).length;
    button.innerHTML = `<span>${index + 1}</span><strong>${category.title}</strong><small>${count ? `${count} moment` : "Kommer senare"}</small>`;
    button.addEventListener("click", () => openCategory(category.id, "library"));
    grid.append(button);
  });
}

$("#level-select").addEventListener("change", (event) => {
  level = event.target.value;
  localStorage.setItem("mathclass-level", level);
  renderHome();
  renderLibrary();
});

$("#back-from-topics").addEventListener("click", () => {
  if (topicsOrigin === "library") { renderLibrary(); showScreen("library"); } else showScreen("home");
});
$("#back-from-modes").addEventListener("click", () => openCategory(selectedCategory.id, topicsOrigin));
$("#back-from-quiz").addEventListener("click", () => showScreen("mode"));
$("#back-from-walkthrough").addEventListener("click", () => showScreen("mode"));
$("#explanation-button").addEventListener("click", () => { $("#explanation").hidden = false; $("#explanation-button").hidden = true; $("#next-question-button").hidden = false; });
$("#next-question-button").addEventListener("click", nextQuestion);
$("#previous-step").addEventListener("click", () => { walkthroughIndex = Math.max(0, walkthroughIndex - 1); renderWalkthrough(); });
$("#next-step").addEventListener("click", () => { if (walkthroughIndex === selectedTopic.walkthrough.length - 1) showScreen("mode"); else { walkthroughIndex += 1; renderWalkthrough(); } });
$("#more-explanation").addEventListener("click", () => { $("#extra-explanation").hidden = false; $("#more-explanation").hidden = true; });
$("#open-profile").addEventListener("click", () => { settingsOrigin = "home"; showScreen("settings"); });
$("#back-from-settings").addEventListener("click", () => showScreen(settingsOrigin));
$("#open-updates").addEventListener("click", () => showScreen("updates"));
$("#back-from-updates").addEventListener("click", () => showScreen("settings"));

navButtons.forEach((button) => button.addEventListener("click", () => {
  const target = button.dataset.nav;
  if (target === "home") renderHome();
  if (target === "progress") renderProgress();
  if (target === "library") renderLibrary();
  showScreen(target);
}));

function animatePageChange(direction) {
  if (swipeAnimating) return;
  swipeAnimating = true;
  const card = $("#quiz-screen .quiz-card");
  const exitY = direction < 0 ? "-110%" : "110%";
  const enterY = direction < 0 ? "110%" : "-110%";
  card.classList.remove("is-dragging");
  card.classList.add("is-snapping");
  card.style.transform = `translateY(${exitY})`;
  card.style.opacity = "0";
  window.setTimeout(() => {
    changeQuestion(direction);
    card.classList.remove("is-snapping");
    card.style.transform = `translateY(${enterY})`;
    card.style.opacity = "0";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.classList.add("is-snapping");
      card.style.transform = "translateY(0)";
      card.style.opacity = "1";
      window.setTimeout(() => {
        card.classList.remove("is-snapping");
        card.style.transform = "";
        card.style.opacity = "";
        swipeAnimating = false;
      }, 240);
    }));
  }, 230);
}

function snapPageBack() {
  const card = $("#quiz-screen .quiz-card");
  card.classList.remove("is-dragging");
  card.classList.add("is-snapping");
  card.style.transform = "translateY(0)";
  card.style.opacity = "1";
  window.setTimeout(() => {
    card.classList.remove("is-snapping");
    card.style.transform = "";
    card.style.opacity = "";
  }, 240);
}

document.addEventListener("touchstart", (event) => {
  if (activeScreen !== "quiz" || swipeAnimating) return;
  touchStartY = event.touches[0].clientY;
  touchCurrentY = touchStartY;
  touchStartedAt = performance.now();
  $("#quiz-screen .quiz-card").classList.add("is-dragging");
}, { passive: true });

document.addEventListener("touchmove", (event) => {
  if (activeScreen !== "quiz" || touchStartY === null || swipeAnimating) return;
  event.preventDefault();
  touchCurrentY = event.touches[0].clientY;
  const delta = Math.max(-180, Math.min(180, touchCurrentY - touchStartY));
  const card = $("#quiz-screen .quiz-card");
  card.style.transform = `translateY(${delta}px) scale(${1 - Math.abs(delta) / 5000})`;
  card.style.opacity = String(1 - Math.abs(delta) / 700);
}, { passive: false });

document.addEventListener("touchend", () => {
  if (activeScreen !== "quiz" || touchStartY === null || swipeAnimating) return;
  const delta = touchCurrentY - touchStartY;
  const elapsed = Math.max(1, performance.now() - touchStartedAt);
  const velocity = Math.abs(delta) / elapsed;
  touchStartY = null;
  touchCurrentY = null;
  if (Math.abs(delta) >= 95 || (Math.abs(delta) >= 45 && velocity > .55)) animatePageChange(Math.sign(delta));
  else snapPageBack();
}, { passive: true });
document.addEventListener("wheel", (event) => {
  if (activeScreen !== "quiz") return;
  event.preventDefault();
  if (wheelLocked || Math.abs(event.deltaY) < 20) return;
  wheelLocked = true;
  animatePageChange(-Math.sign(event.deltaY));
  setTimeout(() => { wheelLocked = false; }, 450);
}, { passive: false });

renderHome();
