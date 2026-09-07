const screens = document.querySelectorAll(".screen");
const homeScreen = document.querySelector("#home-screen");
const modeScreen = document.querySelector("#mode-screen");
const settingsScreen = document.querySelector("#settings-screen");
const updatesScreen = document.querySelector("#updates-screen");
const quizScreen = document.querySelector("#quiz-screen");
const walkthroughScreen = document.querySelector("#walkthrough-screen");
const modeButtons = document.querySelectorAll("[data-mode]");
const answerButtons = document.querySelectorAll(".answer-button");

const quizCard = document.querySelector(".quiz-card");
const modeLabel = document.querySelector("#mode-label");
const progress = document.querySelector("#progress");
const questionHeading = document.querySelector("#question-heading");
const example = document.querySelector("#example");
const exampleExpression = document.querySelector("#example-expression");
const instruction = document.querySelector("#answer-instruction");
const answers = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const feedbackHeading = document.querySelector("#feedback-heading");
const feedbackMessage = document.querySelector("#feedback-message");
const explanationButton = document.querySelector("#explanation-button");
const nextQuestionButton = document.querySelector("#next-question-button");
const explanation = document.querySelector("#explanation");
const explanationMessage = document.querySelector("#explanation-message");
const explanationRule = document.querySelector("#explanation-rule");

const walkthroughProgress = document.querySelector("#walkthrough-progress");
const walkthroughHeading = document.querySelector("#walkthrough-heading");
const walkthroughExample = document.querySelector("#walkthrough-example");
const walkthroughText = document.querySelector("#walkthrough-text");
const extraExplanation = document.querySelector("#extra-explanation");
const previousStepButton = document.querySelector("#previous-step");
const moreExplanationButton = document.querySelector("#more-explanation");
const nextStepButton = document.querySelector("#next-step");

const topic = {
  id: "multiply-ten-powers",
  availableModes: ["walkthrough", "rules", "calculate", "missing", "truefalse", "quick"],
};

const modeNames = {
  rules: "Regler",
  calculate: "Räkna ut",
  missing: "Saknat tal",
  truefalse: "Sant eller falskt",
  quick: "Snabbträning",
};

const standardQuestions = [
  { base: 7, multiplier: 10, zeroes: 1 },
  { base: 7, multiplier: 100, zeroes: 2 },
  { base: 7, multiplier: 1000, zeroes: 3 },
];

const quickQuestions = [
  { base: 3, multiplier: 10, zeroes: 1 },
  { base: 8, multiplier: 100, zeroes: 2 },
  { base: 12, multiplier: 1000, zeroes: 3 },
  { base: 4, multiplier: 100, zeroes: 2 },
  { base: 25, multiplier: 10, zeroes: 1 },
  { base: 6, multiplier: 1000, zeroes: 3 },
];

const walkthroughSteps = [
  {
    title: "Titta på tiotalet",
    example: "10 = 1 följt av 1 nolla",
    text: "När ett heltal multipliceras med 10 blir det tio gånger så stort.",
    extra: "Varje siffra får ett platsvärde som är tio gånger större. Ental blir tiotal och därför hamnar en nolla sist.",
  },
  {
    title: "Multiplicera med 10",
    example: "7 × 10 = 70",
    text: "Eftersom 10 har en nolla lägger vi till en nolla efter heltalet 7.",
    extra: "Sjuan flyttas från entalsplatsen till tiotalsplatsen. Nollan fyller den tomma entalsplatsen.",
  },
  {
    title: "Multiplicera med 100",
    example: "7 × 100 = 700",
    text: "100 har två nollor. Därför lägger vi till två nollor efter heltalet.",
    extra: "Sjuan får ett platsvärde som är hundra gånger större och hamnar på hundratalsplatsen.",
  },
  {
    title: "Multiplicera med 1000",
    example: "7 × 1000 = 7000",
    text: "1000 har tre nollor. Därför lägger vi till tre nollor efter heltalet.",
    extra: "Sjuan hamnar på tusentalsplatsen. De tre tomma platserna fylls med nollor.",
  },
  {
    title: "Kom ihåg metoden",
    example: "10 → 1   ·   100 → 2   ·   1000 → 3",
    text: "För heltal kan du räkna nollorna i 10, 100 eller 1000 och lägga lika många nollor efter talet.",
    extra: "Exempel: 23 × 100 = 2300. Två nollor i 100 betyder två nya nollor efter 23.",
  },
];

let activeScreen = "home";
let currentMode = "rules";
let currentQuestionIndex = 0;
let walkthroughStepIndex = 0;
let quickScore = 0;
let touchStartY = null;
let wheelLocked = false;

function showScreen(screenName) {
  const targetScreen = {
    home: homeScreen,
    mode: modeScreen,
    settings: settingsScreen,
    updates: updatesScreen,
    quiz: quizScreen,
    walkthrough: walkthroughScreen,
  }[screenName];

  screens.forEach((screen) => {
    const isTarget = screen === targetScreen;
    screen.hidden = !isTarget;
    screen.classList.toggle("is-active", isTarget);
  });

  activeScreen = screenName;
  const heading = targetScreen.querySelector("h1");
  window.setTimeout(() => heading.focus({ preventScroll: true }), 0);
}

function showAvailableModes() {
  modeButtons.forEach((button) => {
    button.hidden = !topic.availableModes.includes(button.dataset.mode);
  });
}

function startMode(mode) {
  if (!topic.availableModes.includes(mode)) return;

  if (mode === "walkthrough") {
    walkthroughStepIndex = 0;
    renderWalkthroughStep();
    showScreen("walkthrough");
    return;
  }

  currentMode = mode;
  currentQuestionIndex = 0;
  quickScore = 0;
  renderQuestion();
  showScreen("quiz");
}

function questionList() {
  return currentMode === "quick" ? quickQuestions : standardQuestions;
}

function currentQuestion() {
  return questionList()[currentQuestionIndex];
}

function zeroWord(count) {
  return count === 1 ? "nolla" : "nollor";
}

function setChoices(choices, correctValue) {
  answerButtons.forEach((button, index) => {
    const choice = choices[index];
    button.hidden = choice === undefined;
    if (choice !== undefined) {
      button.textContent = choice.label;
      button.dataset.answer = String(choice.value);
      button.dataset.correct = String(choice.value === correctValue);
    }
  });
}

function resetAnswerState() {
  answers.hidden = false;
  feedback.hidden = true;
  explanation.hidden = true;
  explanationButton.hidden = true;
  nextQuestionButton.hidden = true;

  answerButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("correct", "incorrect");
  });
}

function renderQuestion() {
  const question = currentQuestion();
  const result = question.base * question.multiplier;
  const total = questionList().length;

  modeLabel.textContent = currentMode === "quick" ? `Snabbträning · ${quickScore} rätt` : modeNames[currentMode];
  progress.textContent = `Fråga ${currentQuestionIndex + 1} av ${total}`;
  example.setAttribute("aria-label", `${question.base} gånger ${question.multiplier}`);
  explanationMessage.textContent = `När du multiplicerar ${question.base} med ${question.multiplier} blir svaret ${result}.`;
  explanationRule.textContent = `Räkna ${question.zeroes} ${zeroWord(question.zeroes)} i ${question.multiplier}.`;

  if (currentMode === "rules") {
    questionHeading.textContent = `Vilken regel gäller för att multiplicera med ${question.multiplier}?`;
    exampleExpression.textContent = `${question.base} × ${question.multiplier}`;
    instruction.textContent = "Välj det alternativ som beskriver regeln.";
    setChoices(
      [1, 2, 3].map((value) => ({ value, label: `Lägg till ${value} ${zeroWord(value)}` })),
      question.zeroes,
    );
  }

  if (currentMode === "calculate" || currentMode === "quick") {
    questionHeading.textContent = currentMode === "quick" ? "Räkna så snabbt du kan" : "Vad blir svaret?";
    exampleExpression.textContent = `${question.base} × ${question.multiplier} = ?`;
    instruction.textContent = "Välj rätt svar.";
    setChoices(
      [
        { value: result / 10, label: String(result / 10) },
        { value: result, label: String(result) },
        { value: result * 10, label: String(result * 10) },
      ],
      result,
    );
  }

  if (currentMode === "missing") {
    questionHeading.textContent = "Vilket tal saknas?";
    exampleExpression.textContent = `${question.base} × □ = ${result}`;
    instruction.textContent = "Välj talet som ska stå i rutan.";
    setChoices(
      [10, 100, 1000].map((value) => ({ value, label: String(value) })),
      question.multiplier,
    );
  }

  if (currentMode === "truefalse") {
    const shownResult = currentQuestionIndex % 2 === 0 ? result : result / 10;
    const statementIsTrue = shownResult === result;
    questionHeading.textContent = "Är påståendet sant eller falskt?";
    exampleExpression.textContent = `${question.base} × ${question.multiplier} = ${shownResult}`;
    instruction.textContent = "Välj sant eller falskt.";
    setChoices(
      [
        { value: true, label: "Sant" },
        { value: false, label: "Falskt" },
      ],
      statementIsTrue,
    );
  }

  resetAnswerState();
  quizCard.classList.remove("changing");
  void quizCard.offsetWidth;
  quizCard.classList.add("changing");
}

function showNextQuestion() {
  currentQuestionIndex = (currentQuestionIndex + 1) % questionList().length;
  if (currentQuestionIndex === 0 && currentMode === "quick") quickScore = 0;
  renderQuestion();
}

function handleAnswer(event) {
  const selectedButton = event.currentTarget;
  const isCorrect = selectedButton.dataset.correct === "true";

  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  answers.hidden = true;
  feedback.hidden = false;

  if (isCorrect) {
    selectedButton.classList.add("correct");
    if (currentMode === "quick") quickScore += 1;
    feedbackHeading.textContent = "Rätt!";
    feedbackMessage.textContent = currentMode === "rules"
      ? `Det finns ${currentQuestion().zeroes} ${zeroWord(currentQuestion().zeroes)} i ${currentQuestion().multiplier}.`
      : "Bra jobbat – du valde rätt svar.";
    nextQuestionButton.hidden = false;
    return;
  }

  selectedButton.classList.add("incorrect");
  feedbackHeading.textContent = "Inte riktigt";
  feedbackMessage.textContent = "Öppna förklaringen för att se hur du kan tänka.";
  explanationButton.hidden = false;
}

function showExplanation() {
  explanation.hidden = false;
  explanationButton.hidden = true;
  nextQuestionButton.hidden = false;
}

function renderWalkthroughStep() {
  const step = walkthroughSteps[walkthroughStepIndex];
  walkthroughProgress.textContent = `Steg ${walkthroughStepIndex + 1} av ${walkthroughSteps.length}`;
  walkthroughHeading.textContent = step.title;
  walkthroughExample.textContent = step.example;
  walkthroughText.textContent = step.text;
  extraExplanation.textContent = step.extra;
  extraExplanation.hidden = true;
  moreExplanationButton.hidden = false;
  previousStepButton.disabled = walkthroughStepIndex === 0;
  nextStepButton.textContent = walkthroughStepIndex === walkthroughSteps.length - 1 ? "Klar" : "Nästa";
}

answerButtons.forEach((button) => button.addEventListener("click", handleAnswer));
explanationButton.addEventListener("click", showExplanation);
nextQuestionButton.addEventListener("click", showNextQuestion);

modeButtons.forEach((button) => {
  button.addEventListener("click", () => startMode(button.dataset.mode));
});

document.querySelector("#open-numbers").addEventListener("click", () => {
  showAvailableModes();
  showScreen("mode");
});
document.querySelector("#back-to-home").addEventListener("click", () => showScreen("home"));
document.querySelector("#back-to-mode").addEventListener("click", () => showScreen("mode"));
document.querySelector("#back-from-walkthrough").addEventListener("click", () => showScreen("mode"));
document.querySelector("#open-settings").addEventListener("click", () => showScreen("settings"));
document.querySelector("#open-updates").addEventListener("click", () => showScreen("updates"));
document.querySelector("#back-from-settings").addEventListener("click", () => showScreen("home"));
document.querySelector("#back-from-updates").addEventListener("click", () => showScreen("settings"));

previousStepButton.addEventListener("click", () => {
  if (walkthroughStepIndex > 0) walkthroughStepIndex -= 1;
  renderWalkthroughStep();
});

nextStepButton.addEventListener("click", () => {
  if (walkthroughStepIndex === walkthroughSteps.length - 1) {
    showScreen("mode");
    return;
  }
  walkthroughStepIndex += 1;
  renderWalkthroughStep();
});

moreExplanationButton.addEventListener("click", () => {
  extraExplanation.hidden = false;
  moreExplanationButton.hidden = true;
});

document.addEventListener("touchstart", (event) => {
  if (activeScreen !== "quiz") return;
  touchStartY = event.touches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  if (activeScreen !== "quiz" || touchStartY === null) return;
  const distance = Math.abs(event.changedTouches[0].clientY - touchStartY);
  touchStartY = null;
  if (distance >= 50) showNextQuestion();
}, { passive: true });

document.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (activeScreen !== "quiz" || wheelLocked || Math.abs(event.deltaY) < 20) return;
  wheelLocked = true;
  showNextQuestion();
  window.setTimeout(() => {
    wheelLocked = false;
  }, 450);
}, { passive: false });

showAvailableModes();
