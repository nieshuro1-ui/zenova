"use client";

import { updateMemory } from "./actions";
import { useRouter } from "next/navigation";

export default function EditButton({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const router = useRouter();

  async function handleEdit() {
    const value = prompt("記憶を編集", content);

    if (!value) return;

    await updateMemory(id, value);
    router.refresh();
  }

  return (
    <button
      onClick={handleEdit}
      className="rounded bg-blue-500 px-3 py-1 text-white"
    >
      Edit
    </button>
  );
}
