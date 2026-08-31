const answerButtons = document.querySelectorAll(".answer-button");
const quizCard = document.querySelector(".quiz-card");
const progress = document.querySelector("#progress");
const questionHeading = document.querySelector("#question-heading");
const example = document.querySelector("#example");
const exampleNumber = document.querySelector("#example-number");
const exampleMultiplier = document.querySelector("#example-multiplier");
const answers = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const feedbackHeading = document.querySelector("#feedback-heading");
const feedbackMessage = document.querySelector("#feedback-message");
const explanationButton = document.querySelector("#explanation-button");
const explanation = document.querySelector("#explanation");
const explanationMessage = document.querySelector("#explanation-message");
const explanationRule = document.querySelector("#explanation-rule");

const questions = [
  { multiplier: 10, zeroes: 1 },
  { multiplier: 100, zeroes: 2 },
  { multiplier: 1000, zeroes: 3 },
];

let currentQuestionIndex = 0;
let touchStartY = null;
let wheelLocked = false;

function currentQuestion() {
  return questions[currentQuestionIndex];
}

function resetAnswerState() {
  answers.hidden = false;
  feedback.hidden = true;
  explanation.hidden = true;
  explanationButton.hidden = true;

  answerButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("correct", "incorrect");
  });
}

function renderQuestion() {
  const question = currentQuestion();
  const result = 7 * question.multiplier;

  progress.textContent = `Fråga ${currentQuestionIndex + 1} av ${questions.length}`;
  questionHeading.textContent = `Vilken regel gäller för att multiplicera med ${question.multiplier}?`;
  exampleNumber.textContent = "7";
  exampleMultiplier.textContent = question.multiplier;
  example.setAttribute("aria-label", `Sju gånger ${question.multiplier}`);
  explanationMessage.innerHTML = `När du multiplicerar ett heltal med ${question.multiplier} lägger du till ${question.zeroes} ${question.zeroes === 1 ? "nolla" : "nollor"} efter talet. Därför blir <strong>7 × ${question.multiplier} = ${result}</strong>.`;
  explanationRule.textContent = `Regeln är: lägg till ${question.zeroes} ${question.zeroes === 1 ? "nolla" : "nollor"}.`;

  resetAnswerState();
  quizCard.classList.remove("changing");
  void quizCard.offsetWidth;
  quizCard.classList.add("changing");
}

function showNextQuestion() {
  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
  renderQuestion();
}

function handleAnswer(event) {
  const selectedButton = event.currentTarget;
  const selectedNumberOfZeroes = Number(selectedButton.dataset.zeroes);
  const question = currentQuestion();
  const isCorrect = selectedNumberOfZeroes === question.zeroes;

  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  feedback.hidden = false;
  answers.hidden = true;

  if (isCorrect) {
    selectedButton.classList.add("correct");
    feedbackHeading.textContent = "Rätt!";
    feedbackMessage.textContent = `När vi multiplicerar med ${question.multiplier} lägger vi till ${question.zeroes} ${question.zeroes === 1 ? "nolla" : "nollor"}.`;
    explanationButton.hidden = true;
    explanation.hidden = true;
    return;
  }

  selectedButton.classList.add("incorrect");
  feedbackHeading.textContent = "Inte riktigt";
  feedbackMessage.textContent = "Prova att titta på förklaringen för att se vilken regel som gäller.";
  explanationButton.hidden = false;
}

function showExplanation() {
  explanation.hidden = false;
  explanationButton.hidden = true;

  answerButtons.forEach((button) => {
    if (Number(button.dataset.zeroes) === currentQuestion().zeroes) {
      button.classList.add("correct");
    }
  });

  explanation.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

answerButtons.forEach((button) => {
  button.addEventListener("click", handleAnswer);
});

explanationButton.addEventListener("click", showExplanation);

document.addEventListener(
  "touchstart",
  (event) => {
    touchStartY = event.touches[0].clientY;
  },
  { passive: true },
);

document.addEventListener(
  "touchend",
  (event) => {
    if (touchStartY === null) return;

    const touchEndY = event.changedTouches[0].clientY;
    const distance = Math.abs(touchEndY - touchStartY);
    touchStartY = null;

    if (distance >= 50) {
      showNextQuestion();
    }
  },
  { passive: true },
);

document.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    if (wheelLocked || Math.abs(event.deltaY) < 20) return;

    wheelLocked = true;
    showNextQuestion();
    window.setTimeout(() => {
      wheelLocked = false;
    }, 450);
  },
  { passive: false },
);

renderQuestion();
