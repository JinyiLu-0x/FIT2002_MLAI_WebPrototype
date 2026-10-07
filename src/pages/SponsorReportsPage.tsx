import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router";
import { getActiveDemoAccount } from "../app/demoAuth";

interface ApprovedReport {
  title: string;
  period: string;
  published: string;
  summary: string;
  metrics: string[];
}

const reportsByAccount: Record<string, ApprovedReport[]> = {
  "demo-sponsor-a": [
    {
      title: "Q2 Community Impact Summary",
      period: "2024–25 · Q2",
      published: "20 June 2025",
      summary:
        "Approved aggregate summary of community reach and sponsor-funded engagement.",
      metrics: ["1,890 aggregate reach", "18 funded activities", "74% engagement"],
    },
    {
      title: "Digital Pathways Initiative Update",
      period: "2024–25 · Q1",
      published: "08 April 2025",
      summary: "Approved initiative-level progress for Digital Pathways.",
      metrics: ["840 aggregate reach", "6 activities", "112 approved outcomes"],
    },
    {
      title: "Industry Insight Sessions Review",
      period: "2024–25 · Q1",
      published: "22 March 2025",
      summary: "Approved reach, engagement and outcome summary for industry sessions.",
      metrics: ["275 aggregate reach", "72% engagement", "64 approved outcomes"],
    },
    {
      title: "Community Mentoring Outcomes Brief",
      period: "2024–25 · Q1",
      published: "28 February 2025",
      summary: "Aggregate mentoring participation, engagement and progression outcomes.",
      metrics: ["365 aggregate reach", "69% engagement", "77 approved outcomes"],
    },
    {
      title: "Annual Sponsor Value Report",
      period: "2023–24",
      published: "30 August 2024",
      summary: "Annual approved summary of sponsor-supported reach and programme delivery.",
      metrics: ["1,230 aggregate reach", "9 funded activities", "175 approved outcomes"],
    },
    {
      title: "Community AI Labs Completion Report",
      period: "2024–25 · Q2",
      published: "25 June 2025",
      summary: "Completion report for approved Community AI Labs activity and outcomes.",
      metrics: ["430 aggregate reach", "8 funded activities", "86 approved outcomes"],
    },
  ],
  "demo-sponsor-b": [
    {
      title: "Northbridge Sponsorship Impact Update",
      period: "2024–25 · Q2",
      published: "18 June 2025",
      summary:
        "Approved aggregate reporting across sustainable careers and digital inclusion.",
      metrics: ["1,160 aggregate reach", "16 funded activities", "71% engagement"],
    },
    {
      title: "Green Skills Network Summary",
      period: "2024–25 · Q1",
      published: "02 April 2025",
      summary: "Approved programme reach and engagement summary.",
      metrics: ["510 aggregate reach", "5 activities", "89 approved outcomes"],
    },
    {
      title: "Regional Leadership Forum Review",
      period: "2024–25 · Q1",
      published: "19 March 2025",
      summary: "Aggregate participation and outcomes across regional leadership activity.",
      metrics: ["260 aggregate reach", "75% engagement", "59 approved outcomes"],
    },
    {
      title: "Digital Inclusion Portfolio Update",
      period: "2024–25 · Q1",
      published: "24 February 2025",
      summary: "Approved aggregate progress across Northbridge digital inclusion activity.",
      metrics: ["360 aggregate reach", "64% engagement", "73 approved outcomes"],
    },
    {
      title: "Sustainable Careers Annual Review",
      period: "2023–24",
      published: "26 August 2024",
      summary: "Annual reporting on sustainable careers reach, activity and outcomes.",
      metrics: ["425 aggregate reach", "4 funded activities", "76 approved outcomes"],
    },
    {
      title: "Mentoring Access Fund Completion Report",
      period: "2024–25 · Q2",
      published: "23 June 2025",
      summary: "Completion summary for mentoring reach, engagement and approved outcomes.",
      metrics: ["290 aggregate reach", "78% engagement", "68 approved outcomes"],
    },
  ],
  "partner-grant-provider": [
    {
      title: "Grant-Supported Outcomes Report",
      period: "2024–25 · Q2",
      published: "21 June 2025",
      summary:
        "Approved aggregate outcomes from programmes supported by Civic Futures Grant Trust.",
      metrics: ["1,425 participant reach", "21 funded activities", "327 outcomes"],
    },
    {
      title: "Regional Skills Bursary Update",
      period: "2024–25 · Q1",
      published: "11 April 2025",
      summary: "Aggregate delivery and outcomes for the approved bursary programme.",
      metrics: ["560 participant reach", "A$92,000 approved funding", "134 outcomes"],
    },
    {
      title: "Evaluation Capability Grant Review",
      period: "2024–25 · Q1",
      published: "15 March 2025",
      summary: "Approved aggregate delivery and capability outcomes for evaluation grants.",
      metrics: ["240 participant reach", "A$54,000 approved funding", "61 outcomes"],
    },
    {
      title: "Local Innovation Grant Closure Report",
      period: "2024–25 · Q1",
      published: "27 February 2025",
      summary: "Approved completion summary for locally funded innovation activity.",
      metrics: ["475 participant reach", "A$68,000 approved funding", "106 outcomes"],
    },
    {
      title: "Community Research Evidence Brief",
      period: "2023–24",
      published: "22 August 2024",
      summary: "Annual evidence brief covering grant delivery and aggregate outcomes.",
      metrics: ["345 participant reach", "A$59,000 approved funding", "72 outcomes"],
    },
    {
      title: "2023–24 Grant Outcomes Annual Report",
      period: "2023–24",
      published: "29 August 2024",
      summary: "Annual approved summary of funded delivery, reach and recorded outcomes.",
      metrics: ["835 participant reach", "A$143,000 approved funding", "188 outcomes"],
    },
  ],
};

const initiativesByAccount: Record<string, string[]> = {
  "demo-sponsor-a": [
    "Digital Pathways",
    "Leadership Circles",
    "Community AI Labs",
    "Community Mentoring Exchange",
    "Industry Insight Sessions",
  ],
  "demo-sponsor-b": [
    "Green Skills Network",
    "Community Tech Sessions",
    "Mentoring Access Fund",
    "Climate Careers Exchange",
    "Regional Leadership Forum",
  ],
  "partner-grant-provider": [
    "Regional Skills Bursary",
    "Community Research Fund",
    "Local Innovation Grants",
    "Access and Participation Grants",
    "Evaluation Capability Grants",
  ],
};

export default function SponsorReportsPage({
  role,
}: {
  role: "sponsor" | "partner";
}) {
  const account = getActiveDemoAccount();
  const [searchParams] = useSearchParams();
  const [selectedReport, setSelectedReport] = useState<ApprovedReport | null>(null);

  const reports = account ? (reportsByAccount[account.id] ?? []) : [];
  const requestedReport = searchParams.get("report");

  useEffect(() => {
    if (!requestedReport) {
      return;
    }
    const report = reports.find((item) => item.title === requestedReport);
    if (report) {
      setSelectedReport(report);
    }
  }, [requestedReport, account?.id]);

  if (!account || account.role !== role) {
    return <Navigate to="/access-denied" replace />;
  }

  const includedInitiatives = initiativesByAccount[account.id] ?? [];

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Reports
      </h1>
      <p className="mt-1 text-sm leading-5 text-muted">
        Approved aggregate reports available to {account.organisation}.
      </p>
      <div className="mt-6 overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
        {reports.map((report, index) => (
          <article
            key={report.title}
            className="grid gap-3 border-b border-line p-4 last:border-0 hover:bg-slate-50 lg:grid-cols-[40px_1fr_130px_140px_auto] lg:items-center"
          >
            <span
              className={`grid size-9 place-items-center rounded-lg text-xs font-semibold text-white ${
                index === 0 ? "bg-teal" : "bg-accent-purple"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-sm font-semibold text-ink">{report.title}</h2>
              <p className="mt-1 text-xs text-muted">{report.summary}</p>
            </div>
            <p className="text-xs text-muted">{report.period}</p>
            <p className="text-xs text-muted">{report.published}</p>
            <button
              type="button"
              onClick={() => setSelectedReport(report)}
              className="w-full rounded-lg bg-navy px-4 py-2 text-xs font-medium text-white hover:bg-teal sm:w-fit"
            >
              View report
            </button>
          </article>
        ))}
      </div>

      {selectedReport && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/55 p-3 sm:p-5">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="external-report-title"
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-line bg-surface p-5 shadow-xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-teal">
                  Approved report · {selectedReport.period}
                </p>
                <h2
                  id="external-report-title"
                  className="mt-2 text-2xl font-semibold leading-tight text-ink"
                >
                  {selectedReport.title}
                </h2>
                <p className="mt-2 text-xs text-muted">
                  Published {selectedReport.published}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-status-published-bg px-2.5 py-1 text-xs font-medium text-status-published">
                  <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                  Published
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-lg text-muted hover:bg-slate-50"
                aria-label="Close report"
              >
                ×
              </button>
            </div>
            <dl className="mt-6 grid gap-3 rounded-xl border border-line bg-app p-4 sm:grid-cols-4">
              {[
                ["Organisation", account.organisation],
                [
                  "Audience",
                  role === "sponsor" ? "Sponsor representative" : "Partner / grant provider",
                ],
                ["Reporting period", selectedReport.period],
                ["Published", selectedReport.published],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] text-muted">{label}</dt>
                  <dd className="mt-1 text-xs font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-ink">Report summary</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{selectedReport.summary}</p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {selectedReport.metrics.map((metric, index) => (
                <div
                  key={metric}
                  className={`relative overflow-hidden rounded-xl border border-line p-4 text-sm font-medium text-ink ${
                    ["bg-brand-50", "bg-status-pending-bg", "bg-status-progress-bg"][index]
                  }`}
                >
                  <span
                    className={`absolute top-0 right-0 left-0 h-1 ${
                      ["bg-accent-mint", "bg-accent-orange", "bg-accent-purple"][index]
                    }`}
                  />
                  {metric}
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <section className="rounded-xl border border-line bg-app p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-ink">Approved outcome trend</h3>
                  <span className="text-[11px] text-muted">Reporting period</span>
                </div>
                <div className="mt-5 flex h-36 items-end gap-3">
                  {["h-[44%]", "h-[62%]", "h-[56%]", "h-[76%]", "h-[70%]", "h-[91%]"].map(
                    (height, index) => (
                      <span
                        key={`${height}-${index}`}
                        className={`flex-1 rounded-t-md ${height} ${
                          index % 2 === 0 ? "bg-accent-purple" : "bg-accent-mint"
                        }`}
                      />
                    ),
                  )}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted">
                  <span>Period start</span>
                  <span>Current</span>
                </div>
              </section>

              <section className="rounded-xl border border-line bg-surface p-5">
                <h3 className="text-base font-semibold text-ink">
                  {role === "sponsor" ? "Sponsor-funded initiatives" : "Approved grant initiatives"}
                </h3>
                <div className="mt-3 divide-y divide-line">
                  {includedInitiatives.map((initiative) => (
                    <div key={initiative} className="flex items-center justify-between gap-3 py-2.5">
                      <span className="text-xs font-medium text-ink">{initiative}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-status-approved-bg px-2 py-1 text-[10px] font-medium text-status-approved">
                        <span className="size-1 rounded-full bg-current" aria-hidden="true" />
                        Included
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-6 rounded-lg border border-line bg-status-published-bg/60 p-4">
              <p className="text-xs font-semibold text-ink">Reporting scope</p>
              <p className="mt-1 text-[11px] leading-5 text-muted">
                Approved aggregate information only. No names, contact details or identifiable
                member records are included. This report is read-only for external users.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
