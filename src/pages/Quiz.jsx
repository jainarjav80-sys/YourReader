import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const startQuiz = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/quiz/generate?num_questions=5"
      );
      setQuiz(response.data);
      setAnswers({});
      setResult(null);
    } catch {
      alert("Please generate flashcards first.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (qid, choice) => setAnswers({ ...answers, [qid]: choice });

  const submitQuiz = async () => {
    if (!quiz) return;
    try {
      const payload = { quiz_id: quiz.id, answers };
      const res = await axios.post("http://127.0.0.1:8000/quiz/submit", payload);
      setResult(res.data);
    } catch {
      alert("Quiz submission failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-800 text-white flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">AI Quiz</h1>

      {!quiz && !result && (
        <button
          onClick={startQuiz}
          className="bg-indigo-600 hover:bg-indigo-700 py-3 px-8 rounded-lg font-semibold"
        >
          {loading ? "Generating..." : "Start Quiz"}
        </button>
      )}

      {quiz && !result && (
        <div className="w-full max-w-3xl space-y-6 mt-6">
          {quiz.questions.map((q) => (
            <motion.div key={q.id} className="bg-white/10 border border-white/20 rounded-xl p-5">
              <h2 className="font-semibold mb-3">{q.question}</h2>
              {q.choices.map((choice, i) => (
                <label key={i} className="block mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name={q.id}
                    value={choice}
                    onChange={() => handleAnswer(q.id, choice)}
                    className="mr-2 accent-indigo-500"
                  />
                  {choice}
                </label>
              ))}
            </motion.div>
          ))}
          <button
            onClick={submitQuiz}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold mt-4"
          >
            Submit Quiz
          </button>
        </div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-white/10 border border-white/20 rounded-xl p-6 w-full max-w-3xl"
        >
          <h2 className="text-2xl font-bold mb-3">Score: {result.score}%</h2>
          {result.details.map((d, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{d.question}</p>
              <p className="text-gray-300 text-sm">
                Your Answer: {d.your_answer || "None"}
              </p>
              <p className="text-green-300 text-sm">Correct: {d.correct_answer}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
