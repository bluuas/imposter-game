"use client";

import { useTheme } from "./ThemeProvider";

// Fish swimming at staggered vertical positions and timings.
// Negative delays mean they're visible immediately on load.
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

// Boats bobbing at the top of the screen
const BOATS = [
  { y: "2%",  x: "4%",  sz: "2.0rem", dur: "4.2s", del: "0s",    char: "⛵" },
  { y: "1%",  x: "28%", sz: "2.5rem", dur: "5.5s", del: "-1.5s", char: "🚢" },
  { y: "3%",  x: "54%", sz: "1.8rem", dur: "3.9s", del: "-2.8s", char: "⛴️" },
  { y: "1%",  x: "74%", sz: "2.2rem", dur: "4.8s", del: "-0.9s", char: "⛵" },
  { y: "2%",  x: "89%", sz: "1.6rem", dur: "6.0s", del: "-3.5s", char: "🚤" },
];

export default function UnicornSparkles() {
  const { theme } = useTheme();
  if (!theme.fish) return null;

  return (
    <>
      {SWIMMERS.map((s, i) => (
        <span
          key={`fish-${i}`}
          className="fish-swimmer"
          style={{
            top: s.y,
            fontSize: s.sz,
            animationDuration: s.dur,
            animationDelay: s.del,
          }}
          aria-hidden="true"
        >
          {s.char}
        </span>
      ))}
      {BOATS.map((b, i) => (
        <span
          key={`boat-${i}`}
          className="fish-boat"
          style={{
            top: b.y,
            left: b.x,
            fontSize: b.sz,
            animationDuration: b.dur,
            animationDelay: b.del,
          }}
          aria-hidden="true"
        >
          {b.char}
        </span>
      ))}
    </>
  );
}

