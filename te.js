const questions = [
  {
    question: "Если человека назвали мордофиля, то это…",
    answers: [
      {
        text: "Значит, что он тщеславный.",
        correct: true,
        explanation:
          "Ну зачем же вы так... В Этимологическом словаре русского языка Макса Фасмера поясняется, что мордофилей называют чванливого человека.",
      },
      { text: "Значит, что у него лицо как у хряка.", correct: false },
      { text: "Значит, что чумазый.", correct: false },
    ],
  },
  {
    question: "«Да этот Ярополк — фуфлыга!» Что не так с Ярополком?",
    answers: [
      {
        text: "Он маленький и невзрачный.",
        correct: true,
        explanation:
          "Точно! Словарь Даля говорит, что фуфлыгой называют невзрачного малорослого человека.",
      },
      { text: "Он тот еще алкоголик.", correct: false },
      { text: "Он не держит свое слово.", correct: false },
    ],
  },
  {
    question: "Если человека прозвали пятигузом, значит, он…",
    answers: [
      {
        text: "Не держит слово.",
        correct: true,
        explanation: "Может сесть сразу на пять стульев.",
      },
      { text: "Изменяет жене.", correct: false },
      { text: "Без гроша в кармане.", correct: false },
    ],
  },
  {
    question: "Кто такой шлындра?",
    answers: [
      { text: "Обманщик.", correct: false },
      { text: "Нытик.", correct: false },
      {
        text: "Бродяга.",
        correct: true,
        explanation:
          "В Словаре русского арго «шлындрать» означает бездельничать, шляться.",
      },
    ],
  },
];

let currentQuestionIndex = -1;
let correctAnswers = 0;

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", showNextQuestion);

function showNextQuestion() {
  const questionBlocks = document.querySelectorAll(".question");
  if (currentQuestionIndex >= 0) {
    const currentBlock = questionBlocks[currentQuestionIndex];
    const explanationBlock = currentBlock.querySelector(".explanation");
    explanationBlock.style.display = "none"; // Скрыть комментарий

    const answersContainer = currentBlock.querySelector(".answers");
    answersContainer.classList.add("fade-out"); // Добавить класс для анимации

    // Удалить класс после завершения анимации
    setTimeout(() => {
      answersContainer.style.visibility = "hidden"; // Скрыть контейнер с ответами, чтобы он не занимал место
      answersContainer.classList.remove("fade-out"); // Удалить класс для анимации
    }, 500); // Время анимации должно совпадать с transition в CSS
  }

  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    showEndMessage();
    return;
  }

  setTimeout(() => {
    showQuestion(questions[currentQuestionIndex]);
  }, 500); // Ждем окончания анимации перед показом следующего вопроса
}

function showQuestion(questionData) {
  const questionArea = document.getElementById("questionArea");

  const questionBlock = document.createElement("div");
  questionBlock.classList.add("question");
  questionBlock.id = `question-${currentQuestionIndex}`;

  const questionText = document.createElement("div");
  questionText.classList.add("question-text");
  questionText.innerText = `${currentQuestionIndex + 1}. ${
    questionData.question
  }`;
  questionBlock.appendChild(questionText);

  const answersContainer = document.createElement("div");
  answersContainer.classList.add("answers");

  const shuffledAnswers = questionData.answers.sort(() => 0.5 - Math.random());
  shuffledAnswers.forEach((answer) => {
    const answerBlock = document.createElement("div");
    answerBlock.classList.add("answer");
    answerBlock.innerText = answer.text;
    answerBlock.onclick = () =>
      handleAnswerClick(answer, questionBlock, questionData);
    answersContainer.appendChild(answerBlock);
  });

  questionBlock.appendChild(answersContainer);

  const explanationBlock = document.createElement("div");
  explanationBlock.classList.add("explanation");
  explanationBlock.style.display = "none"; // Скрыть комментарий по умолчанию
  questionBlock.appendChild(explanationBlock);

  questionArea.appendChild(questionBlock);

  startButton.innerText = "Следующий вопрос";
  startButton.disabled = true;
}

function handleAnswerClick(answer, questionBlock, questionData) {
  if (questionBlock.classList.contains("answered")) return;

  questionBlock.classList.add("answered");

  const explanationBlock = questionBlock.querySelector(".explanation");
  if (answer.correct) {
    correctAnswers++;
    questionBlock.insertAdjacentHTML(
      "afterbegin",
      '<span class="correct-icon">✔️</span>'
    ); // Галочка
    explanationBlock.innerText = answer.explanation;
    explanationBlock.style.display = "block"; // Показать комментарий
  } else {
    questionBlock.insertAdjacentHTML(
      "afterbegin",
      '<span class="wrong-icon">❌</span>'
    ); // Крестик
    explanationBlock.innerText = ""; // Оставить комментарий пустым
  }

  const answersContainer = questionBlock.querySelector(".answers");
  answersContainer.style.visibility = "visible"; // Показать контейнер с ответами
  startButton.disabled = false;
}

function showEndMessage() {
  document.getElementById("message").innerText = "Вопросы закончились";
  document.getElementById(
    "stats"
  ).innerText = `Правильные ответы: ${correctAnswers} из ${questions.length}`;
  startButton.style.display = "none";
}
