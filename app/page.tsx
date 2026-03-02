"use client";

import { useEffect, useMemo, useState } from "react";
import { ACTIVITIES, type Activity } from "@/lib/activities";

const STORAGE_KEY = "whatnow_saved_ids";

const FILTERS_KEY = "whatnow_filters";

type Filters = {
  duration: number | null;
  mood: string | null;
};

function loadFilters(): Filters {
  try {
    const raw = localStorage.getItem(FILTERS_KEY);
    return raw ? (JSON.parse(raw) as Filters) : { duration: null, mood: null };
  } catch {
    return { duration: null, mood: null };
  }
}

function pickRandomActivity(
  filters?: { duration: number | null; mood: string | null },
  excludeId?: string
): Activity {
  let pool = ACTIVITIES;

  // Filter by time bucket (10 / 30 / 60 / 120)
  if (filters?.duration) {
    pool = pool.filter((a) => a.duration === filters.duration);
  }

  // Filter by mood (relax / focus / active / social / curious)
  if (filters?.mood) {
    pool = pool.filter((a) => a.moods.includes(filters.mood as any));
  }

  // Avoid repeating the same activity when swapping
  if (excludeId) {
    pool = pool.filter((a) => a.id !== excludeId);
  }

  // If filters are too strict, fallback to anything (still avoid excludeId)
  if (pool.length === 0) {
    pool = excludeId ? ACTIVITIES.filter((a) => a.id !== excludeId) : ACTIVITIES;
  }

  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}


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

function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}


export default function Home() {
  
  const initial = useMemo(() => pickRandomActivity(), []);
  const [activity, setActivity] = useState<Activity>(initial);

  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedToast, setSavedToast] = useState<string | null>(null);
  
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);


const [filters, setFilters] = useState<Filters>({
  duration: null,
  mood: null,
});

  useEffect(() => {
    setSavedIds(loadSavedIds());
    
    const f = loadFilters();
    setFilters(f);
    setActivity(pickRandomActivity(f));
  }, []);

  useEffect(() => {
    if (!inProgress) return;
    if (secondsLeft === null) return;
  
    if (secondsLeft <= 0) return;
  
    const t = setTimeout(() => {
      setSecondsLeft((s) => (s === null ? null : s - 1));
    }, 1000);
  
    return () => clearTimeout(t);
  }, [inProgress, secondsLeft]);

  function onStart() {
    setInProgress(true);
    setCompleted(false);
  
    // start countdown based on the activity duration
    setSecondsLeft(activity.duration * 60);
  }
  
  function onDone() {
    setSecondsLeft(null);
    setInProgress(false);
    setCompleted(true);
  
    setTimeout(() => {
      setCompleted(false);
      setActivity(pickRandomActivity(filters));
    }, 5000);
  }

  function onSwap() {
    setActivity(pickRandomActivity(filters, activity.id));
  }

  function onSave() {
    if (savedIds.includes(activity.id)) {
      setSavedToast("Already saved.");
      setTimeout(() => setSavedToast(null), 1200);
      return;
    }
    const next = [...savedIds, activity.id];
    setSavedIds(next);
    saveSavedIds(next);
    setSavedToast("Saved!");
    setTimeout(() => setSavedToast(null), 1200);
  }

  const mode: "idle" | "inProgress" | "done" =
  completed ? "done" : inProgress ? "inProgress" : "idle";

  return (
    <main className="min-h-screen bg-[#F2F2F2] flex flex-col px-6 pt-10 pb-6">
      {/* Big title */}
      <div className="mb-10">
        <h1 className="text-5xl font-semibold text-gray-400">Got a moment?</h1>
      </div>
  
      {/* Suggestion card */}
      <section
        className={[
          "rounded-[48px] p-10 min-h-[520px] flex flex-col justify-between",
          inProgress ? "bg-[#3ED598] shadow-md" : "bg-[#EDEDED] shadow-sm",
        ].join(" ")}
      >
        {/* Top label / timer / done icon */}
        <div className="text-center">
          {mode === "idle" && <p className="text-gray-500">Try this</p>}

          {mode === "inProgress" && (
            <p className="text-black/50">
              {secondsLeft !== null ? formatMMSS(secondsLeft) : ""}
            </p>
          )}

          {mode === "done" && (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-black/50">
                ✓
              </div>
            </div>
          )}
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
          {/* Faded activity title behind */}
          <div className={inProgress ? "text-black/25" : "text-black"}>
            <div className="text-5xl font-semibold leading-tight">
              {activity.title}
            </div>
          </div>

          {/* Big action line (only when started) */}
          {mode === "inProgress" && (
            <div className="text-5xl font-semibold">
              Let&apos;s do it
            </div>
          )}

          {/* Big action line (only when done) */}
          {mode === "done" && (
            <div className="text-5xl font-semibold">
              Done, good job
            </div>
          )}
        </div>

        {/* Bottom buttons */}
        <div className="flex items-center gap-4">
          {mode === "idle" && (
            <>
              <button
                className="flex-1 py-5 rounded-full bg-[#3ED598] text-black font-medium"
                onClick={onStart}
              >
                Start
              </button>

              <button
                onClick={onSave}
                className="w-16 h-16 rounded-full bg-[#E0E0E0] flex items-center justify-center"
                aria-label="Save"
              >
                🔖
              </button>
            </>
          )}

          {mode === "inProgress" && (
            <>
              <button
                className="flex-1 py-5 rounded-full bg-white text-black font-medium"
                onClick={onDone}
              >
                Done
              </button>

              <button
                onClick={onSave}
                className="w-16 h-16 rounded-full bg-[#30C987] flex items-center justify-center"
                aria-label="Save"
              >
                🔖
              </button>
            </>
          )}

          {mode === "done" && (
            <button
              onClick={onSave}
              className="w-full py-6 rounded-full bg-black/10 flex items-center justify-center"
              aria-label="Save"
            >
              🔖
            </button>
          )}
        </div>
      </section>
  
      {/* Bottom actions */}
      <div className="flex flex-col gap-4 mt-6">
        {!inProgress && !completed ? (
          <>
            <button
              onClick={onSwap}
              className="py-4 rounded-full bg-[#EDEDED] font-medium"
            >
              Give me another idea
            </button>
  
            <a
              href="/refine"
              className="py-4 rounded-full bg-[#EDEDED] text-center font-medium"
            >
              Refine for you
            </a>
          </>
        ) : inProgress ? (
          <button
            onClick={() => {
              setInProgress(false);
              setSecondsLeft(null);
          }}
            className="py-4 rounded-full bg-[#EDEDED] font-medium"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={onSwap}
            className="py-4 rounded-full bg-[#EDEDED] font-medium"
          >
            Another one
          </button>
        )}
      </div>
    </main>
  );
}