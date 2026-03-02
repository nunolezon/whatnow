export type Mood = "relax" | "focus" | "active" | "social" | "curious";
export type Duration = 10 | 30 | 60 | 120;

export type Category =
  | "creative"
  | "growth"
  | "social"
  | "outside"
  | "learning"
  | "health"
  | "home";

export type Energy = 1 | 2 | 3; // 1 = easy, 2 = momentum, 3 = slightly challenging

export type Activity = {
  id: string;
  title: string;
  duration: Duration;
  moods: Mood[];
  category: Category;
  energy: Energy;
  note?: string; // 1 short, conversational line
};

export const ACTIVITIES: Activity[] = [
  // -------------------------
  // 10 min (spark)
  // -------------------------
  {
    id: "stretch-10",
    title: "Do a 10-minute stretch",
    duration: 10,
    moods: ["relax", "active"],
    category: "health",
    energy: 1,
    note: "Low effort, high reward.",
  },
  {
    id: "breathe-10",
    title: "Do a 5–10 minute breathing reset",
    duration: 10,
    moods: ["relax"],
    category: "growth",
    energy: 1,
    note: "Reset your nervous system.",
  },
  {
    id: "tidy-10",
    title: "Tidy one small area (desk/table)",
    duration: 10,
    moods: ["focus"],
    category: "home",
    energy: 1,
    note: "A quick reset for your space.",
  },
  {
    id: "water-10",
    title: "Drink water + step away from screens",
    duration: 10,
    moods: ["relax", "focus"],
    category: "health",
    energy: 1,
    note: "Tiny reset. You’ll feel it.",
  },
  {
    id: "message-10",
    title: "Message someone you like",
    duration: 10,
    moods: ["social"],
    category: "social",
    energy: 2,
    note: "A tiny connection boost.",
  },
  {
    id: "voice-idea-10",
    title: "Record a quick voice note with one idea",
    duration: 10,
    moods: ["curious", "focus"],
    category: "creative",
    energy: 2,
    note: "Capture it before it disappears.",
  },
  {
    id: "sketch-10",
    title: "Sketch one messy idea (no judging)",
    duration: 10,
    moods: ["curious", "focus"],
    category: "creative",
    energy: 2,
    note: "Messy counts. Start anyway.",
  },
  {
    id: "pushups-10",
    title: "Do a mini workout burst (pushups/squats/plank)",
    duration: 10,
    moods: ["active"],
    category: "health",
    energy: 2,
    note: "Just enough to wake up.",
  },
  {
    id: "learn-10",
    title: "Learn one surprising thing (10 minutes)",
    duration: 10,
    moods: ["curious"],
    category: "learning",
    energy: 2,
    note: "One rabbit hole, then stop.",
  },
  {
    id: "plan-next-10",
    title: "Pick one next step and write it down",
    duration: 10,
    moods: ["focus"],
    category: "growth",
    energy: 2,
    note: "Clarity creates momentum.",
  },
  {
    id: "cold-email-10",
    title: "Send one message that moves something forward",
    duration: 10,
    moods: ["focus", "social"],
    category: "growth",
    energy: 3,
    note: "Slightly scary = usually the right one.",
  },
  {
    id: "outside-10",
    title: "Step outside for fresh air (no phone)",
    duration: 10,
    moods: ["relax", "curious"],
    category: "outside",
    energy: 1,
    note: "Change the scene. Change the brain.",
  },

  // -------------------------
  // 30 min (momentum)
  // -------------------------
  {
    id: "walk-30",
    title: "Take a brisk walk outside",
    duration: 30,
    moods: ["active", "relax"],
    category: "outside",
    energy: 2,
    note: "Move fast enough to feel awake.",
  },
  {
    id: "run-30",
    title: "Go for a light run",
    duration: 30,
    moods: ["active"],
    category: "health",
    energy: 3,
    note: "Not perfect. Just out the door.",
  },
  {
    id: "read-30",
    title: "Read for 30 minutes",
    duration: 30,
    moods: ["relax", "curious"],
    category: "learning",
    energy: 1,
    note: "One chapter. No pressure.",
  },
  {
    id: "learn-30",
    title: "Learn something new for 30 minutes",
    duration: 30,
    moods: ["curious", "focus"],
    category: "learning",
    energy: 2,
    note: "One topic. Go deeper than usual.",
  },
  {
    id: "music-30",
    title: "Listen to music with no multitasking",
    duration: 30,
    moods: ["relax"],
    category: "growth",
    energy: 1,
    note: "Just listen. Let it hit.",
  },
  {
    id: "creative-sprint-30",
    title: "Do a 30-minute creative sprint",
    duration: 30,
    moods: ["focus", "curious"],
    category: "creative",
    energy: 2,
    note: "Timer on. Make something small.",
  },
  {
    id: "sketch-ref-30",
    title: "Practice sketching from reference",
    duration: 30,
    moods: ["focus", "curious"],
    category: "creative",
    energy: 2,
    note: "Quantity over quality today.",
  },
  {
    id: "reachout-30",
    title: "Call someone and really listen",
    duration: 30,
    moods: ["social"],
    category: "social",
    energy: 2,
    note: "No multitasking. Be present.",
  },
  {
    id: "cafe-30",
    title: "Try a new café and do a small task there",
    duration: 30,
    moods: ["curious", "focus"],
    category: "outside",
    energy: 2,
    note: "New place, new energy.",
  },
  {
    id: "declutter-30",
    title: "Reset one area properly (drawer/shelf)",
    duration: 30,
    moods: ["focus"],
    category: "home",
    energy: 2,
    note: "Make it satisfying.",
  },
  {
    id: "cook-30",
    title: "Make something simple to eat",
    duration: 30,
    moods: ["relax"],
    category: "health",
    energy: 2,
    note: "Fuel = mood upgrade.",
  },
  {
    id: "portfolio-30",
    title: "Improve one tiny thing in your portfolio",
    duration: 30,
    moods: ["focus", "curious"],
    category: "growth",
    energy: 3,
    note: "One small upgrade. Ship it.",
  },

  // -------------------------
  // 60 min (expansion)
  // -------------------------
  {
    id: "workout-60",
    title: "Do a simple 45–60 minute workout",
    duration: 60,
    moods: ["active"],
    category: "health",
    energy: 3,
    note: "Show up. That’s the win.",
  },
  {
    id: "deep-clean-60",
    title: "Do one ‘big’ clean (kitchen/bathroom)",
    duration: 60,
    moods: ["focus"],
    category: "home",
    energy: 2,
    note: "Satisfying before/after.",
  },
  {
    id: "creative-60",
    title: "Do a 60-minute creative session",
    duration: 60,
    moods: ["focus", "curious"],
    category: "creative",
    energy: 2,
    note: "Make something small but real.",
  },
  {
    id: "prototype-60",
    title: "Build a tiny prototype (rough is fine)",
    duration: 60,
    moods: ["focus", "curious"],
    category: "creative",
    energy: 3,
    note: "No perfection. Just a first version.",
  },
  {
    id: "learn-deep-60",
    title: "Take one structured lesson (course/tutorial)",
    duration: 60,
    moods: ["focus", "curious"],
    category: "learning",
    energy: 2,
    note: "One lesson. Take notes.",
  },
  {
    id: "explore-60",
    title: "Explore somewhere new in your city",
    duration: 60,
    moods: ["active", "curious"],
    category: "outside",
    energy: 3,
    note: "Go somewhere you normally don’t.",
  },
  {
    id: "bookstore-60",
    title: "Visit a bookstore and browse intentionally",
    duration: 60,
    moods: ["curious", "relax"],
    category: "outside",
    energy: 2,
    note: "Let a cover choose you.",
  },
  {
    id: "cook-60",
    title: "Cook something simple you enjoy",
    duration: 60,
    moods: ["relax"],
    category: "health",
    energy: 2,
    note: "Comfort + progress.",
  },
  {
    id: "reachout-bold-60",
    title: "Reach out to someone inspiring",
    duration: 60,
    moods: ["social", "focus"],
    category: "growth",
    energy: 3,
    note: "One honest message. Keep it short.",
  },
  {
    id: "focus-block-60",
    title: "Do a deep focus block on one task",
    duration: 60,
    moods: ["focus"],
    category: "growth",
    energy: 3,
    note: "One thing. No switching.",
  },

  // -------------------------
  // 120 min (identity moves)
  // -------------------------
  {
    id: "project-120",
    title: "Progress a personal project for 2 hours",
    duration: 120,
    moods: ["focus"],
    category: "growth",
    energy: 3,
    note: "A real chunk of momentum.",
  },
  {
    id: "hobby-120",
    title: "Go deep on a hobby (2 hours)",
    duration: 120,
    moods: ["curious", "relax"],
    category: "creative",
    energy: 2,
    note: "Lose track of time (in a good way).",
  },
  {
    id: "explore-120",
    title: "Explore a new neighborhood for 2 hours",
    duration: 120,
    moods: ["active", "curious"],
    category: "outside",
    energy: 3,
    note: "Go far enough to feel new.",
  },
  {
    id: "publish-120",
    title: "Create something and publish it",
    duration: 120,
    moods: ["focus", "curious"],
    category: "creative",
    energy: 3,
    note: "Share it imperfect. That’s the point.",
  },
  {
    id: "event-120",
    title: "Go to a local event (talk/meetup/exhibit)",
    duration: 120,
    moods: ["social", "curious"],
    category: "outside",
    energy: 3,
    note: "Go even if you don’t feel like it.",
  },
  {
    id: "social-120",
    title: "Plan something with someone (call/coffee)",
    duration: 120,
    moods: ["social"],
    category: "social",
    energy: 2,
    note: "A proper catch-up.",
  },
  {
    id: "deep-learn-120",
    title: "Go deep on one topic (notes + examples)",
    duration: 120,
    moods: ["focus", "curious"],
    category: "learning",
    energy: 3,
    note: "Learn it well enough to explain it.",
  },
  {
    id: "long-walk-120",
    title: "Take a long walk + explore a new route",
    duration: 120,
    moods: ["active", "curious"],
    category: "outside",
    energy: 2,
    note: "Change scenery. Keep moving.",
  },
];