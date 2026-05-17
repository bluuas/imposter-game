"use client";

import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

/* ─── Fish parade (🎣 easter egg) ───────────────────────────────────────── */

const SWIMMERS = [
  { y: "12%", del: "0s",     dur: "9.0s",  sz: "1.4rem", char: "🐟" },
  { y: "22%", del: "-3.5s",  dur: "12.0s", sz: "1.1rem", char: "🐠" },
  { y: "35%", del: "-1.2s",  dur: "8.5s",  sz: "1.6rem", char: "🐡" },
  { y: "47%", del: "-6.0s",  dur: "11.0s", sz: "1.0rem", char: "🦈" },
  { y: "58%", del: "-2.8s",  dur: "10.0s", sz: "1.3rem", char: "🐟" },
  { y: "68%", del: "-4.5s",  dur: "13.0s", sz: "1.2rem", char: "🐬" },
  { y: "78%", del: "-0.7s",  dur: "9.5s",  sz: "1.5rem", char: "🐠" },
  { y: "88%", del: "-5.2s",  dur: "11.5s", sz: "1.1rem", char: "🐡" },
  { y: "17%", del: "-8.0s",  dur: "10.5s", sz: "0.9rem", char: "🐟" },
  { y: "43%", del: "-9.1s",  dur: "8.8s",  sz: "1.3rem", char: "🦞" },
  { y: "63%", del: "-7.3s",  dur: "12.5s", sz: "1.0rem", char: "🐙" },
  { y: "82%", del: "-3.0s",  dur: "9.2s",  sz: "1.2rem", char: "🦀" },
  { y: "28%", del: "-10.5s", dur: "11.8s", sz: "1.4rem", char: "🐟" },
  { y: "52%", del: "-1.8s",  dur: "14.0s", sz: "0.9rem", char: "🐠" },
  { y: "73%", del: "-6.7s",  dur: "10.2s", sz: "1.1rem", char: "🐡" },
];

const BOATS = [
  { y: "2%",  x: "4%",  sz: "2.0rem", dur: "4.2s", del: "0s",    char: "⛵" },
  { y: "1%",  x: "28%", sz: "2.5rem", dur: "5.5s", del: "-1.5s", char: "🚢" },
  { y: "3%",  x: "54%", sz: "1.8rem", dur: "3.9s", del: "-2.8s", char: "⛴️" },
  { y: "1%",  x: "74%", sz: "2.2rem", dur: "4.8s", del: "-0.9s", char: "⛵" },
  { y: "2%",  x: "89%", sz: "1.6rem", dur: "6.0s", del: "-3.5s", char: "🚤" },
];

function FishParade() {
  return (
    <>
      {SWIMMERS.map((s, i) => (
        <span key={`fish-${i}`} className="fish-swimmer"
          style={{ top: s.y, fontSize: s.sz, animationDuration: s.dur, animationDelay: s.del }}
          aria-hidden="true">{s.char}</span>
      ))}
      {BOATS.map((b, i) => (
        <span key={`boat-${i}`} className="fish-boat"
          style={{ top: b.y, left: b.x, fontSize: b.sz, animationDuration: b.dur, animationDelay: b.del }}
          aria-hidden="true">{b.char}</span>
      ))}
    </>
  );
}

/* ─── DE — Oktoberfest 🍺 ────────────────────────────────────────────────── */

const DE_SWIMMERS = [
  { y: "18%", del: "0s",     dur: "9.0s",  sz: "1.5rem", char: "🍺" },
  { y: "32%", del: "-3.5s",  dur: "11.0s", sz: "1.2rem", char: "🥨" },
  { y: "45%", del: "-1.2s",  dur: "8.5s",  sz: "1.3rem", char: "🌭" },
  { y: "58%", del: "-6.0s",  dur: "12.0s", sz: "1.1rem", char: "🍻" },
  { y: "70%", del: "-2.8s",  dur: "10.0s", sz: "1.4rem", char: "🍺" },
  { y: "80%", del: "-4.5s",  dur: "9.5s",  sz: "1.0rem", char: "🥨" },
  { y: "25%", del: "-8.0s",  dur: "13.0s", sz: "1.2rem", char: "🌭" },
  { y: "50%", del: "-9.1s",  dur: "8.8s",  sz: "1.3rem", char: "🍺" },
  { y: "63%", del: "-7.3s",  dur: "11.5s", sz: "1.0rem", char: "🥂" },
  { y: "85%", del: "-3.0s",  dur: "10.5s", sz: "1.2rem", char: "🥨" },
  { y: "38%", del: "-10.5s", dur: "9.2s",  sz: "1.4rem", char: "🍻" },
  { y: "72%", del: "-1.8s",  dur: "14.0s", sz: "0.9rem", char: "🌭" },
];

const DE_BOBBERS = [
  { y: "2%", x: "8%",  sz: "2.0rem", dur: "4.5s", del: "0s",    char: "🎪" },
  { y: "1%", x: "35%", sz: "1.8rem", dur: "5.2s", del: "-1.2s", char: "🪗" },
  { y: "3%", x: "62%", sz: "2.2rem", dur: "3.8s", del: "-2.5s", char: "🎻" },
  { y: "1%", x: "84%", sz: "1.9rem", dur: "6.0s", del: "-0.8s", char: "🎪" },
];

function OktoberfestParade() {
  return (
    <>
      {DE_SWIMMERS.map((s, i) => (
        <span key={`de-${i}`} className="locale-swimmer"
          style={{ top: s.y, fontSize: s.sz, animationDuration: s.dur, animationDelay: s.del }}
          aria-hidden="true">{s.char}</span>
      ))}
      {DE_BOBBERS.map((b, i) => (
        <span key={`de-b-${i}`} className="locale-bobber"
          style={{ top: b.y, left: b.x, fontSize: b.sz, animationDuration: b.dur, animationDelay: b.del }}
          aria-hidden="true">{b.char}</span>
      ))}
    </>
  );
}

/* ─── IT — La Dolce Vita 🍕 ─────────────────────────────────────────────── */

const IT_SWIMMERS = [
  { y: "15%", del: "0s",     dur: "10.0s", sz: "1.5rem", char: "🍕" },
  { y: "28%", del: "-4.0s",  dur: "8.0s",  sz: "1.2rem", char: "🛵" },
  { y: "42%", del: "-1.5s",  dur: "11.5s", sz: "1.1rem", char: "☕" },
  { y: "55%", del: "-6.5s",  dur: "9.5s",  sz: "1.4rem", char: "🍝" },
  { y: "67%", del: "-3.0s",  dur: "12.0s", sz: "1.0rem", char: "🍷" },
  { y: "78%", del: "-8.0s",  dur: "8.8s",  sz: "1.3rem", char: "🍕" },
  { y: "20%", del: "-5.5s",  dur: "10.5s", sz: "1.2rem", char: "☕" },
  { y: "48%", del: "-9.5s",  dur: "13.0s", sz: "1.1rem", char: "🛵" },
  { y: "62%", del: "-2.0s",  dur: "9.0s",  sz: "1.4rem", char: "🍝" },
  { y: "84%", del: "-7.0s",  dur: "11.0s", sz: "0.9rem", char: "🍷" },
  { y: "35%", del: "-10.0s", dur: "8.5s",  sz: "1.3rem", char: "🍕" },
  { y: "72%", del: "-1.0s",  dur: "14.0s", sz: "1.0rem", char: "☕" },
];

const IT_BOBBERS = [
  { y: "2%", x: "6%",  sz: "2.2rem", dur: "4.0s", del: "0s",    char: "🎭" },
  { y: "1%", x: "32%", sz: "1.9rem", dur: "5.5s", del: "-1.5s", char: "🎻" },
  { y: "3%", x: "60%", sz: "2.0rem", dur: "4.2s", del: "-2.8s", char: "🌹" },
  { y: "1%", x: "83%", sz: "2.1rem", dur: "3.8s", del: "-0.5s", char: "🎭" },
];

function DolceVitaParade() {
  return (
    <>
      {IT_SWIMMERS.map((s, i) => (
        <span key={`it-${i}`} className="locale-swimmer"
          style={{ top: s.y, fontSize: s.sz, animationDuration: s.dur, animationDelay: s.del }}
          aria-hidden="true">{s.char}</span>
      ))}
      {IT_BOBBERS.map((b, i) => (
        <span key={`it-b-${i}`} className="locale-bobber"
          style={{ top: b.y, left: b.x, fontSize: b.sz, animationDuration: b.dur, animationDelay: b.del }}
          aria-hidden="true">{b.char}</span>
      ))}
    </>
  );
}

/* ─── FR — Magnifique 🥖 ─────────────────────────────────────────────────── */

const FR_SWIMMERS = [
  { y: "14%", del: "0s",     dur: "11.0s", sz: "1.6rem", char: "🥖" },
  { y: "26%", del: "-3.0s",  dur: "9.0s",  sz: "1.2rem", char: "🥐" },
  { y: "40%", del: "-1.8s",  dur: "12.5s", sz: "1.3rem", char: "🧀" },
  { y: "53%", del: "-7.0s",  dur: "8.5s",  sz: "1.1rem", char: "🍷" },
  { y: "65%", del: "-4.2s",  dur: "10.5s", sz: "1.4rem", char: "🥖" },
  { y: "76%", del: "-9.0s",  dur: "9.5s",  sz: "1.0rem", char: "🥐" },
  { y: "22%", del: "-5.5s",  dur: "13.0s", sz: "1.2rem", char: "🧀" },
  { y: "46%", del: "-2.5s",  dur: "8.8s",  sz: "1.3rem", char: "🥖" },
  { y: "60%", del: "-8.5s",  dur: "11.5s", sz: "0.9rem", char: "🍷" },
  { y: "83%", del: "-6.0s",  dur: "10.0s", sz: "1.2rem", char: "🥐" },
  { y: "33%", del: "-10.5s", dur: "9.2s",  sz: "1.4rem", char: "🧀" },
  { y: "70%", del: "-1.5s",  dur: "14.0s", sz: "1.0rem", char: "🥖" },
];

const FR_BOBBERS = [
  { y: "2%", x: "5%",  sz: "2.5rem", dur: "5.0s", del: "0s",    char: "🗼" },
  { y: "1%", x: "30%", sz: "2.0rem", dur: "4.0s", del: "-1.8s", char: "🎩" },
  { y: "3%", x: "58%", sz: "1.8rem", dur: "6.0s", del: "-3.0s", char: "🥂" },
  { y: "1%", x: "80%", sz: "2.2rem", dur: "4.5s", del: "-0.7s", char: "🎩" },
];

function MagnifiqueParade() {
  return (
    <>
      {FR_SWIMMERS.map((s, i) => (
        <span key={`fr-${i}`} className="locale-swimmer"
          style={{ top: s.y, fontSize: s.sz, animationDuration: s.dur, animationDelay: s.del }}
          aria-hidden="true">{s.char}</span>
      ))}
      {FR_BOBBERS.map((b, i) => (
        <span key={`fr-b-${i}`} className="locale-bobber"
          style={{ top: b.y, left: b.x, fontSize: b.sz, animationDuration: b.dur, animationDelay: b.del }}
          aria-hidden="true">{b.char}</span>
      ))}
    </>
  );
}

/* ─── ES — Fiesta 🐂 ─────────────────────────────────────────────────────── */

const ES_SWIMMERS = [
  { y: "16%", del: "0s",     dur: "8.5s",  sz: "1.6rem", char: "🐂" },
  { y: "30%", del: "-4.5s",  dur: "10.0s", sz: "1.3rem", char: "🎸" },
  { y: "44%", del: "-1.8s",  dur: "9.5s",  sz: "1.1rem", char: "🪇" },
  { y: "57%", del: "-7.0s",  dur: "11.0s", sz: "1.4rem", char: "💃" },
  { y: "68%", del: "-3.2s",  dur: "8.0s",  sz: "1.2rem", char: "🌹" },
  { y: "79%", del: "-5.8s",  dur: "12.5s", sz: "1.0rem", char: "🐂" },
  { y: "22%", del: "-9.0s",  dur: "9.8s",  sz: "1.3rem", char: "🎸" },
  { y: "48%", del: "-2.5s",  dur: "10.5s", sz: "1.5rem", char: "🪇" },
  { y: "62%", del: "-6.5s",  dur: "8.8s",  sz: "1.0rem", char: "💃" },
  { y: "84%", del: "-0.8s",  dur: "13.0s", sz: "1.2rem", char: "🌹" },
  { y: "36%", del: "-10.5s", dur: "9.2s",  sz: "1.4rem", char: "🐂" },
  { y: "74%", del: "-4.0s",  dur: "11.5s", sz: "1.1rem", char: "🎸" },
];

const ES_BOBBERS = [
  { y: "1%", x: "7%",  sz: "2.2rem", dur: "3.5s", del: "0s",    char: "☀️" },
  { y: "2%", x: "33%", sz: "2.0rem", dur: "4.8s", del: "-1.0s", char: "🌞" },
  { y: "1%", x: "62%", sz: "2.4rem", dur: "3.2s", del: "-2.3s", char: "☀️" },
  { y: "2%", x: "86%", sz: "1.8rem", dur: "5.5s", del: "-0.6s", char: "🌞" },
];

function FiestaParade() {
  return (
    <>
      {ES_SWIMMERS.map((s, i) => (
        <span key={`es-${i}`} className="locale-swimmer"
          style={{ top: s.y, fontSize: s.sz, animationDuration: s.dur, animationDelay: s.del }}
          aria-hidden="true">{s.char}</span>
      ))}
      {ES_BOBBERS.map((b, i) => (
        <span key={`es-b-${i}`} className="locale-bobber"
          style={{ top: b.y, left: b.x, fontSize: b.sz, animationDuration: b.dur, animationDelay: b.del }}
          aria-hidden="true">{b.char}</span>
      ))}
    </>
  );
}

/* ─── SV — Norrsken ❄️ ───────────────────────────────────────────────────── */

const SV_SWIMMERS = [
  { y: "35%", del: "0s",    dur: "14.0s", sz: "2.0rem", char: "🫎" },
  { y: "55%", del: "-5.0s", dur: "16.0s", sz: "1.7rem", char: "🫎" },
  { y: "72%", del: "-9.5s", dur: "13.0s", sz: "1.5rem", char: "📦" },
  { y: "45%", del: "-3.0s", dur: "15.0s", sz: "1.4rem", char: "📦" },
  { y: "62%", del: "-7.5s", dur: "17.0s", sz: "1.8rem", char: "🫎" },
  { y: "80%", del: "-1.5s", dur: "12.5s", sz: "1.3rem", char: "🎿" },
  { y: "28%", del: "-11.0s",dur: "14.5s", sz: "1.6rem", char: "🛷" },
];

const SV_FALLERS = [
  { x: "5%",  del: "0s",     dur: "8.0s",  sz: "1.2rem", char: "❄️" },
  { x: "14%", del: "-2.0s",  dur: "10.5s", sz: "0.9rem", char: "❄️" },
  { x: "24%", del: "-5.5s",  dur: "7.5s",  sz: "1.4rem", char: "❄️" },
  { x: "35%", del: "-1.5s",  dur: "9.0s",  sz: "1.0rem", char: "❄️" },
  { x: "46%", del: "-3.8s",  dur: "11.0s", sz: "1.3rem", char: "⛄" },
  { x: "57%", del: "-7.2s",  dur: "8.5s",  sz: "0.8rem", char: "❄️" },
  { x: "67%", del: "-4.5s",  dur: "10.0s", sz: "1.1rem", char: "❄️" },
  { x: "76%", del: "-6.0s",  dur: "9.5s",  sz: "1.5rem", char: "❄️" },
  { x: "86%", del: "-1.0s",  dur: "7.0s",  sz: "1.0rem", char: "❄️" },
  { x: "93%", del: "-8.5s",  dur: "12.0s", sz: "0.9rem", char: "❄️" },
];

function NorrskenParade() {
  return (
    <>
      {SV_SWIMMERS.map((s, i) => (
        <span key={`sv-${i}`} className="locale-swimmer"
          style={{ top: s.y, fontSize: s.sz, animationDuration: s.dur, animationDelay: s.del }}
          aria-hidden="true">{s.char}</span>
      ))}
      {SV_FALLERS.map((f, i) => (
        <span key={`sv-f-${i}`} className="snow-faller"
          style={{ left: f.x, fontSize: f.sz, animationDuration: f.dur, animationDelay: f.del }}
          aria-hidden="true">{f.char}</span>
      ))}
    </>
  );
}

/* ─── Root component ─────────────────────────────────────────────────────── */

export default function UnicornSparkles() {
  const { funMode } = useTheme();
  const { locale } = useLanguage();

  if (!funMode) return null;

  if (locale === "en") return <FishParade />;

  switch (locale) {
    case "de": return <OktoberfestParade />;
    case "it": return <DolceVitaParade />;
    case "fr": return <MagnifiqueParade />;
    case "es": return <FiestaParade />;
    case "sv": return <NorrskenParade />;
    default:   return null;
  }
}

