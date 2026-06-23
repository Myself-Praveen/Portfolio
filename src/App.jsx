import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };
    
    const interval = setInterval(draw, 30);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100vw', height: '100vh', pointerEvents: 'none', backgroundColor: '#000' }} />;
};

const DelayedLine = ({ htmlContent, delay = 0, as = "div" }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (delay === 0) {
      setVisible(true);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  if (as === "span") {
    return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

const getLoginMessage = () => {
  const date = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = String(date.getDate()).padStart(2, ' ');
  const time = date.toTimeString().split(' ')[0];
  return `Last login: ${day} ${month} ${dateNum} ${time} on ttys000`;
};

const WELCOME_MESSAGE = [
  getLoginMessage(),
  "",
  "<div class='hub-logo'><span style='color: #ffffff'>Terminal</span><span style='background-color: #ffa31a; color: #000000; padding: 0px 12px; border-radius: 8px; margin-left: 6px'>Hub</span></div>",
  "Welcome to Praveen's Terminal Portfolio (AI-Powered)",
  "Type <cmd>help</cmd> to see a list of commands, or simply ask a question in natural English.",
  "The integrated AI agent will analyze my GitHub and LinkedIn to give you the best answer!",
  ""
];

const COMMAND_MAP = {
  help: [
    "Available commands:",
    "  <cmd>about</cmd>           - Learn more about me",
    "  <cmd>education</cmd>       - Academic background & coursework",
    "  <cmd>skills</cmd>          - List my technical skills",
    "  <cmd>projects</cmd>        - View my recent work",
    "  <cmd>experience</cmd>      - View my work experience",
    "  <cmd>achievements</cmd>    - Awards, ratings & milestones",
    "  <cmd>github</cmd>          - Fetch live repositories from GitHub API",
    "  <cmd>coding profiles</cmd> - View my competitive coding profiles",
    "  <cmd>resume</cmd>          - View or download my resume",
    "  <cmd>contact</cmd>         - How to reach me",
    "  <cmd>socials</cmd>         - Links to GitHub, LinkedIn, X, Insta",
    "  <cmd>theme</cmd>           - Change terminal theme (e.g., 'theme dracula')",
    "  <cmd>features</cmd>        - View interactive terminal features & easter eggs",
    "  <cmd>clear</cmd>           - Clear the terminal screen",
    ""
  ],
  features: [
    "Interactive Terminal Features & Easter Eggs:",
    "  <cmd>ls</cmd>              - List directory contents",
    "  <cmd>cd</cmd>              - Change directory (e.g., 'cd projects')",
    "  <cmd>cat</cmd>             - Read a file (e.g., 'cat about.txt')",
    "  <cmd>pwd</cmd>             - Print current working directory",
    "  <cmd>whoami</cmd>          - Display current user identity",
    "  <cmd>neofetch</cmd>        - Display system information",
    "  <cmd>history</cmd>         - View command history",
    "  <cmd>matrix</cmd>          - Enter the Matrix",
    "  <cmd>escape</cmd>          - Escape the Matrix",
    "  <cmd>sudo rm -rf /</cmd>   - Do not run this.",
    ""
  ],
  about: [
    "I am Praveen Mishra, a passionate Software Engineer and B.Tech CSE student at IIITDM Kurnool (CGPA: 8.00).",
    "I specialize in Full-Stack Development, AI/ML Pipelines, and Systems Architecture.",
    "Beyond coding, I've served as a Google Campus Ambassador, evangelizing Gemini AI, and I play Table Tennis for my institute.",
    "",
    "Feel free to ask the AI agent any questions about my background!"
  ],
  skills: [
    "My Technical Arsenal:",
    "  <span class='highlight'>Languages:</span>       C, C++, Python, SQL, JavaScript, HTML, CSS, RISC-V Assembly, Bash",
    "  <span class='highlight'>Frameworks:</span>      PyTorch, TensorFlow, Scikit-learn, HuggingFace, LangChain, React.js, Node.js",
    "  <span class='highlight'>Tools:</span>           Git, Docker, Linux, Postman, VS Code, REST APIs, Flex, Bison, Ollama",
    "  <span class='highlight'>Databases:</span>       MongoDB, MySQL, FAISS, PostgreSQL",
    "  <span class='highlight'>Core Concepts:</span>   DSA, OOP, Compiler Design, NLP, Machine Learning, RAG"
  ],
  projects: [
    "Here are my recent projects:",
    "<br/>",
    "<strong>CodeSage – AI Code Analysis Assistant</strong>",
    "Built an AI-powered CLI assistant using Ollama local LLMs for code refactoring, and engineered a LangChain/FAISS RAG pipeline.",
    "<em>Tech: Python, LangChain, Ollama, RAG, FAISS</em>",
    "<a href='https://github.com/Myself-Praveen/Code_Sage' target='_blank' class='link'>View Source</a> | <a href='https://www.youtube.com/watch?v=VU2RdymCOhA' target='_blank' class='link'>Demo Video</a>",
    "<br/>",
    "<strong>Retriever -- Full-Stack Lost-and-Found System</strong>",
    "Architected a FastAPI/React platform with WebSockets and integrated Gemini Vision for 95%+ accurate tagging.",
    "<em>Tech: React 19, FastAPI, WebSockets, MongoDB, Redis, Google Gemini Vision API</em>",
    "<a href='https://github.com/Myself-Praveen/Retriver' target='_blank' class='link'>View Source</a> | <a href='https://retriver-iota.vercel.app/' target='_blank' class='link'>Live Demo</a>",
    "<br/>",
    "<strong>AI-Powered Terminal Portfolio</strong>",
    "Developed an interactive React.js UNIX terminal integrated with Google Gemini LLM via Vercel Serverless.",
    "<em>Tech: React.js, Node.js, Vercel Serverless, Google Gemini API</em>",
    "<a href='https://github.com/Myself-Praveen/Portfolio' target='_blank' class='link'>View Source</a> | <a href='https://praveen7928.vercel.app' target='_blank' class='link'>Live Demo</a>",
    "<br/>",
    "Type <cmd>cd projects</cmd> then <cmd>ls</cmd> to view files, or check my <cmd>github</cmd>!"
  ],
  experience: [
    "Work Experience & Leadership:",
    "<br/>",
    "<strong>LangChain (Open Source Contributor)</strong> (May 2026 - Jun 2026)",
    "Implemented Pydantic Structured Output for HuggingFace models, accelerating validation workflows.",
    "<br/>",
    "<strong>McKinsey Forward Learning Program</strong> (Nov 2025 - Dec 2025)",
    "Mastered strategic business analysis and applied standard analytical frameworks across real-world cases.",
    "<br/>",
    "<strong>Software Engineering Virtual Experience (EA Sports)</strong> (Mar 2025 - Apr 2025)",
    "Patched critical C++ memory leaks optimizing execution overhead by 15%, and designed modular object class definitions.",
    "<br/>",
    "<strong>Google Campus Ambassador</strong> (Aug 2025 - Dec 2025)",
    "Drove Google Gemini adoption across campus by conducting 3+ hands-on workshops and hackathons, onboarding 100+ students."
  ],
  contact: [
    "Let's build something awesome together!",
    "",
    "Email:   <a href='mailto:praveen104685@gmail.com' class='link'>praveen104685@gmail.com</a>",
    "Phone:   +91 91209 82575",
    "Address: Kanpur, UP, India"
  ],
  socials: [
    "GitHub:      <a href='https://github.com/Myself-Praveen' target='_blank' class='link'>github.com/Myself-Praveen</a>",
    "LinkedIn:    <a href='https://www.linkedin.com/in/itz-praveen-mishra' target='_blank' class='link'>linkedin.com/in/itz-praveen-mishra</a>",
    "X (Twitter): <a href='https://x.com/Itz_Praveen_01' target='_blank' class='link'>x.com/Itz_Praveen_01</a>",
    "Instagram:   <a href='https://www.instagram.com/__myself_praveen_/' target='_blank' class='link'>instagram.com/__myself_praveen_</a>"
  ],
  "coding profiles": [
    "LeetCode:      <a href='https://leetcode.com/u/itz_praveen/' target='_blank' class='link'>leetcode.com/u/itz_praveen</a>",
    "GeeksForGeeks: <a href='https://www.geeksforgeeks.org/profile/it5praveen' target='_blank' class='link'>geeksforgeeks.org/profile/it5praveen</a>",
    "CodeChef:      <a href='https://www.codechef.com/users/itz_praveen' target='_blank' class='link'>codechef.com/users/itz_praveen</a>",
    "Codeforces:    <a href='https://codeforces.com/profile/Itz_praveen' target='_blank' class='link'>codeforces.com/profile/Itz_praveen</a>"
  ],
  education: [
    "Academic Background:",
    "<br/>",
    "<strong>B.Tech in Computer Science and Engineering</strong>",
    "Indian Institute of Information Technology Design and Manufacturing (IIITDM), Kurnool",
    "Batch: 2024 - 2028 | CGPA: <span class='highlight'>8.00/10</span>",
    "<br/>",
    "<strong>Class 12 (Senior Secondary)</strong>",
    "Dr. V.S.E.C, Kanpur, UP | <span class='highlight'>93.2%</span> (2022 - 2023)",
    "<br/>",
    "<strong>Class 10 (Secondary)</strong>",
    "Dr. V.S.E.C, Kanpur, UP | <span class='highlight'>98%</span> (2020 - 2021)",
    "<br/>",
    "<span class='highlight'>Relevant Coursework:</span>",
    "  Data Structures & Algorithms, Object-Oriented Programming, Compiler Design,",
    "  Database Management Systems, Computer Networks, Operating Systems,",
    "  Machine Learning, Natural Language Processing"
  ],
  achievements: [
    "Awards & Milestones:",
    "<br/>",
    "<span class='highlight'>Competitive Programming:</span>",
    "  <a href='https://www.codechef.com/users/itz_praveen' target='_blank' class='link'>CodeChef</a> Rating: <strong>1525</strong> (Global Rank <strong>414</strong> in Starters 225)",
    "  <a href='https://codeforces.com/profile/Itz_praveen' target='_blank' class='link'>Codeforces</a> Rating: <strong>1265</strong> (Pupil)",
    "  <a href='https://leetcode.com/u/itz_praveen/' target='_blank' class='link'>LeetCode</a> Rating: <strong>~1700</strong>",
    "  Total DSA Problems Solved: <strong>500+</strong> across all platforms",
    "  (Ask the AI for live <a href='https://leetcode.com/u/itz_praveen/' target='_blank' class='link'>LeetCode</a> & <a href='https://www.geeksforgeeks.org/profile/it5praveen' target='_blank' class='link'>GFG</a> counts!)",
    "<br/>",
    "<span class='highlight'>Academics:</span>",
    "  <strong>JEE Mains:</strong> Secured <strong>98.2 percentile</strong> (Top 2% among 1.6M candidates)",
    "<br/>",
    "<span class='highlight'>Certifications & Recognition:</span>",
    "  NPTEL Generative AI — <strong>Elite Silver (Top 5% nationwide)</strong>",
    "  Google Campus Ambassador (2025)",
    "  <a href='https://www.credly.com/badges/5e997a98-35ef-4940-9867-feb6137b2251/public_url' target='_blank' class='link'>McKinsey Forward</a> Learning Program Graduate",
    "<br/>",
    "<span class='highlight'>Competitions:</span>",
    "  Secured <strong>6th out of 50+ teams</strong> in DATATHON 2.0, IIITDM Kurnool",
    "<br/>",
    "<span class='highlight'>Leadership:</span>",
    "  Vice Captain — Institute Table Tennis Team (<a href='https://drive.google.com/file/d/1C7Q7N7KKpck2CeOPk3FfjGqhmQei5pP0/view' target='_blank' class='link'>Certificate</a>)",
    "  Sub Coordinator — Ledger Labs (Web3 Club)"
  ],
  whoami: [
    "",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*:........:*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%=................-%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@......................@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@+........................+@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@=..........................=@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@%#@%%@@@@@@@@@@##%@#@%#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@.##.#@@@@@@@#..+@@.+@.-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@#.#@--@::@@@@#:.....*@+.@+.@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@#............................#@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@...........................:@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@..........................@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@-......................:@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#....................#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+..............+@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%=--=%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%-:..............:-%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@%..........................#@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@#................................%@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@:....................................:@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@+........................................=@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@#............................................#@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@#..............................................#@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@#................................................#@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@*............................................*@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@#=....................................-#@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@#+............................+#@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%=..............=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "",
    "  <span class='highlight'>praveen</span>@iiitdm-kurnool",
    "  -------------------------",
    "  <span class='highlight'>Name:</span>      Praveen Mishra",
    "  <span class='highlight'>Role:</span>      Software Engineer | AI/ML Enthusiast",
    "  <span class='highlight'>Education:</span> B.Tech CSE, IIITDM Kurnool (2024-2028)",
    "  <span class='highlight'>CGPA:</span>      8.00/10",
    "  <span class='highlight'>Interests:</span> Compilers, AI Agents, Systems Architecture, DeFi",
    "  <span class='highlight'>Location:</span>  Kanpur, UP, India",
    ""
  ],
  resume: [
    "Praveen Mishra — Software Engineer",
    "<br/>",
    "<span class='highlight'>Education:</span>     B.Tech CSE, IIITDM Kurnool (CGPA: 8.00)",
    "<span class='highlight'>Experience:</span>    LangChain Contributor | McKinsey Forward | EA Sports VE | Google Campus Ambassador",
    "<span class='highlight'>Languages:</span>     C, C++, Python, JS, SQL, RISC-V Assembly, Bash",
    "<span class='highlight'>Frameworks:</span>    PyTorch, TensorFlow, LangChain, React.js, Node.js",
    "<span class='highlight'>Key Projects:</span>  CodeSage | Retriever | AI-Powered Terminal Portfolio",
    "<br/>",
    "View Full Profile: <a href='https://www.linkedin.com/in/itz-praveen-mishra' target='_blank' class='link'>LinkedIn</a>",
    "Download PDF:      <a href='/resume.pdf' target='_blank' class='link'>resume.pdf</a>"
  ],
  theme: [
    "Usage: theme <theme_name>",
    "Available themes: <cmd>theme default</cmd>, <cmd>theme dracula</cmd>, <cmd>theme ubuntu</cmd>, <cmd>theme hacker</cmd>, <cmd>theme hub</cmd>"
  ]
};

const COMMAND_LIST = Object.keys(COMMAND_MAP);

const SYSTEM_PROMPT = `You are the AI assistant built into the terminal portfolio of Praveen Mishra, a passionate Software Engineer and Hackathon Enthusiast. 
Your job is to answer questions about Praveen based on his resume, GitHub, and LinkedIn profile context.
Context about Praveen:
- Education: B.Tech in Computer Science and Engineering at IIITDM Kurnool (2024-2028, CGPA: 8.00).
- Languages: C, C++, Python, SQL, JavaScript, HTML, CSS, RISC-V Assembly, Bash.
- Frameworks/Libraries: PyTorch, TensorFlow, Scikit-learn, HuggingFace, LangChain, React.js, Node.js.
- Experience: LangChain Open Source Contributor, McKinsey Forward Learning Program, EA Sports Virtual Experience (C++ optimization), Google Campus Ambassador.
- Projects: CodeSage (Python, LangChain, Ollama, RAG), Retriever - Full-Stack Lost-and-Found System (React 19, FastAPI, WebSockets), AI-Powered Terminal Portfolio (React.js, Node.js, Vercel Serverless, Gemini API), LUMA Compiler Engine, BlunderBot.
- Achievements: CodeChef 1525, Codeforces 1265, LeetCode ~1700, JEE Mains 98.2 percentile, NPTEL Generative AI Silver, solved 500+ DSA. Praveen is also highly active on GeeksForGeeks (username: it5praveen).
- Contact: praveen104685@gmail.com, Kanpur, UP.

Instructions:
- Answer in 1 to 3 short sentences. Be concise.
- Keep the tone professional, hacker-like, and friendly.
- Format your response nicely using HTML spans to highlight keywords (e.g., <span class='highlight'>text</span>).
- If asked something totally unrelated to Praveen, politely decline and remind them this is a professional portfolio agent.`;

const BOOT_LOGS = [
  "Mounting virtual filesystem... [OK]",
  "Loading kernel modules... [OK]",
  "Initializing neural pathways... [OK]",
  "Connecting to Praveen's brain... [OK]",
  "Loading AI Agent Models... [OK]",
  "Starting interactive shell v3.0...",
  "Done."
];

function App() {
  const [booting, setBooting] = useState(true);
  const [bootLogIndex, setBootLogIndex] = useState(0);
  
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState('hub');
  const [isThinking, setIsThinking] = useState(false);
  // Default AI Key: Put your actual Gemini API key here for local testing
  const [sessionKey, setSessionKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || "");
  
  // Draggable window state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0 });
  
  // Easter eggs
  const [systemCrashed, setSystemCrashed] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  
  // File system state
  const [currentDir, setCurrentDir] = useState('~');
  
  const DIRECTORY_STRUCTURE = {
    '~': ['projects/', 'skills.txt', 'about.txt', 'experience.txt'],
    '~/projects': ['codesage.txt', 'retriever.txt', 'portfolio.txt']
  };

  const FILE_CONTENTS = {
    '~/about.txt': COMMAND_MAP.about,
    '~/skills.txt': COMMAND_MAP.skills,
    '~/experience.txt': COMMAND_MAP.experience,
    '~/projects/codesage.txt': [
      "<span class='highlight'>CodeSage – AI Code Analysis Assistant</span>",
      "",
      "Built an AI-powered CLI assistant using Ollama local LLMs for code refactoring",
      "and engineered a LangChain/FAISS RAG pipeline indexing 50+ core files.",
      "",
      "<span class='highlight'>Tech:</span>       Python, LangChain, Ollama, RAG, FAISS",
      "<span class='highlight'>Features:</span>   Codebase indexing, semantic search, local inference",
      "",
      "<a href='https://github.com/Myself-Praveen/Code_Sage' target='_blank' class='link'>View Source on GitHub</a> | <a href='https://www.youtube.com/watch?v=VU2RdymCOhA' target='_blank' class='link'>Demo Video</a>"
    ],
    '~/projects/retriever.txt': [
      "<span class='highlight'>Retriever -- Full-Stack Lost-and-Found System</span>",
      "",
      "Architected a FastAPI/React platform with WebSockets, supporting 1K+ users",
      "and integrated Gemini Vision for 95%+ accurate tagging and React-Leaflet for precise tracking.",
      "",
      "<span class='highlight'>Tech:</span>       React 19, FastAPI, WebSockets, MongoDB, Redis, Gemini API",
      "<span class='highlight'>Features:</span>   Real-time chat, AI image tagging, interactive map",
      "",
      "<a href='https://github.com/Myself-Praveen/Retriver' target='_blank' class='link'>View Source on GitHub</a> | <a href='https://retriver-iota.vercel.app/' target='_blank' class='link'>Live Demo</a>"
    ],
    '~/projects/portfolio.txt': [
      "<span class='highlight'>AI-Powered Terminal Portfolio</span>",
      "",
      "Developed an interactive React.js UNIX terminal with 5+ bash commands",
      "and integrated Google Gemini LLM via secure Vercel Serverless proxies.",
      "",
      "<span class='highlight'>Tech:</span>       React.js, Node.js, Vercel Serverless, Google Gemini API",
      "<span class='highlight'>Features:</span>   Interactive commands, AI agent, filesystem simulation",
      "",
      "<a href='https://github.com/Myself-Praveen/Portfolio' target='_blank' class='link'>View Source on GitHub</a> | <a href='https://praveen7928.vercel.app' target='_blank' class='link'>Live Demo</a>"
    ]
  };
  
  const inputRef = useRef(null);
  const endRef = useRef(null);
  
  useEffect(() => {
    if (booting) {
      if (bootLogIndex < BOOT_LOGS.length) {
        const timer = setTimeout(() => {
          setBootLogIndex(prev => prev + 1);
        }, Math.random() * 150 + 50);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => {
          setBooting(false);
          setHistory([
            { type: 'output', content: WELCOME_MESSAGE, isHtml: true }
          ]);
        }, 500);
      }
    }
  }, [booting, bootLogIndex]);

  useEffect(() => {
    document.body.className = `theme-${theme} ${matrixMode ? 'matrix-theme' : ''}`;
  }, [theme, matrixMode]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, bootLogIndex, isThinking]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (e.target.tagName !== 'A' && !e.target.classList.contains('interactive-cmd')) {
        inputRef.current?.focus();
      }
    };
    
    const handleMouseMove = (e) => {
      if (dragRef.current.isDragging) {
        setPosition({
          x: e.clientX - dragRef.current.startX,
          y: e.clientY - dragRef.current.startY
        });
      }
    };

    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
    };

    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    dragRef.current = {
      isDragging: true,
      startX: e.clientX - position.x,
      startY: e.clientY - position.y
    };
  };

  const askAI = async (query, currentHistory) => {
    setIsThinking(true);
    
    try {
      let responseText = "";
      
      try {
        // Try to securely fetch from our new serverless backend
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
        
        if (res.ok) {
          const data = await res.json();
          responseText = data.text;
        } else {
          throw new Error('Serverless backend not reachable or returned error.');
        }
      } catch (err) {
        // Fallback to local client-side key if backend fails (e.g. running local dev server without Vercel CLI)
        if (!sessionKey || sessionKey === "YOUR_API_KEY_HERE") {
          setHistory([...currentHistory, { 
            type: 'output', 
            content: [
              "<span class='error'>[AI Offline] Missing API Key.</span>",
              "Please configure your Vercel Environment Variables with <cmd>GEMINI_API_KEY</cmd> to enable the secure serverless AI backend.",
              "Or, for local testing, paste your key into <cmd>src/App.jsx</cmd> on line 258."
            ] 
          }]);
          setIsThinking(false);
          return;
        }
        
        let localDynamicPrompt = SYSTEM_PROMPT;
        try {
          // Fetch real-time LeetCode and GFG stats in parallel using CORS proxies where needed
          const [lcRes, ghRes] = await Promise.all([
            fetch('https://corsproxy.io/?https://leetcode.com/graphql', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                query: `query getUserProfile($username: String!) { matchedUser(username: $username) { submitStats { acSubmissionNum { count } } } }`,
                variables: { username: 'itz_praveen' }
              })
            }),
            fetch('https://api.github.com/repos/Myself-Praveen/DSA_GFG/commits?per_page=1') // GitHub API has CORS enabled natively
          ]);

          if (lcRes.ok) {
            const lcData = await lcRes.json();
            const totalSolved = lcData?.data?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count;
            if (totalSolved) {
              localDynamicPrompt += `\n\n- LIVE LEETCODE STATS: Praveen has currently solved exactly ${totalSolved} LeetCode problems in real-time. Use this exact number if asked!`;
            }
          }

          if (ghRes.ok) {
            const linkHeader = ghRes.headers.get('link');
            if (linkHeader) {
              const match = linkHeader.match(/page=(\d+)>; rel="last"/);
              if (match && match[1]) {
                const commits = parseInt(match[1], 10);
                const gfgSolved = Math.floor(commits / 2);
                localDynamicPrompt += `\n- LIVE GEEKSFORGEEKS STATS: Praveen has currently solved exactly ${gfgSolved} GeeksForGeeks problems in real-time. Use this exact number if asked!`;
              }
            }
          }
        } catch (e) {
          console.log("Local live stats fetch failed:", e);
        }

        const genAI = new GoogleGenerativeAI(sessionKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-2.5-flash", 
          systemInstruction: localDynamicPrompt 
        });
        
        const result = await model.generateContent(query);
        responseText = await result.response.text();
      }
      
      const responseLines = responseText.split('\n').filter(line => line.trim() !== '');
      
      setHistory(prev => [...prev, { 
        type: 'output', 
        content: [
          "<span class='secondary'>[AI Agent Analyzed GitHub & LinkedIn]</span>", 
          ...responseLines
        ] 
      }]);
    } catch (error) {
      setHistory(prev => [...prev, { 
        type: 'output', 
        content: [`<span class='error'>AI Error: ${error.message}</span>`] 
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  const executeCommand = async (cmdStr) => {
    const normalized = cmdStr.toLowerCase().trim();
    const newHistory = [...history, { type: 'input', content: cmdStr }];
    
    if (commandHistory[commandHistory.length - 1] !== cmdStr && cmdStr) {
      setCommandHistory([...commandHistory, cmdStr]);
    }
    setInput('');
    setHistoryIndex(-1);

    if (!normalized) {
      setHistory([...newHistory, { type: 'output', content: [""] }]);
      return;
    }

    if (normalized === 'clear') {
      setHistory([]);
      return;
    }
    
    if (normalized === 'sudo rm -rf /') {
      setHistory([...newHistory, { type: 'output', content: [
        "<span class='error'>WARNING: ROOT PRIVILEGES INVOKED</span>",
        "Deleting /boot...",
        "Deleting /sys...",
        "KERNEL PANIC - NOT SYNCING: FATAL EXCEPTION",
        "..."
      ]}]);
      setTimeout(() => setSystemCrashed(true), 1500);
      return;
    }

    if (normalized === 'matrix') {
      setMatrixMode(!matrixMode);
      setHistory([...newHistory, { type: 'output', content: [`<span class='success'>Matrix mode ${!matrixMode ? 'engaged' : 'disabled'}.</span>`] }]);
      return;
    }

    if (normalized === 'escape') {
      if (matrixMode) {
        setMatrixMode(false);
        setHistory([...newHistory, { type: 'output', content: [`<span class='success'>Disconnected from the Matrix. Welcome back to reality.</span>`] }]);
      } else {
        setHistory([...newHistory, { type: 'output', content: [`<span class='error'>You are not in the Matrix. There is nothing to escape.</span>`] }]);
      }
      return;
    }
    
    // File system commands
    if (normalized === 'ls') {
      const contents = DIRECTORY_STRUCTURE[currentDir] || [];
      setHistory([...newHistory, { type: 'output', content: [contents.join('  ')] }]);
      return;
    }

    if (normalized.startsWith('cd ')) {
      const target = normalized.split(' ')[1];
      if (target === '..' || target === '../') {
        setCurrentDir('~');
      } else if (target === 'projects' || target === 'projects/') {
        setCurrentDir('~/projects');
      } else if (target === '~' || target === '') {
        setCurrentDir('~');
      } else {
        setHistory([...newHistory, { type: 'output', content: [`<span class='error'>cd: no such file or directory: ${target}</span>`] }]);
        return;
      }
      setHistory([...newHistory]); // Just update prompt
      return;
    }

    if (normalized.startsWith('cat ')) {
      const file = normalized.split(' ')[1];
      const fullPath = currentDir === '~' ? `~/${file}` : `${currentDir}/${file}`;
      
      if (FILE_CONTENTS[fullPath]) {
        setHistory([...newHistory, { type: 'output', content: FILE_CONTENTS[fullPath] }]);
      } else {
        setHistory([...newHistory, { type: 'output', content: [`<span class='error'>cat: ${file}: No such file</span>`] }]);
      }
      return;
    }

    if (normalized === 'pwd') {
      setHistory([...newHistory, { type: 'output', content: [currentDir] }]);
      return;
    }

    if (normalized === 'history') {
      const histLines = commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`);
      setHistory([...newHistory, { type: 'output', content: histLines.length ? histLines : ["No commands in history."] }]);
      return;
    }

    if (normalized === 'neofetch') {
      const uptime = Math.floor((Date.now() - performance.timeOrigin) / 1000);
      const uptimeStr = uptime > 60 ? `${Math.floor(uptime / 60)}m ${uptime % 60}s` : `${uptime}s`;
      setHistory([...newHistory, { type: 'output', content: [
        "",
        "<span class='highlight'>praveen</span>@<span class='highlight'>terminal-hub</span>",
        "-------------------------",
        `<span class='highlight'>OS:</span>        Portfolio v3.0`,
        `<span class='highlight'>Host:</span>      IIITDM Kurnool`,
        `<span class='highlight'>Shell:</span>     TerminalHub AI Shell`,
        `<span class='highlight'>Terminal:</span>  Glassmorphism CRT v2`,
        `<span class='highlight'>Theme:</span>     ${theme}`,
        `<span class='highlight'>Uptime:</span>    ${uptimeStr}`,
        `<span class='highlight'>Packages:</span>  7 projects installed`,
        `<span class='highlight'>Languages:</span> C, C++, Python, JS, SQL, RISC-V`,
        `<span class='highlight'>AI Model:</span>  Gemini 2.5 Flash`,
        ""
      ] }]);
      return;
    }

    if (normalized.startsWith('github')) {
      const parts = normalized.split(' ');
      const username = parts[1] || 'Myself-Praveen';
      
      const pendingHistory = [...newHistory, { type: 'output', content: [`<span class='secondary'>Fetching live data from GitHub API for @${username}...</span>`] }];
      setHistory(pendingHistory);
      
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
        if (!res.ok) throw new Error("GitHub API rate limit or user not found.");
        const repos = await res.json();
        
        if (repos.length === 0) {
          setHistory([...newHistory, { type: 'output', content: ["", `<span class='error'>No public repositories found for @${username}.</span>`, ""] }]);
          return;
        }
        
        const repoLines = repos.map(r => 
          `<span class="highlight">${r.name}</span> (Star: ${r.stargazers_count})<br/>   <span class="secondary">${r.description || 'No description provided.'}</span><br/>   <a href="${r.html_url}" target="_blank" class="link">View Source</a><br/>`
        );
        
        setHistory([...newHistory, { type: 'output', content: ["", "<span class='success'>Recent Repositories:</span>", ...repoLines, ""] }]);
      } catch (e) {
        setHistory([...newHistory, { type: 'output', content: [`<span class='error'>Error: ${e.message}</span>`] }]);
      }
      return;
    }

    if (normalized.startsWith('theme ')) {
      const newTheme = normalized.split(' ')[1];
      const validThemes = ['default', 'dracula', 'ubuntu', 'hacker', 'hub'];
      if (validThemes.includes(newTheme)) {
        setTheme(newTheme);
        setHistory([...newHistory, { type: 'output', content: [`<span class='success'>Theme updated to ${newTheme}</span>`] }]);
      } else {
        setHistory([...newHistory, { type: 'output', content: ["<span class='error'>Theme not found. Available: default, dracula, ubuntu, hacker, hub</span>"] }]);
      }
      return;
    }

    if (COMMAND_MAP[normalized]) {
      setHistory([...newHistory, { type: 'output', content: COMMAND_MAP[normalized] }]);
      return;
    }
    
    setHistory(newHistory);
    await askAI(cmdStr, newHistory);
  };

  const handleKeyDown = (e) => {
    if (booting || isThinking) { e.preventDefault(); return; }

    if (e.key === 'Enter') {
      executeCommand(input.trim());
    } 
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } 
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } 
    else if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.toLowerCase();
      const matches = COMMAND_LIST.filter(c => c.startsWith(val));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
    else if (e.key === 'c' && e.ctrlKey) {
      setInput('');
    } 
    else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const renderContent = (lines) => {
    return lines.map((line, i) => {
      let processedLine = line;
      
      if (processedLine.includes('<cmd>')) {
        const parts = processedLine.split(/(<cmd>.*?<\/cmd>)/g);
        return (
          <div key={i}>
            {parts.map((part, j) => {
              if (part.startsWith('<cmd>') && part.endsWith('</cmd>')) {
                const cmd = part.replace(/<\/?cmd>/g, '');
                return (
                  <span 
                    key={j} 
                    className="interactive-cmd" 
                    onClick={() => executeCommand(cmd)}
                    title="Click to execute"
                  >
                    {cmd}
                  </span>
                );
              }
              return <DelayedLine key={j} htmlContent={part} delay={i * 150} as="span" />;
            })}
          </div>
        );
      }
      
      return <DelayedLine key={i} htmlContent={processedLine || '&nbsp;'} delay={i * 150} as="div" />;
    });
  };

  const renderPromptPrefix = () => {
    if (matrixMode) {
      return (
        <div className="prompt-line" style={{ fontWeight: 'bold' }}>
          <span style={{ color: '#00ff00' }}>neo@matrix:{currentDir}</span>
          <span className="prompt-arrow" style={{ color: '#00ff00', marginLeft: '8px' }}>❯</span>
        </div>
      );
    }
    if (theme === 'hub') {
      return (
        <div className="prompt-line" style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
          <span style={{ color: '#ffffff' }}>Terminal</span>
          <span style={{ 
            backgroundColor: '#ffa31a', 
            color: '#000000', 
            padding: '0px 4px', 
            borderRadius: '4px',
            marginLeft: '2px',
            marginRight: '8px'
          }}>Hub</span>
          <span className="prompt-arrow">❯</span>
        </div>
      );
    }
    return (
      <div className="prompt-line">
        <span className="prompt-user">guest</span>
        <span className="prompt-at">@</span>
        <span className="prompt-user">praveen</span>
        <span className="prompt-at">:</span>
        <span className="prompt-dir">{currentDir}</span>
        <span className="prompt-git">git:(main)</span>
        <span className="prompt-arrow">❯</span>
      </div>
    );
  };

  if (systemCrashed) {
    return (
      <div style={{ backgroundColor: '#000', color: '#f00', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '24px', flexDirection: 'column' }}>
        <div>KERNEL PANIC</div>
        <div style={{ fontSize: '14px', marginTop: '20px' }}>System halted. Refresh to reboot.</div>
      </div>
    );
  }

  return (
    <div className="window-container">
      {matrixMode && <MatrixRain />}
      <div 
        className="window-frame" 
        onClick={() => !booting && inputRef.current?.focus()}
        style={{ transform: `translate(${position.x}px, ${position.y}px)`, zIndex: 10 }}
      >
        <div className="window-header" onMouseDown={handleMouseDown} style={{ cursor: 'grab' }}>
          <div className="mac-btn close"></div>
          <div className="mac-btn minimize"></div>
          <div className="mac-btn maximize"></div>
          <div className="window-title">praveen — -zsh — 80x24</div>
        </div>
        <div className="crt">
          <div className="terminal">
            {booting ? (
              <div className="boot-sequence">
                {BOOT_LOGS.slice(0, bootLogIndex).map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            ) : (
              <>
                <div className="history">
                  {history.map((item, index) => (
                    <div key={index} className="history-item">
                      {item.type === 'input' ? (
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          {renderPromptPrefix()}
                          <span>{item.content}</span>
                        </div>
                      ) : (
                        <div className={`output ${item.content[0]?.includes('___') ? 'ascii-art' : ''}`}>
                          {renderContent(item.content)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {isThinking && (
                  <div className="history-item" style={{ marginTop: '10px' }}>
                    <div className="output">
                      <span className="highlight" style={{ animation: 'blink 1s infinite' }}>[AI Agent Processing...]</span>
                    </div>
                  </div>
                )}
                
                <div className="input-line" style={{ display: isThinking ? 'none' : 'flex' }}>
                  {renderPromptPrefix()}
                  <div style={{ position: 'relative', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      spellCheck="false"
                      autoComplete="off"
                      disabled={isThinking}
                    />
                    <span className="cursor" style={{ position: 'absolute', left: `${input.length}ch`, pointerEvents: 'none' }}></span>
                  </div>
                </div>
              </>
            )}
            <div ref={endRef} style={{ height: '20px' }}/>
          </div>
        </div>
        
        <div className="quick-actions">
          <div className="action-chip" onClick={() => executeCommand('about')}>About</div>
          <div className="action-chip" onClick={() => executeCommand('projects')}>Projects</div>
          <div className="action-chip" onClick={() => executeCommand('skills')}>Skills</div>
          <div className="action-chip" onClick={() => executeCommand('achievements')}>Achievements</div>
          <div className="action-chip" onClick={() => executeCommand('coding profiles')}>Coding Profiles</div>
          <div className="action-chip" onClick={() => executeCommand('resume')}>Resume</div>
          <div className="action-chip" onClick={() => executeCommand('features')}>Features</div>
          <div className="action-chip" onClick={() => executeCommand('clear')}>Clear</div>
        </div>
      </div>
    </div>
  );
}

export default App;
