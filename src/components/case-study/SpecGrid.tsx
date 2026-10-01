import type { SpecItem } from "../../types";

export default function SpecGrid({ items }: { items: SpecItem[] }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E6E2D8] border border-[#E6E2D8] rounded-2xl overflow-hidden">
      {items.map((item) => (
        <div key={item.label} className="bg-white px-4 py-3">
          <dt className="text-[11px] uppercase tracking-wider text-[#83807A] font-semibold">{item.label}</dt>
          <dd className="text-sm text-[#262624] font-medium mt-0.5">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
