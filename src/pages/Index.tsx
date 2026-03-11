import { useEffect, useRef, memo, useState, useCallback, ReactNode, CSSProperties } from "react";

const gold = "#D4AF37";
const red = "#9B3A3A";
const dark = "#1A1814";
const warm = "#F5F0E8";
const soft = "#8A8478";

const heading = "Playfair Display,Georgia,serif";
const body = "Source Serif 4,Georgia,serif";
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
      <span style={{ color: red }}>we all lose</span>
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
      <span style={{ fontFamily: heading, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 900, color: dark }}>me </span>
      <span className="neq-symbol" style={{ fontFamily: heading, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 900, display: "inline-block" }}>≠</span>
      <span style={{ fontFamily: heading, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 900, color: dark }}> you</span>
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
      <span style={{ fontFamily: heading, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 400, color: dark }}>We the people are their:</span>
      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 280, height: 60, background: "#111", borderRadius: 6,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        border: "1px solid #333", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.08)", zIndex: 2 }} />
        <div style={{
          fontFamily: mono, fontSize: "clamp(1.1rem,2.2vw,1.5rem)",
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

const stateInfo: Record<string, {name: string;pop: string;ev: number;ratified: boolean;leg: string;}> = {
  AL: { name: "Alabama", pop: "5.1M", ev: 9, ratified: false, leg: "R supermajority" },
  AK: { name: "Alaska", pop: "733K", ev: 3, ratified: false, leg: "R majority" },
  AZ: { name: "Arizona", pop: "7.4M", ev: 11, ratified: false, leg: "R majority" },
  AR: { name: "Arkansas", pop: "3.0M", ev: 6, ratified: false, leg: "R supermajority" },
  CA: { name: "California", pop: "39.0M", ev: 54, ratified: true, leg: "D supermajority" },
  CO: { name: "Colorado", pop: "5.9M", ev: 10, ratified: true, leg: "D trifecta" },
  CT: { name: "Connecticut", pop: "3.6M", ev: 7, ratified: true, leg: "D trifecta" },
  DE: { name: "Delaware", pop: "1.0M", ev: 3, ratified: true, leg: "D trifecta" },
  DC: { name: "Washington DC", pop: "689K", ev: 3, ratified: true, leg: "D council" },
  FL: { name: "Florida", pop: "22.6M", ev: 30, ratified: false, leg: "R supermajority" },
  GA: { name: "Georgia", pop: "11.0M", ev: 16, ratified: false, leg: "R trifecta" },
  HI: { name: "Hawaii", pop: "1.4M", ev: 4, ratified: true, leg: "D supermajority" },
  ID: { name: "Idaho", pop: "2.0M", ev: 4, ratified: false, leg: "R supermajority" },
  IL: { name: "Illinois", pop: "12.5M", ev: 19, ratified: true, leg: "D trifecta" },
  IN: { name: "Indiana", pop: "6.9M", ev: 11, ratified: false, leg: "R supermajority" },
  IA: { name: "Iowa", pop: "3.2M", ev: 6, ratified: false, leg: "R trifecta" },
  KS: { name: "Kansas", pop: "2.9M", ev: 6, ratified: false, leg: "R supermajority" },
  KY: { name: "Kentucky", pop: "4.5M", ev: 8, ratified: false, leg: "R supermajority" },
  LA: { name: "Louisiana", pop: "4.6M", ev: 8, ratified: false, leg: "R supermajority" },
  ME: { name: "Maine", pop: "1.4M", ev: 4, ratified: true, leg: "D trifecta" },
  MD: { name: "Maryland", pop: "6.2M", ev: 10, ratified: true, leg: "D supermajority" },
  MA: { name: "Massachusetts", pop: "7.0M", ev: 11, ratified: true, leg: "D supermajority" },
  MI: { name: "Michigan", pop: "10.0M", ev: 15, ratified: false, leg: "Split" },
  MN: { name: "Minnesota", pop: "5.7M", ev: 10, ratified: true, leg: "D trifecta" },
  MS: { name: "Mississippi", pop: "2.9M", ev: 6, ratified: false, leg: "R supermajority" },
  MO: { name: "Missouri", pop: "6.2M", ev: 10, ratified: false, leg: "R supermajority" },
  MT: { name: "Montana", pop: "1.1M", ev: 4, ratified: false, leg: "R trifecta" },
  NE: { name: "Nebraska", pop: "2.0M", ev: 5, ratified: false, leg: "R (unicameral)" },
  NV: { name: "Nevada", pop: "3.2M", ev: 6, ratified: false, leg: "D trifecta" },
  NH: { name: "New Hampshire", pop: "1.4M", ev: 4, ratified: true, leg: "R trifecta" },
  NJ: { name: "New Jersey", pop: "9.3M", ev: 14, ratified: true, leg: "D trifecta" },
  NM: { name: "New Mexico", pop: "2.1M", ev: 5, ratified: true, leg: "D trifecta" },
  NY: { name: "New York", pop: "19.5M", ev: 28, ratified: true, leg: "D supermajority" },
  NC: { name: "North Carolina", pop: "10.7M", ev: 16, ratified: false, leg: "R supermajority" },
  ND: { name: "North Dakota", pop: "780K", ev: 3, ratified: false, leg: "R supermajority" },
  OH: { name: "Ohio", pop: "11.8M", ev: 17, ratified: false, leg: "R supermajority" },
  OK: { name: "Oklahoma", pop: "4.0M", ev: 7, ratified: false, leg: "R supermajority" },
  OR: { name: "Oregon", pop: "4.2M", ev: 8, ratified: true, leg: "D trifecta" },
  PA: { name: "Pennsylvania", pop: "13.0M", ev: 19, ratified: true, leg: "Split" },
  RI: { name: "Rhode Island", pop: "1.1M", ev: 4, ratified: true, leg: "D supermajority" },
  SC: { name: "South Carolina", pop: "5.3M", ev: 9, ratified: false, leg: "R supermajority" },
  SD: { name: "South Dakota", pop: "910K", ev: 3, ratified: false, leg: "R supermajority" },
  TN: { name: "Tennessee", pop: "7.1M", ev: 11, ratified: false, leg: "R supermajority" },
  TX: { name: "Texas", pop: "30.5M", ev: 40, ratified: false, leg: "R trifecta" },
  UT: { name: "Utah", pop: "3.4M", ev: 6, ratified: false, leg: "R supermajority" },
  VT: { name: "Vermont", pop: "647K", ev: 3, ratified: true, leg: "D supermajority" },
  VA: { name: "Virginia", pop: "8.6M", ev: 13, ratified: false, leg: "Split" },
  WA: { name: "Washington", pop: "7.8M", ev: 12, ratified: true, leg: "D trifecta" },
  WV: { name: "West Virginia", pop: "1.8M", ev: 4, ratified: true, leg: "R supermajority" },
  WI: { name: "Wisconsin", pop: "5.9M", ev: 10, ratified: false, leg: "Split" },
  WY: { name: "Wyoming", pop: "577K", ev: 3, ratified: false, leg: "R supermajority" }
};
const ratifiedCount = Object.values(stateInfo).filter((s) => s.ratified).length;
const neededCount = 38 - ratifiedCount;

const stateGrid: (string | null)[][] = [
[null, null, null, null, null, null, null, null, null, null, null, "ME"],
["AK", null, null, null, null, null, "WI", null, null, null, "VT", "NH"],
[null, "WA", "MT", "ND", "MN", null, "MI", null, null, "NY", "MA", "CT"],
[null, "OR", "ID", "SD", null, "IA", null, "OH", "PA", "NJ", "RI", null],
[null, "CA", "NV", "WY", "NE", "IL", "IN", null, "WV", "DE", "MD", "DC"],
[null, null, "UT", "CO", "KS", "MO", "KY", "VA", null, null, null, null],
[null, null, "AZ", "NM", "OK", "AR", "TN", "NC", "SC", null, null, null],
["HI", null, null, null, "TX", "LA", "MS", "AL", "GA", "FL", null, null]];


const InteractiveMap = memo(function InteractiveMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: React.MouseEvent, st: string) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHovered(st);
  }, []);
  const info = hovered ? stateInfo[hovered] : null;
  return (
    <div ref={mapRef} style={{ maxWidth: 800, width: "100%", margin: "0 auto", position: "relative", padding: "20px 0" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "80%", height: "70%", borderRadius: "50%",
        background: `radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)`,
        pointerEvents: "none", zIndex: 0
      }} />
      {stateGrid.map((row, ri) =>
      <div key={ri} style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 4, position: "relative", zIndex: 1 }}>
          {row.map((st, ci) => {
          const si = st ? stateInfo[st] : null;
          const rat = si?.ratified;
          const isHovered = hovered === st;
          return (
            <div key={ci}
            onMouseEnter={(e) => st && handleMove(e, st)}
            onMouseMove={(e) => st && handleMove(e, st)}
            onMouseLeave={() => setHovered(null)}
            style={{
              aspectRatio: "1", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(0.5rem,1.2vw,0.7rem)", fontFamily: mono, fontWeight: 700,
              background: !st ? "transparent" : rat ?
              isHovered ? "linear-gradient(135deg, #E5C644, #D4AF37)" : gold :
              isHovered ? "rgba(245,240,232,0.15)" : "rgba(245,240,232,0.06)",
              color: !st ? "transparent" : rat ? dark : isHovered ? warm : "rgba(245,240,232,0.35)",
              cursor: st ? "pointer" : "default",
              transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
              transform: isHovered ? "scale(1.2) translateY(-2px)" : "scale(1)",
              boxShadow: isHovered ?
              rat ?
              "0 4px 16px rgba(212,175,55,0.5), 0 0 24px rgba(212,175,55,0.3)" :
              "0 4px 16px rgba(245,240,232,0.2), 0 0 20px rgba(155,58,58,0.2)" :
              rat ?
              "0 1px 4px rgba(212,175,55,0.15)" :
              "none",
              zIndex: isHovered ? 10 : 1, position: "relative",
              border: isHovered ? `2px solid ${rat ? "#E5C644" : "rgba(245,240,232,0.4)"}` : "2px solid transparent"
            }}>{st || ""}</div>);

        })}
        </div>
      )}
      {info &&
      <div style={{
        position: "absolute",
        left: Math.min(Math.max(pos.x + 16, 10), 580),
        top: Math.max(pos.y - 140, 10),
        background: "linear-gradient(135deg, #151513, #1A1814)", border: `1px solid ${info.ratified ? gold : "#555"}`,
        borderRadius: 10, padding: "18px 22px", minWidth: 220,
        boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 20px ${info.ratified ? "rgba(212,175,55,0.15)" : "rgba(155,58,58,0.1)"}`,
        zIndex: 100, pointerEvents: "none", textAlign: "left" as const,
        backdropFilter: "blur(8px)"
      }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{
            width: 12, height: 12, borderRadius: "50%",
            background: info.ratified ? gold : red,
            boxShadow: info.ratified ? "0 0 8px rgba(212,175,55,0.6)" : "0 0 8px rgba(155,58,58,0.6)"
          }} />
            <span style={{ fontFamily: heading, fontSize: "1.15rem", fontWeight: 700, color: warm }}>{info.name}</span>
          </div>
          <div style={{ fontFamily: mono, fontSize: "0.65rem", color: "rgba(245,240,232,0.45)", lineHeight: 2.2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}><span>STATUS</span><span style={{ color: info.ratified ? gold : red, fontWeight: 700 }}>{info.ratified ? "✓ RATIFIED" : "✗ NEEDED"}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}><span>POPULATION</span><span style={{ color: warm }}>{info.pop}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}><span>ELECTORAL VOTES</span><span style={{ color: warm }}>{info.ev}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}><span>LEGISLATURE</span><span style={{ color: info.leg.startsWith("D") ? "#6699CC" : info.leg.startsWith("R") ? "#CC6666" : "#999" }}>{info.leg}</span></div>
          </div>
        </div>
      }
      <div style={{ maxWidth: 500, margin: "32px auto 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: "0.6rem", color: soft, marginBottom: 8 }}>
          <span>{ratifiedCount} ratified</span>
          <span>38 needed</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: "rgba(245,240,232,0.06)", overflow: "hidden", position: "relative" }}>
          <div style={{
            height: "100%", borderRadius: 4, width: `${ratifiedCount / 38 * 100}%`,
            background: `linear-gradient(90deg, ${gold}, #E5C644)`,
            boxShadow: "0 0 12px rgba(212,175,55,0.4)",
            transition: "width 1s ease"
          }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: mono, fontSize: "0.6rem", color: soft }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: gold, boxShadow: "0 0 4px rgba(212,175,55,0.3)" }} /> Ratified ({ratifiedCount})
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: mono, fontSize: "0.6rem", color: soft }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.15)" }} /> Need {neededCount} more
        </div>
      </div>
      <div style={{ fontFamily: heading, fontSize: "clamp(1.3rem,3vw,1.8rem)", color: gold, marginTop: 20, fontWeight: 700 }}>{ratifiedCount} down. {neededCount} to go.</div>
      <div style={{ fontFamily: body, fontSize: "0.8rem", color: "rgba(245,240,232,0.3)", marginTop: 8 }}>Hover over any state for details</div>
    </div>);

});

const Counter = memo(function Counter() {
  const [n, setN] = useState(14847);
  useEffect(() => {const id = setInterval(() => setN((v) => v + Math.floor(Math.random() * 3)), 5000);return () => clearInterval(id);}, []);
  return <div style={{ fontFamily: heading, fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 900, color: gold, letterSpacing: "-0.03em" }}>{n.toLocaleString()}</div>;
});

const EmailSignup = memo(function EmailSignup() {
  const [email, setEmail] = useState("");
  const [st, setSt] = useState("");
  const [done, setDone] = useState(false);
  if (done) return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <div style={{ fontFamily: heading, fontSize: "1.5rem", color: gold, fontWeight: 700 }}>You're in the equation.</div>
      <div style={{ fontFamily: body, fontSize: "1rem", color: soft, marginTop: 12 }}>We'll be in touch.</div>
    </div>);

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "left" }}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" style={{ width: "100%", padding: "16px 20px", background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.12)", borderRadius: 6, color: warm, fontFamily: body, fontSize: "1rem", marginBottom: 12, outline: "none" }} />
      <select value={st} onChange={(e) => setSt(e.target.value)} style={{ width: "100%", padding: "16px 20px", background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.12)", borderRadius: 6, color: st ? warm : soft, fontFamily: body, fontSize: "1rem", marginBottom: 16, outline: "none" }}>
        <option value="" style={{ background: dark }}>Your state</option>
        {Object.keys(stateInfo).sort().map((s) => <option key={s} value={s} style={{ background: dark }}>{s}</option>)}
      </select>
      <button onClick={() => {if (email && st) setDone(true);}} style={{ width: "100%", padding: "16px 20px", background: gold, color: dark, border: "none", borderRadius: 6, fontFamily: heading, fontSize: "1.05rem", fontWeight: 700, cursor: "pointer" }}>Join the Equation</button>
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
              fontFamily: heading, fontWeight: 700, fontSize: "0.7rem",
              letterSpacing: "0.05em", border: "none", borderRadius: 4,
              cursor: "pointer", whiteSpace: "nowrap"
            }}>
            
              Join
            </button>
          </div>
        }
      </header>
      <div style={{ height: 46 }} /> {/* header spacer */}
      {/* 1. HERO */}
      <Slide>
        <Big size="clamp(3.5rem,10vw,8rem)">My Voice + Your Voice</Big>
        <Reveal delay={0.3}><div style={{ fontFamily: heading, fontSize: "clamp(2rem,5vw,3.5rem)", fontStyle: "italic", color: gold, marginTop: 24 }}>= Our Country</div></Reveal>
      </Slide>

      {/* 2. CORPORATIONS */}
      <Slide>
        <Big size="clamp(1.8rem,4vw,3rem)" weight={400}>NOT CORPORATIONS - NOT FOREIGN NATIONS - NOT AI</Big>
        <Sub>{"\n"}</Sub>
      </Slide>


      {/* 4. DIVISION */}
      <Slide>
        <Big size="clamp(1.5rem,3vw,2.2rem)" weight={400} color={soft}>CITIZENS UNITED WAS DESIGNED TO DIVIDE US</Big>
        <FlashZero />
        <Sub size="clamp(1rem,2vw,1.15rem)">How did we get tricked into hating each other...<br />Even within our own families!<br /><br />Well it all started with a deception... Citizens United.  </Sub>
      </Slide>

      {/* 5. ANIMATED ≠ */}
      <Slide bg="#FAF6F0">
        <Reveal><AnimatedNotEqual /></Reveal>
        <Spacer h={24} />
        <Big size="clamp(2rem,5vw,3.5rem)" color={red}>is how corporations win.</Big>
      </Slide>

      {/* 6. STAGE 4 */}
      <Slide bg={dark} style={{ color: warm }}>
        <Big size="clamp(1.6rem,3.5vw,2.5rem)" color={warm}>Now Our Country Has...</Big>
        <Reveal delay={0.1}><div style={{ fontFamily: heading, fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 900, color: red, marginTop: 8 }}>Stage 4 Cancer.</div></Reveal>
        <Spacer h={48} />
        <Reveal delay={0.2}>
          <div style={{ maxWidth: 580, textAlign: "left" }}>
            {[
            { num: "1", icon: "❤️", title: "Healthcare", l1: "When ", b: "corporations", l2: " take 30% of every dollar,", l3: "and totally dictate the access and use of the other 70%." },
            { num: "2", icon: "🤖", title: "Technology", l1: "When ", b: "corporations", l2: " build machines optimized to amuse and confuse us, ", l3: "our eyes no longer know who or what to believe." },
            { num: "3", icon: "🏛️", title: "Politics", l1: "When ", b: "corporations", l2: " buy the people who write the rules, ", l3: "the rules start to only apply to us." },
            { num: "4", icon: "📺", title: "Media", l1: "When ", b: "corporations", l2: " only fill your feed with rage, ", l3: "you become the bait that converts more citizens into hate." }].
            map((item, i) =>
            <div key={i} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: i < 3 ? "1px solid rgba(245,240,232,0.06)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: "1.4em" }}>{item.icon}</span>
                  <span style={{ fontFamily: heading, fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: 900, color: gold }}>{item.num}. {item.title}</span>
                </div>
                <div style={{ fontFamily: body, fontSize: "clamp(1.05rem,2.2vw,1.3rem)", color: "rgba(245,240,232,0.6)", lineHeight: 1.8, paddingLeft: 44 }}>
                  {item.l1}<B>{item.b}</B>{item.l2}<br />{item.l3}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </Slide>

      {/* 7. CANCER DEFINED */}
      <Slide bg={dark} style={{ color: warm }}>
        <Big size="clamp(1.5rem,3vw,2.2rem)" color={soft} weight={400}>What is Cancer? Cancer is when...</Big>
        <Spacer h={16} />
        <Reveal delay={0.15}>
          <div style={{ fontFamily: heading, fontSize: "clamp(2.2rem,5.5vw,4rem)", fontWeight: 900 }}>
            <span style={{ color: red }}>me </span>
            <span style={{ color: soft, fontSize: "0.5em", margin: "0 16px" }} className="text-5xl">></span>
            <span style={{ color: gold }}> all of you</span>
          </div>
        </Reveal>
        <Spacer h={32} />
        <Sub color="rgba(245,240,232,0.6)" size="clamp(1.1rem,2.5vw,1.4rem)">And today '<span style={{ color: warm, fontWeight: 600 }}>me</span>' means corporations (and ai?) too.</Sub>
      </Slide>

      {/* 8. WE ARE THE EQUATION */}
      <Slide>
        <Big size="clamp(1.5rem,3vw,2.2rem)" weight={400} color={soft}>But here's what they forgot.</Big>
        <Spacer h={20} />
        <Big size="clamp(2.2rem,6vw,4.5rem)">The math is made up<br />of real people!</Big>
        <Reveal delay={0.2}><SplitFlap /></Reveal>
      </Slide>

      {/* 9. CONTROL */}
      <Slide bg="#FAF6F0">
        <Big size="clamp(1.5rem,3vw,2.2rem)" weight={400} color={soft}>So how do we ALL seize the System?<br /><br />We 'Pass the Pump!'</Big>
        <Spacer h={24} />
        <Big size="clamp(2.5rem,7vw,5rem)" color={gold}>me + you = control</Big>
      </Slide>

      {/* 10. HERE'S HOW */}
      <Slide>
        <Big size="clamp(2.5rem,6vw,4.5rem)" color={gold}>Here's how.</Big>
        <Spacer h={40} />
        <Big size="clamp(3rem,8vw,6rem)">Pass the Pump.</Big>
        <Sub size="clamp(1.15rem,2.5vw,1.45rem)">One gas company at a time.</Sub>
        <Spacer h={40} />
        <Reveal delay={0.2}><LogoScroll /></Reveal>
      </Slide>

      {/* 11. WHAT DO YOU DO */}
      <Slide bg="#FAF6F0">
        <Big size="clamp(2rem,5vw,3.5rem)">What do you do?</Big>
        <Spacer h={32} />
        <div style={{ maxWidth: 520, width: "100%", textAlign: "left" }}>
          <Step num={1} emoji="👀" title="See which gas station is on the list."
          desc="Check who's up this month. Right now it's Shell." />
          <Step num={2} emoji="🚗" title="Drive past them."
          desc="Skip that station. Honk to show them support. They're in this with us." />
          <Step num={3} emoji="⛽" title="Head to the next pump."
          desc="Go to the next brand down the street. That's it. Every month we add the next largest company." />
        </div>
        <Chant color={gold}>You pass the pump.<br />They get the message.</Chant>
        <Spacer h={24} />
        <Big size="clamp(1.6rem,3.5vw,2.5rem)" color={dark} weight={700}>Your profit from us is now for us!</Big>
        <Spacer h={16} />
        <Reveal delay={0.15}>
          <div style={{ background: "rgba(26,24,20,0.04)", border: "1px solid rgba(26,24,20,0.08)", borderRadius: 12, padding: "28px 36px", maxWidth: 480, margin: "0 auto" }}>
            <div style={{ fontFamily: heading, fontSize: "clamp(1.3rem,3vw,2rem)", fontWeight: 900, color: dark }}>One month of diverted sales from Shell...</div>
            <div style={{ fontFamily: heading, fontSize: "clamp(1.3rem,3vw,2rem)", fontWeight: 900, color: gold }}>redirects $51 million in profits.</div>
            <div style={{ fontFamily: mono, fontSize: "0.6rem", color: soft, marginTop: 12, lineHeight: 1.8 }}>
              12,283 stations × $4,200 avg. monthly corporate margin
            </div>
            <div style={{ width: 40, height: 2, background: gold, margin: "16px auto 0", opacity: 0.4 }} />
            <div style={{ fontFamily: heading, fontSize: "clamp(1.1rem,2.5vw,1.4rem)", fontStyle: "italic", color: dark, marginTop: 16 }}>But the impact is priceless!</div>
          </div>
        </Reveal>
        <Spacer h={20} />
        <Sub color={soft} size="clamp(1rem,2vw,1.15rem)">The list will grow.<br />Till we reach the CEO.</Sub>
      </Slide>

      {/* 12. WHAT THE CEOs MUST SAY */}
      <Slide bg={dark} style={{ color: warm }}>
        <Big size="clamp(2rem,5vw,3.5rem)" color={warm}>What the CEOs must say.</Big>
        <Big size="clamp(1.5rem,3vw,2.2rem)" color={gold} weight={400} style={{ marginTop: 12 }}>On camera.<br />To America.</Big>
        <Spacer h={40} />
        <Reveal delay={0.1}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            {[
            { num: "1", text: "\"Our company will fully fund all campaigns to pass the 29th Amendment in all 50 states, until it is ratified.\"" },
            { num: "2", text: "\"Corporations are not people. The Constitution belongs only to citizens, who are people.\"" },
            { num: "3", text: "\"We are proud to support Pass the Pump to pass the 29th Amendment. We call on every other company to join us in giving complete power back to the people.\"" }].
            map((d, i) =>
            <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start", textAlign: "left", marginBottom: 32, paddingBottom: 32, borderBottom: i < 2 ? "1px solid rgba(245,240,232,0.06)" : "none" }}>
                <div style={{ fontFamily: heading, fontSize: "2.5rem", fontWeight: 900, color: gold, lineHeight: 1, minWidth: 40 }}>{d.num}</div>
                <div style={{ fontFamily: heading, fontSize: "clamp(1.1rem,2.5vw,1.4rem)", fontStyle: "italic", color: warm, lineHeight: 1.5 }}>{d.text}</div>
              </div>
            )}
          </div>
        </Reveal>
        <Chant color={gold}>Three sentences.<br />On camera.<br />To the country.</Chant>
        <Spacer h={40} />
        <Reveal delay={0.3}>
          <div style={{ maxWidth: 440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", borderRadius: 8, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <span style={{ fontSize: "1.4rem" }}>✅</span>
              <div>
                <div style={{ fontFamily: heading, fontSize: "1.1rem", fontWeight: 700, color: gold }}>Pledge = Off the list.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", borderRadius: 8, background: "rgba(155,58,58,0.08)", border: "1px solid rgba(155,58,58,0.2)" }}>
              <span style={{ fontSize: "1.4rem" }}>🔴</span>
              <div>
                <div style={{ fontFamily: heading, fontSize: "1.1rem", fontWeight: 700, color: red }}>Failure = Back on the list.</div>
              </div>
            </div>
          </div>
        </Reveal>
      </Slide>

      {/* 13. THE LIST */}
      <section style={{ padding: "clamp(80px,12vw,140px) 32px", background: dark, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Reveal><div style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.3em", color: soft, marginBottom: 12 }}>THE LIST</div></Reveal>

          <Reveal>
            <div style={{ marginBottom: 56, maxWidth: 480, margin: "0 auto 56px" }}>
              <div style={{ fontFamily: heading, fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, color: gold, marginBottom: 24 }}>Why gas stations?</div>
              <div style={{ textAlign: "left" }}>
                {[
                { emoji: "🔄", text: "It's easy. You just vote with your steering wheel and go to the next one." },
                { emoji: "📍", text: "They're ubiquitous. 150,000 stations across America. Almost everyone can join in." },
                { emoji: "🌍", text: "They're owned by the biggest corporations from all over the world — so most of the damage won't be felt here." }].
                map((b, i) =>
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
                    <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 2 }}>{b.emoji}</span>
                    <span style={{ fontFamily: body, fontSize: "clamp(0.95rem,2vw,1.1rem)", color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>{b.text}</span>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal><div style={{ fontFamily: heading, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: warm, marginBottom: 40 }}>Largest to smallest.</div></Reveal>

          {companies.map((c, i) =>
          <Reveal key={c.name} delay={i * 0.06}>
              <div style={{
              display: "grid", gridTemplateColumns: "52px 1fr auto",
              alignItems: "center", gap: 16, padding: "14px 0",
              borderBottom: "1px solid rgba(245,240,232,0.06)",
              maxWidth: 560, margin: "0 auto"
            }}>
                <div className={i === 0 ? "target-pulse" : ""} style={{
                width: 44, height: 44, borderRadius: "50%",
                background: i === 0 ? red : "rgba(245,240,232,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: mono, fontSize: i === 0 ? "1.1rem" : "0.75rem",
                color: i === 0 ? "white" : soft, fontWeight: 700
              }}>{i === 0 ? "🎯" : i + 1}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ padding: "5px 14px", borderRadius: 5, background: c.bg, minWidth: 60, textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", borderBottom: `2px solid ${c.accent}` }}>
                      <span style={{ fontFamily: mono, fontSize: "0.6rem", fontWeight: 900, color: c.text, letterSpacing: "0.05em" }}>{c.name.toUpperCase()}</span>
                    </div>
                    <span style={{ fontFamily: body, fontSize: "0.85rem", color: i === 0 ? gold : "rgba(245,240,232,0.3)" }}>{c.stations} stations</span>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: "0.65rem", color: i === 0 ? red : "rgba(245,240,232,0.2)", marginTop: 4 }}>
                    {i === 0 ? `🔴 Active now` : c.month}
                  </div>
                </div>
                <div style={{ fontFamily: heading, fontSize: "0.8rem", fontWeight: 700, color: i === 0 ? warm : "rgba(245,240,232,0.15)" }}>{c.month}</div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.7}>
            <div style={{ fontFamily: body, fontSize: "clamp(1rem,2vw,1.2rem)", color: "rgba(245,240,232,0.4)", marginTop: 40, lineHeight: 1.8 }}>
              By January — <span style={{ color: gold }}>every major oil brand in America.</span>
            </div>
          </Reveal>

          <Reveal delay={0.8}>
            <div style={{
              marginTop: 56, padding: "40px 48px", borderRadius: 16,
              background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))",
              border: `2px solid ${gold}`, maxWidth: 520, margin: "56px auto 0",
              animation: "courage-glow 3s ease-in-out infinite"
            }}>
              <div style={{ fontFamily: heading, fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 900, color: gold, lineHeight: 1.3 }}>
                Which company<br />has the courage<br />to go first?
              </div>
              <div style={{ width: 60, height: 2, background: gold, margin: "24px auto", opacity: 0.4 }} />
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, marginTop: 8, marginBottom: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontFamily: heading, fontSize: "2rem", marginBottom: 8 }}>?</div>
                  <div style={{ width: 80, height: 70, background: "rgba(192,192,192,0.15)", border: "1px solid rgba(192,192,192,0.3)", borderRadius: "4px 4px 0 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: mono, fontSize: "1.2rem", fontWeight: 700, color: "#C0C0C0" }}>2nd</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontFamily: heading, fontSize: "2.5rem", marginBottom: 8, color: gold }}>?</div>
                  <div style={{ width: 90, height: 100, background: "rgba(212,175,55,0.12)", border: `1px solid rgba(212,175,55,0.3)`, borderRadius: "4px 4px 0 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: mono, fontSize: "1.3rem", fontWeight: 700, color: gold }}>1st</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontFamily: heading, fontSize: "1.8rem", marginBottom: 8 }}>?</div>
                  <div style={{ width: 80, height: 50, background: "rgba(205,127,50,0.12)", border: "1px solid rgba(205,127,50,0.25)", borderRadius: "4px 4px 0 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: mono, fontSize: "1.1rem", fontWeight: 700, color: "#CD7F32" }}>3rd</span>
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.25em", color: soft }}>THE 29TH AMENDMENT</div>
            </div>
          </Reveal>
          <Spacer h={40} />
          <Reveal delay={0.9}><LogoScrollDark /></Reveal>
        </div>
      </section>

      {/* 14. THIS ENDS */}
      <Slide bg={dark} style={{ color: warm }}>
        <Big size="clamp(2rem,5vw,3.5rem)" color={gold}>This ends when the<br />29th Amendment passes.</Big>
        <Spacer h={20} />
        <Reveal delay={0.15}>
          <div style={{ fontFamily: body, fontSize: "clamp(1rem,2vw,1.2rem)", color: "rgba(245,240,232,0.5)", lineHeight: 1.8, maxWidth: 480 }}>
            A constitutional amendment requires <span style={{ color: warm, fontWeight: 600 }}>38 states</span> to ratify.<br />
            That's three-quarters of the country.<br /><br />
            Right now, <span style={{ color: gold, fontWeight: 700 }}>{ratifiedCount} states</span> have called for an amendment<br />
            to overturn corporate personhood.<br /><br />
            We need <span style={{ color: red, fontWeight: 700 }}>{neededCount} more.</span>
          </div>
        </Reveal>
        <Spacer h={48} />
        <Reveal delay={0.25}><InteractiveMap /></Reveal>
      </Slide>

      {/* 15. FRANCHISEES */}
      <Slide>
        <Big size="clamp(1.8rem,4vw,3rem)" weight={400} color={soft}>Now let's talk about</Big>
        <Big size="clamp(2rem,5vw,3.5rem)">the people on the front lines.</Big>
        <Spacer h={32} />
        <Reveal delay={0.1}>
          <div style={{ fontFamily: body, fontSize: "clamp(1.05rem,2.2vw,1.3rem)", color: soft, lineHeight: 1.9, maxWidth: 580 }}>
            Most gas stations aren't owned by these companies.<br />
            They're owned by <span style={{ color: dark, fontWeight: 600 }}>families.</span><br /><br />
            People who wake up at 5am.<br />
            People who built something from nothing.<br />
            People who serve their communities every day.<br /><br />
            <span style={{ color: dark, fontWeight: 600 }}>They aren't to blame for this.</span><br />
            But unfortunately,<br />they are stuck in the middle.<br /><br />
            <span style={{ color: dark, fontWeight: 600 }}>But now they are America's heroes.</span>
          </div>
        </Reveal>
      </Slide>

      {/* 16. AMERICAN HEROES */}
      <Slide bg="#FAF6F0">
        <Big size="clamp(2rem,5vw,4rem)" color={gold}>And they are American Heroes.</Big>
        <Sub color={dark}>The franchisees who stand with us<br />are on the front lines of<br />taking back our country.</Sub>
        <Spacer h={24} />
        <Sub color={dark} size="clamp(1rem,2.2vw,1.25rem)">
          We don't fight them. <span style={{ fontWeight: 600 }}>We work with them.</span><br />
          We help them pressure their parent companies to pledge.<br />
          We support their families through the transition.<br />
          We make sure the world knows what they sacrificed.
        </Sub>
        <Chant color={gold}>The pain is temporary.<br />The amendment is forever.</Chant>
      </Slide>

      {/* 17. TO DIVIDE US */}
      <Slide bg={dark} style={{ color: warm }}>
        <Big size="clamp(2.5rem,7vw,5.5rem)" color={gold}>To Divide Us</Big>
        <Big size="clamp(2.5rem,7vw,5.5rem)" color={gold} style={{ marginTop: 8 }}>Multiplies Us!</Big>
        <Spacer h={12} />
        <Big size="clamp(2rem,5vw,3.5rem)" color={warm}>Pass the Pump.</Big>
        <Spacer h={48} />
        <Reveal delay={0.3}><LogoScrollDark /></Reveal>
      </Slide>

      {/* 18. SIGNUP */}
      <section id="signup" style={{ padding: "clamp(80px,12vw,140px) 32px", background: dark, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Reveal><Counter /></Reveal>
          <Reveal delay={0.1}><div style={{ fontFamily: body, fontSize: "1rem", color: soft, marginTop: 8 }}>people in the equation and growing</div></Reveal>
          <Spacer h={60} />
          <Reveal><Big size="clamp(1.5rem,3vw,2.2rem)" color={gold}>Add yourself.</Big></Reveal>
          <Spacer h={24} />
          <Reveal delay={0.1}><EmailSignup /></Reveal>
        </div>
      </section>

      {/* 19. PATREON */}
      <Slide bg="#FAF6F0">
        <Big size="clamp(1.8rem,4vw,3rem)" weight={700}>Keep this going.</Big>
        <Sub color={dark}>This site, this movement, this pressure —<br />it runs on people, not corporations.<br />That's the whole point.</Sub>
        <Spacer h={32} />
        <Reveal delay={0.15}>
          <a href="https://patreon.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", padding: "18px 48px", background: dark, color: warm, borderRadius: 6, textDecoration: "none",
            fontFamily: heading, fontSize: "1.1rem", fontWeight: 700
          }}>Support on Patreon</a>
        </Reveal>
        <Sub size="clamp(0.9rem,1.8vw,1rem)" color={soft}>Every dollar keeps the pressure on.<br />Every share multiplies the equation.</Sub>
        <Spacer h={24} />
        <Reveal delay={0.25}>
          <button onClick={() => {
            if (navigator.share) {
              navigator.share({ title: "Pass the Pump — The 29th Amendment", text: "me + you = democracy. Pass the Pump.", url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
              const btn = document.getElementById("share-btn");
              if (btn) {btn.textContent = "✓ Link Copied!";setTimeout(() => {btn.textContent = "🔗 Share This Movement";}, 2000);}
            }
          }} id="share-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 36px", background: "transparent",
            color: dark, border: `2px solid ${dark}`, borderRadius: 6,
            fontFamily: heading, fontSize: "1rem", fontWeight: 700,
            cursor: "pointer", transition: "all 0.2s"
          }}>🔗 Share This Movement</button>
        </Reveal>
      </Slide>

      {/* 20. FINAL */}
      <Slide bg={dark} style={{ color: warm }}>
        <Big size="clamp(2.5rem,7vw,5.5rem)" color={warm}>me + you</Big>
        <Reveal delay={0.2}><div style={{ fontFamily: heading, fontSize: "clamp(2rem,5vw,3.5rem)", fontStyle: "italic", color: gold, marginTop: 20 }}>= america</div></Reveal>
        <Spacer h={48} />
        <Reveal delay={0.5}>
          <button onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "20px 56px", background: gold, color: dark, border: "none", borderRadius: 4,
            fontFamily: heading, fontSize: "clamp(1rem,2vw,1.3rem)", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em"
          }}>Join the Equation</button>
        </Reveal>
        <Spacer h={60} />
        <Reveal delay={0.7}>
          <div style={{ fontFamily: body, fontSize: "clamp(1rem,2.2vw,1.3rem)", color: "rgba(245,240,232,0.4)", lineHeight: 1.8 }}>
            They divide us.<br />
            <span style={{ color: warm, fontWeight: 600 }}>You</span> unite us.
          </div>
        </Reveal>
        <Spacer h={16} />
        <Reveal delay={0.85}>
          <div style={{ fontFamily: heading, fontSize: "clamp(1.3rem,3vw,2rem)", fontWeight: 700, color: gold }}>
            Pass the Pump.
          </div>
        </Reveal>
        <Reveal delay={1}><div style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(245,240,232,0.15)", marginTop: 32 }}>THE 29TH AMENDMENT</div></Reveal>
      </Slide>
    </div>);

};

export default Index;