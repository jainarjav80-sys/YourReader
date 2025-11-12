import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/chat/ask", { question });
      setAnswer(res.data.answer);
    } catch {
      setAnswer("Error connecting to backend.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-800 text-white flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Ask Your Notes</h1>
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 w-full max-w-2xl">
        <textarea
          rows="3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about your uploaded notes..."
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="mt-4 w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold transition"
        >
          {loading ? "Processing..." : "Ask"}
        </button>
      </div>

      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white/10 border border-white/20 rounded-xl p-6 w-full max-w-2xl"
        >
          <p>{answer}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
