🌱 Finlingo — Empowering Elderly Financial Confidence Through AI Gamified Learning
Duolingo-style financial literacy and fraud prevention platform designed for elderly populations in Taiwan (scalable across Asia).
🧠 Problem

As digital banking and mobile payments surge across Taiwan, elderly individuals are increasingly exposed to investment scams, phishing attacks, and financial fraud. Traditional financial education is text-heavy, outdated, and inaccessible for users with low digital literacy, visual limitations, or language barriers. Losses exceed NT$27.9 billion annually, disproportionately affecting those aged 50 and above.

Finlingo solves this.

🚀 What is Finlingo?

Finlingo is a gamified AI learning platform that teaches elderly users how to safely navigate banking, understand fraud tactics, and build financial confidence — using voice-enabled AI agents, localized content, and Duolingo-style interactive lessons.

✅ Key Features

🎙 Voice-first learning — users can speak naturally in Mandarin, Taiwanese Hokkien, or English.

🎮 Gamified Experience — XP points, streaks, badges, and progressive lesson paths.

🔐 Fraud Simulation Lessons — real-world scam scenarios based on live Taiwan FSC data.

🌏 Localized & Scalable — content dynamically generated using AI with regional banking laws and real fraud cases.

🧠 AI Personalization — lessons adapt to age, comfort level, language, and learning pace using context memory.

🛡 RAG Pipeline Ready — integrates retrieval-augmented generation to ensure financial accuracy and regulatory compliance.

🏗 Technical Architecture

Finlingo is built using:

Layer	Technology
Frontend UI	Next.js (App Router), TailwindCSS, shadcn/ui
AI Backend	OpenAI GPT Models (GPT-4o/GPT-5), Vector DB for RAG (Planned: Pinecone/Chroma)
Voice Agent	Whisper (speech-to-text), TTS API
Data Sources	Taiwan Open Government API, Financial Supervisory Commission (FSC) fraud databases
Gamification Engine	XP & Streak tracking via React Context + local storage (expandable to DB)
🗺 User Flow

Onboarding: User selects language, age group, financial confidence, and accessibility preferences.

Dashboard: Displays streak, XP, and personalized lesson recommendations.

Lessons: Interactive cards, quizzes, flashcards, and voice simulations.

AI Chat/Voice Companion: Available anytime to answer questions or practice scam avoidance in natural language.

🎯 Why Finlingo Matters

Directly aligned with Deutsche Bank values of trust, inclusion, and financial empowerment.

Tackles an urgent global issue: fraud against elderly is rising across all developed Asian economies.

Scalable architecture: localization-ready using AI retrieval methods.

High impact ESG potential: can be adopted by banks, governments, and pension agencies as part of digital education initiatives.

🌍 Scalability & Future Vision

🇹🇼 Phase 1: Taiwan (Mandarin + Hokkien)

🇯🇵 Phase 2: Japan (fraud + pension modules)

🇸🇬 Phase 3: Singapore (digital wallet safety)

✨ Add Caregiver Mode, where family can monitor progress and receive alerts.

📌 Installation (Development Mode)
pnpm install
pnpm run dev


Make sure you configure environment variables as shown in ENV_SETUP.md.

🤖 AI Prompt Strategy

Finlingo uses a “financial guardian” persona, delivering guidance in a friendly, simplified tone while adapting to user needs. Prompts are optimized for:

Memory persistence

Emotional reassurance

Step-by-step teaching

🤝 Team Roles (Example Placeholder)
Name	Role	Focus
Luis	AI + Gamification	Lesson engine, streak logic
Kelly	UI Accessibility	Voice-first interfaces
Chi	API Integration	Fraud data ingestion
Talia	UX Persona Design	Elder learning psychology
Piyush	System Architecture	AI routing & scalability
🏁 Conclusion

Finlingo is not just an app — it’s a financial safety net, powered by AI, built with empathy, and designed to educate, empower, and protect elderly users from financial exploitation.

“We believe financial literacy shouldn’t be a privilege — it should be accessible, engaging, and secure for everyone, regardless of age or technical ability.”

🌟 Ready to start building confidence — one lesson at a time.
