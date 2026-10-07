interface PlaceholderPanelProps {
  title: string;
  description: string;
  className?: string;
}

export function PlaceholderPanel({
  title,
  description,
  className = "",
}: PlaceholderPanelProps) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-5 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Placeholder
        </span>
      </div>
      <div className="mt-6 h-24 rounded-lg border border-dashed border-slate-300 bg-slate-50" />
    </section>
  );
}

export function SummaryCardPlaceholder({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <div className="mt-4 h-7 w-20 rounded bg-slate-100" />
      <div className="mt-3 h-3 w-32 max-w-full rounded bg-slate-100" />
    </div>
  );
}
