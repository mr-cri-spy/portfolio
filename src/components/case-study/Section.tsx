import type { ReactNode } from "react";

export default function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-4">
      <h3 id={id} className="text-xl sm:text-2xl font-serif font-[700] tracking-tight text-[#262624]">
        {title}
      </h3>
      {children}
    </section>
  );
}
