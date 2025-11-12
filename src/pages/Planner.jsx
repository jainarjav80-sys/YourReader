import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Planner = () => {
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/planner/recommend");
      setPlan(res.data.plan || []);
    } catch {
      alert("Take at least one quiz to generate a plan.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-800 text-white flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Study Planner</h1>
      <button
        onClick={fetchPlan}
        className="py-3 px-8 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold mb-6"
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {plan.map((p, i) => (
          <motion.div
            key={i}
            className="bg-white/10 border border-white/20 rounded-xl p-5"
          >
            <h3 className="font-semibold mb-2">{p.topic}</h3>
            <p className="text-gray-300 text-sm">Accuracy: {p.accuracy}%</p>
            <p className="text-gray-300 text-sm">Next Review: {p.next_review}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Planner;
