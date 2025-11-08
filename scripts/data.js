// Data: Survey Questions
export const questions = [
  {
    id: 1,
    text: "",
    options: [],
  },
  {
    id: 2,
    text: "",
    options: [],
  },
  {
    id: 3,
    text: "",
    options: [],
  },
  {
    id: 4,
    text: "",
    options: [],
  },
  {
    id: 5,
    text: "",
    options: [],
  },
  {
    id: 6,
    text: "",
    options: [],
  },
  {
    id: 7,
    text: "",
    options: [],
  },
  {
    id: 8,
    text: "",
    options: [],
  },
  {
    id: 9,
    text: "",
    options: [],
  },
  {
    id: 10,
    text: "",
    options: [],
  },
];

// Data: Career Database
export const careers = [
  {
    name: "Software Engineer",
    stream: "Science (CS/IT)",
    description:
      "Design, develop, and maintain software applications and systems",
    salary: "₹6-15 LPA",
    jobOutlook: "High demand",
    skills: "Problem-solving, Coding, Logical thinking",
  },
  {
    name: "Doctor (MBBS)",
    stream: "Science (Medical)",
    description: "Diagnose and treat patients, save lives in healthcare sector",
    salary: "₹5-12 LPA",
    jobOutlook: "Very High",
    skills: "Empathy, Attention to detail, Research",
  },
  {
    name: "Lawyer",
    stream: "Arts (Law)",
    description: "Provide legal advice, represent clients in justice system",
    salary: "₹4-20 LPA",
    jobOutlook: "Moderate",
    skills: "Communication, Analytical, Ethics",
  },
  {
    name: "Entrepreneur/Businessman",
    stream: "Commerce",
    description: "Start and manage your own business, build enterprises",
    salary: "Variable",
    jobOutlook: "High",
    skills: "Leadership, Communication, Risk-taking",
  },
  {
    name: "Teacher",
    stream: "Arts/Science",
    description: "Educate and inspire students, shape future generations",
    salary: "₹3.5-8 LPA",
    jobOutlook: "Stable",
    skills: "Communication, Patience, Creativity",
  },
];

// Data: College Database
export const colleges = {
  Science: [
    {
      name: "University of Jammu - Science Faculty",
      location: "Jammu",
      courses: "B.Sc (Physics, Chemistry, Math)",
      cutoff: "60%+",
    },
    {
      name: "Kashmir University - Science",
      location: "Srinagar",
      courses: "B.Sc (Medical, Non-Medical)",
      cutoff: "65%+",
    },
    {
      name: "Baba Ghulam Shah Badshah University",
      location: "Rajouri",
      courses: "B.Sc (IT), B.Tech Engineering",
      cutoff: "70%+",
    },
  ],
  Commerce: [
    {
      name: "Institute of Management & Commerce, Jammu",
      location: "Jammu",
      courses: "B.Com, BBA",
      cutoff: "55%+",
    },
    {
      name: "Sri Pratap College, Srinagar",
      location: "Srinagar",
      courses: "B.Com, Economics",
      cutoff: "60%+",
    },
  ],
  Arts: [
    {
      name: "Amar Singh College, Srinagar",
      location: "Srinagar",
      courses: "B.A (History, English, Geography)",
      cutoff: "50%+",
    },
    {
      name: "Government College for Women, Jammu",
      location: "Jammu",
      courses: "B.A (All streams)",
      cutoff: "52%+",
    },
  ],
};

export async function askAI(currIdx) {
  const question = `You are a question generator. We already have these questions with answers: ${questions
    .filter((q) => q.text !== "")
    .map((q) => `Q${q.id}: ${q.text}`)
    .join("\n")}
Now, ask the next logical question for index ${
    currIdx + 1
  }. and most important thing do not type extra rubbish just type a single sentence question, and that question must be related to user's liking, means questions know about user's passion and intrest in future. dont just go and ask irrelevant question start with basic questions and as ${currIdx++} make them related to their career and passion`;
  const resBox = document.querySelector(".question-text");

  resBox.textContent = "Thinking...";

  try {
    const response = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: question }),
    });

    const data = await response.json();
    resBox.textContent = data.response || data.output || JSON.stringify(data);

    if (questions[currIdx]) {
      questions[currIdx].text += resBox.textContent;
      console.log(resBox.textContent);
    }

    await opts(currIdx);
  } catch (err) {
    console.error(err);
    resBox.textContent = "Failed to connect to server.";
  }
}
export async function opts(currIdx) {
  const prompt = `Now, based on this question: "${questions[currIdx].text}", generate 4 multiple-choice options that make sense for this question. just give me option in a single word or sentence, do not type any rubbish other than main options`;

  try {
    const response = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();
    const aiOptions = (data.response || data.output || "")
      .split("\n")
      .filter((o) => o.trim() !== "");

    questions[currIdx].options = aiOptions;
    console.log(aiOptions, questions[currIdx].options);

  } catch (err) {
    console.error(err);
    resBox = "Failed to connect to server.";
  }
}
