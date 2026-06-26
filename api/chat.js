import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are the AI assistant built into the terminal portfolio of Praveen Mishra, a passionate Software Engineer and Hackathon Enthusiast. 
Your job is to answer questions about Praveen based on his resume, GitHub, and LinkedIn profile context.
Context about Praveen:
- Education: B.Tech in Computer Science and Engineering at IIITDM Kurnool (2024-2028, CGPA: 8.21). He is currently in his third year (pre-final year) of college.
- Languages: C, C++, Python, SQL, JavaScript, HTML, CSS, RISC-V Assembly, Bash.
- Frameworks/Libraries: PyTorch, TensorFlow, Scikit-learn, HuggingFace, LangChain, React.js, Node.js.
- Experience: Google Campus Ambassador, EA Sports Virtual Experience (C++ optimization), McKinsey Forward Learning Program.
- Projects: LUMA Compiler Engine (C, Flex, Bison, RISC-V), CodeSage (Python, LangChain, Ollama, RAG), Fake News Detection Engine (NLP, Scikit-learn), BlunderBot (AI Chess), Umbrella3 (DeFi), Traffic Prediction (ML), API Terminator (AI Agent).
- Achievements: CodeChef 1487, Codeforces 1200+, NPTEL Generative AI Silver, solved 500+ DSA. Praveen is also highly active on GeeksForGeeks (username: it5praveen).
- Contact: praveen104685@gmail.com, Kanpur, UP.

Instructions:
- Answer in 1 to 3 short sentences. Be concise.
- Keep the tone professional, hacker-like, and friendly.
- Format your response nicely using HTML spans to highlight keywords (e.g., <span class='highlight'>text</span>).
- If asked something totally unrelated to Praveen, politely decline and remind them this is a professional portfolio agent.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Server API Key not configured." });
  }

  try {
    let dynamicSystemPrompt = SYSTEM_PROMPT;
    
    // Fetch real-time LeetCode and GFG stats in parallel
    try {
      const [lcRes, ghRes] = await Promise.all([
        fetch('https://leetcode.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query getUserProfile($username: String!) { matchedUser(username: $username) { submitStats { acSubmissionNum { count } } } }`,
            variables: { username: 'itz_praveen' }
          })
        }),
        fetch('https://api.github.com/repos/Myself-Praveen/DSA_GFG/commits?per_page=1')
      ]);

      if (lcRes.ok) {
        const lcData = await lcRes.json();
        const totalSolved = lcData?.data?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count;
        if (totalSolved) {
          dynamicSystemPrompt += `\n\n- LIVE LEETCODE STATS: Praveen has currently solved exactly ${totalSolved} LeetCode problems in real-time. Use this exact number if asked!`;
        }
      }

      if (ghRes.ok) {
        const linkHeader = ghRes.headers.get('link');
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match && match[1]) {
            const commits = parseInt(match[1], 10);
            const gfgSolved = Math.floor(commits / 2);
            dynamicSystemPrompt += `\n- LIVE GEEKSFORGEEKS STATS: Praveen has currently solved exactly ${gfgSolved} GeeksForGeeks problems in real-time. Use this exact number if asked!`;
          }
        }
      }
    } catch (e) {
      console.error("Failed to fetch live stats", e);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: dynamicSystemPrompt
    });

    const result = await model.generateContent(query);
    const text = result.response.text();
    
    return res.status(200).json({ text });
  } catch (error) {
    console.error("AI Proxy Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
