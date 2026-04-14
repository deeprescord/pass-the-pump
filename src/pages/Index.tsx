import { useEffect, useRef, memo, useState, ReactNode, CSSProperties } from "react";

const gold = "#D4AF37";
const red = "#9B3A3A";
const dark = "#1A1814";
const warm = "#F5F0E8";
const soft = "#8A8478";

const heading = "Fraunces,Georgia,serif";
const body = "Lora,Georgia,serif";
const mono = "JetBrains Mono,monospace";

function Reveal({ children, delay = 0 }: {children: ReactNode;delay?: number;}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) {el.classList.add("vis");obs.unobserve(el);}},
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="rv" style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

function Slide({ children, bg = "transparent", style: s, id }: {children: ReactNode;bg?: string;style?: CSSProperties;id?: string;}) {
  return (
    <section id={id} style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "80px 32px", background: bg, textAlign: "center", ...s
    }}>{children}</section>);
}

function Big({ children, size = "clamp(2.5rem,7vw,5.5rem)", color = dark, weight = 900, style: s }: {children: ReactNode;size?: string;color?: string;weight?: number;style?: CSSProperties;}) {
  return <Reveal><div style={{ fontFamily: heading, fontSize: size, fontWeight: weight, color, lineHeight: 1.1, maxWidth: 900, letterSpacing: "-0.02em", ...s }}>{children}</div></Reveal>;
}

function Sub({ children, color: c = soft, size = "clamp(1.1rem,2.5vw,1.5rem)", style: s }: {children: ReactNode;color?: string;size?: string;style?: CSSProperties;}) {
  return <Reveal delay={0.12}><div style={{ fontFamily: body, fontSize: size, color: c, lineHeight: 1.75, maxWidth: 560, marginTop: 28, fontWeight: 400, ...s }}>{children}</div></Reveal>;
}

function Chant({ children, color: c = dark }: {children: ReactNode;color?: string;}) {
  return <Reveal><div style={{ fontFamily: heading, fontSize: "clamp(1.4rem,3.5vw,2.2rem)", fontWeight: 700, fontStyle: "italic", color: c, marginTop: 40, lineHeight: 1.4 }}>{children}</div></Reveal>;
}

function Spacer({ h = 40 }: {h?: number;}) {return <div style={{ height: h }} />;}

function FlashZero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) {el.classList.add("flash-active");obs.unobserve(el);}},
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="flash-eq" style={{
      fontFamily: heading, fontSize: "clamp(2.2rem,5.5vw,4rem)",
      fontWeight: 900, padding: "48px 20px", textAlign: "center"
    }}>
      <span className="flash-me">me</span>
      <span style={{ color: red, fontSize: "0.7em", margin: "0 12px" }}>÷</span>
      <span className="flash-you">you</span>
      <span style={{ color: "#444", fontSize: "0.6em", margin: "0 12px" }}>=</span>
      <span style={{ color: red }}>cannot stand</span>
    </div>);
}

function AnimatedNotEqual() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) {el.classList.add("neq-active");obs.unobserve(el);}},
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="neq-wrap">
      <span style={{ fontFamily: heading, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 900, color: dark }}>me + you </span>
      <span className="neq-symbol" style={{ fontFamily: heading, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 900, display: "inline-block" }}>≠</span>
      <span style={{ fontFamily: heading, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 900, color: dark }}> corporations</span>
    </div>);
}

const flipWords = ["customers", "employees", "investors", "reviewers", "influencers", "public", "profit"];
const SplitFlap = memo(function SplitFlap() {
  const [idx, setIdx] = useState(0);
  const [flipping, setFlipping] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {setIdx((i) => (i + 1) % flipWords.length);setFlipping(false);}, 400);
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 32 }}>
      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 420, height: 90, background: "#111", borderRadius: 10,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        border: "1px solid #333", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.08)", zIndex: 2 }} />
        <div style={{
          fontFamily: mono, fontSize: "clamp(1.5rem,3.5vw,2.2rem)",
          fontWeight: 700, color: gold, letterSpacing: "0.12em", textTransform: "uppercase" as const,
          textAlign: "center" as const, width: "100%",
          transition: flipping ? "all 0.2s ease-in" : "all 0.2s ease-out",
          transform: flipping ? "rotateX(90deg)" : "rotateX(0)", opacity: flipping ? 0 : 1
        }}>{flipWords[idx]}</div>
      </div>
    </div>);
});

const companies = [
{ name: "Shell", stations: "12,283", month: "March", bg: "#FFD500", text: "#DD0000", accent: "#FFD500" },
{ name: "ExxonMobil", stations: "11,532", month: "April", bg: "#FFFFFF", text: "#222", accent: "#FF0000" },
{ name: "BP", stations: "7,111", month: "May", bg: "#007B33", text: "#FFF", accent: "#FFCC00" },
{ name: "Chevron", stations: "7,082", month: "June", bg: "#0051A5", text: "#FFF", accent: "#D4122A" },
{ name: "Valero", stations: "4,907", month: "July", bg: "#002868", text: "#FFF", accent: "#BF0A30" },
{ name: "Citgo", stations: "4,408", month: "August", bg: "#C8102E", text: "#FFF", accent: "#003DA5" },
{ name: "Phillips 66", stations: "2,527", month: "September", bg: "#1C1C1C", text: "#D42626", accent: "#D42626" },
{ name: "76", stations: "1,728", month: "October", bg: "#FF6200", text: "#FFF", accent: "#003B71" },
{ name: "Sinclair", stations: "1,715", month: "November", bg: "#006B3F", text: "#FFF", accent: "#006B3F" },
{ name: "Conoco", stations: "1,682", month: "December", bg: "#D42626", text: "#FFF", accent: "#D42626" },
{ name: "Marathon", stations: "982", month: "January '27", bg: "#003082", text: "#FFF", accent: "#ED1C24" }];


function BrandLogo({ name, bg: bgc, text: tc, accent, targeted, float: fl }: {name: string;bg: string;text: string;accent: string;targeted?: boolean;float?: boolean;}) {
  return (
    <div className={fl ? "float-logo" : ""} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: "16px 30px", borderRadius: 8, minWidth: 120, minHeight: 56, flexShrink: 0,
      background: targeted ? `linear-gradient(135deg, ${bgc}, ${bgc}ee)` : bgc,
      border: targeted ? `3px solid ${red}` : `1px solid rgba(0,0,0,0.08)`,
      boxShadow: targeted ? `0 0 28px rgba(155,58,58,0.4), 0 6px 16px rgba(0,0,0,0.25)` : "0 4px 14px rgba(0,0,0,0.12)",
      position: "relative", cursor: "default"
    }}>
      {targeted && <div className="target-arrow" style={{
        position: "absolute", top: -22, right: -22, width: 44, height: 44,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.8rem", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.6))"
      }}>🎯</div>}
      {name === "76" ?
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#003B71", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: heading, fontSize: "1rem", fontWeight: 900, color: "#FF6200" }}>76</span>
        </div> :
      <span style={{
        fontFamily: mono, fontSize: name.length > 8 ? "0.7rem" : "0.85rem",
        fontWeight: 900, color: tc, letterSpacing: name.length > 8 ? "-0.01em" : "0.1em",
        textTransform: "uppercase" as const, whiteSpace: "nowrap" as const
      }}>{name}</span>
      }
      {accent && name !== "76" && <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
        background: accent, borderRadius: "0 0 7px 7px"
      }} />}
    </div>);
}

function LogoScroll({ bgColor = "#FAF6F0" }: {bgColor?: string;}) {
  return (
    <div style={{ width: "100vw", overflow: "hidden", padding: "20px 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: `linear-gradient(90deg, ${bgColor}, transparent)` }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: `linear-gradient(-90deg, ${bgColor}, transparent)` }} />
      <div className="logo-scroll-track" style={{ display: "flex", gap: 16, width: "max-content" }}>
        {[...companies, ...companies].map((c, i) =>
        <BrandLogo key={`${c.name}-${i}`} name={c.name} bg={c.bg} text={c.text} accent={c.accent} targeted={i === 0 || i === companies.length} />
        )}
      </div>
    </div>);
}

function LogoScrollDark() {
  return (
    <div style={{ width: "100vw", overflow: "hidden", padding: "20px 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: `linear-gradient(90deg, ${dark}, transparent)` }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: `linear-gradient(-90deg, ${dark}, transparent)` }} />
      <div className="logo-scroll-track-dark" style={{ display: "flex", gap: 16, width: "max-content" }}>
        {[...companies, ...companies].map((c, i) =>
        <BrandLogo key={`${c.name}-${i}`} name={c.name} bg={c.bg} text={c.text} accent={c.accent} targeted={i === 0 || i === companies.length} float />
        )}
      </div>
    </div>);
}

const Counter = memo(function Counter() {
  const [n, setN] = useState(14847);
  useEffect(() => {const id = setInterval(() => setN((v) => v + Math.floor(Math.random() * 3)), 5000);return () => clearInterval(id);}, []);
  return <div style={{ fontFamily: heading, fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 900, color: gold, letterSpacing: "-0.03em" }}>{n.toLocaleString()}</div>;
});

const EmailSignup = memo(function EmailSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://passthepump.org";
  const shareText = "See Shell. Leave Shell. Gas Up No More. I just joined — now it's your turn.";

  if (done) return (
    <div style={{ textAlign: "center", padding: 40, maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontFamily: heading, fontSize: "1.8rem", color: gold, fontWeight: 700 }}>You're in the equation.</div>
      <div style={{ fontFamily: body, fontSize: "1rem", color: soft, marginTop: 12, marginBottom: 32 }}>Now pass the pump to <span style={{ color: warm, fontWeight: 700 }}>one person.</span></div>
      <div style={{
        background: "rgba(212,175,55,0.08)", border: `2px solid ${gold}`, borderRadius: 16,
        padding: "32px 28px"
      }}>
        <div style={{ fontFamily: heading, fontSize: "1.3rem", fontWeight: 900, color: warm, marginBottom: 8 }}>1 for 1</div>
        <div style={{ fontFamily: body, fontSize: "0.95rem", color: soft, lineHeight: 1.7, marginBottom: 24 }}>
          You joined. Now text this to <span style={{ color: gold, fontWeight: 700 }}>one friend.</span><br />
          They text one friend. That's how we win.
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => {
            if (navigator.share) {
              navigator.share({ title: "Pass the Pump", text: shareText, url: shareUrl });
            } else {
              navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }
          }} style={{
            padding: "14px 28px", background: gold, color: dark, border: "none", borderRadius: 6,
            fontFamily: heading, fontSize: "1rem", fontWeight: 700, cursor: "pointer"
          }}>{copied ? "Copied!" : "Pass the Pump"}</button>
          <a href={`sms:?&body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`} style={{
            padding: "14px 28px", background: "transparent", color: warm,
            border: `2px solid rgba(245,240,232,0.3)`, borderRadius: 6,
            fontFamily: heading, fontSize: "1rem", fontWeight: 700, cursor: "pointer",
            textDecoration: "none", display: "inline-flex", alignItems: "center"
          }}>Text It</a>
        </div>
      </div>
    </div>);

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "left" }}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" style={{ width: "100%", padding: "16px 20px", background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.12)", borderRadius: 6, color: warm, fontFamily: body, fontSize: "1rem", marginBottom: 16, outline: "none" }} />
      <button onClick={() => {if (email.includes("@")) setDone(true);}} style={{ width: "100%", padding: "16px 20px", background: gold, color: dark, border: "none", borderRadius: 6, fontFamily: heading, fontSize: "1.05rem", fontWeight: 700, cursor: "pointer" }}>Join the Equation</button>
    </div>);
});

function Step({ num, emoji, title, desc }: {num: number;emoji: string;title: string;desc: string;}) {
  return (
    <Reveal delay={num * 0.12}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", textAlign: "left", padding: "28px 0", borderBottom: "1px solid rgba(26,24,20,0.08)" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", flexShrink: 0, background: gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{emoji}</div>
        <div>
          <div style={{ fontFamily: heading, fontSize: "1.3rem", fontWeight: 700, color: dark }}>{title}</div>
          <div style={{ fontFamily: body, fontSize: "1.05rem", color: soft, marginTop: 6, lineHeight: 1.6 }}>{desc}</div>
        </div>
      </div>
    </Reveal>);
}

const B = ({ children }: {children: ReactNode;}) => <strong style={{ color: warm, fontWeight: 700 }}>{children}</strong>;

/* Dual Scoreboard Component */
function ZeroScoreboard() {
  const corpsAtZero = 0;
  const candidatesAtZero = 0;
  return (
    <Reveal delay={0.15}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 700, margin: "0 auto", width: "100%" }}>
        <div style={{
          padding: "40px 24px", borderRadius: 16,
          background: "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.02))",
          border: `2px solid ${gold}`, textAlign: "center"
        }}>
          <div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.3em", color: soft, marginBottom: 16 }}>CORPORATIONS</div>
          <div style={{ fontFamily: heading, fontSize: "clamp(3rem,8vw,5rem)", fontWeight: 900, color: gold }}>{corpsAtZero}</div>
          <div style={{ fontFamily: heading, fontSize: "clamp(1rem,2vw,1.3rem)", fontWeight: 700, color: warm, marginTop: 8 }}>at $0.00</div>
          <div style={{ fontFamily: body, fontSize: "0.85rem", color: soft, marginTop: 12 }}>Have pledged zero political spending</div>
        </div>
        <div style={{
          padding: "40px 24px", borderRadius: 16,
          background: "linear-gradient(135deg, rgba(245,240,232,0.08), rgba(245,240,232,0.02))",
          border: "2px solid rgba(245,240,232,0.2)", textAlign: "center"
        }}>
          <div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.3em", color: soft, marginBottom: 16 }}>2026 CANDIDATES</div>
          <div style={{ fontFamily: heading, fontSize: "clamp(3rem,8vw,5rem)", fontWeight: 900, color: warm }}>{candidatesAtZero}</div>
          <div style={{ fontFamily: heading, fontSize: "clamp(1rem,2vw,1.3rem)", fontWeight: 700, color: warm, marginTop: 8 }}>at $0.00</div>
          <div style={{ fontFamily: body, fontSize: "0.85rem", color: soft, marginTop: 12 }}>Have pledged to take zero corporate money</div>
        </div>
      </div>
    </Reveal>);

}

const Index = () => {
  const [headerEmail, setHeaderEmail] = useState("");
  const [headerSubmitted, setHeaderSubmitted] = useState(false);

  return (
    <div style={{ background: warm, color: dark, overflowX: "hidden" }}>
      {/* STICKY HEADER */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: dark, color: warm,
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 16, flexWrap: "wrap",
        padding: "8px 20px",
        borderBottom: `2px solid ${gold}`
      }}>
        <div style={{ fontFamily: mono, fontSize: "clamp(0.55rem, 1.1vw, 0.75rem)", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: gold }}>Seize the System</span>
          <span style={{ opacity: 0.3 }}>—</span>
          <span>Pass the Pump!</span>
        </div>
        <div style={{ height: 16, width: 1, background: "rgba(245,240,232,0.15)" }} />
        {headerSubmitted ?
        <span style={{ fontFamily: heading, fontSize: "0.85rem", color: gold, fontWeight: 700 }}>You're in. 🇺🇸</span> :
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: body, fontSize: "clamp(0.65rem, 1vw, 0.8rem)", color: soft, whiteSpace: "nowrap" }}>Join Your Fellow Americans</span>
            <input
            value={headerEmail}
            onChange={(e) => setHeaderEmail(e.target.value)}
            placeholder="your@email.com"
            type="email"
            style={{
              padding: "5px 12px", background: "rgba(245,240,232,0.06)",
              border: "1px solid rgba(245,240,232,0.15)", borderRadius: 4,
              color: warm, fontFamily: body, fontSize: "0.75rem",
              outline: "none", width: 160
            }} />
            <button
            onClick={() => {if (headerEmail.includes("@")) setHeaderSubmitted(true);}}
            style={{
              padding: "5px 16px", background: gold, color: dark,
              fontFamily: heading, fontWeight: 700, fontSize: "0.85rem",
              letterSpacing: "0.05em", border: "none", borderRadius: 4,
              cursor: "pointer", whiteSpace: "nowrap"
            }}>
              Join
            </button>
          </div>
        }
      </header>
      <div style={{ height: 46 }} />

      {/* THE CHANT */}
      <Slide bg={dark} style={{ color: warm }}>
        <Reveal>
          <img src="/shell-logo.png" alt="Shell" style={{ width: 120, height: "auto", marginBottom: 32 }} />
        </Reveal>
        <Reveal><div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.3em", color: soft, marginBottom: 20 }}>THE CHANT</div></Reveal>
        <div style={{ fontFamily: heading, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", position: "relative" }}>
          <span className="float-note n1" style={{ position: "absolute", left: "-60px", top: "10%", fontSize: "2rem", opacity: 0.3 }}>&#9835;</span>
          <span className="float-note n2" style={{ position: "absolute", right: "-50px", top: "5%", fontSize: "1.5rem", opacity: 0.25 }}>&#9834;</span>
          <span className="float-note n3" style={{ position: "absolute", left: "-40px", top: "45%", fontSize: "1.8rem", opacity: 0.2 }}>&#9833;</span>
          <span className="float-note n4" style={{ position: "absolute", right: "-65px", top: "40%", fontSize: "2.2rem", opacity: 0.3 }}>&#9835;</span>
          <span className="float-note n5" style={{ position: "absolute", left: "-55px", top: "75%", fontSize: "1.6rem", opacity: 0.25 }}>&#9834;</span>
          <span className="float-note n6" style={{ position: "absolute", right: "-45px", top: "80%", fontSize: "1.4rem", opacity: 0.2 }}>&#9833;</span>
          <Reveal delay={0}><div style={{ fontSize: "clamp(2.5rem,8vw,6rem)", color: warm }}>See Shell</div></Reveal>
          <Reveal delay={0.2}><div style={{ fontSize: "clamp(2.5rem,8vw,6rem)", color: gold, marginTop: 8 }}>We Shall</div></Reveal>
          <Reveal delay={0.4}><div style={{ fontSize: "clamp(2.5rem,8vw,6rem)", color: gold, marginTop: 8 }}>Fill Up</div></Reveal>
          <Reveal delay={0.6}><div style={{ fontSize: "clamp(2.5rem,8vw,6rem)", color: red, marginTop: 8 }}>No More!</div></Reveal>
        </div>
        <Spacer h={40} />
        <Reveal delay={0.8}><div style={{ fontFamily: heading, fontSize: "clamp(1.3rem,2.8vw,1.8rem)", fontWeight: 900, color: warm, marginTop: 28, lineHeight: 1.4 }}>Say it loud. Say it proud.<br />And get the gas out of our government.</div></Reveal>
      </Slide>

      {/* THE THESIS */}
      <Slide>
        <Big size="clamp(1.5rem,3vw,2.2rem)" weight={400} color={soft}>Can We Leverage</Big>
        <Spacer h={12} />
        <Big size="clamp(2.5rem,7vw,5rem)">One Company</Big>
        <Spacer h={12} />
        <Big size="clamp(1.5rem,3vw,2.2rem)" weight={400} color={soft}>To Control</Big>
        <Spacer h={12} />
        <Big size="clamp(2.5rem,7vw,5rem)" color={gold}>Them All?</Big>
        <Spacer h={48} />
        <Reveal delay={0.3}><Big size="clamp(4rem,12vw,9rem)" color={dark}>Yes We Can!</Big></Reveal>
      </Slide>

      {/* HOW IT WORKS — Shell centered */}
      <Slide bg={dark} style={{ color: warm }}>
        <Reveal>
          <div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.3em", color: soft, marginBottom: 32 }}>HERE'S HOW</div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ background: "rgba(155,58,58,0.15)", border: `2px solid ${red}`, borderRadius: 16, padding: "36px 48px", marginBottom: 24, maxWidth: 600 }}>
            <img src="/shell-logo.png" alt="Shell" style={{ width: 160, height: "auto", display: "block", margin: "0 auto 16px" }} />
            <div style={{ fontFamily: mono, fontSize: "0.85rem", color: soft, letterSpacing: "0.2em", marginBottom: 8 }}>STEP 01</div>
            <div style={{ fontFamily: heading, fontSize: "clamp(2.5rem,7vw,4.5rem)", fontWeight: 900, color: warm, lineHeight: 1.1 }}>
              See <span style={{ color: red }}>Shell.</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="pulse-button" style={{ background: "rgba(212,175,55,0.12)", border: `2px solid ${gold}`, borderRadius: 16, padding: "44px 48px", marginBottom: 24, maxWidth: 600, transform: "scale(1.05)" }}>
            <div className="step-icon-2" style={{ fontSize: "3.5rem", marginBottom: 12 }}>🚗💨</div>
            <div style={{ fontFamily: mono, fontSize: "0.85rem", color: gold, letterSpacing: "0.2em", marginBottom: 8 }}>STEP 02</div>
            <div style={{ fontFamily: heading, fontSize: "clamp(3.5rem,10vw,7rem)", fontWeight: 900, lineHeight: 1 }}>
              <span className="gold-shimmer">Leave Shell.</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <div style={{ background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.15)", borderRadius: 16, padding: "36px 48px", maxWidth: 600 }}>
            <div className="step-icon-3" style={{ fontSize: "3.5rem", marginBottom: 12 }}>✅</div>
            <div style={{ fontFamily: mono, fontSize: "0.85rem", color: soft, letterSpacing: "0.2em", marginBottom: 8 }}>STEP 03</div>
            <div style={{ fontFamily: heading, fontSize: "clamp(2.5rem,7vw,4.5rem)", fontWeight: 900, color: warm, lineHeight: 1.1 }}>
              Fill up <span style={{ color: gold }}>Anywhere Else.</span>
            </div>
          </div>
        </Reveal>
        <Spacer h={40} />
        <Reveal delay={0.7}>
          <div style={{ fontFamily: heading, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, fontStyle: "italic" }}>
            <span className="gold-shimmer">That's it. That's the whole movement.</span>
          </div>
        </Reveal>
        <Spacer h={20} />
        <Reveal delay={0.85}>
          <div style={{ fontFamily: heading, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, fontStyle: "italic", color: warm }}>They Must Comply — <span style={{ color: gold }}>Or We Will Drive By.</span></div>
        </Reveal>
      </Slide>

      {/* HOW THIS WORKS */}
      <Slide bg={dark} style={{ color: warm }}>
        <Reveal><div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.3em", color: soft, marginBottom: 20 }}>HOW THIS WORKS</div></Reveal>
        <Reveal delay={0.1}>
          <div style={{ fontFamily: body, fontSize: "clamp(1.15rem,2.5vw,1.45rem)", color: "rgba(245,240,232,0.8)", lineHeight: 1.9, maxWidth: 640 }}>
            By all of us skipping past <span style={{ color: red, fontWeight: 700 }}>Shell</span>,<br />we force CEO <span style={{ color: warm, fontWeight: 700 }}>Wael Sawan</span> to take the pledge...<br /><br />
            <span style={{ color: gold, fontWeight: 700, fontSize: "1.15em", fontStyle: "italic" }}>"We Pledge to Get Our Money<br />Out of Your Government!"</span><br /><br />
            <span style={{ color: "rgba(245,240,232,0.55)", fontSize: "0.95em" }}>On YouTube. For all of us to see.</span>
          </div>
        </Reveal>
        <Spacer h={40} />
        <Reveal delay={0.3}>
          <div style={{ fontFamily: heading, fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 900, color: warm, lineHeight: 1.4 }}>
            And for Candidates in the<br />upcoming elections:
          </div>
        </Reveal>
        <Spacer h={32} />
        <Reveal delay={0.4}>
          <div style={{ background: "rgba(212,175,55,0.08)", border: `2px solid ${gold}`, borderRadius: 16, padding: "36px 44px", maxWidth: 600 }}>
            <div style={{ fontFamily: mono, fontSize: "0.85rem", letterSpacing: "0.25em", color: gold, marginBottom: 20, textAlign: "center" }}>THE CANDIDATE PLEDGE</div>
            <div style={{ fontFamily: heading, fontSize: "clamp(1.2rem,2.5vw,1.5rem)", fontWeight: 900, color: warm, fontStyle: "italic", lineHeight: 1.6, textAlign: "center", marginBottom: 24 }}>
              "I pledge to co-sponsor legislation to:"
            </div>
            <div style={{ fontFamily: body, fontSize: "clamp(1rem,2vw,1.15rem)", color: "rgba(245,240,232,0.8)", lineHeight: 2.2 }}>
              <span style={{ color: gold, fontWeight: 700 }}>1.</span> Pass the <span style={{ color: warm, fontWeight: 700 }}>DISCLOSE Act</span> — force all political spending over $10K into the open.<br />
              <span style={{ color: gold, fontWeight: 700 }}>2.</span> Make <span style={{ color: warm, fontWeight: 700 }}>fossil fuel subsidies conditional</span> — any company that spends on politics loses their Section 263(c) tax deduction. Drill or lobby. Not both.<br />
              <span style={{ color: gold, fontWeight: 700 }}>3.</span> Make <span style={{ color: warm, fontWeight: 700 }}>lobbying non-deductible</span> — corporations can't write off buying Congress.<br />
              <span style={{ color: gold, fontWeight: 700 }}>4.</span> Support a <span style={{ color: warm, fontWeight: 700 }}>constitutional amendment</span> to overturn Citizens United.
            </div>
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <div style={{ fontFamily: heading, fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 700, color: gold }}>35 Senate seats up in November 2026.</div>
              <div style={{ fontFamily: body, fontSize: "0.95rem", color: "rgba(245,240,232,0.5)", marginTop: 6 }}>On this, there are no sides. Just Us vs. Them.</div>
            </div>
          </div>
        </Reveal>
        <Spacer h={40} />
        <Reveal delay={0.5}>
          <div style={{ background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.12)", borderRadius: 12, padding: "32px 40px", maxWidth: 560 }}>
            <div style={{ fontFamily: heading, fontSize: "clamp(1.3rem,3vw,1.8rem)", color: "rgba(245,240,232,0.75)", lineHeight: 2.2, fontWeight: 700 }}>
              We keep a list of companies...<br />
              Starting with <span style={{ color: red }}>Shell.</span><br /><br />
              And when Shell takes the pledge,<br />
              we move on to the <span style={{ color: gold }}>next company.</span><br />
              <span style={{ color: "rgba(245,240,232,0.4)", fontSize: "0.85em" }}>Next up: ExxonMobil. Then BP. Then Chevron.</span><br /><br />
              And we keep a list of <span style={{ color: gold }}>Candidates...</span><br />
              from all sides.<br />
              The ones who take the pledge<br />
              get financial support from <span style={{ color: gold }}>All of Us.</span><br /><br />
              <span style={{ color: warm }}>And we keep going.</span><br />
              <span style={{ color: warm }}>One by one.</span><br />
              <span style={{ color: warm }}>Till they all comply.</span>
            </div>
            <Spacer h={24} />
            <div style={{ fontFamily: heading, fontSize: "clamp(1.8rem,4.5vw,3rem)", fontWeight: 900, fontStyle: "italic", color: gold, lineHeight: 1.4 }}>
              AND WE TAKE OUR<br />
              GOVERNMENT BACK!
            </div>
          </div>
        </Reveal>
      </Slide>

      {/* 1. HERO */}
      <Slide style={{ minHeight: "auto", padding: "clamp(60px,10vw,100px) 32px" }}>
        <Big size="clamp(3.5rem,10vw,8rem)">My Voice + Your Voice</Big>
        <Reveal delay={0.3}><div style={{ fontFamily: heading, fontSize: "clamp(2rem,5vw,3.5rem)", fontStyle: "italic", color: gold, marginTop: 24 }}>= Our Country</div></Reveal>
      </Slide>

      {/* 2. NOT CORPORATIONS */}
      <Slide style={{ minHeight: "auto", padding: "clamp(60px,10vw,100px) 32px" }}>
                <div style={{ fontFamily: heading, fontWeight: 900, lineHeight: 1.1, textAlign: "center" }}>
          {["CORPORATIONS.", "FOREIGN NATIONS.", "ALGORITHMS.", "AI."].map((word, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? 48 : 0 }}>
              <div style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)", color: soft, fontWeight: 400, marginBottom: 4 }}>NOT</div>
              <div style={{ fontSize: "clamp(2.5rem,7vw,5rem)" }}>{word}</div>
            </div>
          ))}
        </div>
      </Slide>

      {/* 3. CITIZENS UNITED */}
      <Slide style={{ minHeight: "auto", padding: "clamp(60px,10vw,100px) 32px" }}>
        <Big size="clamp(1.5rem,3vw,2.2rem)" weight={400} color={soft}>CITIZENS UNITED = CITIZENS DIVIDED<br />BECAUSE THEY KNOW</Big>
        <FlashZero />
      </Slide>


      {/* 5. AMERICA IS SICK */}
      <Slide bg={dark} style={{ color: warm }}>
        <Reveal>
          <div style={{ fontSize: "4rem", marginBottom: 16 }}>🏥</div>
        </Reveal>
        <Big size="clamp(3rem,9vw,7rem)" color={warm}>America is sick.</Big>
        <Spacer h={40} />
        <Reveal delay={0.2}>
          <div style={{ fontFamily: heading, fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 700, color: "rgba(245,240,232,0.7)", lineHeight: 1.5 }}>
            Corporate Political Spending Is A
          </div>
        </Reveal>
        <Spacer h={16} />
        <Reveal delay={0.35}>
          <div style={{ fontFamily: heading, fontSize: "clamp(3rem,9vw,6rem)", fontWeight: 900, color: red, lineHeight: 1.1 }}>
            $5 BILLION
          </div>
          <div style={{ fontFamily: heading, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, color: red, marginTop: 4 }}>
            A-YEAR TUMOR
          </div>
        </Reveal>
        <Spacer h={24} />
        <Reveal delay={0.5}>
          <div style={{ fontFamily: heading, fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 700, color: gold, lineHeight: 1.4 }}>
            On Our Democracy!
          </div>
        </Reveal>
        <Spacer h={16} />
        <Reveal delay={0.6}><div style={{ fontFamily: mono, fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(245,240,232,0.35)" }}>
          SOURCE: <a href="https://www.opensecrets.org/federal-lobbying" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "underline" }}>OPENSECRETS</a> — lobbying ($4.2B) + outside spending ($1.1B), 2024 cycle
        </div></Reveal>
      </Slide>

      {/* 6. STAGE 4 */}
      <Slide bg={dark} style={{ color: warm }}>
        <Big size="clamp(1.6rem,3.5vw,2.5rem)" color={warm}>Citizens United has given America...</Big>
        <Reveal delay={0.1}><div style={{ fontFamily: heading, fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 900, color: red, marginTop: 8 }}>Stage 4 Cancer.</div></Reveal>
        <Spacer h={48} />
        <Reveal delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 700, width: "100%" }}>
            {[
            { icon: "❤️", title: "Healthcare", hit: "They take 30%", result: "and dictate the use of the other 70%." },
            { icon: "🤖", title: "Technology", hit: "They build machines to trick us", result: "till we no longer know what to believe." },
            { icon: "🏛️", title: "Politics", hit: "They own the lawmakers", result: "so the rules only apply to you." },
            { icon: "📺", title: "Media", hit: "They fill your feed with rage", result: "now all you feel is hate." }].
            map((item, i) =>
            <div key={i} style={{ background: "rgba(245,240,232,0.04)", border: "1px solid rgba(245,240,232,0.08)", borderRadius: 12, padding: "28px 20px", textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: heading, fontSize: "clamp(1.2rem,3vw,1.6rem)", fontWeight: 900, color: gold, marginBottom: 10 }}>{item.title}</div>
                <div style={{ fontFamily: heading, fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 700, color: warm }}>{item.hit}</div>
                <div style={{ fontFamily: body, fontSize: "clamp(0.9rem,1.8vw,1.05rem)", color: red, fontWeight: 600, marginTop: 6, lineHeight: 1.5 }}>{item.result}</div>
              </div>
            )}
          </div>
        </Reveal>
      </Slide>

      {/* THE INVITATION */}
      <Slide>
        <Reveal><div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.3em", color: soft, marginBottom: 24 }}>TO THE PEOPLE SICK OF WAR WORLDWIDE</div></Reveal>
        <Big size="clamp(2.2rem,6vw,4.5rem)">This isn't about their Profit.</Big>
        <Spacer h={12} />
        <Reveal delay={0.1}><div style={{ fontFamily: body, fontSize: "clamp(0.85rem,1.5vw,1rem)", color: soft, fontStyle: "italic" }}>we won't make a dent</div></Reveal>
        <Spacer h={12} />
        <Big size="clamp(2.2rem,6vw,4.5rem)">It's about their Brand.</Big>
        <Spacer h={32} />
        <Reveal delay={0.2}><LogoScroll /></Reveal>
        <Spacer h={32} />
        <Reveal delay={0.3}>
          <Big size="clamp(2rem,5vw,3.5rem)">And about us finally taking a stand together.</Big>
        </Reveal>
        <Spacer h={32} />
        <Reveal delay={0.55}>
          <Big size="clamp(3rem,8vw,6rem)">We Are The<br /><span style={{ whiteSpace: "nowrap" }}><span style={{ textDecoration: "underline", textDecorationColor: gold, textUnderlineOffset: "6px" }}>UNITED</span> States!</span></Big>
        </Reveal>
      </Slide>

      {/* RECEIPT 1 — THE LIFEBOAT */}
      <Slide bg={dark} style={{ color: warm }}>
        <Reveal><div style={{ fontFamily: mono, fontSize: "clamp(1.2rem,2.5vw,1.6rem)", letterSpacing: "0.3em", color: soft, marginBottom: 8 }}>AND IN CASE YOU DON'T KNOW WHAT THEIR MONEY DOES TO YOU</div></Reveal>
        <Reveal><div style={{ fontFamily: heading, fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 900, color: gold, marginBottom: 18 }}>The Receipts</div></Reveal>
        <Reveal><div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.25em", color: gold, marginBottom: 18 }}>№ 01 — THE LIFEBOAT</div></Reveal>
        <Big size="clamp(1.5rem,3.2vw,2.2rem)" color={warm} weight={400}>In 1991, Shell made a film called</Big>
        <Reveal delay={0.15}><div style={{ fontFamily: heading, fontSize: "clamp(2rem,5.5vw,4rem)", fontWeight: 900, color: gold, fontStyle: "italic", margin: "12px 0" }}>"Climate of Concern."</div></Reveal>
        <Reveal delay={0.3}>
          <div style={{ fontFamily: body, fontSize: "clamp(1.05rem,2.2vw,1.3rem)", color: "rgba(245,240,232,0.75)", lineHeight: 1.8, maxWidth: 620, marginTop: 8 }}>
            They warned of <span style={{ color: warm, fontWeight: 700 }}>floods, extreme weather, rising seas.</span><br /><br />
            Then they spent <span style={{ color: gold, fontWeight: 700 }}>three decades</span> funding climate denial.
          </div>
        </Reveal>
        <Spacer h={28} />
        <Reveal delay={0.5}>
          <div style={{ background: "rgba(155,58,58,0.12)", border: `1px solid ${red}`, borderRadius: 12, padding: "24px 32px", maxWidth: 560 }}>
            <div style={{ fontFamily: heading, fontSize: "clamp(1.2rem,2.8vw,1.6rem)", fontWeight: 700, color: warm, lineHeight: 1.5 }}>
              And quietly raised their own oil rigs<br />
              <span style={{ color: red }}>higher out of the water!</span>
            </div>
            <div style={{ fontFamily: body, fontSize: "clamp(0.95rem,1.8vw,1.1rem)", color: "rgba(245,240,232,0.6)", marginTop: 12, fontStyle: "italic" }}>
              They built themselves a lifeboat<br />while telling us the ship wasn't sinking.
            </div>
          </div>
        </Reveal>
        <Spacer h={20} />
        <Reveal delay={0.7}><div style={{ fontFamily: mono, fontSize: "0.85rem", letterSpacing: "0.15em", color: "rgba(245,240,232,0.35)", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 16px" }}>
          SOURCE:
          <a href="https://www.youtube.com/watch?v=0VOWi8oVXmo" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "underline" }}>SHELL FILM (1991)</a> ·
          <a href="https://www.latimes.com/environment/story/2024-01-30/oil-companies-climate-change-fossil-fuels" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "underline" }}>LA TIMES</a> ·
          <a href="https://www.theguardian.com/environment/2017/feb/28/shell-knew-oil-giants-1991-film-warned-climate-change-danger" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "underline" }}>THE GUARDIAN</a>
        </div></Reveal>
      </Slide>

      {/* RECEIPT 2 — THE CELEBRATION */}
      <Slide bg="#FAF6F0">
        <Reveal><div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.3em", color: soft, marginBottom: 14 }}>RECEIPT № 02 — THE CELEBRATION</div></Reveal>
        <Big size="clamp(1.5rem,3.2vw,2.2rem)" weight={400} color={soft}>In 2022, while you were choosing<br />between groceries and gas...</Big>
        <Spacer h={24} />
        <Reveal delay={0.2}>
          <div style={{ fontFamily: heading, fontSize: "clamp(3rem,9vw,7rem)", fontWeight: 900, color: red, lineHeight: 1 }}>
            $39.9 BILLION
          </div>
        </Reveal>
        <Spacer h={12} />
        <Reveal delay={0.35}>
          <div style={{ fontFamily: heading, fontSize: "clamp(1.2rem,2.8vw,1.6rem)", fontWeight: 700, color: dark, fontStyle: "italic" }}>
            Shell's highest profit in <span style={{ color: gold }}>115 years.</span>
          </div>
        </Reveal>
        <Spacer h={32} />
        <Reveal delay={0.5}>
          <div style={{ fontFamily: body, fontSize: "clamp(1.05rem,2.2vw,1.3rem)", color: soft, lineHeight: 1.8, maxWidth: 600 }}>
            They didn't lower prices.<br />
            They didn't increase supply.<br />
            <span style={{ color: dark, fontWeight: 700 }}>They bought back their own stock.</span>
          </div>
        </Reveal>
        <Spacer h={24} />
        <Reveal delay={0.7}>
          <div style={{ fontFamily: heading, fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: 900, color: gold, fontStyle: "italic", maxWidth: 600 }}>
            Our inflation wasn't an accident.<br />It was their business model!
          </div>
        </Reveal>
        <Spacer h={20} />
        <Reveal delay={0.85}><div style={{ fontFamily: mono, fontSize: "0.85rem", letterSpacing: "0.15em", color: "rgba(26,24,20,0.35)", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 16px" }}>
          SOURCE:
          <a href="https://www.shell.com/investors/results-and-reporting/annual-reports/2022.html" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(26,24,20,0.5)", textDecoration: "underline" }}>SHELL Q4 2022</a> ·
          <a href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=SHEL&type=10-K" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(26,24,20,0.5)", textDecoration: "underline" }}>SEC FILINGS</a> ·
          <a href="https://www.bls.gov/cpi/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(26,24,20,0.5)", textDecoration: "underline" }}>BLS CPI DATA</a>
        </div></Reveal>
      </Slide>

      {/* RECEIPT 3 — THE DOUBLE CHARGE */}
      <Slide bg={dark} style={{ color: warm }}>
        <Reveal><div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.3em", color: soft, marginBottom: 14 }}>RECEIPT № 03 — THE DOUBLE CHARGE</div></Reveal>
        <Big size="clamp(1.5rem,3.2vw,2.2rem)" color={warm} weight={400}>Every gallon you buy,<br />you pay for twice.</Big>
        <Spacer h={36} />
        <Reveal delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, maxWidth: 640, width: "100%" }}>
            <div style={{ background: "rgba(245,240,232,0.05)", border: "1px solid rgba(245,240,232,0.1)", borderRadius: 12, padding: "28px 20px" }}>
              <div style={{ fontFamily: mono, fontSize: "0.85rem", letterSpacing: "0.2em", color: soft, marginBottom: 10 }}>AT THE PUMP</div>
              <div style={{ fontFamily: heading, fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 900, color: warm }}>$40</div>
              <div style={{ fontFamily: body, fontSize: "0.95rem", color: "rgba(245,240,232,0.55)", marginTop: 6 }}>you give them directly</div>
            </div>
            <div style={{ background: "rgba(212,175,55,0.08)", border: `1px solid ${gold}`, borderRadius: 12, padding: "28px 20px" }}>
              <div style={{ fontFamily: mono, fontSize: "0.85rem", letterSpacing: "0.2em", color: gold, marginBottom: 10 }}>ON YOUR TAXES</div>
              <div style={{ fontFamily: heading, fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 900, color: gold }}>$20B / yr</div>
              <div style={{ fontFamily: body, fontSize: "0.95rem", color: "rgba(245,240,232,0.55)", marginTop: 6 }}>oil subsidies you cover</div>
            </div>
          </div>
        </Reveal>
        <Spacer h={32} />
        <Reveal delay={0.45}>
          <div style={{ fontFamily: body, fontSize: "clamp(1.05rem,2.2vw,1.3rem)", color: "rgba(245,240,232,0.75)", lineHeight: 1.8, maxWidth: 620 }}>
            They spend <span style={{ color: gold, fontWeight: 700 }}>$7M/yr lobbying Congress</span> to keep a tax loophole from <span style={{ color: warm, fontWeight: 700 }}>1913</span> alive.<br /><br />
            <span style={{ color: gold, fontWeight: 700, fontStyle: "italic" }}>That's not a business. That's a machine built to tax you.</span>
          </div>
        </Reveal>
        <Spacer h={20} />
        <Reveal delay={0.65}><div style={{ fontFamily: mono, fontSize: "0.85rem", letterSpacing: "0.15em", color: "rgba(245,240,232,0.35)", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 16px" }}>
          SOURCE:
          <a href="https://www.opensecrets.org/industries/indus?ind=E01" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "underline" }}>OPENSECRETS</a> ·
          <a href="https://www.eesi.org/papers/view/fact-sheet-fossil-fuel-subsidies-a-closer-look-at-tax-breaks-and-societal-costs" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "underline" }}>EESI</a> ·
          <a href="https://www.law.cornell.edu/uscode/text/26/263" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "underline" }}>IRS TAX CODE § 263(c)</a>
        </div></Reveal>
      </Slide>


      {/* 7. WE ARE THE EQUATION */}
      <Slide>
        <Big size="clamp(1.5rem,3vw,2.2rem)" weight={400} color={soft}>But here's what they forgot...</Big>
        <Spacer h={40} />
        <Big size="clamp(2.2rem,6vw,4.5rem)">We the People are their...</Big>
        <Spacer h={40} />
        <Reveal delay={0.2}><SplitFlap /></Reveal>
      </Slide>

      {/* THE PLEDGE SCOREBOARD */}
      <Slide bg={dark} style={{ color: warm }}>
        <Reveal><div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.3em", color: soft, marginBottom: 24 }}>THE PLEDGE SCOREBOARD</div></Reveal>
        <Big size="clamp(2rem,5vw,3.5rem)" color={warm}>Who has the courage?</Big>
        <Spacer h={48} />

        {/* THREE COUNTERS */}
        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 640, width: "100%", marginBottom: 40 }}>
            <div style={{ background: "rgba(245,240,232,0.04)", border: "1px solid rgba(245,240,232,0.1)", borderRadius: 12, padding: "28px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: mono, fontSize: "0.85rem", letterSpacing: "0.2em", color: soft, marginBottom: 10 }}>COMPANIES</div>
              <div style={{ fontFamily: heading, fontSize: "clamp(2.5rem,7vw,4rem)", fontWeight: 900, color: gold, lineHeight: 1 }}>0</div>
              <div style={{ fontFamily: body, fontSize: "0.85rem", color: "rgba(245,240,232,0.4)", marginTop: 8 }}>pledged</div>
            </div>
            <div style={{ background: "rgba(245,240,232,0.04)", border: "1px solid rgba(245,240,232,0.1)", borderRadius: 12, padding: "28px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: mono, fontSize: "0.85rem", letterSpacing: "0.2em", color: soft, marginBottom: 10 }}>CANDIDATES</div>
              <div style={{ fontFamily: heading, fontSize: "clamp(2.5rem,7vw,4rem)", fontWeight: 900, color: gold, lineHeight: 1 }}>0</div>
              <div style={{ fontFamily: body, fontSize: "0.85rem", color: "rgba(245,240,232,0.4)", marginTop: 8 }}>pledged</div>
            </div>
            <a href="#signup" style={{ background: "rgba(212,175,55,0.08)", border: `1px solid ${gold}`, borderRadius: 12, padding: "28px 16px", textAlign: "center", textDecoration: "none", display: "block", cursor: "pointer" }}>
              <div style={{ fontFamily: mono, fontSize: "0.85rem", letterSpacing: "0.2em", color: gold, marginBottom: 10 }}>PEOPLE</div>
              <Counter />
              <div style={{ fontFamily: body, fontSize: "0.85rem", color: "rgba(245,240,232,0.4)", marginTop: 8 }}>of 100,000 goal</div>
              <div style={{ fontFamily: heading, fontSize: "0.9rem", fontWeight: 700, color: gold, marginTop: 12, textDecoration: "underline", textUnderlineOffset: "4px" }}>Join ↓</div>
            </a>
          </div>
        </Reveal>

        {/* SHELL HIGHLIGHT */}
        <Reveal delay={0.2}>
          <div style={{
            maxWidth: 560, margin: "0 auto 40px", padding: "32px 40px",
            background: "rgba(155,58,58,0.15)", border: `2px solid ${red}`, borderRadius: 16,
            textAlign: "center"
          }}>
            <div style={{ fontFamily: mono, fontSize: "0.85rem", letterSpacing: "0.25em", color: soft, marginBottom: 12 }}>CURRENT TARGET</div>
            <img src="/shell-logo.png" alt="Shell" style={{ width: 100, height: "auto", display: "block", margin: "0 auto 16px" }} />
            <div style={{ fontFamily: heading, fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 900, color: red }}>Shell has not pledged.</div>
            <div style={{ fontFamily: body, fontSize: "1rem", color: "rgba(245,240,232,0.5)", marginTop: 8 }}>12,283 stations · $39.9B profit (2022) · $0 pledged</div>
          </div>
        </Reveal>

        {/* CANDIDATE LEDGER */}
        <Reveal delay={0.25}>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "left" }}>
            <div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.25em", color: gold, marginBottom: 20, textAlign: "center" }}>PUMP UP YOUR CANDIDATE</div>
            <div style={{
              background: "rgba(245,240,232,0.04)", border: "1px solid rgba(245,240,232,0.1)",
              borderRadius: 12, overflow: "hidden"
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 16, padding: "14px 24px", borderBottom: "1px solid rgba(245,240,232,0.1)", background: "rgba(245,240,232,0.03)" }}>
                <div style={{ fontFamily: mono, fontSize: "0.8rem", letterSpacing: "0.15em", color: soft }}>CANDIDATE</div>
                <div style={{ fontFamily: mono, fontSize: "0.8rem", letterSpacing: "0.15em", color: soft }}>VIDEO</div>
                <div style={{ fontFamily: mono, fontSize: "0.8rem", letterSpacing: "0.15em", color: soft }}>STATUS</div>
              </div>
              <div style={{ padding: "40px 24px", textAlign: "center" }}>
                <div style={{ fontFamily: heading, fontSize: "clamp(1.2rem,2.5vw,1.5rem)", fontWeight: 700, color: "rgba(245,240,232,0.25)", fontStyle: "italic" }}>
                  No candidates have pledged yet.
                </div>
                <div style={{ fontFamily: body, fontSize: "0.95rem", color: "rgba(245,240,232,0.15)", marginTop: 8 }}>
                  Be the first. The country is watching.
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Spacer h={40} />

        {/* SUBMIT */}
        <Reveal delay={0.4}>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontFamily: body, fontSize: "clamp(1rem,2vw,1.15rem)", color: "rgba(245,240,232,0.6)", lineHeight: 1.8, marginBottom: 20 }}>
              Post a video on your <span style={{ fontWeight: 700, color: warm }}>verified YouTube account</span> taking the pledge.<br />
              Submit the link. Once verified: <span style={{ color: "#22c55e", fontWeight: 700, fontSize: "1.2em" }}>&#10003;</span>
            </div>
            <div style={{ display: "flex", gap: 12, maxWidth: 480, margin: "0 auto" }}>
              <input type="url" placeholder="Paste YouTube pledge link..." style={{
                flex: 1, padding: "14px 20px", borderRadius: 6, border: "1px solid rgba(245,240,232,0.2)",
                fontFamily: body, fontSize: "1rem", background: "rgba(245,240,232,0.05)", color: warm,
                outline: "none"
              }} />
              <button style={{
                padding: "14px 28px", background: gold, color: dark, border: "none", borderRadius: 6,
                fontFamily: heading, fontSize: "1rem", fontWeight: 700, cursor: "pointer"
              }}>Submit</button>
            </div>
          </div>
        </Reveal>

        <Spacer h={40} />
        <Reveal delay={0.5}>
          <div style={{ fontFamily: heading, fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: 900, fontStyle: "italic", color: gold }}>
            The empty ledger is the statement.<br />Until someone has the courage to go first.
          </div>
        </Reveal>
      </Slide>

      {/* A NOTE ABOUT THE FRANCHISEES */}
      <Slide bg={dark} style={{ color: warm }}>
        <Reveal><div style={{ fontFamily: mono, fontSize: "1.1rem", letterSpacing: "0.3em", color: soft, marginBottom: 24 }}>AN IMPORTANT NOTE ABOUT THE FRANCHISEES</div></Reveal>
        <Big size="clamp(2.2rem,6vw,4.5rem)" color={warm}>We know.</Big>
        <Spacer h={32} />
        <Reveal delay={0.15}>
          <div style={{ fontFamily: body, fontSize: "clamp(1.2rem,2.5vw,1.5rem)", color: "rgba(245,240,232,0.8)", lineHeight: 1.9, maxWidth: 620 }}>
            The hard workers and franchise owners<br />
            aren't the enemy.<br /><br />
            They wake up <span style={{ color: warm, fontWeight: 700 }}>early</span> and work really <span style={{ color: warm, fontWeight: 700 }}>late.</span><br />
            They built something from <span style={{ color: warm, fontWeight: 700 }}>nothing.</span><br />
            They serve their community <span style={{ color: warm, fontWeight: 700 }}>every single day.</span>
          </div>
        </Reveal>
        <Spacer h={40} />
        <Reveal delay={0.3}>
          <div style={{ background: "rgba(212,175,55,0.08)", border: `2px solid ${gold}`, borderRadius: 16, padding: "36px 44px", maxWidth: 580 }}>
            <div style={{ fontFamily: body, fontSize: "clamp(1.05rem,2.2vw,1.3rem)", color: "rgba(245,240,232,0.65)", lineHeight: 1.8 }}>
              Honk when you drive past. Wave.<br />
              Let them know this isn't about them —<br />
              it's about the name on the sign above their head.<br /><br />
              <span style={{ color: warm, fontWeight: 700 }}>When the parent company pledges,<br />we come back. Louder than before.</span>
            </div>
          </div>
        </Reveal>
        <Spacer h={40} />
        <Reveal delay={0.5}>
          <Big size="clamp(2rem,5vw,3.5rem)" color={gold}>The pain is temporary.</Big>
          <Spacer h={8} />
          <Big size="clamp(2rem,5vw,3.5rem)" color={warm}>The change is forever.</Big>
        </Reveal>
      </Slide>

      {/* SIGNUP + SUPPORT (merged) */}
      <section id="signup" style={{ padding: "clamp(80px,12vw,140px) 32px", background: dark, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Reveal><Counter /></Reveal>
          <Reveal delay={0.1}><div style={{ fontFamily: body, fontSize: "1rem", color: soft, marginTop: 8 }}>people in the equation and growing</div></Reveal>
          <Spacer h={48} />
          <Reveal><Big size="clamp(1.5rem,3vw,2.2rem)" color={gold}>Add yourself.</Big></Reveal>
          <Spacer h={24} />
          <Reveal delay={0.1}><EmailSignup /></Reveal>
          <Spacer h={48} />
          <Reveal delay={0.2}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <a href="https://patreon.com" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block", padding: "14px 36px", background: gold, color: dark, borderRadius: 6, textDecoration: "none",
                fontFamily: heading, fontSize: "1rem", fontWeight: 700
              }}>Support on Patreon</a>
              </div>
              <div style={{ fontFamily: body, fontSize: "0.8rem", color: "rgba(245,240,232,0.35)", marginTop: 12, maxWidth: 480, margin: "12px auto 16px" }}>
                100% goes to: digital ads targeting Shell's brand keywords, legal support for franchisees seeking to rebrand, and campaign infrastructure.
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Pass the Pump — The Power of Zero", text: "See Shell. Leave Shell. Buy Gas No More.", url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  const btn = document.getElementById("share-btn");
                  if (btn) {btn.textContent = "✓ Copied!";setTimeout(() => {btn.textContent = "Share This";}, 2000);}
                }
              }} id="share-btn" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 36px", background: "transparent",
                color: warm, border: `2px solid rgba(245,240,232,0.3)`, borderRadius: 6,
                fontFamily: heading, fontSize: "1rem", fontWeight: 700,
                cursor: "pointer"
              }}>Share This</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLOSING */}
      <Slide>
        <Big size="clamp(2.5rem,7vw,5rem)" color={gold}>Pass the Pump.</Big>
        <Spacer h={20} />
        <Sub color={soft}>One company at a time. Until they all comply.</Sub>
        <Spacer h={48} />
        <Reveal delay={0.3}><div style={{ fontFamily: heading, fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontStyle: "italic", fontWeight: 700, color: soft }}>They've been playing a shell game with our money.<br />Now we're playing one with their brand.</div></Reveal>
      </Slide>

    </div>);
};

export default Index;