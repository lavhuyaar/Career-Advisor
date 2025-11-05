 // Data: Survey Questions
       export const questions = [
            {
                id: 1,
                text: "What interests you the most?",
                options: ["Technology & Coding", "Medicine & Healthcare", "Business & Money", "Law & Justice", "Teaching & Education"]
            },
            {
                id: 2,
                text: "What are your strongest subjects?",
                options: ["Mathematics", "Physics", "Chemistry", "Biology", "English"]
            },
            {
                id: 3,
                text: "Do you prefer working with people or machines?",
                options: ["People - I love interacting", "Machines - I like technical work", "Both equally"]
            },
            {
                id: 4,
                text: "What's your personality type?",
                options: ["Creative & Artistic", "Analytical & Logical", "Leadership oriented", "Help-oriented"]
            },
            {
                id: 5,
                text: "How important is salary to you?",
                options: ["Very important", "Moderately important", "Passion over money"]
            },
            {
                id: 6,
                text: "Do you want to work for a company or start your own?",
                options: ["Work for a company", "Start my own business", "Not sure yet"]
            },
            {
                id: 7,
                text: "How do you prefer to learn?",
                options: ["By doing/hands-on", "By studying/theory", "By interacting with people"]
            },
            {
                id: 8,
                text: "What's your risk tolerance?",
                options: ["I like challenges & risks", "I prefer stability", "Balanced approach"]
            },
            {
                id: 9,
                text: "Do you want to help others through your career?",
                options: ["Yes, very important", "Somewhat", "Not a priority"]
            },
            {
                id: 10,
                text: "What's your preferred work environment?",
                options: ["Office/Corporate", "Field/Outdoors", "Remote/Flexible"]
            }
        ];

        // Data: Career Database
       export const careers = [
            {
                name: "Software Engineer",
                stream: "Science (CS/IT)",
                description: "Design, develop, and maintain software applications and systems",
                salary: "₹6-15 LPA",
                jobOutlook: "High demand",
                skills: "Problem-solving, Coding, Logical thinking"
            },
            {
                name: "Doctor (MBBS)",
                stream: "Science (Medical)",
                description: "Diagnose and treat patients, save lives in healthcare sector",
                salary: "₹5-12 LPA",
                jobOutlook: "Very High",
                skills: "Empathy, Attention to detail, Research"
            },
            {
                name: "Lawyer",
                stream: "Arts (Law)",
                description: "Provide legal advice, represent clients in justice system",
                salary: "₹4-20 LPA",
                jobOutlook: "Moderate",
                skills: "Communication, Analytical, Ethics"
            },
            {
                name: "Entrepreneur/Businessman",
                stream: "Commerce",
                description: "Start and manage your own business, build enterprises",
                salary: "Variable",
                jobOutlook: "High",
                skills: "Leadership, Communication, Risk-taking"
            },
            {
                name: "Teacher",
                stream: "Arts/Science",
                description: "Educate and inspire students, shape future generations",
                salary: "₹3.5-8 LPA",
                jobOutlook: "Stable",
                skills: "Communication, Patience, Creativity"
            }
        ];

        // Data: College Database
      export  const colleges = {
            "Science": [
                { name: "University of Jammu - Science Faculty", location: "Jammu", courses: "B.Sc (Physics, Chemistry, Math)", cutoff: "60%+" },
                { name: "Kashmir University - Science", location: "Srinagar", courses: "B.Sc (Medical, Non-Medical)", cutoff: "65%+" },
                { name: "Baba Ghulam Shah Badshah University", location: "Rajouri", courses: "B.Sc (IT), B.Tech Engineering", cutoff: "70%+" }
            ],
            "Commerce": [
                { name: "Institute of Management & Commerce, Jammu", location: "Jammu", courses: "B.Com, BBA", cutoff: "55%+" },
                { name: "Sri Pratap College, Srinagar", location: "Srinagar", courses: "B.Com, Economics", cutoff: "60%+" }
            ],
            "Arts": [
                { name: "Amar Singh College, Srinagar", location: "Srinagar", courses: "B.A (History, English, Geography)", cutoff: "50%+" },
                { name: "Government College for Women, Jammu", location: "Jammu", courses: "B.A (All streams)", cutoff: "52%+" }
            ]
        };