"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios"; // Import AxiosError

const DownloadForm = () => {
  const [url, setUrl] = useState<string>("");
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8000/download", {
        params: { url },
        headers: { Authorization: "Bearer premium_token" },
      });
      setDownloadLink(response.data.download_url);
      setError("");
    } catch (err) {
      // Type err as AxiosError with a response containing a detail string
      const axiosError = err as AxiosError<{ detail?: string }>;
      setError(axiosError.response?.data?.detail || "Something went wrong");
      setDownloadLink("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Download 18+ Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter video URL"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download
        </button>
      </form>
      {downloadLink && (
        <a href={downloadLink} className="block mt-4 text-blue-500">
          Download Link
        </a>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default DownloadForm;