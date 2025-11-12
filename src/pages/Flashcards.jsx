import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateFlashcards = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/generate_flashcards");
      setFlashcards(res.data.flashcards || []);
    } catch (err) {
      alert("Please upload notes first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-800 text-white flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Generated Flashcards</h1>

      <button
        onClick={generateFlashcards}
        disabled={loading}
        className="mb-8 py-3 px-8 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {flashcards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 border border-white/20 p-5 rounded-xl backdrop-blur-md shadow-lg"
          >
            <h2 className="font-semibold mb-2">{card.question}</h2>
            <p className="text-gray-300 text-sm">{card.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
