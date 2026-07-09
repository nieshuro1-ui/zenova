"use client";

import { useState } from "react";
import { searchMemory } from "./actions";

export default function SearchForm() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function handleSearch() {
    if (!keyword) return;

    const data = await searchMemory(keyword);

    setResults(data || []);
  }

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="記憶を検索"
          className="flex-1 rounded border p-2"
        />

        <button
          onClick={handleSearch}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          検索
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {results.map((memory) => (
          <div
            key={memory.id}
            className="rounded bg-white p-3 shadow"
          >
            {memory.content}
          </div>
        ))}
      </div>
    </div>
  );
}
