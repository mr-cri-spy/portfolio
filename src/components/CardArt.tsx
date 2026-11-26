/**
 * Small drawn headers for the "More work" cards. They are illustrations, not
 * screenshots, so they carry no fake data; they also cost nothing to download.
 */

type Variant = "chat" | "browsers" | "graph";

const INK = "#262624";
const CLAY = "#C15F3C";
const SAGE = "#6B7A5E";
const LINE = "#E6E2D8";

function Chat() {
  return (
    <svg viewBox="0 0 320 160" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="160" fill="#F3E3D9" />
      {/* caller speaks */}
      <rect x="28" y="24" width="150" height="34" rx="12" fill="#fff" stroke={LINE} />
      <circle cx="46" cy="41" r="8" fill={CLAY} />
      <rect x="43" y="36" width="6" height="9" rx="3" fill="#fff" />
      <rect x="62" y="35" width="96" height="5" rx="2.5" fill={LINE} />
      <rect x="62" y="44" width="68" height="5" rx="2.5" fill={LINE} />
      {/* agent answers, grounded in documents */}
      <rect x="112" y="68" width="180" height="40" rx="12" fill={INK} />
      <rect x="128" y="80" width="128" height="5" rx="2.5" fill="#ffffff66" />
      <rect x="128" y="90" width="92" height="5" rx="2.5" fill="#ffffff40" />
      <rect x="262" y="78" width="18" height="20" rx="3" fill="none" stroke="#ffffff80" />
      <rect x="265" y="83" width="12" height="2" fill="#ffffff80" />
      <rect x="265" y="88" width="9" height="2" fill="#ffffff80" />
      {/* follow-up on WhatsApp */}
      <rect x="28" y="118" width="126" height="28" rx="12" fill="#fff" stroke={LINE} />
      <circle cx="44" cy="132" r="6" fill={SAGE} />
      <rect x="56" y="129" width="78" height="5" rx="2.5" fill={LINE} />
    </svg>
  );
}

function Browsers() {
  const win = (x: number, y: number, accent: string) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="150" height="100" rx="8" fill="#fff" stroke={LINE} />
      <rect width="150" height="16" rx="8" fill="#F4F1EA" />
      <rect y="8" width="150" height="8" fill="#F4F1EA" />
      <circle cx="10" cy="8" r="2.5" fill={LINE} />
      <circle cx="18" cy="8" r="2.5" fill={LINE} />
      <circle cx="26" cy="8" r="2.5" fill={LINE} />
      <rect x="12" y="26" width="70" height="7" rx="3.5" fill={INK} />
      <rect x="12" y="38" width="96" height="4" rx="2" fill={LINE} />
      <rect x="12" y="46" width="80" height="4" rx="2" fill={LINE} />
      <rect x="12" y="58" width="40" height="12" rx="6" fill={accent} />
      <rect x="12" y="78" width="38" height="14" rx="3" fill="#F4F1EA" />
      <rect x="56" y="78" width="38" height="14" rx="3" fill="#F4F1EA" />
      <rect x="100" y="78" width="38" height="14" rx="3" fill="#F4F1EA" />
    </g>
  );
  return (
    <svg viewBox="0 0 320 160" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="160" fill="#EEF3EA" />
      {win(20, 30, SAGE)}
      {win(86, 18, "#B08D3F")}
      {win(152, 42, CLAY)}
    </svg>
  );
}

function Graph() {
  const nodes: [number, number, string][] = [
    [160, 80, INK],
    [70, 40, CLAY],
    [250, 40, SAGE],
    [70, 122, "#B08D3F"],
    [250, 122, CLAY],
  ];
  return (
    <svg viewBox="0 0 320 160" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="160" fill="#F6EFDD" />
      {nodes.slice(1).map(([x, y], i) => (
        <line key={i} x1={160} y1={80} x2={x} y2={y} stroke="#83807A" strokeWidth="1.5" strokeDasharray="4 4" />
      ))}
      <line x1={70} y1={40} x2={250} y2={40} stroke={LINE} strokeWidth="1.5" />
      <line x1={70} y1={122} x2={250} y2={122} stroke={LINE} strokeWidth="1.5" />
      {nodes.map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 0 ? 22 : 15} fill="#fff" stroke={c} strokeWidth="2" />
          <circle cx={x} cy={y} r={i === 0 ? 8 : 5} fill={c} />
        </g>
      ))}
    </svg>
  );
}

export default function CardArt({ variant }: { variant: Variant }) {
  return (
    <div className="aspect-[2/1] w-full overflow-hidden border-b border-[#EFEBE1]">
      {variant === "chat" ? <Chat /> : variant === "browsers" ? <Browsers /> : <Graph />}
    </div>
  );
}

export type { Variant as CardArtVariant };
