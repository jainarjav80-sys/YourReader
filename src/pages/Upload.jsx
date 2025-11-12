import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [chunksCount, setChunksCount] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setChunksCount(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("Uploading your notes...");
      const res = await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Notes uploaded successfully!");
      setChunksCount(res.data.chunks_extracted);
    } catch (err) {
      setMessage("Upload failed. Check your backend.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Upload Study Notes</h1>
        <p className="text-gray-300 mb-6">Upload a PDF file to extract and process your notes.</p>

        <label className="block w-full border-2 border-dashed border-gray-400 rounded-xl py-10 cursor-pointer hover:bg-white/10 transition">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          {file ? (
            <p className="text-lg font-medium">{file.name}</p>
          ) : (
            <p>Click or drag a PDF file here</p>
          )}
        </label>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {message && <p className="mt-4 text-gray-200">{message}</p>}
        {chunksCount && (
          <p className="mt-2 text-green-300">Extracted {chunksCount} text chunks.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Upload;
