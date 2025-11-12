import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navLinks = [
    { name: "Upload", path: "/upload" },
    { name: "Flashcards", path: "/flashcards" },
    { name: "Quiz", path: "/quiz" },
    { name: "Planner", path: "/planner" },
    { name: "Chat", path: "/chat" },
  ];

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 text-white">
        <h1 className="text-xl font-semibold tracking-wide">AI Study Assistant</h1>
        <div className="flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition ${
                location.pathname === link.path
                  ? "text-indigo-400 border-b-2 border-indigo-400 pb-1"
                  : "text-gray-300 hover:text-indigo-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
