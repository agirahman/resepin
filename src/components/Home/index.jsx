'use client'

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://101086ae-eaa3-4ccc-be46-aa908cc4ce38-00-1ezp8frwpgn0j.pike.replit.dev/search',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ makanan: input })
        }
      );

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ message: 'Gagal menghubungi server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Cari Resep Makanan Indonesia 🍽️</h1>

      <input
        className="border border-gray-300 rounded px-4 py-2 mb-2 w-full max-w-md"
        placeholder="Mau masak apa...?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? 'Mencari...' : 'Cari Resep'}
      </button>

      {result && result.title && (
        <div className="mt-6 max-w-xl shadow rounded p-4 w-full text-left">
          <h2 className="text-xl font-semibold">{result.title}</h2>
          <p className="mt-2"><strong>Bahan:</strong> {result.ingredients}</p>
          <p className="mt-2"><strong>Langkah:</strong> {result.steps}</p>
          <p className="mt-2 text-sm text-gray-500">❤️ {result.love} suka</p>
        </div>
      )}

      {result && result.message && (
        <p className="mt-4 text-red-600">{result.message}</p>
      )}
    </div>
  );
}
