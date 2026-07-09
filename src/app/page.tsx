import { supabase } from "@/lib/supabase";
import MemoryForm from "./MemoryForm";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import SearchForm from "./SearchForm";
import ChatBox from "./ChatBox";

export default async function Home() {
  const { data: memories, error } = await supabase
    .from("memories")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold">
          zenova
        </h1>

        <p className="mt-2 text-gray-600">
          AI Memory
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Memories
        </h2>

        <SearchForm />

        {error && (
          <p className="mt-4 text-red-500">
            {error.message}
          </p>
        )}

        <div className="mt-5 space-y-4">
          {memories?.map((memory) => (
            <div
              key={memory.id}
              className="rounded-xl bg-white p-5 shadow"
            >
              <p className="text-lg">
                {memory.content}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {new Date(memory.created_at).toLocaleString("ja-JP")}
              </p>

              <div className="mt-4 flex gap-3">
                <EditButton
                  id={memory.id}
                  content={memory.content}
                />

                <DeleteButton id={memory.id} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <MemoryForm />
        </div>

        <ChatBox />
      </div>
    </main>
  );
}