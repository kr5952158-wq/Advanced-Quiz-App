
const quizData = [
  { question: "What is the full form of HTML?",
    options: ["Hyper Text Markup Language", "High Text Makeup Language", "Hyperlinks Text Mark Language", "None"],
    answer: "Hyper Text Markup Language" },
  { question: "Which CSS property is used to set the space inside an element?",
    options: ["margin", "padding", "spacing", "border"],
    answer: "padding" },
  { question: "Which CSS property is used to change the text color?", options: ["font-color", "text-color", "color", "foreground"], answer: "color" },
  { question: "Which of the following is a JavaScript framework?", options: ["Django", "React", "Laravel", "Flask"], answer: "React" },
  { question: "Which CSS property is used to change the cursor style?", options: ["mouse", "cursor", "pointer", "style"], answer: "cursor" },
  { question: "Which of the following is not a programming language?", options: ["Python", "HTML", "Java", "C++"], answer: "HTML" },
  { question: "Which attribute is used to provide an alternative text for an image in HTML?", options: ["title", "alt", "src", "href"], answer: "alt" },
  { question: "Which symbol is used for comments in CSS?", options: ["// comment", "!-- comment --", "/* comment */", "# comment"], answer: "/* comment */" },
  { question: "In JavaScript, which keyword is used to declare a variable?", options: ["var", "int", "string", "dim"], answer: "var" },
  { question: "Which function is used to display a message in JavaScript?", options: ["alert()", "print()", "log()", "popup()"], answer: "alert()" },
  { question: "Which CSS property controls the size of text?", options: ["font-size", "text-size", "size", "font-style"], answer: "font-size" },
  { question: "Which CSS property is used to set the background color?", options: ["background", "bgcolor", "color", "background-color"], answer: "background-color" },
  { question: "JavaScript is a _____ language.", options: ["Programming", "Markup", "Styling", "Database"], answer: "Programming" },
  { question: "Which of the following is used for responsive design?", options: ["Bootstrap", "JQuery", "Node.js", "MongoDB"], answer: "Bootstrap" },
  { question: "Which HTTP method is used to send data to the server?", options: ["GET", "POST", "PUT", "DELETE"], answer: "POST" },
  { question: "Which SQL command is used to retrieve data from a database?", options: ["INSERT", "SELECT", "UPDATE", "DELETE"], answer: "SELECT" },
  { question: "Which symbol is used to access IDs in CSS?", options: [".", "#", "*", "&"], answer: "#" },
  { question: "Which of the following is NOT a valid data type in JavaScript?", options: ["string", "boolean", "float", "undefined"], answer: "float" },
  { question: "Which HTML tag is used to create an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], answer: "<ul>" },
  { question: "Which protocol is used to transfer web pages?", options: ["FTP", "HTTP", "SMTP", "IP"], answer: "HTTP" }
];

// Variables
let currentQuestion = 0;
let userAnswers = {};
let timer;
let timeLeft = 300; // 5 min

// Elements
const startBtn = document.getElementById("startQuizBtn");
const quizContainerDiv = document.getElementById("quizContainer");
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
const counter = document.getElementById("counter");
const timerElement = document.getElementById("timer");

// Start Quiz
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  quizContainerDiv.style.display = "block";
  loadQuestion(currentQuestion);
  startTimer();
  enableNavigation();  // ✅ har naye quiz ke start me navigation sahi ho
});

// Timer
function startTimer() {
  timerElement.innerHTML = `⏱ Time Left: ${timeLeft}s`;
  timer = setInterval(() => {
    timerElement.innerHTML = `⏱ Time Left: ${timeLeft}s`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      disableNavigation();
      showResult();
    }
  }, 1000);
}

// Load Question
function loadQuestion(index) {
  const q = quizData[index];
  counter.innerHTML = `Question ${index + 1} of ${quizData.length}`;
  quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map(option => `
      <label>
        <input type="radio" name="question${index}" value="${option}" 
        ${userAnswers[index] === option ? "checked" : ""}>
        ${option}
      </label>
    `).join("")}
  `;
  updateButtons();
}

// Save Answer
function saveAnswer() {
  const selectedOption = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
  if (selectedOption) userAnswers[currentQuestion] = selectedOption.value;
}

// Update Buttons
function updateButtons() {
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = currentQuestion === quizData.length - 1;
}

function disableNavigation() {
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  submitBtn.disabled = true;
}

// Show Result
function showResult() {
  clearInterval(timer); // 🔥 Timer stop
  quizContainer.innerHTML = "<h2>Result</h2>";
  let score = 0;
  let counterNum = 1;

  quizData.forEach((q, index) => {
    let userAnswer = userAnswers[index] || "Not Answered";
    let correct = userAnswer === q.answer;

    if (userAnswer === "Not Answered") {
      quizContainer.innerHTML += `
        <div class="answer-block unanswered" style="display:none;">
          <p><b>Q${counterNum}.</b> ${q.question}<br>
          Your Answer: <span class="wrong">Not Answered</span><br>
          Correct Answer: <span class="correct">${q.answer}</span></p><hr>
        </div>
      `;
    } else {
      if (correct) score++;
      quizContainer.innerHTML += `
        <div class="answer-block">
          <p><b>Q${counterNum}.</b> ${q.question}<br>
          Your Answer: <span class="${correct ? "correct" : "wrong"}">${userAnswer}</span><br>
          Correct Answer: <span class="correct">${q.answer}</span></p><hr>
        </div>
      `;
    }
    counterNum++;
  });

  quizContainer.innerHTML += `<h3>Your Score: ${score} / ${quizData.length}</h3>`;
  quizContainer.innerHTML += `<button id="toggleUnanswered">Show Unanswered Questions</button>`;

  // 🔹 Back to Start button add kiya
  quizContainer.innerHTML += `
    <div class="text-center mt-3">
      <button id="backBtn" class="btn btn-dark">⬅️ Back to Start</button>
    </div>
  `;

  document.getElementById("toggleUnanswered").addEventListener("click", function () {
    const unansweredBlocks = document.querySelectorAll(".unanswered");
    unansweredBlocks.forEach(block => {
      if (block.style.display === "none") {
        block.style.display = "block";
        this.innerText = "Hide Unanswered Questions";
      } else {
        block.style.display = "none";
        this.innerText = "Show Unanswered Questions";
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 🔹 Back button ka event
  document.getElementById("backBtn").addEventListener("click", resetQuiz);
}

function resetQuiz() {
  clearInterval(timer);   
  currentQuestion = 0;
  userAnswers = {};
  timeLeft = 300; 

  quizContainerDiv.style.display = "none"; 
  startBtn.style.display = "block";        
  quizContainer.innerHTML = "";            

  enableNavigation();  // ✅ navigation reset
}


function enableNavigation() {
  prevBtn.disabled = true;  // first question pe prev disable hoga
  nextBtn.disabled = false; // next allowed hoga
  submitBtn.disabled = false; // submit hamesha enabled rakho
}

// Navigation
nextBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
});

prevBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
});

submitBtn.addEventListener("click", () => {
  saveAnswer();
  showResult();
  disableNavigation();
  clearInterval(timer);
});
