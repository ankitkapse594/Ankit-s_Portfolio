import { useState, useEffect } from "react";

const roles = [
  "Technical Head",
  "AI-ML Engineer",
  "Web Developer",
  "Data Engineer",
];

export function TypedSubtitle() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "waiting" | "deleting">("typing");

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setPhase("waiting"), 1400);
      }
    } else if (phase === "waiting") {
      timeout = setTimeout(() => setPhase("deleting"), 0);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIdx((i) => (i + 1) % roles.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIdx]);

  return (
    <span className="inline-flex items-center gap-0.5">
      <span className="text-primary neon-text">{displayed}</span>
      <span
        className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle"
        style={{
          animation: "blink 1s step-end infinite",
          boxShadow: "0 0 8px rgba(0,255,255,0.8)",
        }}
      />
    </span>
  );
}
