# 🎓 AI-Powered Online Learning Platform

An AI-driven course generation and online learning platform built with Next.js, Drizzle ORM, Neon Serverless PostgreSQL, Clerk Authentication, and Google Gemini AI.

---

## 🌐 Live Demo

* **Deployment URL:** [online-learning-platform-six-lovat.vercel.app](https://online-learning-platform-six-lovat.vercel.app)

---

## 🛠️ Key Features

* **AI Course Generation:** Automated course creation, structure, and chapter outlines powered by Google Gemini and Groq APIs.
* **Course & Workspace Management:** Interactive learning dashboard to manage courses, track progress, and view chapters.
* **Secure Authentication:** User signup, signin, and role management handled by Clerk (`@clerk/nextjs`).
* **Database Persistence:** Fast and type-safe relational database management using Drizzle ORM with Neon Serverless PostgreSQL.
* **Modern UI & Media Player:** Accessible Radix UI components, custom syntax highlighting, and integrated YouTube media player (`react-youtube`).

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router), React
* **Language:** TypeScript
* **Styling:** Tailwind CSS, Radix UI Primitives, Lucide Icons
* **Database & ORM:** Neon Serverless PostgreSQL, Drizzle ORM
* **Authentication:** Clerk
* **AI Integrations:** Google Generative AI (`@google/genai`), Groq SDK, OpenRouter

---

## 🚀 How to Run

1. **Clone the repository:**
   `git clone https://github.com/DavronbekBuxdu123/online-learning-platform.git`
   `cd online-learning-platform`

2. **Install dependencies:**
   `npm install`

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add your credentials:
   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key`
   `CLERK_SECRET_KEY=your_clerk_secret`
   `NEXT_PUBLIC_DRIZZLE_DB_URL=your_neon_db_url`
   `NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key`

4. **Run database migrations:**
   `npx drizzle-kit push`

5. **Start the development server:**
   `npm run dev`
