import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query, systemPrompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Server API Key not configured." });
  }

  try {
    let dynamicSystemPrompt = systemPrompt;
    
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
