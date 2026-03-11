import { useState } from "react";
import { supabase } from "./supabaseClient";

// Dallas Mavericks palette
// Primary: #00538C (Mavs Blue)
// Accent:  #002B5E (Navy)
// Silver:  #B8C4CA
// White:   #FFFFFF

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        if (data.user) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            name,
            start_date: new Date().toISOString().split("T")[0],
          });
        }
        setMessage("Check your email to confirm your account!");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    background: "#001a38",
    border: "1px solid #00538C44",
    borderRadius: 6,
    color: "#e8eef2",
    fontFamily: "'Barlow', sans-serif",
    fontSize: 14,
    outline: "none",
    marginBottom: 12,
    letterSpacing: "0.02em",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#00050f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "'Barlow Condensed', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap');

        /* Animated background grid */
        .auth-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,83,140,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,83,140,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .auth-bg::after {
          content: '';
          position: absolute;
          top: -40%;
          left: -20%;
          width: 80%;
          height: 80%;
          background: radial-gradient(ellipse, rgba(0,83,140,0.18) 0%, transparent 65%);
          pointer-events: none;
          animation: pulse 6s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .auth-input:focus {
          border-color: #00538C !important;
          box-shadow: 0 0 0 3px rgba(0,83,140,0.15);
        }

        .tab-btn {
          transition: all 0.2s;
        }

        .submit-btn {
          transition: all 0.15s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(0,83,140,0.5);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>

      {/* BG layer */}
      <div className="auth-bg" style={{ position: "absolute", inset: 0 }} />

      {/* Glow bottom right */}
      <div style={{
        position: "absolute",
        bottom: "-20%",
        right: "-10%",
        width: "60%",
        height: "60%",
        background: "radial-gradient(ellipse, rgba(0,43,94,0.3) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>

        {/* Logo block */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          {/* Mavs-style star accent */}
          <div style={{
            fontSize: 11,
            letterSpacing: "0.35em",
            color: "#00538C",
            marginBottom: 12,
            fontWeight: 700,
          }}>
            ★ DALLAS MAVERICKS TRAINING ★
          </div>
          <h1 style={{
            fontSize: 64,
            lineHeight: 0.88,
            fontWeight: 800,
            letterSpacing: "0.01em",
            color: "#fff",
            textShadow: "0 0 80px rgba(0,83,140,0.6)",
          }}>
            DUNK IN<br />
            <span style={{
              color: "#00538C",
              WebkitTextStroke: "1px #00538C",
              textShadow: "0 0 40px rgba(0,83,140,0.8), 0 0 80px rgba(0,83,140,0.4)",
            }}>
              6 MONTHS
            </span>
          </h1>
          <div style={{
            marginTop: 14,
            color: "#4a7fa5",
            fontSize: 13,
            fontFamily: "'Barlow', sans-serif",
            letterSpacing: "0.03em",
          }}>
            {mode === "login"
              ? "Welcome back. The rim is waiting."
              : "Start your journey. Every champion was once a beginner."}
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(0,15,35,0.85)",
          border: "1px solid rgba(0,83,140,0.3)",
          borderRadius: 12,
          padding: "32px 28px",
          backdropFilter: "blur(12px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,83,140,0.2)",
        }}>

          {/* Tab switcher */}
          <div style={{
            display: "flex",
            marginBottom: 28,
            background: "rgba(0,83,140,0.08)",
            borderRadius: 8,
            padding: 4,
            border: "1px solid rgba(0,83,140,0.15)",
          }}>
            {["login", "signup"].map((m) => (
              <button
                key={m}
                className="tab-btn"
                onClick={() => { setMode(m); setError(""); setMessage(""); }}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  border: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                  background: mode === m ? "#00538C" : "transparent",
                  color: mode === m ? "#fff" : "#4a7fa5",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  boxShadow: mode === m ? "0 2px 12px rgba(0,83,140,0.4)" : "none",
                }}
              >
                {m === "login" ? "LOG IN" : "SIGN UP"}
              </button>
            ))}
          </div>

          {mode === "signup" && (
            <input
              className="auth-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              style={inputStyle}
            />
          )}

          <input
            className="auth-input"
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />

          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ ...inputStyle, marginBottom: 20 }}
          />

          {error && (
            <div style={{
              color: "#ff6b6b",
              fontSize: 13,
              marginBottom: 16,
              padding: "10px 14px",
              background: "rgba(255,59,48,0.08)",
              border: "1px solid rgba(255,59,48,0.2)",
              borderRadius: 6,
              fontFamily: "'Barlow', sans-serif",
            }}>
              {error}
            </div>
          )}

          {message && (
            <div style={{
              color: "#5bc8f5",
              fontSize: 13,
              marginBottom: 16,
              padding: "10px 14px",
              background: "rgba(0,83,140,0.15)",
              border: "1px solid rgba(0,83,140,0.3)",
              borderRadius: 6,
              fontFamily: "'Barlow', sans-serif",
            }}>
              {message}
            </div>
          )}

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#002B5E" : "linear-gradient(135deg, #00538C 0%, #0066b0 100%)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.12em",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "..." : mode === "login" ? "LOG IN" : "CREATE ACCOUNT"}
          </button>
        </div>

        <div style={{
          textAlign: "center",
          marginTop: 20,
          fontFamily: "'Barlow', sans-serif",
          fontSize: 11,
          color: "#1e4060",
          letterSpacing: "0.05em",
        }}>
          YOUR PROGRESS. YOUR JOURNEY. YOUR DUNK.
        </div>
      </div>
    </div>
  );
}
