import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900/80 backdrop-blur-md border-t border-white/10 text-gray-400 text-center py-4 mt-20">
      <p className="text-sm">
        © {new Date().getFullYear()} AI Study Assistant. Built with ❤️ for smarter learning.
      </p>
    </footer>
  );
};

export default Footer;
