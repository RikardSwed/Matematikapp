const answerButtons = document.querySelectorAll(".answer-button");
const feedback = document.querySelector("#feedback");
const feedbackHeading = document.querySelector("#feedback-heading");
const feedbackMessage = document.querySelector("#feedback-message");
const explanationButton = document.querySelector("#explanation-button");
const explanation = document.querySelector("#explanation");

const correctNumberOfZeroes = 2;

function handleAnswer(event) {
  const selectedButton = event.currentTarget;
  const selectedNumberOfZeroes = Number(selectedButton.dataset.zeroes);
  const isCorrect = selectedNumberOfZeroes === correctNumberOfZeroes;

  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  feedback.hidden = false;

  if (isCorrect) {
    selectedButton.classList.add("correct");
    feedbackHeading.textContent = "Rätt!";
    feedbackMessage.textContent = "När vi multiplicerar med 100 lägger vi till två nollor.";
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
    if (Number(button.dataset.zeroes) === correctNumberOfZeroes) {
      button.classList.add("correct");
    }
  });

  explanation.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

answerButtons.forEach((button) => {
  button.addEventListener("click", handleAnswer);
});

explanationButton.addEventListener("click", showExplanation);
