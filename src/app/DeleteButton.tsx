"use client";

import { deleteMemory } from "./actions";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function handleDelete() {
    await deleteMemory(id);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-500 px-3 py-1 text-white"
    >
      Delete
    </button>
  );
}
