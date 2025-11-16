import { questions, colleges, careers, askAI, opts } from "./data.js";

// Dom selection
const startBtn = document.querySelector(".start-btn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const submitBtn = document.querySelector("#submitBtn");
const retakeBtn = document.querySelector("#retakeBtn");
const downloadBtn = document.querySelector("#downloadBtn");

// Event Listner
startBtn.addEventListener("click", startSurvey);
prevBtn.addEventListener("click", previousQuestion);
nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", submitSurvey);
retakeBtn.addEventListener("click", retakeSurvey);
downloadBtn.addEventListener("click", downloadReport);

// State
let currentQuestion = 0;
let answers = {};

// Functions
async function startSurvey() {
  document.getElementById("welcomeScreen").classList.add("hidden");
  if (
    questions[currentQuestion].text !== "" &&
    questions[currentQuestion].options.length != 0
  ) {
    document.getElementById("surveyScreen").classList.remove("hidden");
    displayQuestion();
  } else {
    await askAI(currentQuestion);
    document.getElementById("surveyScreen").classList.remove("hidden");
    displayQuestion();
  }
}

function displayQuestion() {
  const question = questions[currentQuestion];
  const container = document.getElementById("questionContainer");
  container.innerHTML = "";

  let html = `<div class="question-text">${question.text}</div><div class="options">`;
  console.log(question);

  question.options.forEach((option, index) => {
    const checked = answers[question.id] === option ? "checked" : "";
    const selected = answers[question.id] === option ? "selected" : "";
    html += `
                    <div class="option ${selected}", '${option}', this)">
                        <input type="radio" id="q${question.id}_${index}" name="q${question.id}" value="${option}" ${checked}>
                        <label for="q${question.id}_${index}">${option}</label>
                    </div>
                `;
  });

  html += `</div>`;
  container.innerHTML = html;
  container.querySelectorAll(".option").forEach((opt, idx) => {
    opt.addEventListener("click", () => {
      selectOption(question.id, question.options[idx], opt);
    });
  });

  // Update progress
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("progressText").textContent = `Question ${
    currentQuestion + 1
  }/${questions.length}`;

  // Update buttons
  updateButtons();
}

function selectOption(questionId, value, element) {
  answers[questionId] = value;

  // Remove selected class from all options
  element.parentElement.querySelectorAll(".option").forEach((opt) => {
    opt.classList.remove("selected");
  });

  // Add selected class to clicked option
  element.classList.add("selected");

  // Check the radio button
  element.querySelector("input").checked = true;
}

function updateButtons() {
  prevBtn.classList.toggle("hidden", currentQuestion === 0);
  nextBtn.classList.toggle("hidden", currentQuestion === questions.length - 1);
  submitBtn.classList.toggle(
    "hidden",
    currentQuestion !== questions.length - 1
  );
}

async function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
  }

  if (questions[currentQuestion].options.length == 0) {
    await askAI(currentQuestion);
  }
  displayQuestion();
}

async function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    if (questions[currentQuestion].options.length == 0) {
      await askAI(currentQuestion);
    }
    displayQuestion();
  }
}

function submitSurvey() {
  if (!answers[questions[currentQuestion].id]) {
    alert("Please select an answer before submitting!");
    return;
  }

  // Calculate career matches
  const careerScores = calculateCareerMatches();

  // Display results
  displayResults(careerScores);
}

function calculateCareerMatches() {
  // Simple matching algorithm based on answers
  const scores = {};

  careers.forEach((career) => {
    let score = 60 + Math.floor(Math.random() * 35); // Base score 60-95%

    // Adjust scores based on specific answers
    if (
      answers[1] === "Technology & Coding" &&
      career.name === "Software Engineer"
    )
      score += 10;
    if (
      answers[1] === "Medicine & Healthcare" &&
      career.name === "Doctor (MBBS)"
    )
      score += 10;
    if (
      answers[1] === "Business & Money" &&
      career.name === "Entrepreneur/Businessman"
    )
      score += 10;
    if (answers[1] === "Law & Justice" && career.name === "Lawyer") score += 10;
    if (answers[1] === "Teaching & Education" && career.name === "Teacher")
      score += 10;

    if (answers[2] === "Mathematics" && career.name === "Software Engineer")
      score += 5;
    if (answers[2] === "Biology" && career.name === "Doctor (MBBS)") score += 5;

    scores[career.name] = Math.min(95, score);
  });

  // Sort and return top 3
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, score]) => ({
      ...careers.find((c) => c.name === name),
      matchPercentage: score,
    }));
}

function displayResults(topCareers) {
  document.getElementById("surveyScreen").classList.add("hidden");
  document.getElementById("resultsScreen").classList.remove("hidden");

  // Display careers
  const careerContainer = document.getElementById("careerResults");
  careerContainer.innerHTML = topCareers
    .map(
      (career, index) => `
                <div class="career-card">
                    <div class="career-header">
                        <div>
                            <div class="career-title">${index + 1}. ${
        career.name
      }</div>
                            <div class="career-stream">${career.stream}</div>
                        </div>
                        <div class="match-percentage">${
                          career.matchPercentage
                        }%</div>
                    </div>
                    <div class="career-description">${career.description}</div>
                    <div class="career-details">
                        <div class="detail-item">
                            <div class="detail-label">Average Salary</div>
                            <div class="detail-value">${career.salary}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Job Outlook</div>
                            <div class="detail-value">${career.jobOutlook}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Key Skills</div>
                            <div class="detail-value">${career.skills}</div>
                        </div>
                    </div>
                </div>
            `
    )
    .join("");

  // Display colleges
  const stream = topCareers[0].stream.includes("Science")
    ? "Science"
    : topCareers[0].stream.includes("Commerce")
    ? "Commerce"
    : "Arts";

  const collegeContainer = document.getElementById("collegesList");
  const relevantColleges = colleges[stream] || [];

  collegeContainer.innerHTML = relevantColleges
    .map(
      (college) => `
                <div class="college-card">
                    <div class="college-name">${college.name}</div>
                    <div class="college-info">
                        <strong>Location:</strong> ${college.location}<br>
                        <strong>Courses:</strong> ${college.courses}<br>
                        <strong>Cutoff:</strong> ${college.cutoff}
                    </div>
                </div>
            `
    )
    .join("");
}

function retakeSurvey() {
  currentQuestion = 0;
  answers = {};
  document.getElementById("resultsScreen").classList.add("hidden");
  document.getElementById("welcomeScreen").classList.remove("hidden");
}

function downloadReport() {
  alert(
    "Download feature coming soon! You can take a screenshot of your results for now. 📸"
  );
}
