import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import resumePdf from "@assets/Ankit_Kapse_Resume_final_02_1784046625634.pdf";

/* ─── Terminal commands ─── */
type CmdResult = { lines: string[]; action?: () => void };

const COMMANDS: Record<string, () => CmdResult> = {
  help: () => ({
    lines: [
      "┌────────────────────────────────────────┐",
      "│  AK OS — Available Commands            │",
      "├────────────────────────────────────────┤",
      "│  whoami        → About Ankit           │",
      "│  skills        → Tech Stack            │",
      "│  projects      → View Projects         │",
      "│  experience    → Work History          │",
      "│  resume        → Download CV           │",
      "│  certifications→ View Certificates     │",
      "│  contact       → Get In Touch          │",
      "│  github        → GitHub Profile        │",
      "│  linkedin      → LinkedIn Profile      │",
      "│  clear         → Clear Terminal        │",
      "└────────────────────────────────────────┘",
    ],
  }),
  whoami: () => ({
    lines: [
      "Hello. I'm Ankit Kapse.",
      "",
      "  Role      ▸ AI Engineer · Data Engineer",
      "  Position  ▸ Technical Head at Rajsanyog",
      "  Location  ▸ Nagpur, India",
      "  Education ▸ B.Tech IT — RCOEM (2023–2027)",
      "",
      "  Passionate about intelligent systems that",
      "  solve real-world problems.",
    ],
  }),
  skills: () => ({
    lines: [
      "[ TECHNICAL SKILLS ]",
      "",
      "  Cloud & AI   ▸ AWS · AI Automation · ML · Deep Learning",
      "  Programming  ▸ Python · SQL · Data Analysis",
      "  Viz Tools    ▸ Power BI · Tableau",
      "  Web Dev      ▸ Node.js · Web Portals",
      "  Frameworks   ▸ ResNet50 · OpenCV",
      "  Soft Skills  ▸ Adaptability · Communication · Networking",
    ],
  }),
  projects: () => ({
    lines: [
      "[ PROJECTS ]",
      "",
      "  1. VRAMP — Virtual RAM Management Platform",
      "     Cloud-based virtual RAM · 10x connectivity",
      "     Stack: Node.js · Docker · Kubernetes · Cloud",
      "",
      "  2. Animal Diseases Detection System",
      "     Deep-learning (ResNet50) + OpenCV pipeline",
      "     Stack: Python · ResNet50 · OpenCV",
      "",
      "  ↓ Scrolling to Projects section...",
    ],
    action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
  }),
  experience: () => ({
    lines: [
      "[ WORK EXPERIENCE ]",
      "",
      "  ● Technical Head — Rajsanyog",
      "    Jun 2025 – Present · Nagpur",
      "    End-to-end web portals & AI agent development",
      "",
      "  ● AI-ML Virtual Internship — AICTE",
      "    May 2025 – Aug 2025 · Remote",
      "    Cloud-based data handling & pipeline development",
      "",
      "  ● Data Engineering Internship — AICTE",
      "    Jul 2024 – Sep 2024 · Remote",
      "    Data analysis & AI model deployment",
    ],
  }),
  certifications: () => ({
    lines: [
      "[ CERTIFICATIONS ]",
      "",
      "  ✓ AWS — Data Engineering",
      "  ✓ Google Data Analytics Professional Certificate",
      "  ✓ Programming in Python (Coursera)",
      "  ✓ Software Engineering Simulation — JPMorgan Chase",
      "",
      "  ↓ Scrolling to Certifications...",
    ],
    action: () => document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" }),
  }),
  contact: () => ({
    lines: [
      "[ CONTACT ]",
      "",
      "  📧  ankitkapse594@gmail.com",
      "  📞  +91 7499039470",
      "  📍  Nagpur, India",
      "",
      "  ↓ Scrolling to Contact section...",
    ],
    action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
  }),
  github: () => ({
    lines: ["↗ Opening GitHub profile..."],
    action: () => window.open("https://github.com/ankitkapse594", "_blank"),
  }),
  linkedin: () => ({
    lines: ["↗ Opening LinkedIn profile..."],
    action: () => window.open("https://www.linkedin.com/in/ankit-kapse-ak02", "_blank"),
  }),
  resume: () => ({
    lines: ["⬇ Downloading Ankit_Kapse_Resume.pdf..."],
    action: () => {
      const a = document.createElement("a");
      a.href = resumePdf;
      a.download = "Ankit_Kapse_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  }),
};

/* ─── Quiz ─── */
const QUIZ = [
  { q: "What does 'LLM' stand for in AI?", opts: ["Linear Learning Machine", "Large Language Model", "Layered Logic Matrix", "Language Layer Module"], a: 1 },
  { q: "Docker is primarily used for...", opts: ["Database management", "UI design", "Containerization", "Network monitoring"], a: 2 },
  { q: "What does 'API' stand for?", opts: ["Applied Protocol Interface", "Application Programming Interface", "Automated Process Integration", "Application Protocol Index"], a: 1 },
  { q: "In ML, 'overfitting' means...", opts: ["Model trains too fast", "Not enough training data", "Great on training, poor on new data", "Too many model layers"], a: 2 },
  { q: "What does 'SQL' stand for?", opts: ["Simple Query Logic", "System Queue Layer", "Standard Query List", "Structured Query Language"], a: 3 },
];

/* ─── Status items ─── */
const STATUS = [
  { label: "AI CORE",    status: "ONLINE",    color: "#00dcff" },
  { label: "DATA ENGINE",status: "ACTIVE",    color: "#a855f7" },
  { label: "AUTOMATION", status: "RUNNING",   color: "#22c55e" },
  { label: "LLM AGENTS", status: "CONNECTED", color: "#3b82f6" },
  { label: "GPU",        status: "READY",     color: "#f97316" },
  { label: "NETWORK",    status: "SECURE",    color: "#22c55e" },
];

type TLine = { type: "input" | "output" | "system"; text: string };

const INIT_HISTORY: TLine[] = [
  { type: "system", text: "╔══════════════════════════════╗" },
  { type: "system", text: "║  AK OS v3.0.0 — AI Interface ║" },
  { type: "system", text: "╚══════════════════════════════╝" },
  { type: "system", text: "" },
  { type: "system", text: 'Type  "help"  for all commands.' },
  { type: "system", text: "" },
];

/* ─── Sub-tab components ─── */
function TerminalTab({ history, input, setInput, onKeyDown, scrollRef, inputRef }: {
  history: TLine[];
  input: string;
  setInput: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-0.5 scrollbar-thin"
        style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}
      >
        {history.map((line, i) => (
          <div key={i} className={
            line.type === "input"
              ? "text-primary"
              : line.type === "system"
              ? "text-secondary/70"
              : "text-muted-foreground/90"
          }>
            {line.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 px-3 py-2 border-t border-white/5"
        style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}
      >
        <span className="text-primary shrink-0">▸</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none text-primary caret-primary placeholder-white/20"
          placeholder="enter command..."
          autoComplete="off"
          spellCheck={false}
          data-testid="input-terminal"
        />
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-primary"
        >█</motion.span>
      </div>
    </motion.div>
  );
}

function StatusTab() {
  const [uptime, setUptime] = useState(0);
  const [cpu, setCpu] = useState(34);
  const [ram, setRam] = useState(67);

  useEffect(() => {
    const t = setInterval(() => {
      setUptime(u => u + 1);
      setCpu(Math.floor(28 + Math.random() * 20));
      setRam(Math.floor(60 + Math.random() * 15));
    }, 1800);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto p-4 space-y-3"
      style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}
    >
      <p className="text-primary/50 tracking-widest uppercase text-[9px] mb-3">SYSTEM STATUS</p>

      {STATUS.map(({ label, status, color }) => (
        <div key={label} className="flex items-center justify-between">
          <span className="text-muted-foreground/80 tracking-wider">{label}</span>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full"
              style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            />
            <span style={{ color }} className="tracking-widest">{status}</span>
          </div>
        </div>
      ))}

      <div className="border-t border-white/5 pt-3 mt-3 space-y-2">
        <p className="text-primary/40 tracking-widest uppercase text-[9px]">METRICS</p>
        {[
          { label: "CPU", val: cpu },
          { label: "RAM", val: ram },
        ].map(({ label, val }) => (
          <div key={label}>
            <div className="flex justify-between text-muted-foreground/60 mb-1">
              <span>{label}</span><span>{val}%</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
              <motion.div
                animate={{ width: `${val}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #00dcff, #a855f7)" }}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between text-muted-foreground/50 pt-1">
          <span>UPTIME</span><span className="text-primary/60">{fmt(uptime)}</span>
        </div>
      </div>

      <div className="border-t border-white/5 pt-3 text-center">
        <motion.p
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-primary/70 tracking-[0.3em] uppercase text-[9px]"
        >
          WELCOME, VISITOR...
        </motion.p>
      </div>
    </motion.div>
  );
}

function QuizTab() {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const answer = (idx: number) => {
    if (chosen !== null) return;
    setChosen(idx);
    if (idx === QUIZ[qIdx].a) setScore(s => s + 1);
    setTimeout(() => {
      setChosen(null);
      if (qIdx < QUIZ.length - 1) setQIdx(q => q + 1);
      else setDone(true);
    }, 900);
  };

  const reset = () => { setQIdx(0); setScore(0); setChosen(null); setDone(false); };

  const q = QUIZ[qIdx];
  const pct = Math.round((score / QUIZ.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col p-4"
      style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}
    >
      {!done ? (
        <>
          <div className="mb-3">
            <div className="flex justify-between text-muted-foreground/50 mb-1.5">
              <span className="text-primary/60 tracking-wider">CAN YOU BEAT MY AI?</span>
              <span>{qIdx + 1}/{QUIZ.length}</span>
            </div>
            <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${((qIdx) / QUIZ.length) * 100}%` }} />
            </div>
          </div>

          <p className="text-white/90 mb-4 leading-relaxed">{q.q}</p>

          <div className="grid grid-cols-1 gap-2 flex-1">
            {q.opts.map((opt, i) => {
              const isCorrect = i === q.a;
              const isChosen = i === chosen;
              let bg = "rgba(255,255,255,0.03)";
              let border = "rgba(255,255,255,0.08)";
              if (chosen !== null) {
                if (isCorrect) { bg = "rgba(34,197,94,0.1)"; border = "rgba(34,197,94,0.4)"; }
                else if (isChosen) { bg = "rgba(239,68,68,0.1)"; border = "rgba(239,68,68,0.4)"; }
              }
              return (
                <button
                  key={i}
                  onClick={() => answer(i)}
                  className="text-left px-3 py-2 rounded-lg transition-all text-muted-foreground/80 hover:text-white"
                  style={{ background: bg, border: `1px solid ${border}` }}
                  data-testid={`quiz-opt-${i}`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-4xl font-black"
            style={{
              background: pct >= 80 ? "linear-gradient(135deg,#22c55e,#00dcff)" : pct >= 60 ? "linear-gradient(135deg,#f97316,#a855f7)" : "linear-gradient(135deg,#ef4444,#a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {score}/{QUIZ.length}
          </motion.div>
          <p className="text-muted-foreground/80 tracking-wider uppercase text-[10px]">
            {pct >= 80 ? "IMPRESSIVE! YOU THINK LIKE AN AI ENGINEER." : pct >= 60 ? "GOOD EFFORT! KEEP LEARNING." : "EXPLORE MY PROJECTS TO LEARN MORE."}
          </p>
          <button
            onClick={reset}
            className="px-4 py-1.5 rounded-lg border border-primary/30 text-primary/70 hover:text-primary hover:border-primary/60 transition-all tracking-wider text-[10px] uppercase"
          >
            Try Again
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main export ─── */
export function AICommandCenter() {
  const [tab, setTab] = useState<"terminal" | "status" | "quiz">("terminal");
  const [history, setHistory] = useState<TLine[]>(INIT_HISTORY);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLines = useCallback((lines: TLine[]) => {
    setHistory(prev => [...prev, ...lines]);
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 50);
  }, []);

  const handleCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setCmdHistory(prev => [cmd, ...prev]);
    setHistIdx(-1);
    addLines([{ type: "input", text: `▸ ${raw}` }]);

    if (cmd === "clear") {
      setHistory(INIT_HISTORY);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      const res = handler();
      addLines([...res.lines.map(l => ({ type: "output" as const, text: l })), { type: "output", text: "" }]);
      if (res.action) setTimeout(res.action, 600);
    } else {
      addLines([
        { type: "output", text: `  Command not found: "${cmd}"` },
        { type: "output", text: '  Type "help" for available commands.' },
        { type: "output", text: "" },
      ]);
    }
  }, [addLines]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { handleCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(i);
      if (cmdHistory[i] !== undefined) setInput(cmdHistory[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = Math.max(histIdx - 1, -1);
      setHistIdx(i);
      setInput(i === -1 ? "" : cmdHistory[i]);
    }
  };

  const TABS = [
    { id: "terminal" as const, label: "TERMINAL" },
    { id: "status"   as const, label: "STATUS"   },
    { id: "quiz"     as const, label: "QUIZ"     },
  ];

  return (
    <div className="w-full" style={{ maxWidth: "480px", height: "460px" }}>
      <div
        className="h-full flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "rgba(6,8,17,0.88)",
          border: "1px solid rgba(0,220,255,0.18)",
          boxShadow: "0 0 60px rgba(0,220,255,0.07), 0 0 120px rgba(100,50,200,0.05)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="font-mono text-[10px] text-primary/60 mx-auto tracking-[0.2em] uppercase select-none">
            AK — AI Command Center
          </span>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-green-400"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5 shrink-0">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all ${
                tab === t.id
                  ? "text-primary border-b border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-white"
              }`}
              data-testid={`tab-${t.id}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {tab === "terminal" && (
              <TerminalTab
                key="terminal"
                history={history}
                input={input}
                setInput={setInput}
                onKeyDown={onKeyDown}
                scrollRef={scrollRef}
                inputRef={inputRef}
              />
            )}
            {tab === "status"   && <StatusTab key="status" />}
            {tab === "quiz"     && <QuizTab   key="quiz"   />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
