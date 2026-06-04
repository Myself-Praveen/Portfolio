<div align="center">
  <img src="public/favicon.jpg" alt="Logo" width="120" height="120" style="border-radius: 50%;">
  
  # Praveen's Terminal Portfolio
  
  **An interactive, command-line interface developer portfolio powered by AI.**
  
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://praveen7928.vercel.app/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)]()
  [![Gemini AI](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)]()
</div>

<br/>

Welcome to my digital workspace. This project transforms the traditional web portfolio into a fully interactive UNIX-style terminal experience. Designed for developers, engineering managers, and technical recruiters who appreciate command-line interfaces.

## Features

- **Interactive Command Line:** Execute standard commands such as `ls`, `cd`, `cat`, and `clear` to explore projects and professional experience.
- **Built-in AI Agent:** Interact with the terminal using natural language queries. Powered by a secure serverless backend utilizing the Google Gemini API, the agent is trained on my complete professional background.
- **Organic Output Animations:** Terminal outputs render progressively line-by-line, accurately simulating authentic CRT terminal behavior.
- **Glassmorphism UI:** Features a sleek, draggable macOS-style window layered over a modern web canvas.
- **Responsive Architecture:** Optimized with mobile-first media queries to ensure the interface functions perfectly across all device viewports.
- **Matrix Mode:** Type `matrix` to activate a high-performance `<canvas>` based visual environment. Type `escape` to return to the standard interface.

## Technical Stack

- **Frontend:** React, Vite, Vanilla CSS (Glassmorphism & Responsive Design)
- **Backend (Serverless):** Vercel Serverless Functions (`api/chat.js`)
- **AI Integration:** `@google/generative-ai` (Gemini 2.5 Flash)
- **Deployment & Infrastructure:** Vercel 

## Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Myself-Praveen/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## Live Preview

You can interact with the deployed production environment here:  
**[praveen7928.vercel.app](https://praveen7928.vercel.app/)**

## Connect With Me

- **GitHub:** [@Myself-Praveen](https://github.com/Myself-Praveen)
- **LinkedIn:** [Praveen Mishra](https://www.linkedin.com/in/itz-praveen-mishra/)

---
*Developed by Praveen Mishra.*
