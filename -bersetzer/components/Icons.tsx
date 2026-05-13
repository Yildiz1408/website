"use client";

import { useId, type CSSProperties } from "react";

type IconProps = {
  name: string;
  size?: number;
  stroke?: number;
  className?: string;
  style?: CSSProperties;
};

export function Icon({ name, size = 20, stroke = 1.5, className, style }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    style,
  };
  switch (name) {
    case "phone":
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "pillars":
      return (
        <svg {...props}>
          <path d="M3 21h18" />
          <path d="M3 7h18" />
          <path d="m2 7 10-5 10 5" />
          <path d="M6 7v14M10 7v14M14 7v14M18 7v14" />
        </svg>
      );
    case "doc":
      return (
        <svg {...props}>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" />
          <path d="M14 3v6h6" />
          <path d="M8 13h8M8 17h6" />
        </svg>
      );
    case "people":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "gavel":
      return (
        <svg {...props}>
          <path d="m14 13-5 5" />
          <path d="m17 11-7 7" />
          <path d="m9 7 4 4" />
          <path d="m6 4 4 4" />
          <path d="m3 11 10-10" />
          <path d="m21 21-7-7" />
          <path d="M3 21h12" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="m6 12 4 4 8-8" />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...props}>
          <path d="M5 12h14" />
          <path d="m13 5 7 7-7 7" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...props}>
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      );
    case "medical":
      return (
        <svg {...props}>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect x="3" y="6" width="18" height="15" rx="2" />
          <path d="M12 11v6" />
          <path d="M9 14h6" />
        </svg>
      );
    case "contract":
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="m8 17 2-2 2 2 4-4" />
        </svg>
      );
    case "graduation":
      return (
        <svg {...props}>
          <path d="M22 10 12 4 2 10l10 6 10-6Z" />
          <path d="M6 12v5a6 6 0 0 0 12 0v-5" />
        </svg>
      );
    case "umbrella":
      return (
        <svg {...props}>
          <path d="M12 2v2" />
          <path d="M3 12a9 9 0 1 1 18 0H3Z" />
          <path d="M12 12v7a2 2 0 0 0 4 0" />
        </svg>
      );
    case "folder":
      return (
        <svg {...props}>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11Z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
        </svg>
      );
    case "paperclip":
      return (
        <svg {...props}>
          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      );
    case "upload":
      return (
        <svg {...props}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="m17 8-5-5-5 5" />
          <path d="M12 3v12" />
        </svg>
      );
    case "send":
      return (
        <svg {...props}>
          <path d="m22 2-7 20-4-9-9-4 20-7Z" />
        </svg>
      );
    case "stamp":
      return (
        <svg {...props}>
          <path d="M5 22h14" />
          <path d="M19 18H5l1-3h12l1 3Z" />
          <path d="M12 15V9a3 3 0 1 0-2.83-4" />
        </svg>
      );
    case "language":
      return (
        <svg {...props}>
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
      );
    case "building":
      return (
        <svg {...props}>
          <path d="M3 21h18" />
          <path d="M5 21V8l7-5 7 5v13" />
          <path d="M9 21v-6h6v6" />
          <path d="M9 11h.01M12 11h.01M15 11h.01" />
        </svg>
      );
    default:
      return null;
  }
}

const gold = "#B48A52";
const goldSoft = "#DBBE89";

type SealProps = { size?: number; onDark?: boolean };

export function SYSeal({ size = 200, onDark = false }: SealProps) {
  const uid = useId().replace(/:/g, "");
  const topId = `seal-top-${uid}`;
  const botId = `seal-bot-${uid}`;
  const ringText = onDark ? "#DBBE89" : "#15202F";
  const yColor = onDark ? "#F2EDE2" : "#15202F";
  const stroke = onDark ? goldSoft : gold;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden>
      <defs>
        <path id={topId} d="M 30 100 A 70 70 0 0 1 170 100" />
        <path id={botId} d="M 30 100 A 70 70 0 0 0 170 100" />
      </defs>
      <circle cx="100" cy="100" r="88" fill="none" stroke={stroke} strokeWidth="0.5" />
      <circle cx="100" cy="100" r="80" fill="none" stroke={stroke} strokeWidth="1.2" />
      <circle cx="100" cy="100" r="56" fill="none" stroke={stroke} strokeWidth="0.7" />
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i / 36) * Math.PI * 2;
        const x1 = 100 + Math.cos(a) * 80;
        const y1 = 100 + Math.sin(a) * 80;
        const x2 = 100 + Math.cos(a) * 76;
        const y2 = 100 + Math.sin(a) * 76;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth="0.5"
            opacity="0.6"
          />
        );
      })}
      <text
        fontFamily="var(--sans)"
        fontSize="7"
        letterSpacing="3"
        fill={ringText}
        fontWeight="600"
      >
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          DOLMETSCHER · TERCÜMAN
        </textPath>
      </text>
      <text
        fontFamily="var(--sans)"
        fontSize="7"
        letterSpacing="3"
        fill={ringText}
        fontWeight="600"
      >
        <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">
          HANNOVER · DE ↔ TR
        </textPath>
      </text>
      <line x1="80" y1="64" x2="120" y2="64" stroke={stroke} strokeWidth="0.6" />
      <line x1="80" y1="136" x2="120" y2="136" stroke={stroke} strokeWidth="0.6" />
      <circle cx="100" cy="64" r="1.5" fill={stroke} />
      <circle cx="100" cy="136" r="1.5" fill={stroke} />
      <text
        x="100"
        y="116"
        fontFamily="var(--serif)"
        fontSize="60"
        textAnchor="middle"
        fontWeight="500"
        letterSpacing="-3"
      >
        <tspan fill={gold}>S</tspan>
        <tspan fill={yColor} dx="-4">
          Y
        </tspan>
      </text>
    </svg>
  );
}

export function HeroArchitecture() {
  return (
    <svg
      className="hero-arch"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="archG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DBBE89" stopOpacity="0.55" />
          <stop offset="1" stopColor="#DBBE89" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <line x1="0" y1="520" x2="800" y2="520" stroke="url(#archG)" strokeWidth="0.5" />
      <path d="M 120 220 Q 200 120 280 220" fill="none" stroke="url(#archG)" strokeWidth="1.2" />
      <path d="M 150 220 Q 200 160 250 220" fill="none" stroke="url(#archG)" strokeWidth="0.8" />
      <circle cx="200" cy="100" r="5" fill="none" stroke="url(#archG)" strokeWidth="0.8" />
      <line x1="200" y1="105" x2="200" y2="120" stroke="url(#archG)" strokeWidth="0.8" />
      <path d="M 80 280 L 200 230 L 320 280" fill="none" stroke="url(#archG)" strokeWidth="1" />
      <line x1="80" y1="280" x2="320" y2="280" stroke="url(#archG)" strokeWidth="1" />
      <line x1="60" y1="295" x2="340" y2="295" stroke="url(#archG)" strokeWidth="1" />
      {[100, 140, 180, 220, 260, 300].map((x, i) => (
        <g key={i}>
          <rect x={x - 6} y="295" width="12" height="225" fill="none" stroke="url(#archG)" strokeWidth="0.7" />
          <line x1={x - 8} y1="295" x2={x + 8} y2="295" stroke="url(#archG)" strokeWidth="1" />
          <line x1={x - 8} y1="520" x2={x + 8} y2="520" stroke="url(#archG)" strokeWidth="1" />
          {[-3, 0, 3].map((dx, j) => (
            <line key={j} x1={x + dx} y1="300" x2={x + dx} y2="515" stroke="url(#archG)" strokeWidth="0.3" />
          ))}
        </g>
      ))}
      <line x1="40" y1="540" x2="360" y2="540" stroke="url(#archG)" strokeWidth="0.6" />
      <line x1="20" y1="560" x2="380" y2="560" stroke="url(#archG)" strokeWidth="0.6" />
    </svg>
  );
}

export function AboutVisual() {
  return (
    <svg className="arch" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="aboutG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DBBE89" stopOpacity="0.45" />
          <stop offset="1" stopColor="#DBBE89" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path d="M 130 160 Q 200 60 270 160" fill="none" stroke="url(#aboutG)" strokeWidth="1.4" />
      <path d="M 160 160 Q 200 110 240 160" fill="none" stroke="url(#aboutG)" strokeWidth="0.8" />
      <circle cx="200" cy="40" r="6" fill="none" stroke="url(#aboutG)" strokeWidth="1" />
      <path d="M 100 220 L 200 170 L 300 220" fill="none" stroke="url(#aboutG)" strokeWidth="1.2" />
      <line x1="100" y1="220" x2="300" y2="220" stroke="url(#aboutG)" strokeWidth="1" />
      <line x1="92" y1="232" x2="308" y2="232" stroke="url(#aboutG)" strokeWidth="1" />
      <line x1="92" y1="240" x2="308" y2="240" stroke="url(#aboutG)" strokeWidth="0.5" />
      {[120, 160, 200, 240, 280].map((x, i) => (
        <g key={i}>
          <rect x={x - 7} y="240" width="14" height="200" fill="none" stroke="url(#aboutG)" strokeWidth="0.7" />
          <line x1={x - 10} y1="240" x2={x + 10} y2="240" stroke="url(#aboutG)" strokeWidth="1" />
          <line x1={x - 10} y1="440" x2={x + 10} y2="440" stroke="url(#aboutG)" strokeWidth="1" />
          {[-4, -1, 2].map((dx, j) => (
            <line key={j} x1={x + dx} y1="244" x2={x + dx} y2="436" stroke="url(#aboutG)" strokeWidth="0.25" />
          ))}
        </g>
      ))}
      <line x1="80" y1="450" x2="320" y2="450" stroke="url(#aboutG)" strokeWidth="0.8" />
      <line x1="60" y1="465" x2="340" y2="465" stroke="url(#aboutG)" strokeWidth="0.8" />
      <line x1="40" y1="480" x2="360" y2="480" stroke="url(#aboutG)" strokeWidth="0.8" />
    </svg>
  );
}
