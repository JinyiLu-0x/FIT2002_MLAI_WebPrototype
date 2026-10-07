import { Link } from "react-router";

const reports = [
  {
    id: "horizon-q2",
    title: "Horizon Community Foundation · Q2 Impact",
    audience: "Sponsor",
    period: "2024–25",
    status: "Draft",
  },
  {
    id: "civic-outcomes",
    title: "Civic Futures · Funded Outcomes",
    audience: "Partner",
    period: "2024–25",
    status: "Changes requested",
  },
  {
    id: "northbridge-annual",
    title: "Northbridge · Annual Sponsorship Summary",
    audience: "Sponsor",
    period: "2023–24",
    status: "Approved",
  },
];

function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header>
      <p className="inline-flex rounded-full border border-ink bg-accent-mint px-3 py-1.5 text-xs font-black uppercase tracking-widest text-ink">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-2xl font-black uppercase leading-none tracking-tight text-ink sm:text-3xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-ink/65">
        {description}
      </p>
    </header>
  );
}

export function InternalOverviewPage() {
  const metrics = [
    { label: "Approved datasets", value: "12", colour: "bg-accent-mint" },
    { label: "Draft reports", value: "03", colour: "bg-accent-yellow" },
    { label: "Pending approval", value: "02", colour: "bg-accent-coral" },
    { label: "External views", value: "03", colour: "bg-accent-purple" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeading
        eyebrow="Internal access"
        title="Reporting overview"
        description="Monitor consolidated aggregate reporting, prepare external reports and track approval progress."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className={`rounded-xl border border-slate-400 p-4 ${metric.colour}`}
          >
            <p className="text-xs font-black uppercase tracking-wider text-ink/65">
              {metric.label}
            </p>
            <p className="mt-2 text-3xl font-black leading-none text-ink">
              {metric.value}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-400 bg-cream-light p-5">
          <h2 className="text-xl font-black uppercase text-ink">Reporting workflow</h2>
          <ol className="mt-5 space-y-3">
            {["Check consolidated data", "Prepare report draft", "Submit for approval"].map(
              (item, index) => (
                <li
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-ink bg-cream-light p-4"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-ink text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-black text-ink">{item}</span>
                </li>
              ),
            )}
          </ol>
        </section>
        <section className="rounded-xl border border-ink bg-accent-blue p-5 text-white">
          <p className="text-xs font-black uppercase tracking-widest text-accent-mint">
            Privacy checkpoint
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase leading-none">
            Aggregate before sharing
          </h2>
          <p className="mt-4 text-sm font-medium leading-6 text-white/80">
            External dashboards and reports contain approved initiative-level totals only.
            Identifiable member records are never included.
          </p>
        </section>
      </div>
    </div>
  );
}

export function ConsolidatedDataPage() {
  const rows = [
    ["Sponsor-funded activity", "3 organisations", "6,240 reach", "Approved"],
    ["Grant-supported programmes", "4 initiatives", "1,486 outcomes", "Approved"],
    ["Engagement reporting", "7 initiatives", "68% average", "Review complete"],
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeading
        eyebrow="Internal access"
        title="Consolidated reporting data"
        description="Internal aggregate totals used to prepare permitted sponsor and partner reporting views."
      />
      <section className="mt-8 overflow-hidden rounded-3xl border border-slate-400 bg-cream">
        <div className="border-b border-slate-400 bg-accent-yellow px-6 py-5">
          <h2 className="text-lg font-black uppercase text-ink">Approved data groups</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-3xl text-left text-sm">
            <thead>
              <tr className="border-b border-slate-400 text-xs font-black uppercase tracking-wider text-ink/60">
                <th className="px-6 py-4">Reporting group</th>
                <th className="px-6 py-4">Coverage</th>
                <th className="px-6 py-4">Aggregate measure</th>
                <th className="px-6 py-4">Data status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {rows.map((row) => (
                <tr key={row[0]} className="font-semibold text-ink/70">
                  {row.map((cell, index) => (
                    <td key={cell} className={`px-6 py-5 ${index === 0 ? "font-black text-ink" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="mt-4 text-xs font-semibold text-ink/55">
        Aggregated reporting data only · No names, emails or identifiable member records
      </p>
    </div>
  );
}

export function ReportDraftsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <PageHeading
          eyebrow="Internal access"
          title="Report drafts"
          description="Create, edit and prepare aggregate reports for approval."
        />
        <Link
          to="/internal/reports/new"
          className="rounded-full border border-ink bg-accent-orange px-5 py-3 text-sm font-black text-ink hover:bg-accent-yellow"
        >
          Create report /
        </Link>
      </div>
      <div className="mt-8 space-y-3">
        {reports.map((report, index) => (
          <Link
            key={report.id}
            to={`/internal/reports/${report.id}/edit`}
            className="grid gap-4 rounded-2xl border border-ink bg-cream-light p-5 transition-transform hover:-translate-y-0.5 sm:grid-cols-[48px_1fr_auto] sm:items-center"
          >
            <span className="grid size-12 place-items-center rounded-full bg-ink text-xs font-black text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block font-black text-ink">{report.title}</span>
              <span className="mt-1 block text-xs font-semibold text-ink/60">
                {report.audience} · {report.period}
              </span>
            </span>
            <span className="rounded-full border border-ink bg-accent-yellow px-3 py-1.5 text-xs font-black text-ink">
              {report.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ApprovalStatusPage() {
  const items = [
    ["Horizon · Q2 Impact", "Awaiting approval", "Dr Sam"],
    ["Civic Futures · Outcomes", "Changes requested", "Reporting Administrator"],
    ["Northbridge · Annual Summary", "Approved", "Dr Sam"],
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeading
        eyebrow="Internal access"
        title="Approval status"
        description="Track report drafts through the internal review and approval workflow."
      />
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-400 bg-cream-light">
        {items.map((item, index) => (
          <div
            key={item[0]}
            className="grid gap-2 border-b border-slate-300 px-5 py-4 last:border-0 sm:grid-cols-[1fr_180px_180px] sm:items-center"
          >
            <p className="text-sm font-black text-ink">{item[0]}</p>
            <span className={`w-fit rounded-full border border-ink px-3 py-1 text-[11px] font-black text-ink ${
              index === 0 ? "bg-accent-yellow" : index === 1 ? "bg-accent-coral" : "bg-accent-mint"
            }`}>
              {item[1]}
            </span>
            <p className="text-xs font-medium text-ink/55">{item[2]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
