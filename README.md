AI Study Assistant

An intelligent study assistant that helps students learn better using AI-powered tools such as flashcard generation, quiz creation, study planning, intelligent chat, and PDF-based note processing.

📌 Features
1. PDF Notes Upload--Upload your study PDF file.Backend extracts text and splits it into clean chunks.Data is saved automatically for generating flashcards, quizzes, and chat context.

2. AI Flashcard Generator--Automatically generates accurate Q/A flashcards from your notes.Uses FLAN-T5 + Sentence Transformer for:Question refinementClean formattingSemantic accuracy

3. AI Quiz GeneratorGenerates-- multiple-choice quizzes.Creates distractor answers using semantic similarity.Automatically marks the correct option.Returns a fully usable quiz object.

4. Quiz Submission & Explanation--Submit quiz answers.Get:Score percentageCorrect/Incorrect feedbackAI-generated explanation for each question

5. Smart Study Planner--Tracks your quiz attempts.Analyzes weak topics using accuracy.Recommends next review date intelligently.

6. Intelligent Chat Agent--Ask doubts based directly on your uploaded PDF.Fetches the best matching chunk using embeddings.Provides refined FLAN-T5 answers.

🧠 Tech Stack
Frontend
React (Vite)
Tailwind CSS
Axios
React Router

Backend
FastAPI
Uvicorn
PyPDF2
Hugging Face Transformers
Sentence Transformers

🚀 How to Run Locally
1. Clone the Repository
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo

🖥️ Backend Setup (FastAPI)
Create Virtual Environment
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

Install Dependencies
pip install -r requirements.txt

Run Backend Server
uvicorn app:app --reload


Backend runs at:
👉 http://127.0.0.1:8000

Swagger docs:
👉 http://127.0.0.1:8000/docs

🎨 Frontend Setup (React + Vite)
Install Dependencies
cd frontend
npm install

Run Frontend
npm run dev


Frontend runs at:
👉 http://localhost:5173

🔗 API Endpoints Overview
Upload Notes
POST /upload

Generate Flashcards
POST /generate_flashcards

Generate Quiz
POST /quiz/generate?num_questions=5

Submit Quiz
POST /quiz/submit

Planner Recommendations
GET /planner/recommend

Ask Chatbot
POST /chat/ask



🧪 Troubleshooting
🚫 Quiz Not Generating?
Ensure flashcards exist.Upload PDF → Generate Flashcards → Generate Quiz.

🚫 CORS Errors
?CORS already enabled in backend.Restart backend if needed.

🚫 Upload Page Loading Slowly?
First PDF processing may take 5–10 sec due to model loading.

🛠️ Future Improvements
User authentication
Dark/light theme switch
Save user analytics
Export flashcards/quiz as PDF

Multi-file note supportFor major changes, please open an issue first.
