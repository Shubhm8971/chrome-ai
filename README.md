🧠 Offline AI Assistant – Chrome Extension

An AI-powered Chrome extension that performs real-time content enhancement — summarization, translation, proofreading, rewriting, transcription, and file uploads — all locally and privately.

Built with React + Vite for speed, TailwindCSS for styling, and a Python Flask backend for smart text and speech processing.

🚀 Features

✅ Summarize – Condenses long web articles or text selections into clear, concise summaries. ✅ Translate – Translates content into multiple languages (default: English → user-selected). ✅ Proofread – Corrects grammar, punctuation, and clarity errors. ✅ Rewrite – Rephrases text while keeping the original meaning intact. ✅ Transcribe – Converts uploaded audio files into accurate, readable text. ✅ Upload – Allows users to upload images or audio for multimodal input processing. ✅ Custom Templates (Planned) – Users can define their own prompt templates for specialized AI tasks. ✅ Settings (In Progress) – Choose default translation language, theme mode, and summary length preferences.

🧩 Tech Stack 🖥️ Frontend

React 18 + Vite – for fast and modular development

TailwindCSS – clean, responsive UI

TypeScript (TSX) – type safety and scalability

Chrome Extension Manifest v3 – for browser integration

⚙️ Backend

Flask (Python) – lightweight REST API for text and audio processing

CORS Enabled – to handle extension–backend communication

Mock AI Outputs – local testing mode (real AI APIs to be added later)

🔧 Installation & Setup 1️⃣ Clone the repository git clone https://github.com/Shubhm8971/offline-ai-extension.git cd offline-ai-extension/extension

2️⃣ Install dependencies npm install npm install --save-dev @types/chrome

3️⃣ Run locally npm run dev

Then open http://localhost:3000 in your browser.

4️⃣ Build for Chrome npm run build

5️⃣ Load extension in Chrome

Open chrome://extensions

Enable Developer Mode

Click Load unpacked

Select the dist folder

🔌 Backend Setup (Optional for API Testing)

Navigate to the backend folder:

cd backend

Install dependencies:

pip install -r requirements.txt

Run Flask locally:

python app.py

The backend runs on http://127.0.0.1:5000

Ensure CORS is enabled for communication between the extension (localhost:3000) and backend (localhost:5000).

🧠 Planned Integrations (Free APIs) Task API Notes Summarization Hugging Face Inference API Supports BART, T5, Pegasus models Translation LibreTranslate API Free and open-source Proofreading LanguageTool API Grammar and spell check Transcription Whisper.cpp or AssemblyAI (free tier) Local/remote speech-to-text Rewrite OpenRouter (GPT-style models) Configurable fallback Upload Local file + mock handler Converts to text or base64 🧑‍💻 Contributors

Aldina Karic – Frontend (React + Vite + TailwindCSS)

Shubh Mittal – Backend (Flask + API Integration)

Rixony – Documentation & Custom Prompt Templates

🏆 Hackathon Goals

We aim to build a fully offline-capable AI extension that showcases strong frontend polish, backend logic, and cross-team collaboration, while respecting user privacy and local data control.
