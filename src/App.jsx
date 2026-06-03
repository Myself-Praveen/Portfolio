import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

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
    "  <cmd>about</cmd>     - Learn more about me",
    "  <cmd>skills</cmd>    - List my technical skills",
    "  <cmd>projects</cmd>  - View my recent work",
    "  <cmd>experience</cmd>- View my work experience",
    "  <cmd>github</cmd>           - Fetch live repositories from GitHub API",
    "  <cmd>coding profiles</cmd>  - View my competitive coding profiles",
    "  <cmd>contact</cmd>          - How to reach me",
    "  <cmd>socials</cmd>   - Links to GitHub, LinkedIn, X, Insta",
    "  <cmd>theme</cmd>     - Change terminal theme (e.g., 'theme dracula')",
    "  <cmd>clear</cmd>     - Clear the terminal screen",
    "  <cmd>setkey</cmd>    - Set your Gemini API key to enable AI features",
    ""
  ],
  about: [
    "Hello! I am Praveen, a passionate Software Engineer and Hackathon Enthusiast.",
    "I specialize in full-stack development, AI/ML pipelines, and building robust backend architectures.",
    "Currently, I'm working on several exciting projects including 'BlunderBot', a distributed AI chess platform.",
    "I love turning complex problems into elegant, efficient, and scalable solutions."
  ],
  skills: [
    "<span class='highlight'>[+] Languages:</span>",
    "    Python, JavaScript, TypeScript, Solidity, C++, HTML/CSS",
    "",
    "<span class='highlight'>[+] Frameworks & Libraries:</span>",
    "    React, Next.js, Node.js, Express, FastAPI, Tailwind CSS",
    "",
    "<span class='highlight'>[+] Tools & Infrastructure:</span>",
    "    Git, Docker, Linux, Neo4j, Redis, MongoDB, PostgreSQL",
    "",
    "<span class='highlight'>[+] AI & Machine Learning:</span>",
    "    PyTorch, TensorFlow, Scikit-learn, LLMs, RAG Architectures"
  ],
  projects: [
    "<span class='highlight'>1. BlunderBot Chess Engine</span>",
    "   - Distributed AI chess platform with Neo4j GraphRAG and FastAPI.",
    "   - Custom convolutional autoencoder embeddings.",
    "",
    "<span class='highlight'>2. Umbrella3 DeFi Infrastructure</span>",
    "   - Smart contract development with Solidity/Hardhat.",
    "   - Chainlink multi-oracle disaster verification.",
    "",
    "<span class='highlight'>3. Traffic Demand Prediction Pipeline</span>",
    "   - Stacking ensemble (LightGBM, XGBoost, CatBoost) achieving 93.12 R2 score.",
    "   - Spatial-temporal feature engineering.",
    "",
    "<span class='highlight'>4. API Waste Terminator</span>",
    "   - Autonomous agent scanning codebases for leaked API keys.",
    "   - React/Vite dashboard, GitLab MCP integration."
  ],
  experience: [
    "<span class='highlight'>[2026] Hackathon Conqueror</span>",
    "   - HackHazards '26: Built Umbrella3 DeFi Infrastructure.",
    "   - HackerEarth Traffic Demand: Deployed ML Stacking Ensembles.",
    "   - Rapid Agent Hackathon: Developed API Waste Terminator.",
    "",
    "<span class='highlight'>[2025] Independent Developer</span>",
    "   - Developed 'College Lost and Found' platform.",
    "   - Authored extensive Notion-style programming documentation."
  ],
  contact: [
    "Let's build something awesome together!",
    "",
    "Email:   <a href='mailto:praveen@example.com' class='link'>praveen@example.com</a>",
    "Phone:   +1-555-019-2834",
    "Address: Silicon Valley, CA"
  ],
  socials: [
    "GitHub:      <a href='https://github.com/Myself-Praveen' target='_blank' class='link'>github.com/Myself-Praveen</a>",
    "LinkedIn:    <a href='https://www.linkedin.com/in/itz-praveen-mishra' target='_blank' class='link'>linkedin.com/in/itz-praveen-mishra</a>",
    "X (Twitter): <a href='https://x.com/Itz_Praveen_01' target='_blank' class='link'>x.com/Itz_Praveen_01</a>",
    "Instagram:   <a href='https://www.instagram.com/__myself_praveen_/' target='_blank' class='link'>instagram.com/__myself_praveen_</a>"
  ],
  "coding profiles": [
    "LeetCode:    <a href='https://leetcode.com/u/itz_praveen/' target='_blank' class='link'>leetcode.com/u/itz_praveen</a>",
    "CodeChef:    <a href='https://www.codechef.com/users/itz_praveen' target='_blank' class='link'>codechef.com/users/itz_praveen</a>",
    "Codeforces:  <a href='https://codeforces.com/profile/Itz_praveen' target='_blank' class='link'>codeforces.com/profile/Itz_praveen</a>"
  ],
  theme: [
    "Usage: theme <theme_name>",
    "Available themes: <cmd>theme default</cmd>, <cmd>theme dracula</cmd>, <cmd>theme ubuntu</cmd>, <cmd>theme hacker</cmd>, <cmd>theme hub</cmd>"
  ]
};

const COMMAND_LIST = Object.keys(COMMAND_MAP);

const SYSTEM_PROMPT = `You are the AI assistant built into the terminal portfolio of Praveen, a passionate Software Engineer and Hackathon Enthusiast. 
Your job is to answer questions about Praveen based on his resume, GitHub, and LinkedIn profile context.
Context about Praveen:
- Education: B.S. in Computer Science (2027), AI & Distributed Systems focus.
- Languages: Python, JavaScript, TypeScript, Solidity, C++, HTML/CSS.
- Frameworks: React, Next.js, Node.js, Express, FastAPI, Tailwind CSS.
- Infrastructure/DBs: Git, Docker, Linux, Neo4j, Redis, MongoDB, PostgreSQL.
- ML/AI: PyTorch, TensorFlow, Scikit-learn, LLMs, RAG Architectures.
- Projects: 
  1. BlunderBot Chess Engine (Distributed AI chess platform with Neo4j GraphRAG and FastAPI)
  2. Umbrella3 DeFi Infrastructure (Smart contracts, Solidity/Hardhat, Chainlink multi-oracle)
  3. Traffic Demand Prediction Pipeline (Stacking ensemble LightGBM, XGBoost, CatBoost with 93.12 R2 score)
  4. API Waste Terminator (Autonomous agent scanning codebases for leaked API keys, React/Vite dashboard, GitLab MCP integration)
- Experience: HackHazards '26, HackerEarth Traffic Demand, Rapid Agent Hackathon, developed 'College Lost and Found' platform.
- Contact: praveen@example.com, Silicon Valley, CA.
- Socials: GitHub (github.com/Myself-Praveen), LinkedIn (linkedin.com/in/praveen).

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
  const [sessionKey, setSessionKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  
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
    document.body.className = theme === 'default' ? '' : `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, bootLogIndex, isThinking]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (e.target.tagName !== 'A' && !e.target.classList.contains('interactive-cmd')) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const askAI = async (query, currentHistory) => {
    if (!sessionKey) {
      setHistory([...currentHistory, { 
        type: 'output', 
        content: [
          "<span class='error'>[AI Offline] Missing API Key.</span>",
          "Please type <cmd>setkey YOUR_GEMINI_API_KEY</cmd> to enable the AI agent."
        ] 
      }]);
      return;
    }

    setIsThinking(true);
    try {
      const genAI = new GoogleGenerativeAI(sessionKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash", 
        systemInstruction: SYSTEM_PROMPT 
      });
      
      const result = await model.generateContent(query);
      const text = result.response.text();
      const responseLines = text.split('\n').filter(line => line.trim() !== '');
      
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

    if (normalized.startsWith('setkey ')) {
      const key = cmdStr.split(' ')[1];
      setSessionKey(key);
      setHistory([...newHistory, { type: 'output', content: ["<span class='success'>API Key successfully stored in session!</span>", "Try asking me a question now."] }]);
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
              return <span key={j} dangerouslySetInnerHTML={{ __html: part }} />;
            })}
          </div>
        );
      }
      
      return <div key={i} dangerouslySetInnerHTML={{ __html: processedLine || '&nbsp;' }} />;
    });
  };

  const renderPromptPrefix = () => {
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
        <span className="prompt-dir">~/portfolio</span>
        <span className="prompt-git">git:(main)</span>
        <span className="prompt-arrow">❯</span>
      </div>
    );
  };

  return (
    <div className="window-container">
      <div className="window-frame" onClick={() => !booting && inputRef.current?.focus()}>
        <div className="window-header">
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
          <div className="action-chip" onClick={() => executeCommand('coding profiles')}>Coding Profiles</div>
          <div className="action-chip" onClick={() => executeCommand('github')}>GitHub API</div>
          <div className="action-chip" onClick={() => executeCommand('clear')}>Clear</div>
        </div>
      </div>
    </div>
  );
}

export default App;
