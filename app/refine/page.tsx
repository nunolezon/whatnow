"use client";

import { useEffect, useState } from "react";
import type { Duration, Mood } from "@/lib/activities";

const FILTERS_KEY = "whatnow_filters";

type Filters = {
  duration: Duration | null;
  mood: Mood | null;
};

function loadFilters(): Filters {
  try {
    const raw = localStorage.getItem(FILTERS_KEY);
    return raw ? (JSON.parse(raw) as Filters) : { duration: null, mood: null };
  } catch {
    return { duration: null, mood: null };
  }
}

function saveFilters(filters: Filters) {
  localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
}

export default function RefinePage() {
  const [duration, setDuration] = useState<Duration | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);

  useEffect(() => {
    const f = loadFilters();
    setDuration(f.duration);
    setMood(f.mood);
  }, []);

  const durationOptions: Duration[] = [10, 30, 60, 120];
  const moodOptions: Mood[] = ["relax", "focus", "active", "social", "curious"];

  function apply() {
    saveFilters({ duration, mood });
    window.location.href = "/";
  }

  function reset() {
    setDuration(null);
    setMood(null);
    saveFilters({ duration: null, mood: null });
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Make it fit</h1>
          <p className="text-sm text-gray-500">Just for right now.</p>
        </div>

        <a href="/" className="text-sm underline text-gray-600">
          Back
        </a>
      </header>

      <section className="rounded-3xl border p-6">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-3">How much time?</div>
          <div className="flex flex-wrap gap-2">
            {durationOptions.map((d) => (
              <button
                key={d}
                className={`px-4 py-2 rounded-xl border ${
                  duration === d ? "bg-black text-white" : ""
                }`}
                onClick={() => setDuration(d)}
              >
                {d === 120 ? "2h+" : `${d}m`}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-3">What vibe?</div>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((m) => (
              <button
                key={m}
                className={`px-4 py-2 rounded-xl border capitalize ${
                  mood === m ? "bg-black text-white" : ""
                }`}
                onClick={() => setMood(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="px-5 py-3 rounded-xl bg-black text-white"
            onClick={apply}
          >
            Show me a better one
          </button>

          <button className="px-5 py-3 rounded-xl border" onClick={reset}>
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}