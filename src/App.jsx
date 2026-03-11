import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import AuthPage from "./AuthPage";

// ─── DALLAS MAVERICKS PALETTE ─────────────────────────────────────────────────
// Primary Blue : #00538C
// Navy         : #002B5E
// Silver       : #B8C4CA
// Dark BG      : #00050f
// Card BG      : #030d1f
// ─────────────────────────────────────────────────────────────────────────────

const MAVS = {
  blue: "#00538C",
  navy: "#002B5E",
  silver: "#B8C4CA",
  lightBlue: "#5bc8f5",
  bg: "#00050f",
  card: "#030d1f",
  cardBorder: "rgba(0,83,140,0.2)",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const phases = [
  {
    name: "FOUNDATION",
    weeks: "Weeks 1–4",
    color: MAVS.lightBlue,
    goal: "Establish movement patterns, tendon strength, and baseline explosive power.",
    tip: "Track your standing reach and max vertical jump every week. Use a wall and chalk or tape.",
    days: [
      {
        label: "DAY 1 — LOWER POWER",
        exercises: [
          { name: "Jump Rope Warm-Up", sets: "1", reps: "5 min", note: "Light pace, loosen ankles" },
          { name: "Bodyweight Squat", sets: "3", reps: "15", note: "Full depth, slow descent" },
          { name: "Box Jumps", sets: "4", reps: "6", note: "Land softly, step down" },
          { name: "Romanian Deadlift (bodyweight)", sets: "3", reps: "12", note: "Hinge at hips, hamstring stretch" },
          { name: "Calf Raises (single leg)", sets: "3", reps: "15 each", note: "Slow & controlled" },
          { name: "Standing Broad Jump", sets: "3", reps: "5", note: "Max effort each rep" },
        ],
      },
      {
        label: "DAY 2 — UPPER + CORE",
        exercises: [
          { name: "Dynamic Stretch Warm-Up", sets: "1", reps: "5 min", note: "Leg swings, hip circles" },
          { name: "Push-Ups", sets: "3", reps: "15", note: "Explosive push, controlled lower" },
          { name: "Pull-Ups / Assisted Pull-Ups", sets: "3", reps: "8", note: "Full ROM" },
          { name: "Plank", sets: "3", reps: "40 sec", note: "Brace everything" },
          { name: "Hanging Knee Raises", sets: "3", reps: "12", note: "Control the swing" },
          { name: "Wrist/Shoulder Mobility", sets: "1", reps: "5 min", note: "Key for dunking!" },
        ],
      },
      {
        label: "DAY 3 — PLYOMETRICS",
        exercises: [
          { name: "High Knees", sets: "1", reps: "3 min", note: "Warm up nervous system" },
          { name: "Depth Drops", sets: "4", reps: "5", note: "Step off box, absorb landing" },
          { name: "Lateral Bounds", sets: "3", reps: "8 each", note: "Explosive push off" },
          { name: "Tuck Jumps", sets: "3", reps: "8", note: "Knees to chest" },
          { name: "Single-Leg Hops (in place)", sets: "3", reps: "10 each", note: "Stay on ball of foot" },
          { name: "Approach Jump Practice", sets: "5", reps: "3 attempts", note: "1–3 step approach, max height" },
        ],
      },
      {
        label: "DAY 4 — STRENGTH",
        exercises: [
          { name: "Jump Rope Warm-Up", sets: "1", reps: "5 min", note: "" },
          { name: "Bulgarian Split Squat", sets: "3", reps: "10 each", note: "Use bodyweight or light dumbbells" },
          { name: "Glute Bridges", sets: "3", reps: "15", note: "Drive hips up explosively" },
          { name: "Step-Ups (elevated)", sets: "3", reps: "10 each", note: "Drive through heel" },
          { name: "Nordic Hamstring Curl", sets: "3", reps: "6", note: "Slow eccentric — very hard!" },
          { name: "Hip Flexor Stretch", sets: "1", reps: "5 min", note: "Essential for jumping" },
        ],
      },
      {
        label: "DAY 5 — SKILL + RECOVERY",
        exercises: [
          { name: "Light Jog / Walk", sets: "1", reps: "5 min", note: "Active recovery" },
          { name: "Foam Roll (legs)", sets: "1", reps: "5 min", note: "Quads, hamstrings, calves" },
          { name: "Full Vertical Jump Practice", sets: "8", reps: "Max effort", note: "Rest 45 sec between attempts" },
          { name: "Rim Touches / Approach Dunks", sets: "10", reps: "attempts", note: "Try with tennis ball first" },
          { name: "Static Stretching", sets: "1", reps: "10 min", note: "Hold each stretch 30+ sec" },
        ],
      },
    ],
  },
  {
    name: "BUILD",
    weeks: "Weeks 5–12",
    color: MAVS.blue,
    goal: "Develop raw power. Add weight to squats, increase box jump height, and progress plyometric volume.",
    tip: "Aim to add 5–10 lbs to your squat/deadlift every 1–2 weeks. Your vertical should be up 4–6 inches by end of this phase.",
    days: [
      {
        label: "DAY 1 — WEIGHTED LOWER",
        exercises: [
          { name: "Jump Rope Warm-Up", sets: "1", reps: "5 min", note: "" },
          { name: "Barbell / Goblet Squat", sets: "4", reps: "8", note: "Add weight progressively each week" },
          { name: "Box Jumps (higher box)", sets: "4", reps: "6", note: "Increase height from phase 1" },
          { name: "Romanian Deadlift (weighted)", sets: "3", reps: "10", note: "Dumbbells or barbell" },
          { name: "Single-Leg Calf Raises (weighted)", sets: "3", reps: "12 each", note: "Hold dumbbell" },
          { name: "Broad Jumps", sets: "4", reps: "5", note: "Consecutive — no pause" },
        ],
      },
      {
        label: "DAY 2 — UPPER + CORE",
        exercises: [
          { name: "Warm-Up", sets: "1", reps: "5 min", note: "" },
          { name: "Weighted Pull-Ups", sets: "3", reps: "6", note: "Use belt or hold dumbbell" },
          { name: "Dips", sets: "3", reps: "10", note: "Chest dips for power" },
          { name: "Ab Wheel / Rollouts", sets: "3", reps: "10", note: "Slow and controlled" },
          { name: "Landmine Rotations", sets: "3", reps: "8 each", note: "Builds dunking torque" },
          { name: "Dead Hang", sets: "3", reps: "30 sec", note: "Decompress spine, stretch lats" },
        ],
      },
      {
        label: "DAY 3 — HIGH INTENSITY PLYO",
        exercises: [
          { name: "Bounding Warm-Up", sets: "1", reps: "4 min", note: "" },
          { name: "Depth Jump to Box Jump", sets: "5", reps: "4", note: "Step off, immediately explode up" },
          { name: "Single-Leg Box Jumps", sets: "3", reps: "5 each", note: "Build unilateral power" },
          { name: "Sprint Bounds (15m)", sets: "5", reps: "1 length", note: "Exaggerated bounding stride" },
          { name: "Approach Verticals", sets: "8", reps: "3", note: "Full 3-step approach, max height" },
          { name: "Rim Work", sets: "10", reps: "attempts", note: "Try palming or a tennis ball dunk" },
        ],
      },
      {
        label: "DAY 4 — STRENGTH HYPERTROPHY",
        exercises: [
          { name: "Jump Rope", sets: "1", reps: "5 min", note: "" },
          { name: "Hack Squat / Leg Press", sets: "4", reps: "10", note: "Heavy, full range" },
          { name: "Walking Lunges (weighted)", sets: "3", reps: "12 each", note: "" },
          { name: "Glute Ham Raise", sets: "3", reps: "8", note: "Or Nordic curl progression" },
          { name: "Jump Squat", sets: "4", reps: "8", note: "Light barbell or bodyweight, max explosion" },
          { name: "Hip Flexor / Quad Stretch", sets: "1", reps: "5 min", note: "" },
        ],
      },
      {
        label: "DAY 5 — SKILL + MOBILITY",
        exercises: [
          { name: "Light Bike / Jog", sets: "1", reps: "5 min", note: "" },
          { name: "Foam Roll Full Body", sets: "1", reps: "8 min", note: "" },
          { name: "Standing Vertical Tests", sets: "6", reps: "Max effort", note: "Log your height!" },
          { name: "Full Dunk Approach Practice", sets: "15", reps: "attempts", note: "Ball, tennis ball, or reach" },
          { name: "Ankle Mobility Drills", sets: "2", reps: "10 each", note: "Ankle circles, wall stretches" },
          { name: "Yoga / Full Body Stretch", sets: "1", reps: "10 min", note: "" },
        ],
      },
    ],
  },
  {
    name: "PEAK",
    weeks: "Weeks 13–24",
    color: MAVS.silver,
    goal: "Convert strength gains into pure explosiveness. This is where you dunk.",
    tip: "By week 20+ you should be touching rim consistently. Start with a tennis ball dunk, then work to a volleyball, then basketball.",
    days: [
      {
        label: "DAY 1 — POWER SQUATS",
        exercises: [
          { name: "Activation Warm-Up", sets: "1", reps: "5 min", note: "Band walks, glute activation" },
          { name: "Power Clean or Jump Squat", sets: "5", reps: "4", note: "Explosive! This is the money exercise" },
          { name: "Heavy Back Squat", sets: "4", reps: "5", note: "85–90% effort" },
          { name: "Depth Jump to Max Vertical", sets: "5", reps: "5", note: "Minimal ground contact time" },
          { name: "Single-Leg Plyos", sets: "4", reps: "6 each", note: "Off one leg — like real dunks" },
          { name: "Weighted Calf Raises", sets: "4", reps: "10 each", note: "Heavy and explosive" },
        ],
      },
      {
        label: "DAY 2 — UPPER POWER",
        exercises: [
          { name: "Warm-Up", sets: "1", reps: "5 min", note: "" },
          { name: "Medicine Ball Chest Pass (against wall)", sets: "4", reps: "8", note: "Explosive upper body power" },
          { name: "Weighted Pull-Ups (heavy)", sets: "4", reps: "5", note: "Lat strength = dunk power" },
          { name: "Overhead Press", sets: "3", reps: "8", note: "Shoulder stability for dunking" },
          { name: "Core Circuit", sets: "3", reps: "15 each", note: "V-sits, Russian twists, leg raises" },
          { name: "Grip Strength Work", sets: "3", reps: "60 sec", note: "Towel pull-ups or grip trainer" },
        ],
      },
      {
        label: "DAY 3 — DUNK DAY",
        exercises: [
          { name: "Dynamic Warm-Up", sets: "1", reps: "8 min", note: "Full body activation" },
          { name: "Sprint + Jump Combo (10m sprint → vertical)", sets: "8", reps: "1", note: "Convert speed to height" },
          { name: "Reactive Depth Jumps", sets: "5", reps: "4", note: "Coach: < 0.2 sec ground contact" },
          { name: "Approach Dunk Attempts", sets: "20", reps: "attempts", note: "Full intensity — go for it!" },
          { name: "One-Step Dunk Drill", sets: "10", reps: "attempts", note: "Build confidence off one foot" },
          { name: "Cool-Down Jog", sets: "1", reps: "5 min", note: "" },
        ],
      },
      {
        label: "DAY 4 — STRENGTH MAINTENANCE",
        exercises: [
          { name: "Foam Roll + Activate", sets: "1", reps: "8 min", note: "" },
          { name: "Romanian Deadlift (heavy)", sets: "4", reps: "6", note: "Posterior chain = jump chain" },
          { name: "Bulgarian Split Squat (heavy)", sets: "3", reps: "8 each", note: "" },
          { name: "Hamstring Curls", sets: "3", reps: "10", note: "Machine or Nordic" },
          { name: "Tibialis Raises", sets: "3", reps: "15", note: "Protects knees during landings" },
          { name: "Hip Mobility Flow", sets: "1", reps: "8 min", note: "" },
        ],
      },
      {
        label: "DAY 5 — ACTIVE RECOVERY + SKILL",
        exercises: [
          { name: "Light Jog / Bike", sets: "1", reps: "10 min", note: "" },
          { name: "Full Body Foam Roll", sets: "1", reps: "10 min", note: "" },
          { name: "Weekly Vertical Jump Test", sets: "5", reps: "Max effort", note: "Track progress!" },
          { name: "Dunk Practice (low intensity)", sets: "10", reps: "attempts", note: "Feel the motion, not max effort" },
          { name: "Visualization", sets: "1", reps: "5 min", note: "Mental reps count — see yourself dunking" },
        ],
      },
    ],
  },
];

const milestones = [
  { week: 1,  goal: "Establish baseline vertical jump (measure it!)" },
  { week: 4,  goal: '+2–3" vertical. Touching backboard consistently' },
  { week: 8,  goal: '+4–5" vertical. Touching rim on good attempts' },
  { week: 12, goal: '+6–7" vertical. Hanging on rim occasionally' },
  { week: 18, goal: '+8–9" vertical. Consistent rim touches, tennis ball dunks' },
  { week: 24, goal: "DUNK. You're there. 🏀" },
];

const nutrition = [
  { icon: "🥩", label: "Protein",   tip: "1g per lb bodyweight daily. Chicken, eggs, Greek yogurt, milk." },
  { icon: "🍚", label: "Carbs",     tip: "Fuel your workouts. Rice, oats, fruit. Don't skip carbs." },
  { icon: "😴", label: "Sleep",     tip: "9 hours minimum. You grow and recover while sleeping." },
  { icon: "💧", label: "Water",     tip: "3–4 liters daily. Dehydration kills power output." },
  { icon: "🧘", label: "Recovery",  tip: "On rest days: walk, stretch, foam roll. Active recovery speeds gains." },
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [session, setSession]           = useState(null);
  const [profile, setProfile]           = useState(null);
  const [activePhase, setActivePhase]   = useState(0);
  const [openDay, setOpenDay]           = useState(null);
  const [completedDays, setCompletedDays] = useState({});
  const [currentWeek, setCurrentWeek]   = useState(1);
  const [savingDay, setSavingDay]       = useState(null);
  const [view, setView]                 = useState("program");
  const [authLoading, setAuthLoading]   = useState(true);

  // ── Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // ── Load profile + progress when session changes
  useEffect(() => {
    if (!session) return;
    loadProfile();
    loadProgress();
  }, [session]);

  const loadProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();
    if (data) {
      setProfile(data);
      if (data.start_date) {
        const start     = new Date(data.start_date);
        const now       = new Date();
        const diffWeeks = Math.floor((now - start) / (1000 * 60 * 60 * 24 * 7)) + 1;
        setCurrentWeek(Math.min(Math.max(diffWeeks, 1), 24));
      }
    }
  };

  const loadProgress = async () => {
    const { data } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", session.user.id);
    if (data) {
      const map = {};
      data.forEach((row) => { map[`${row.phase}-${row.day_index}-${row.week}`] = true; });
      setCompletedDays(map);
    }
  };

  const toggleDayComplete = async (phaseIndex, dayIndex) => {
    const key        = `${phaseIndex}-${dayIndex}-${currentWeek}`;
    const isCompleted = completedDays[key];
    setSavingDay(key);

    if (isCompleted) {
      await supabase.from("progress").delete().match({
        user_id: session.user.id, phase: phaseIndex,
        day_index: dayIndex, week: currentWeek,
      });
      setCompletedDays((prev) => { const n = { ...prev }; delete n[key]; return n; });
    } else {
      await supabase.from("progress").upsert({
        user_id: session.user.id, phase: phaseIndex,
        day_index: dayIndex, week: currentWeek,
        completed_at: new Date().toISOString(),
      });
      setCompletedDays((prev) => ({ ...prev, [key]: true }));
    }
    setSavingDay(null);
  };

  const signOut = () => supabase.auth.signOut();

  // ── Derived stats
  const totalCompleted = Object.keys(completedDays).length;
  const weekCompleted  = phases[activePhase].days.filter((_, di) =>
    completedDays[`${activePhase}-${di}-${currentWeek}`]
  ).length;

  // ── Loading splash
  if (authLoading) {
    return (
      <div style={{
        minHeight: "100vh", background: MAVS.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Barlow Condensed', sans-serif", color: MAVS.blue, fontSize: 28, letterSpacing: "0.15em",
      }}>
        ★ LOADING...
      </div>
    );
  }

  if (!session) return <AuthPage />;

  const phase    = phases[activePhase];
  const userName = profile?.name || session.user.email.split("@")[0];

  return (
    <div style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      background: MAVS.bg,
      minHeight: "100vh",
      color: "#fff",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Background grid */
        body {
          background-image:
            linear-gradient(rgba(0,83,140,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,83,140,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030d1f; }
        ::-webkit-scrollbar-thumb { background: #00538C; border-radius: 2px; }

        .day-card   { transition: all 0.2s; cursor: pointer; }
        .day-card:hover { transform: translateX(3px); border-color: rgba(0,83,140,0.4) !important; }

        .exercise-row { border-bottom: 1px solid rgba(0,83,140,0.1); }
        .exercise-row:last-child { border-bottom: none; }

        .complete-btn { transition: all 0.15s; cursor: pointer; }
        .complete-btn:hover { transform: scale(1.08); }

        .nav-btn  { transition: all 0.15s; cursor: pointer; }
        .nav-btn:hover { opacity: 0.75; }

        .phase-btn { transition: all 0.2s; cursor: pointer; }
        .phase-btn:hover { transform: translateY(-2px); }

        .week-btn { transition: all 0.1s; cursor: pointer; }
        .week-btn:hover { border-color: #00538C !important; color: #5bc8f5 !important; }

        .milestone-row { transition: all 0.15s; }
        .milestone-row:hover { transform: translateX(3px); }
      `}</style>

      {/* ── TOP NAV ──────────────────────────────────────────────────────────── */}
      <div style={{
        background: "rgba(0,5,15,0.95)",
        borderBottom: `1px solid rgba(0,83,140,0.25)`,
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.04em" }}>
          DUNK <span style={{ color: MAVS.blue }}>★</span> 6M
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* View toggle */}
          <div style={{
            display: "flex", gap: 3,
            background: "rgba(0,83,140,0.08)",
            border: "1px solid rgba(0,83,140,0.2)",
            borderRadius: 7, padding: 3,
          }}>
            {["program", "progress"].map((v) => (
              <button key={v} className="nav-btn" onClick={() => setView(v)} style={{
                padding: "6px 14px", border: "none", borderRadius: 5, cursor: "pointer",
                background: view === v ? MAVS.blue : "transparent",
                color: view === v ? "#fff" : "#4a7fa5",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 14, fontWeight: 700, letterSpacing: "0.1em",
              }}>
                {v === "program" ? "PROGRAM" : "MY PROGRESS"}
              </button>
            ))}
          </div>

          <div style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 13, color: "#4a7fa5", letterSpacing: "0.02em",
          }}>
            {userName}
          </div>

          <button className="nav-btn" onClick={signOut} style={{
            background: "transparent",
            border: "1px solid rgba(0,83,140,0.3)",
            color: "#4a7fa5", padding: "6px 12px",
            borderRadius: 5, cursor: "pointer",
            fontFamily: "'Barlow', sans-serif", fontSize: 12,
          }}>
            Sign out
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* PROGRESS VIEW                                                         */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {view === "progress" && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>

          <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: "0.02em", marginBottom: 2 }}>
            MY PROGRESS
          </div>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#4a7fa5", marginBottom: 32 }}>
            Week {currentWeek} of 24 · {totalCompleted} total workouts completed
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 32 }}>
            {[
              { label: "CURRENT WEEK", value: `W${currentWeek}`, color: MAVS.lightBlue },
              { label: "THIS WEEK",    value: `${weekCompleted}/5`, color: MAVS.blue },
              { label: "ALL TIME",     value: totalCompleted, color: MAVS.silver },
            ].map((s, i) => (
              <div key={i} style={{
                background: MAVS.card,
                border: `1px solid rgba(0,83,140,0.2)`,
                borderTop: `2px solid ${s.color}`,
                borderRadius: 8, padding: "20px 16px", textAlign: "center",
              }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "#2a5a80", letterSpacing: "0.1em", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Week selector */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 13, letterSpacing: "0.25em", color: "#2a5a80", marginBottom: 10, fontWeight: 700 }}>
              JUMP TO WEEK
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {Array.from({ length: 24 }, (_, i) => i + 1).map((w) => {
                const wDone = phases.some((_, pi) =>
                  phases[pi].days.some((_, di) => completedDays[`${pi}-${di}-${w}`])
                );
                return (
                  <button key={w} className="week-btn" onClick={() => setCurrentWeek(w)} style={{
                    width: 36, height: 36,
                    border: `1px solid ${currentWeek === w ? MAVS.blue : wDone ? "rgba(0,83,140,0.3)" : "rgba(0,83,140,0.1)"}`,
                    background: currentWeek === w ? MAVS.blue : wDone ? "rgba(0,83,140,0.1)" : "transparent",
                    color: currentWeek === w ? "#fff" : wDone ? MAVS.lightBlue : "#1e4060",
                    borderRadius: 4, cursor: "pointer",
                    fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700,
                  }}>
                    {w}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Per-phase completion */}
          {phases.map((ph, pi) => (
            <div key={pi} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: ph.color, marginBottom: 8, letterSpacing: "0.05em" }}>
                {ph.name} — {ph.weeks}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {ph.days.map((day, di) => {
                  const done = completedDays[`${pi}-${di}-${currentWeek}`];
                  return (
                    <div key={di} className="milestone-row" style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: done ? `rgba(0,83,140,0.12)` : MAVS.card,
                      border: `1px solid ${done ? "rgba(0,83,140,0.35)" : "rgba(0,83,140,0.1)"}`,
                      borderLeft: done ? `3px solid ${ph.color}` : `3px solid transparent`,
                      borderRadius: 6, padding: "10px 16px",
                    }}>
                      <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: done ? "#8ab8d4" : "#2a5a80" }}>
                        {day.label}
                      </div>
                      <div style={{ fontSize: 13, color: done ? ph.color : "#1a3a50", fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}>
                        {done ? "✓ DONE" : "—"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Milestones */}
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 12 }}>MILESTONES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {milestones.map((m, i) => {
              const reached = currentWeek >= m.week;
              const isLast  = i === milestones.length - 1;
              return (
                <div key={i} className="milestone-row" style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: reached ? "rgba(0,83,140,0.12)" : MAVS.card,
                  border: `1px solid ${reached ? "rgba(0,83,140,0.35)" : "rgba(0,83,140,0.08)"}`,
                  borderRadius: 6, padding: "10px 16px",
                }}>
                  <div style={{
                    minWidth: 46, height: 46, borderRadius: 6,
                    background: isLast && reached ? MAVS.blue : reached ? "rgba(0,83,140,0.2)" : "rgba(0,83,140,0.05)",
                    border: `2px solid ${reached ? MAVS.blue : "rgba(0,83,140,0.15)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, fontWeight: 800, color: reached ? "#fff" : "#1a3a50",
                  }}>
                    W{m.week}
                  </div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: reached ? "#8ab8d4" : "#1e4060" }}>
                    {m.goal}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* PROGRAM VIEW                                                          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {view === "program" && (
        <>
          {/* HERO */}
          <div style={{
            background: `linear-gradient(180deg, rgba(0,43,94,0.6) 0%, ${MAVS.bg} 100%)`,
            borderBottom: `2px solid ${phase.color}`,
            padding: "40px 24px 32px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Glow */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              background: `radial-gradient(ellipse at 50% 0%, ${phase.color}18 0%, transparent 65%)`,
              pointerEvents: "none",
            }} />

            <div style={{ fontSize: 11, letterSpacing: "0.35em", color: MAVS.blue, marginBottom: 8, fontWeight: 700 }}>
              ★ WEEK {currentWeek} OF 24 · {weekCompleted}/5 DAYS DONE ★
            </div>

            <h1 style={{
              fontSize: "clamp(50px, 10vw, 92px)",
              lineHeight: 0.88,
              fontWeight: 800,
              letterSpacing: "0.02em",
              textShadow: `0 0 80px ${phase.color}50`,
            }}>
              DUNK IN<br />
              <span style={{ color: phase.color }}> 6 MONTHS</span>
            </h1>

            {/* Weekly progress bar */}
            <div style={{ maxWidth: 280, margin: "22px auto 0" }}>
              <div style={{
                background: "rgba(0,83,140,0.15)",
                borderRadius: 4, height: 5, overflow: "hidden",
                border: "1px solid rgba(0,83,140,0.2)",
              }}>
                <div style={{
                  width: `${(weekCompleted / 5) * 100}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${MAVS.navy}, ${phase.color})`,
                  borderRadius: 4,
                  transition: "width 0.5s ease",
                }} />
              </div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "#2a5a80", marginTop: 6 }}>
                {weekCompleted === 5 ? "🔥 WEEK COMPLETE — MAVERICKS MENTALITY!" : `${5 - weekCompleted} sessions left this week`}
              </div>
            </div>
          </div>

          {/* Week strip — shows only weeks for the active phase */}
          {(() => {
            const phaseWeekRanges = [
              { start: 1,  end: 4  },
              { start: 5,  end: 12 },
              { start: 13, end: 24 },
            ];
            const { start, end } = phaseWeekRanges[activePhase];
            const phaseWeeks = Array.from({ length: end - start + 1 }, (_, i) => start + i);
            return (
              <div style={{
                background: "rgba(0,5,15,0.9)",
                borderBottom: "1px solid rgba(0,83,140,0.15)",
                padding: "8px 20px",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{ fontSize: 12, color: "#1e4060", letterSpacing: "0.2em", whiteSpace: "nowrap", fontWeight: 700 }}>WEEK</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {phaseWeeks.map((w) => {
                    const wDone = phases[activePhase].days.filter((_, di) =>
                      completedDays[`${activePhase}-${di}-${w}`]
                    ).length;
                    return (
                      <button key={w} className="week-btn" onClick={() => setCurrentWeek(w)} style={{
                        minWidth: 34, height: 28,
                        border: `1px solid ${currentWeek === w ? MAVS.blue : wDone > 0 ? "rgba(0,83,140,0.3)" : "rgba(0,83,140,0.08)"}`,
                        background: currentWeek === w ? MAVS.blue : wDone > 0 ? "rgba(0,83,140,0.1)" : "transparent",
                        color: currentWeek === w ? "#fff" : wDone > 0 ? MAVS.lightBlue : "#1a3a50",
                        borderRadius: 3, cursor: "pointer",
                        fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700,
                      }}>
                        {w}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Phase selector */}
          <div style={{ display: "flex", gap: 8, padding: "20px 20px 0", justifyContent: "center", flexWrap: "wrap" }}>
            {phases.map((p, i) => (
              <button key={i} className="phase-btn" onClick={() => { setActivePhase(i); setOpenDay(null); setCurrentWeek([1, 5, 13][i]); }} style={{
                background: activePhase === i ? p.color : MAVS.card,
                color: activePhase === i ? (p.color === MAVS.silver ? "#00050f" : "#fff") : "#2a5a80",
                border: `2px solid ${activePhase === i ? p.color : "rgba(0,83,140,0.2)"}`,
                padding: "10px 28px", fontSize: 20, fontWeight: 800,
                letterSpacing: "0.08em", borderRadius: 6,
                fontFamily: "'Barlow Condensed', sans-serif",
                boxShadow: activePhase === i ? `0 4px 20px ${p.color}40` : "none",
              }}>
                {p.name}
                <span style={{
                  display: "block", fontSize: 11,
                  fontFamily: "'Barlow', sans-serif", fontWeight: 600,
                  letterSpacing: "0.05em", opacity: 0.7, marginTop: 1,
                }}>
                  {p.weeks}
                </span>
              </button>
            ))}
          </div>

          {/* Phase focus card */}
          <div style={{
            margin: "16px auto 0",
            background: MAVS.card,
            border: `1px solid ${phase.color}40`,
            borderLeft: `4px solid ${phase.color}`,
            borderRadius: 8, padding: "16px 20px",
            maxWidth: 720, marginLeft: "auto", marginRight: "auto",
          }}>
            <div style={{ fontSize: 12, color: phase.color, letterSpacing: "0.25em", marginBottom: 5, fontWeight: 700 }}>
              PHASE FOCUS
            </div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "#8ab8d4", lineHeight: 1.6 }}>
              {phase.goal}
            </div>
            <div style={{
              marginTop: 10, padding: "8px 12px",
              background: "rgba(0,83,140,0.08)", borderRadius: 4,
              fontSize: 13, color: "#2a5a80",
              fontFamily: "'Barlow', sans-serif", fontStyle: "italic",
            }}>
              💡 {phase.tip}
            </div>
          </div>

          {/* Workout days */}
          <div style={{ maxWidth: 720, margin: "16px auto 0", padding: "0 20px 20px" }}>
            <div style={{ fontSize: 13, letterSpacing: "0.25em", color: "#1e4060", marginBottom: 10, fontWeight: 700 }}>
              WEEK {currentWeek} — DAILY WORKOUTS
            </div>

            {phase.days.map((day, di) => {
              const key  = `${activePhase}-${di}-${currentWeek}`;
              const done = !!completedDays[key];
              const saving = savingDay === key;

              return (
                <div key={di} style={{ marginBottom: 8 }}>
                  {/* Day header row */}
                  <div
                    className="day-card"
                    onClick={() => setOpenDay(openDay === di ? null : di)}
                    style={{
                      background: done ? "rgba(0,83,140,0.14)" : openDay === di ? "rgba(0,83,140,0.08)" : MAVS.card,
                      border: `1px solid ${done ? phase.color + "55" : openDay === di ? phase.color + "50" : "rgba(0,83,140,0.15)"}`,
                      borderLeft: `3px solid ${done ? phase.color : openDay === di ? phase.color : "transparent"}`,
                      borderRadius: openDay === di ? "8px 8px 0 0" : 8,
                      padding: "14px 18px",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {/* Complete circle */}
                      <button
                        className="complete-btn"
                        onClick={(e) => { e.stopPropagation(); toggleDayComplete(activePhase, di); }}
                        style={{
                          width: 28, height: 28, borderRadius: "50%",
                          border: `2px solid ${done ? phase.color : "rgba(0,83,140,0.3)"}`,
                          background: done ? phase.color : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: done ? (phase.color === MAVS.silver ? "#00050f" : "#fff") : "#1e4060",
                          fontSize: 13, fontWeight: 800,
                          opacity: saving ? 0.5 : 1,
                        }}
                      >
                        {saving ? "…" : done ? "✓" : ""}
                      </button>
                      <div>
                        <div style={{
                          fontSize: 17, fontWeight: 700,
                          color: done ? phase.color : openDay === di ? phase.color : "#c8dce8",
                          letterSpacing: "0.05em",
                        }}>
                          {day.label}
                        </div>
                        <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "#1e4060", marginTop: 1 }}>
                          {day.exercises.length} exercises · ~40–45 min{done ? " · ✓ Completed" : ""}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: 18, color: phase.color,
                      transform: openDay === di ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}>▾</div>
                  </div>

                  {/* Expanded exercise list */}
                  {openDay === di && (
                    <div style={{
                      background: "#020a18",
                      border: `1px solid ${phase.color}25`,
                      borderTop: "none", borderRadius: "0 0 8px 8px", overflow: "hidden",
                    }}>
                      {/* Column headers */}
                      <div style={{
                        display: "grid", gridTemplateColumns: "1fr 60px 80px",
                        padding: "8px 18px", borderBottom: "1px solid rgba(0,83,140,0.12)",
                        fontSize: 10, letterSpacing: "0.2em", color: "#1e4060", fontWeight: 700,
                      }}>
                        <span>EXERCISE</span>
                        <span style={{ textAlign: "center" }}>SETS</span>
                        <span style={{ textAlign: "center" }}>REPS</span>
                      </div>

                      {day.exercises.map((ex, ei) => (
                        <div key={ei} className="exercise-row" style={{
                          display: "grid", gridTemplateColumns: "1fr 60px 80px",
                          padding: "12px 18px", alignItems: "start",
                        }}>
                          <div>
                            <div style={{
                              fontSize: 14, color: "#c8dce8",
                              fontFamily: "'Barlow', sans-serif", fontWeight: 600,
                            }}>
                              {ex.name}
                            </div>
                            {ex.note && (
                              <div style={{
                                fontSize: 11, color: "#1e4060",
                                fontFamily: "'Barlow', sans-serif",
                                marginTop: 2, fontStyle: "italic",
                              }}>
                                {ex.note}
                              </div>
                            )}
                          </div>
                          <div style={{
                            textAlign: "center", fontSize: 18, fontWeight: 800,
                            color: phase.color,
                          }}>
                            {ex.sets}
                          </div>
                          <div style={{
                            textAlign: "center", fontSize: 13,
                            color: "#4a7fa5",
                            fontFamily: "'Barlow', sans-serif", fontWeight: 600,
                          }}>
                            {ex.reps}
                          </div>
                        </div>
                      ))}

                      {/* Mark complete button */}
                      <div style={{ padding: "12px 18px", borderTop: "1px solid rgba(0,83,140,0.12)" }}>
                        <button
                          className="complete-btn"
                          onClick={() => toggleDayComplete(activePhase, di)}
                          style={{
                            width: "100%", padding: "12px",
                            border: `1px solid ${done ? "rgba(0,83,140,0.2)" : phase.color}`,
                            background: done ? "rgba(0,83,140,0.05)" : `${phase.color}18`,
                            color: done ? "#1e4060" : phase.color,
                            borderRadius: 6, cursor: "pointer",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: 17, fontWeight: 700, letterSpacing: "0.1em",
                          }}
                        >
                          {saving ? "SAVING..." : done ? "✓ MARK INCOMPLETE" : "✓ MARK AS COMPLETE"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Nutrition */}
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px 60px" }}>
            <div style={{ fontSize: 13, letterSpacing: "0.25em", color: "#1e4060", marginBottom: 10, fontWeight: 700 }}>
              FUEL & RECOVERY
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
              {nutrition.map((n, i) => (
                <div key={i} style={{
                  background: MAVS.card,
                  border: "1px solid rgba(0,83,140,0.12)",
                  borderRadius: 8, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{n.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#8ab8d4", letterSpacing: "0.05em", marginBottom: 4 }}>{n.label}</div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#1e4060", lineHeight: 1.5 }}>{n.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
