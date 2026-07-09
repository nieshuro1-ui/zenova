"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addMemory } from "./actions";

export default function MemoryForm() {
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSave() {
    if (!content.trim()) return;

    await addMemory(content);

    setContent("");

    router.refresh();
  }

  return (
    <div className="mt-8">
      <input
        className="w-full rounded border p-3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="新しい記憶を入力"
      />

      <button
        className="mt-3 rounded bg-black px-5 py-2 text-white"
        onClick={handleSave}
      >
        保存
      </button>
    </div>
  );
}