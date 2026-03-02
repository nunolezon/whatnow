"use client";

import { useEffect, useState } from "react";
import { ACTIVITIES, type Activity } from "@/lib/activities";

const STORAGE_KEY = "whatnow_saved_ids";

function loadSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveSavedIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(loadSavedIds());
  }, []);

  const savedActivities: Activity[] = savedIds
    .map((id) => ACTIVITIES.find((a) => a.id === id))
    .filter(Boolean) as Activity[];

  function remove(id: string) {
    const next = savedIds.filter((x) => x !== id);
    setSavedIds(next);
    saveSavedIds(next);
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Saved for later</h1>
        <p className="text-sm text-gray-500">Pick one when you’re ready.</p>
    </div>

      {savedActivities.length === 0 ? (
        <section className="rounded-3xl border p-6 text-center">
          <p className="text-lg font-medium">Nothing saved yet.</p>
          <p className="text-sm text-gray-500 mt-2">
            Tap Save on any suggestion to keep it here.
          </p>
          <a
            href="/"
            className="inline-block mt-5 px-5 py-3 rounded-xl bg-black text-white"
          >
            Back to suggestions
          </a>
        </section>
      ) : (
        <ul className="flex flex-col gap-3">
          {savedActivities.map((a) => (
            <li key={a.id} className="rounded-3xl border p-5">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="text-lg font-medium">{a.title}</div>
                  <div className="mt-2 text-sm text-gray-500">
                    ~{a.duration} min
                  </div>
                </div>
                <button
                  className="px-4 py-2 rounded-xl border"
                  onClick={() => remove(a.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}