export type Mood = "relax" | "focus" | "active" | "social" | "curious";
export type Duration = 10 | 30 | 60 | 120;

export type Activity = {
  id: string;
  title: string;
  duration: Duration;
  moods: Mood[];
  note?: string; // 1 short line to help it feel relevant
};

export const ACTIVITIES: Activity[] = [
  // --- 10 min (quick) ---
  { id: "stretch-10", title: "Do a 10-minute stretch", duration: 10, moods: ["relax", "active"], note: "Low effort, high reward." },
  { id: "tidy-10", title: "Tidy one small area (desk/table)", duration: 10, moods: ["focus"], note: "A quick reset for your space." },
  { id: "breathe-10", title: "Do a 5–10 minute breathing reset", duration: 10, moods: ["relax"], note: "Calm your nervous system." },
  { id: "message-10", title: "Message someone you like", duration: 10, moods: ["social"], note: "A tiny connection boost." },

  // --- 30 min (short session) ---
  { id: "walk-30", title: "Take a relaxed walk outside", duration: 30, moods: ["relax", "active"], note: "Clear your head." },
  { id: "read-30", title: "Read for 30 minutes", duration: 30, moods: ["relax", "curious"], note: "Something light and enjoyable." },
  { id: "learn-30", title: "Learn something new for 30 minutes", duration: 30, moods: ["curious", "focus"], note: "One small topic, no pressure." },
  { id: "music-30", title: "Listen to music with no multitasking", duration: 30, moods: ["relax"], note: "Just enjoy it." },

  // --- 60 min (focused block) ---
  { id: "workout-60", title: "Do a simple 45–60 minute workout", duration: 60, moods: ["active"], note: "Move your body and reset." },
  { id: "deep-clean-60", title: "Do one ‘big’ clean (kitchen/bathroom)", duration: 60, moods: ["focus"], note: "A satisfying before/after." },
  { id: "creative-60", title: "Do a 60-minute creative session", duration: 60, moods: ["focus", "curious"], note: "Make something small." },
  { id: "cook-60", title: "Cook something simple you enjoy", duration: 60, moods: ["relax"], note: "Comfort + progress." },

  // --- 120 min (deep time) ---
  { id: "project-120", title: "Progress a personal project for 2 hours", duration: 120, moods: ["focus"], note: "A real chunk of momentum." },
  { id: "long-walk-120", title: "Take a long walk + explore a new route", duration: 120, moods: ["active", "curious"], note: "Change scenery." },
  { id: "hobby-120", title: "Go deep on a hobby (2 hours)", duration: 120, moods: ["curious", "relax"], note: "Lose track of time (in a good way)." },
  { id: "social-120", title: "Plan something with someone (call/coffee)", duration: 120, moods: ["social"], note: "A proper catch-up." },
];