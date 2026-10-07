import { useState } from "react";
import { Link, useParams } from "react-router";

const pendingReports = [
  {
    id: "horizon-q2",
    title: "Horizon Community Foundation · Q2 Impact",
    period: "2024–25",
    reach: "1,890",
    activities: "18",
    submitted: "18 Jun 2025",
  },
  {
    id: "civic-outcomes",
    title: "Civic Futures · Funded Outcomes",
    period: "2024–25",
    reach: "1,425",
    activities: "21",
    submitted: "16 Jun 2025",
  },
];

export function ApproverDashboardPage() {
  const summary = [
    ["Pending", "02", "bg-accent-yellow/45"],
    ["Approved this period", "05", "bg-accent-mint/45"],
    ["Changes requested", "01", "bg-accent-coral/40"],
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-black uppercase tracking-tight text-ink sm:text-3xl">
        Approval overview
      </h1>
      <p className="mt-1 text-xs font-medium text-ink/60">
        A concise view of the current aggregate reporting approval workflow.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {summary.map(([label, value, colour]) => (
          <article key={label} className={`rounded-xl border border-slate-400 p-4 ${colour}`}>
            <p className="text-xs font-black uppercase text-ink/55">{label}</p>
            <p className="mt-2 text-3xl font-black text-ink">{value}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-slate-400 bg-cream-light p-5">
        <h2 className="text-base font-black uppercase text-ink">Next action</h2>
        <p className="mt-2 text-sm font-medium text-ink/65">
          Two reports are ready for aggregate-data and privacy review.
        </p>
        <Link
          to="/approver/queue"
          className="mt-4 inline-flex rounded-full border border-ink bg-accent-purple px-4 py-2 text-xs font-black text-white"
        >
          Open approval queue
        </Link>
      </div>
    </div>
  );
}

export function ApprovalQueuePage() {
  return (
    <div className="mx-auto max-w-7xl">
      <p className="inline-flex rounded-full border border-ink bg-accent-coral px-3 py-1.5 text-xs font-black uppercase tracking-widest text-ink">
        Dr Sam · Internal approver
      </p>
      <h1 className="mt-3 text-2xl font-black uppercase leading-none tracking-tight text-ink sm:text-3xl">
        Pending reports
      </h1>
      <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-ink/65">
        Review aggregate reports submitted by the Reporting Administrator.
      </p>
      <div className="mt-8 space-y-4">
        {pendingReports.map((report, index) => (
          <Link
            key={report.id}
            to={`/approver/reports/${report.id}`}
            className="grid gap-4 rounded-xl border border-slate-400 bg-cream-light p-4 transition-transform hover:-translate-y-0.5 md:grid-cols-[44px_1fr_auto] md:items-center"
          >
            <span className={`grid size-11 place-items-center rounded-full border border-ink text-xs font-black ${index === 0 ? "bg-accent-mint" : "bg-accent-purple"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block text-lg font-black text-ink">{report.title}</span>
              <span className="mt-2 block text-xs font-semibold text-ink/60">
                {report.period} · Submitted {report.submitted}
              </span>
            </span>
            <span className="rounded-full border border-ink bg-ink px-4 py-2 text-xs font-black text-white">
              Open report ↗
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ApprovedReportsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-black uppercase tracking-tight text-ink sm:text-3xl">
        Approved reports
      </h1>
      <p className="mt-1 text-xs font-medium text-ink/60">
        Reports approved for role-appropriate external publication.
      </p>
      <div className="mt-5 space-y-3">
        {[
          ["Northbridge · Annual Sponsorship Summary", "2023–24", "Approved 12 Jun 2025"],
          ["Regional Skills Bursary · Outcomes", "2024–25", "Approved 04 Jun 2025"],
        ].map((report) => (
          <article
            key={report[0]}
            className="grid gap-2 rounded-xl border border-slate-400 bg-cream-light p-4 sm:grid-cols-[1fr_auto] sm:items-center"
          >
            <div>
              <h2 className="text-sm font-black text-ink">{report[0]}</h2>
              <p className="mt-1 text-xs text-ink/55">{report[1]} · {report[2]}</p>
            </div>
            <span className="rounded-full border border-ink bg-accent-mint px-3 py-1 text-[11px] font-black text-ink">
              Approved
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ApprovalDetailPage() {
  const { reportId } = useParams();
  const report = pendingReports.find((item) => item.id === reportId) ?? pendingReports[0];
  const [decision, setDecision] = useState<"pending" | "approved" | "changes">("pending");

  return (
    <div className="mx-auto max-w-6xl">
      <Link to="/approver" className="text-sm font-black text-ink underline underline-offset-4">
        ← Pending reports
      </Link>
      <div className="mt-6 rounded-xl border border-slate-400 bg-cream-light p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-accent-blue">
              Approval detail
            </p>
            <h1 className="mt-3 max-w-3xl text-2xl font-black uppercase leading-none text-ink sm:text-3xl">
              {report.title}
            </h1>
            <p className="mt-3 text-sm font-semibold text-ink/60">
              {report.period} · Aggregate report
            </p>
          </div>
          <span className={`rounded-full border border-ink px-4 py-2 text-xs font-black ${decision === "approved" ? "bg-accent-mint" : decision === "changes" ? "bg-accent-coral" : "bg-accent-yellow"}`}>
            {decision === "approved" ? "Approved" : decision === "changes" ? "Changes requested" : "Awaiting decision"}
          </span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Community reach", report.reach],
            ["Funded activities", report.activities],
            ["Privacy review", "Passed"],
          ].map(([label, value], index) => (
            <article key={label} className={`rounded-2xl border border-ink p-5 ${["bg-accent-mint", "bg-accent-yellow", "bg-accent-purple"][index]}`}>
              <p className="text-xs font-black uppercase text-ink/60">{label}</p>
              <p className="mt-4 text-4xl font-black text-ink">{value}</p>
            </article>
          ))}
        </div>
        <section className="mt-6 rounded-2xl border border-ink bg-cream-light p-6">
          <h2 className="text-xl font-black uppercase text-ink">Approved summary</h2>
          <p className="mt-3 text-sm font-medium leading-7 text-ink/70">
            This demonstration report summarises initiative-level reach, engagement and funded
            activity. All figures are aggregated and contain no identifiable member data.
          </p>
        </section>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setDecision("approved")}
            className="rounded-full border border-ink bg-accent-mint px-6 py-3 text-sm font-black text-ink hover:bg-ink hover:text-white"
          >
            Approve
          </button>
          <button
            type="button"
            onClick={() => setDecision("changes")}
            className="rounded-full border border-ink bg-accent-coral px-6 py-3 text-sm font-black text-ink hover:bg-ink hover:text-white"
          >
            Request changes
          </button>
        </div>
      </div>
    </div>
  );
}
