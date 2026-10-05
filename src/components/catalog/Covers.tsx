// Arte autoral das capas. Cada prova tem um desenho simples e chapado no
// matiz da sua trilha (as variáveis --c-bg, --c-deep e --c-light vêm da
// classe hue-* do tile). Nenhuma imagem externa: nada que dependa de rede.

import type { ReactNode } from "react";

const L = { fill: "var(--c-light)" };
const D = { fill: "var(--c-deep)" };
const W = { fill: "#ffffff" };
const BG = { fill: "var(--c-bg)" };
const strokeW = { fill: "none", stroke: "#ffffff", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const strokeL = { fill: "none", stroke: "var(--c-light)", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const strokeD = { fill: "none", stroke: "var(--c-deep)", strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Frame({ children, tall = false }: { children: ReactNode; tall?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={tall ? "0 0 240 320" : "0 0 320 180"}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {children}
    </svg>
  );
}

function hex(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return pts.join(" ");
}

const COVERS: Record<string, () => ReactNode> = {
  fintrack: () => (
    <>
      {[40, 58, 76, 98, 124].map((h, i) => (
        <rect key={i} x={40 + i * 46} y={158 - h} width={30} height={h} rx={3} style={L} opacity={0.9} />
      ))}
      <polyline points="55,122 101,106 147,92 193,68 239,48 285,32" strokeWidth={6} {...strokeW} />
      <polyline points="55,128 101,118 147,110 193,100 239,90 285,80" strokeWidth={6} {...strokeD} />
    </>
  ),
  openmind: () => (
    <>
      <circle cx={128} cy={90} r={54} style={L} />
      <circle cx={192} cy={90} r={54} style={D} />
      <path d="M160 44 A54 54 0 0 1 160 136 A54 54 0 0 1 160 44 Z" style={W} />
    </>
  ),
  ledger: () => (
    <>
      <rect x={36} y={34} width={184} height={20} rx={4} style={L} />
      <rect x={236} y={34} width={48} height={20} rx={4} style={W} />
      <rect x={36} y={72} width={126} height={20} rx={4} style={D} />
      <rect x={236} y={72} width={48} height={20} rx={4} style={D} />
      <rect x={36} y={110} width={204} height={20} rx={4} style={L} />
      <rect x={236} y={110} width={48} height={20} rx={4} style={W} />
      <rect x={36} y={146} width={248} height={6} rx={3} style={W} />
    </>
  ),
  planner: () => (
    <>
      {Array.from({ length: 28 }, (_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const done = [0, 1, 2, 4, 7, 8, 11, 14, 15, 16, 17, 21, 22, 25].includes(i);
        const today = i === 19;
        return (
          <rect
            key={i}
            x={46 + col * 38}
            y={24 + row * 36}
            width={30}
            height={28}
            rx={5}
            style={today ? W : done ? L : D}
            opacity={today ? 1 : done ? 0.95 : 0.7}
          />
        );
      })}
    </>
  ),
  ticket: () => (
    <>
      <rect x={44} y={42} width={232} height={96} rx={8} style={L} />
      <circle cx={44} cy={90} r={14} style={BG} />
      <circle cx={276} cy={90} r={14} style={BG} />
      <line x1={206} y1={52} x2={206} y2={128} strokeWidth={4} strokeDasharray="6 7" {...strokeD} />
      <rect x={72} y={62} width={96} height={9} rx={4} style={D} />
      <circle cx={84} cy={104} r={11} style={D} />
      <circle cx={118} cy={104} r={11} style={W} />
      <circle cx={152} cy={104} r={11} style={D} />
    </>
  ),
  bubbles: () => (
    <>
      <path d="M56 36 h128 a12 12 0 0 1 12 12 v44 a12 12 0 0 1 -12 12 h-84 l-24 22 v-22 h-20 a12 12 0 0 1 -12 -12 v-44 a12 12 0 0 1 12 -12 z" style={L} />
      <path d="M136 86 h128 a12 12 0 0 1 12 12 v38 a12 12 0 0 1 -12 12 h-8 v22 l-24 -22 h-96 a12 12 0 0 1 -12 -12 v-38 a12 12 0 0 1 12 -12 z" style={W} />
      <rect x={76} y={58} width={88} height={8} rx={4} style={D} />
      <rect x={156} y={112} width={88} height={8} rx={4} style={BG} />
    </>
  ),
  wrench: () => (
    <g transform="rotate(32 160 90)">
      <circle cx={160} cy={46} r={36} style={W} />
      <rect x={146} y={6} width={28} height={40} style={BG} />
      <rect x={146} y={70} width={28} height={104} rx={14} style={L} />
    </g>
  ),
  "path-profile": () => (
    <>
      <polygon points="0,180 0,142 40,128 82,144 122,122 164,140 204,152 244,128 284,136 320,120 320,180" style={D} />
      <rect x={60} y={72} width={5} height={58} style={W} />
      <rect x={256} y={66} width={5} height={70} style={W} />
      <circle cx={62} cy={72} r={9} style={W} />
      <circle cx={259} cy={66} r={9} style={W} />
      <ellipse cx={160} cy={69} rx={104} ry={24} strokeWidth={3} {...strokeL} />
      <line x1={62} y1={72} x2={259} y2={66} strokeWidth={4} strokeDasharray="7 7" {...strokeW} />
    </>
  ),
  dish: () => (
    <>
      <path d="M150 28 A74 74 0 0 0 150 152 Z" style={W} />
      <line x1={150} y1={90} x2={238} y2={90} strokeWidth={6} {...strokeL} />
      <circle cx={238} cy={90} r={9} style={L} />
      {[26, 46, 66].map((r, i) => (
        <path key={i} d={`M${262 + i * 8} ${90 - r} A${r} ${r} 0 0 1 ${262 + i * 8} ${90 + r}`} strokeWidth={5} {...strokeL} opacity={1 - i * 0.22} />
      ))}
    </>
  ),
  cells: () => (
    <>
      <polygon points={hex(110, 70, 36)} style={L} />
      <polygon points={hex(172, 106, 36)} style={W} />
      <polygon points={hex(110, 142, 36)} style={D} />
      <polygon points={hex(234, 70, 36)} style={D} />
      {[18, 32].map((r, i) => (
        <path key={i} d={`M256 ${150 - r} A${r} ${r} 0 0 1 ${256 + r} 150`} strokeWidth={5} {...strokeL} />
      ))}
    </>
  ),
  mast: () => (
    <>
      <polygon points="160,22 122,158 198,158" strokeWidth={5} {...strokeW} />
      <line x1={140} y1={92} x2={180} y2={92} strokeWidth={5} {...strokeW} />
      <line x1={131} y1={126} x2={189} y2={126} strokeWidth={5} {...strokeW} />
      <line x1={140} y1={92} x2={189} y2={126} strokeWidth={4} {...strokeL} />
      <line x1={180} y1={92} x2={131} y2={126} strokeWidth={4} {...strokeL} />
      {[28, 50].map((r, i) => (
        <g key={i}>
          <path d={`M${110 - i * 18} ${40 + 0} A${r} ${r} 0 0 0 ${110 - i * 18} ${40 + r * 1.5}`} strokeWidth={5} {...strokeL} />
          <path d={`M${210 + i * 18} ${40 + 0} A${r} ${r} 0 0 1 ${210 + i * 18} ${40 + r * 1.5}`} strokeWidth={5} {...strokeL} />
        </g>
      ))}
    </>
  ),
  letter: () => (
    <>
      <rect x={96} y={20} width={128} height={142} rx={6} style={W} />
      <rect x={112} y={40} width={64} height={8} rx={4} style={D} />
      <rect x={112} y={60} width={96} height={6} rx={3} style={L} />
      <rect x={112} y={76} width={96} height={6} rx={3} style={L} />
      <rect x={112} y={92} width={80} height={6} rx={3} style={L} />
      <path d="M112 136 c10 -22 18 -2 26 -12 s10 14 22 2 s12 -10 22 0" strokeWidth={4} {...strokeD} />
      <circle cx={196} cy={124} r={14} style={BG} />
    </>
  ),
};

export function Cover({ name }: { name: string }) {
  const art = COVERS[name];
  return <Frame>{art ? art() : null}</Frame>;
}

// Capas altas da primeira tela, uma por trilha.
const TRACK_ART: Record<string, () => ReactNode> = {
  backend: () => (
    <>
      <path d="M104 64 c-30 0 -14 52 -40 70 c26 18 10 70 40 70" strokeWidth={14} {...strokeW} transform="translate(0 6)" />
      <path d="M136 64 c30 0 14 52 40 70 c-26 18 -10 70 -40 70" strokeWidth={14} {...strokeW} transform="translate(0 6)" />
      <rect x={96} y={124} width={48} height={10} rx={5} style={L} />
      <rect x={96} y={150} width={32} height={10} rx={5} style={D} />
      <rect x={96} y={176} width={40} height={10} rx={5} style={L} />
    </>
  ),
  suporte: () => (
    <>
      <path d="M52 150 a68 68 0 0 1 136 0" strokeWidth={14} {...strokeW} />
      <rect x={38} y={140} width={28} height={52} rx={12} style={W} />
      <rect x={174} y={140} width={28} height={52} rx={12} style={W} />
      <path d="M186 192 c0 26 -24 34 -54 34" strokeWidth={9} {...strokeL} />
      <circle cx={128} cy={226} r={9} style={L} />
      <rect x={60} y={254} width={120} height={30} rx={6} style={D} />
      <circle cx={60} cy={269} r={8} style={BG} />
      <circle cx={180} cy={269} r={8} style={BG} />
    </>
  ),
  infra: () => (
    <>
      <polygon points="0,320 0,262 50,248 100,268 150,244 200,260 240,246 240,320" style={D} />
      <polygon points="120,56 84,262 156,262" strokeWidth={9} {...strokeW} />
      <line x1={102} y1={150} x2={138} y2={150} strokeWidth={8} {...strokeW} />
      <line x1={94} y1={206} x2={146} y2={206} strokeWidth={8} {...strokeW} />
      <circle cx={120} cy={56} r={13} style={W} />
      {[34, 60, 88].map((r, i) => (
        <path key={i} d={`M${120 + 16 + i * 4} ${56 - r} A${r} ${r} 0 0 1 ${120 + 16 + i * 4} ${56 + r}`} strokeWidth={7} {...strokeL} opacity={1 - i * 0.25} />
      ))}
    </>
  ),
};

export function TrackCover({ track }: { track: string }) {
  const art = TRACK_ART[track];
  return <Frame tall>{art ? art() : null}</Frame>;
}
