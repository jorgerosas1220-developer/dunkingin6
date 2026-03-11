import { useState } from "react";

const phases = [
  {
    name: "FOUNDATION",
    weeks: "Weeks 1–4",
    color: "#00ff87",
    focus: "Build base strength & mobility",
    goal: "Establish movement patterns, tendon strength, and baseline explosive power.",
    days: [
      {
        label: "DAY 1 — LOWER POWER",
        exercises: [
          {
            name: "Jump Rope Warm-Up",
            sets: "1",
            reps: "5 min",
            note: "Light pace, loosen ankles",
          },
          {
            name: "Bodyweight Squat",
            sets: "3",
            reps: "15",
            note: "Full depth, slow descent",
          },
          {
            name: "Box Jumps",
            sets: "4",
            reps: "6",
            note: "Land softly, step down",
          },
          {
            name: "Romanian Deadlift (bodyweight)",
            sets: "3",
            reps: "12",
            note: "Hinge at hips, hamstring stretch",
          },
          {
            name: "Calf Raises (single leg)",
            sets: "3",
            reps: "15 each",
            note: "Slow & controlled",
          },
          {
            name: "Standing Broad Jump",
            sets: "3",
            reps: "5",
            note: "Max effort each rep",
          },
        ],
      },
      {
        label: "DAY 2 — UPPER + CORE",
        exercises: [
          {
            name: "Dynamic Stretch Warm-Up",
            sets: "1",
            reps: "5 min",
            note: "Leg swings, hip circles",
          },
          {
            name: "Push-Ups",
            sets: "3",
            reps: "15",
            note: "Explosive push, controlled lower",
          },
          {
            name: "Pull-Ups / Assisted Pull-Ups",
            sets: "3",
            reps: "8",
            note: "Full ROM",
          },
          {
            name: "Plank",
            sets: "3",
            reps: "40 sec",
            note: "Brace everything",
          },
          {
            name: "Hanging Knee Raises",
            sets: "3",
            reps: "12",
            note: "Control the swing",
          },
          {
            name: "Wrist/Shoulder Mobility",
            sets: "1",
            reps: "5 min",
            note: "Key for dunking!",
          },
        ],
      },
      {
        label: "DAY 3 — PLYOMETRICS",
        exercises: [
          {
            name: "High Knees",
            sets: "1",
            reps: "3 min",
            note: "Warm up nervous system",
          },
          {
            name: "Depth Drops",
            sets: "4",
            reps: "5",
            note: "Step off box, absorb landing",
          },
          {
            name: "Lateral Bounds",
            sets: "3",
            reps: "8 each",
            note: "Explosive push off",
          },
          { name: "Tuck Jumps", sets: "3", reps: "8", note: "Knees to chest" },
          {
            name: "Single-Leg Hops (in place)",
            sets: "3",
            reps: "10 each",
            note: "Stay on ball of foot",
          },
          {
            name: "Approach Jump Practice",
            sets: "5",
            reps: "3 attempts",
            note: "1–3 step approach, max height",
          },
        ],
      },
      {
        label: "DAY 4 — STRENGTH",
        exercises: [
          { name: "Jump Rope Warm-Up", sets: "1", reps: "5 min", note: "" },
          {
            name: "Bulgarian Split Squat",
            sets: "3",
            reps: "10 each",
            note: "Use bodyweight or light dumbbells",
          },
          {
            name: "Glute Bridges",
            sets: "3",
            reps: "15",
            note: "Drive hips up explosively",
          },
          {
            name: "Step-Ups (elevated)",
            sets: "3",
            reps: "10 each",
            note: "Drive through heel",
          },
          {
            name: "Nordic Hamstring Curl",
            sets: "3",
            reps: "6",
            note: "Slow eccentric — very hard!",
          },
          {
            name: "Hip Flexor Stretch",
            sets: "1",
            reps: "5 min",
            note: "Essential for jumping",
          },
        ],
      },
      {
        label: "DAY 5 — SKILL + RECOVERY",
        exercises: [
          {
            name: "Light Jog / Walk",
            sets: "1",
            reps: "5 min",
            note: "Active recovery",
          },
          {
            name: "Foam Roll (legs)",
            sets: "1",
            reps: "5 min",
            note: "Quads, hamstrings, calves",
          },
          {
            name: "Full Vertical Jump Practice",
            sets: "8",
            reps: "Max effort",
            note: "Rest 45 sec between attempts",
          },
          {
            name: "Rim Touches / Approach Dunks",
            sets: "10",
            reps: "attempts",
            note: "Try with tennis ball first",
          },
          {
            name: "Static Stretching",
            sets: "1",
            reps: "10 min",
            note: "Hold each stretch 30+ sec",
          },
        ],
      },
    ],
    tip: "Track your standing reach and max vertical jump every week. Use a wall and chalk or tape.",
  },
  {
    name: "BUILD",
    weeks: "Weeks 5–12",
    color: "#ff9500",
    focus: "Add resistance, increase plyo intensity",
    goal: "Develop raw power. Add weight to squats, increase box jump height, and progress plyometric volume.",
    days: [
      {
        label: "DAY 1 — WEIGHTED LOWER",
        exercises: [
          { name: "Jump Rope Warm-Up", sets: "1", reps: "5 min", note: "" },
          {
            name: "Barbell / Goblet Squat",
            sets: "4",
            reps: "8",
            note: "Add weight progressively each week",
          },
          {
            name: "Box Jumps (higher box)",
            sets: "4",
            reps: "6",
            note: "Increase height from phase 1",
          },
          {
            name: "Romanian Deadlift (weighted)",
            sets: "3",
            reps: "10",
            note: "Dumbbells or barbell",
          },
          {
            name: "Single-Leg Calf Raises (weighted)",
            sets: "3",
            reps: "12 each",
            note: "Hold dumbbell",
          },
          {
            name: "Broad Jumps",
            sets: "4",
            reps: "5",
            note: "Consecutive — no pause",
          },
        ],
      },
      {
        label: "DAY 2 — UPPER + CORE",
        exercises: [
          { name: "Warm-Up", sets: "1", reps: "5 min", note: "" },
          {
            name: "Weighted Pull-Ups",
            sets: "3",
            reps: "6",
            note: "Use belt or hold dumbbell",
          },
          { name: "Dips", sets: "3", reps: "10", note: "Chest dips for power" },
          {
            name: "Ab Wheel / Rollouts",
            sets: "3",
            reps: "10",
            note: "Slow and controlled",
          },
          {
            name: "Landmine Rotations",
            sets: "3",
            reps: "8 each",
            note: "Builds dunking torque",
          },
          {
            name: "Dead Hang",
            sets: "3",
            reps: "30 sec",
            note: "Decompress spine, stretch lats",
          },
        ],
      },
      {
        label: "DAY 3 — HIGH INTENSITY PLYO",
        exercises: [
          { name: "Bounding Warm-Up", sets: "1", reps: "4 min", note: "" },
          {
            name: "Depth Jump to Box Jump",
            sets: "5",
            reps: "4",
            note: "Step off, immediately explode up",
          },
          {
            name: "Single-Leg Box Jumps",
            sets: "3",
            reps: "5 each",
            note: "Build unilateral power",
          },
          {
            name: "Sprint Bounds (15m)",
            sets: "5",
            reps: "1 length",
            note: "Exaggerated bounding stride",
          },
          {
            name: "Approach Verticals",
            sets: "8",
            reps: "3",
            note: "Full 3-step approach, max height",
          },
          {
            name: "Rim Work",
            sets: "10",
            reps: "attempts",
            note: "Try palming or a tennis ball dunk",
          },
        ],
      },
      {
        label: "DAY 4 — STRENGTH HYPERTROPHY",
        exercises: [
          { name: "Jump Rope", sets: "1", reps: "5 min", note: "" },
          {
            name: "Hack Squat / Leg Press",
            sets: "4",
            reps: "10",
            note: "Heavy, full range",
          },
          {
            name: "Walking Lunges (weighted)",
            sets: "3",
            reps: "12 each",
            note: "",
          },
          {
            name: "Glute Ham Raise",
            sets: "3",
            reps: "8",
            note: "Or Nordic curl progression",
          },
          {
            name: "Jump Squat",
            sets: "4",
            reps: "8",
            note: "Light barbell or bodyweight, max explosion",
          },
          {
            name: "Hip Flexor / Quad Stretch",
            sets: "1",
            reps: "5 min",
            note: "",
          },
        ],
      },
      {
        label: "DAY 5 — SKILL + MOBILITY",
        exercises: [
          { name: "Light Bike / Jog", sets: "1", reps: "5 min", note: "" },
          { name: "Foam Roll Full Body", sets: "1", reps: "8 min", note: "" },
          {
            name: "Standing Vertical Tests",
            sets: "6",
            reps: "Max effort",
            note: "Log your height!",
          },
          {
            name: "Full Dunk Approach Practice",
            sets: "15",
            reps: "attempts",
            note: "Ball, tennis ball, or reach",
          },
          {
            name: "Ankle Mobility Drills",
            sets: "2",
            reps: "10 each",
            note: "Ankle circles, wall stretches",
          },
          {
            name: "Yoga / Full Body Stretch",
            sets: "1",
            reps: "10 min",
            note: "",
          },
        ],
      },
    ],
    tip: "Aim to add 5–10 lbs to your squat/deadlift every 1–2 weeks. Your vertical should be up 4–6 inches by end of this phase.",
  },
  {
    name: "PEAK",
    weeks: "Weeks 13–24",
    color: "#ff3b30",
    focus: "Max power, dunk specificity",
    goal: "Convert strength gains into pure explosiveness. This is where you dunk.",
    days: [
      {
        label: "DAY 1 — POWER SQUATS",
        exercises: [
          {
            name: "Activation Warm-Up",
            sets: "1",
            reps: "5 min",
            note: "Band walks, glute activation",
          },
          {
            name: "Power Clean or Jump Squat",
            sets: "5",
            reps: "4",
            note: "Explosive! This is the money exercise",
          },
          {
            name: "Heavy Back Squat",
            sets: "4",
            reps: "5",
            note: "85–90% effort",
          },
          {
            name: "Depth Jump to Max Vertical",
            sets: "5",
            reps: "5",
            note: "Minimal ground contact time",
          },
          {
            name: "Single-Leg Plyos",
            sets: "4",
            reps: "6 each",
            note: "Off one leg — like real dunks",
          },
          {
            name: "Weighted Calf Raises",
            sets: "4",
            reps: "10 each",
            note: "Heavy and explosive",
          },
        ],
      },
      {
        label: "DAY 2 — UPPER POWER",
        exercises: [
          { name: "Warm-Up", sets: "1", reps: "5 min", note: "" },
          {
            name: "Medicine Ball Chest Pass (against wall)",
            sets: "4",
            reps: "8",
            note: "Explosive upper body power",
          },
          {
            name: "Weighted Pull-Ups (heavy)",
            sets: "4",
            reps: "5",
            note: "Lat strength = dunk power",
          },
          {
            name: "Overhead Press",
            sets: "3",
            reps: "8",
            note: "Shoulder stability for dunking",
          },
          {
            name: "Core Circuit",
            sets: "3",
            reps: "15 each",
            note: "V-sits, Russian twists, leg raises",
          },
          {
            name: "Grip Strength Work",
            sets: "3",
            reps: "60 sec",
            note: "Towel pull-ups or grip trainer",
          },
        ],
      },
      {
        label: "DAY 3 — DUNK DAY",
        exercises: [
          {
            name: "Dynamic Warm-Up",
            sets: "1",
            reps: "8 min",
            note: "Full body activation",
          },
          {
            name: "Sprint + Jump Combo (10m sprint → vertical)",
            sets: "8",
            reps: "1",
            note: "Convert speed to height",
          },
          {
            name: "Reactive Depth Jumps",
            sets: "5",
            reps: "4",
            note: "Coach: < 0.2 sec ground contact",
          },
          {
            name: "Approach Dunk Attempts",
            sets: "20",
            reps: "attempts",
            note: "Full intensity — go for it!",
          },
          {
            name: "One-Step Dunk Drill",
            sets: "10",
            reps: "attempts",
            note: "Build confidence off one foot",
          },
          { name: "Cool-Down Jog", sets: "1", reps: "5 min", note: "" },
        ],
      },
      {
        label: "DAY 4 — STRENGTH MAINTENANCE",
        exercises: [
          { name: "Foam Roll + Activate", sets: "1", reps: "8 min", note: "" },
          {
            name: "Romanian Deadlift (heavy)",
            sets: "4",
            reps: "6",
            note: "Posterior chain = jump chain",
          },
          {
            name: "Bulgarian Split Squat (heavy)",
            sets: "3",
            reps: "8 each",
            note: "",
          },
          {
            name: "Hamstring Curls",
            sets: "3",
            reps: "10",
            note: "Machine or Nordic",
          },
          {
            name: "Tibialis Raises",
            sets: "3",
            reps: "15",
            note: "Protects knees during landings",
          },
          { name: "Hip Mobility Flow", sets: "1", reps: "8 min", note: "" },
        ],
      },
      {
        label: "DAY 5 — ACTIVE RECOVERY + SKILL",
        exercises: [
          { name: "Light Jog / Bike", sets: "1", reps: "10 min", note: "" },
          { name: "Full Body Foam Roll", sets: "1", reps: "10 min", note: "" },
          {
            name: "Weekly Vertical Jump Test",
            sets: "5",
            reps: "Max effort",
            note: "Track progress!",
          },
          {
            name: "Dunk Practice (low intensity)",
            sets: "10",
            reps: "attempts",
            note: "Feel the motion, not max effort",
          },
          {
            name: "Visualization",
            sets: "1",
            reps: "5 min",
            note: "Mental reps count — see yourself dunking",
          },
        ],
      },
    ],
    tip: "By week 20+ you should be touching rim consistently. Start with a tennis ball dunk, then work to a volleyball, then basketball.",
  },
];

const milestones = [
  { week: 1, goal: "Establish baseline vertical jump (measure it!)" },
  { week: 4, goal: '+2–3" vertical. Touching backboard consistently' },
  { week: 8, goal: '+4–5" vertical. Touching rim on good attempts' },
  { week: 12, goal: '+6–7" vertical. Hanging on rim occasionally' },
  {
    week: 18,
    goal: '+8–9" vertical. Consistent rim touches, tennis ball dunks',
  },
  { week: 24, goal: "DUNK. You're there. 🏀" },
];

const nutrition = [
  {
    icon: "🥩",
    label: "Protein",
    tip: "1g per lb bodyweight daily. That's 185g. Chicken, eggs, Greek yogurt, milk.",
  },
  {
    icon: "🍚",
    label: "Carbs",
    tip: "Fuel your workouts. Rice, oats, fruit. Don't skip carbs — you need them for explosive training.",
  },
  {
    icon: "😴",
    label: "Sleep",
    tip: "9 hours minimum. At 16, you grow and recover while sleeping. This is non-negotiable.",
  },
  {
    icon: "💧",
    label: "Water",
    tip: "3–4 liters daily. Dehydration kills your power output more than anything else.",
  },
  {
    icon: "🧘",
    label: "Recovery",
    tip: "On rest days: walk, stretch, foam roll. Don't just sit — active recovery speeds gains.",
  },
];

export default function App() {
  const [activePhase, setActivePhase] = useState(0);
  const [openDay, setOpenDay] = useState(null);

  const phase = phases[activePhase];

  return (
    <div
      style={{
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "#fff",
        padding: "0",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .phase-btn { transition: all 0.2s; border: 2px solid transparent; cursor: pointer; }
        .phase-btn:hover { transform: translateY(-2px); }
        .day-card { transition: all 0.2s; cursor: pointer; }
        .day-card:hover { transform: translateX(4px); }
        .exercise-row { border-bottom: 1px solid #1a1a1a; }
        .exercise-row:last-child { border-bottom: none; }
        .milestone-item { transition: all 0.15s; }
        .milestone-item:hover { transform: translateX(4px); }
      `}</style>

      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
          borderBottom: `3px solid ${phase.color}`,
          padding: "40px 24px 32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at 50% 0%, ${phase.color}15 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#555",
            marginBottom: 8,
            fontFamily: "Inter, sans-serif",
          }}
        >
          16 YRS · 5'11" · 185 LBS · 45 MIN/DAY · 5 DAYS/WEEK
        </div>

        <h1
          style={{
            fontSize: "clamp(52px, 10vw, 96px)",
            lineHeight: 0.9,
            color: "#fff",
            letterSpacing: "0.02em",
            textShadow: `0 0 60px ${phase.color}40`,
          }}
        >
          IKER DUNKS IN
          <br />
          <span style={{ color: phase.color }}>6 MONTHS</span>
        </h1>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            color: "#888",
            maxWidth: 420,
            margin: "16px auto 0",
          }}
        >
          A sport-science backed vertical jump program. Follow every phase.
          Don't skip rest days. You will dunk.
        </p>
      </div>

      {/* PHASE SELECTOR */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "24px 20px 0",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {phases.map((p, i) => (
          <button
            key={i}
            className="phase-btn"
            onClick={() => {
              setActivePhase(i);
              setOpenDay(null);
            }}
            style={{
              background: activePhase === i ? p.color : "#141414",
              color: activePhase === i ? "#000" : "#666",
              border: `2px solid ${activePhase === i ? p.color : "#222"}`,
              padding: "10px 24px",
              fontSize: 18,
              letterSpacing: "0.08em",
              borderRadius: 4,
              fontFamily: "'Bebas Neue', Impact, sans-serif",
            }}
          >
            {p.name}
            <span
              style={{
                display: "block",
                fontSize: 11,
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.05em",
                opacity: 0.7,
              }}
            >
              {p.weeks}
            </span>
          </button>
        ))}
      </div>

      {/* PHASE OVERVIEW */}
      <div
        style={{
          margin: "20px 20px 0",
          background: "#111",
          border: `1px solid ${phase.color}40`,
          borderLeft: `4px solid ${phase.color}`,
          borderRadius: 6,
          padding: "16px 20px",
          maxWidth: 720,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: phase.color,
            letterSpacing: "0.2em",
            marginBottom: 4,
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          PHASE FOCUS
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            color: "#ccc",
            lineHeight: 1.6,
          }}
        >
          {phase.goal}
        </div>
        <div
          style={{
            marginTop: 10,
            padding: "8px 12px",
            background: "#0a0a0a",
            borderRadius: 4,
            fontSize: 13,
            color: "#888",
            fontFamily: "Inter, sans-serif",
            fontStyle: "italic",
          }}
        >
          💡 {phase.tip}
        </div>
      </div>

      {/* WORKOUT DAYS */}
      <div style={{ maxWidth: 720, margin: "20px auto", padding: "0 20px" }}>
        <div
          style={{
            fontSize: 13,
            letterSpacing: "0.25em",
            color: "#444",
            marginBottom: 12,
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          WEEKLY SCHEDULE
        </div>

        {phase.days.map((day, di) => (
          <div key={di} style={{ marginBottom: 8 }}>
            <div
              className="day-card"
              onClick={() => setOpenDay(openDay === di ? null : di)}
              style={{
                background: openDay === di ? "#161616" : "#111",
                border: `1px solid ${
                  openDay === di ? phase.color + "60" : "#1e1e1e"
                }`,
                borderRadius: 6,
                padding: "14px 18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 17,
                    color: openDay === di ? phase.color : "#ddd",
                    letterSpacing: "0.05em",
                  }}
                >
                  {day.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#555",
                    fontFamily: "Inter, sans-serif",
                    marginTop: 2,
                  }}
                >
                  {day.exercises.length} exercises · ~40–45 min
                </div>
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: phase.color,
                  transform: openDay === di ? "rotate(180deg)" : "none",
                  transition: "0.2s",
                }}
              >
                ↓
              </div>
            </div>

            {openDay === di && (
              <div
                style={{
                  background: "#0d0d0d",
                  border: `1px solid ${phase.color}30`,
                  borderTop: "none",
                  borderRadius: "0 0 6px 6px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 60px 80px",
                    padding: "8px 18px",
                    borderBottom: "1px solid #1a1a1a",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "#444",
                    fontFamily: "'Bebas Neue', sans-serif",
                  }}
                >
                  <span>EXERCISE</span>
                  <span style={{ textAlign: "center" }}>SETS</span>
                  <span style={{ textAlign: "center" }}>REPS</span>
                </div>

                {day.exercises.map((ex, ei) => (
                  <div
                    key={ei}
                    className="exercise-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 60px 80px",
                      padding: "12px 18px",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#e0e0e0",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {ex.name}
                      </div>
                      {ex.note && (
                        <div
                          style={{
                            fontSize: 11,
                            color: "#555",
                            fontFamily: "Inter, sans-serif",
                            marginTop: 2,
                            fontStyle: "italic",
                          }}
                        >
                          {ex.note}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        color: phase.color,
                        fontFamily: "'Bebas Neue', sans-serif",
                      }}
                    >
                      {ex.sets}
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        color: "#aaa",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {ex.reps}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MILESTONES */}
      <div style={{ maxWidth: 720, margin: "0 auto 0", padding: "0 20px" }}>
        <div
          style={{
            fontSize: 13,
            letterSpacing: "0.25em",
            color: "#444",
            marginBottom: 12,
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          PROGRESS MILESTONES
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {milestones.map((m, i) => (
            <div
              key={i}
              className="milestone-item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "#111",
                border: "1px solid #1a1a1a",
                borderRadius: 6,
                padding: "10px 16px",
              }}
            >
              <div
                style={{
                  minWidth: 48,
                  height: 48,
                  borderRadius: 4,
                  background:
                    i === milestones.length - 1 ? "#ff3b30" : "#161616",
                  border: `2px solid ${
                    i === milestones.length - 1 ? "#ff3b30" : "#282828"
                  }`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    color: i === milestones.length - 1 ? "#fff" : "#666",
                    fontFamily: "'Bebas Neue', sans-serif",
                    lineHeight: 1,
                  }}
                >
                  W{m.week}
                </div>
              </div>

              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  color: i === milestones.length - 1 ? "#fff" : "#888",
                }}
              >
                {m.goal}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NUTRITION */}
      <div style={{ maxWidth: 720, margin: "24px auto 0", padding: "0 20px" }}>
        <div
          style={{
            fontSize: 13,
            letterSpacing: "0.25em",
            color: "#444",
            marginBottom: 12,
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          FUEL & RECOVERY
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 8,
          }}
        >
          {nutrition.map((n, i) => (
            <div
              key={i}
              style={{
                background: "#111",
                border: "1px solid #1e1e1e",
                borderRadius: 6,
                padding: "14px 16px",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{n.icon}</div>
              <div
                style={{
                  fontSize: 16,
                  color: "#ddd",
                  letterSpacing: "0.05em",
                  marginBottom: 4,
                }}
              >
                {n.label}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  color: "#666",
                  lineHeight: 1.5,
                }}
              >
                {n.tip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          color: "#333",
          lineHeight: 1.8,
          maxWidth: 500,
          margin: "24px auto 0",
        }}
      >
        At 16, your body adapts incredibly fast. You have youth, height, and
        athletic build on your side. Trust the process, stay consistent, and you{" "}
        <em>will</em> dunk. 🏀
        <br />
        <br />
        <span style={{ color: "#222" }}>
          Consult a coach or doctor if you experience joint pain.
        </span>
      </div>
    </div>
  );
}

