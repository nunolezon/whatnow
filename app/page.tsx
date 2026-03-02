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
    <main className="min-h-screen bg-[#F2F2F2] px-6 pb-8 pt-4">
      <div className="mx-auto flex h-full max-w-[460px] flex-col">
        {/* Big title */}
        <div className="mt-2 mb-8">
          <h1 className="text-[32px] font-semibold leading-[38px] text-[#C7C7CC]">
            Got a moment?
          </h1>
        </div>

        {/* Suggestion card */}
        <section
          className={[
            "rounded-[40px] px-8 pt-8 pb-7 min-h-[420px] flex flex-col justify-between shadow-[0_22px_60px_rgba(0,0,0,0.12)]",
            inProgress ? "bg-[#3ED598]" : "bg-white",
          ].join(" ")}
        >
          {/* Top label / timer / done icon */}
          <div className="mb-8 text-center text-sm font-medium text-gray-500">
            {mode === "idle" && <p>Try this</p>}

            {mode === "inProgress" && (
              <p className="text-black/60">
                {secondsLeft !== null ? formatMMSS(secondsLeft) : ""}
              </p>
            )}

            {mode === "done" && (
              <div className="flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-base text-black/60">
                  ✓
                </div>
              </div>
            )}
          </div>

          {/* Center content */}
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            {/* Activity title */}
            <div
              className={
                inProgress ? "text-black/25" : "text-black"
              }
            >
              <div className="text-[28px] font-semibold leading-8">
                {activity.title}
              </div>
            </div>

            {/* Big action line (only when started) */}
            {mode === "inProgress" && (
              <div className="text-[28px] font-semibold leading-8 text-black">
                Let&apos;s do it
              </div>
            )}

            {/* Big action line (only when done) */}
            {mode === "done" && (
              <div className="text-[28px] font-semibold leading-8 text-black">
                Done, good job
              </div>
            )}
          </div>

          {/* Bottom buttons */}
          <div className="mt-8 flex items-center gap-4">
            {mode === "idle" && (
              <>
                <button
                  className="flex-1 rounded-full bg-[#3ED598] py-4 text-base font-semibold text-black"
                  onClick={onStart}
                >
                  Start
                </button>

                <button
                  onClick={onSave}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F2F2F7]"
                  aria-label="Save"
                >
                  🔖
                </button>
              </>
            )}

            {mode === "inProgress" && (
              <>
                <button
                  className="flex-1 rounded-full bg-white py-4 text-base font-semibold text-black"
                  onClick={onDone}
                >
                  Done
                </button>

                <button
                  onClick={onSave}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#30C987]"
                  aria-label="Save"
                >
                  🔖
                </button>
              </>
            )}

            {mode === "done" && (
              <button
                onClick={onSave}
                className="flex w-full items-center justify-center rounded-full bg-black/10 py-4"
                aria-label="Save"
              >
                🔖
              </button>
            )}
          </div>
        </section>

        {/* Bottom actions */}
        <div className="mt-5 flex flex-col gap-3">
          {!inProgress && !completed ? (
            <>
              <button
                onClick={onSwap}
                className="rounded-full bg-white py-4 text-base font-semibold text-black shadow-sm"
              >
                Give me another idea
              </button>

              <a
                href="/refine"
                className="rounded-full bg-white py-4 text-center text-base font-semibold text-black shadow-sm"
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
              className="rounded-full bg-white py-4 text-base font-semibold text-black shadow-sm"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={onSwap}
              className="rounded-full bg-white py-4 text-base font-semibold text-black shadow-sm"
            >
              Another one
            </button>
          )}
        </div>
      </div>
    </main>
  );
}