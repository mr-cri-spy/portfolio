import type { StatItem } from "../../types";

export default function StatTile({ label, value }: StatItem) {
  return (
    <div className="bg-white border border-[#EFEBE1] rounded-2xl px-5 py-5">
      <div className="text-3xl sm:text-4xl font-serif font-[800] tracking-[-0.02em] text-[#C15F3C] tabular-nums">
        {value}
      </div>
      <div className="text-xs uppercase tracking-wider text-[#83807A] font-semibold mt-1.5">{label}</div>
    </div>
  );
}
