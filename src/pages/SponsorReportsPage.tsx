import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router";
import { getActiveDemoAccount } from "../app/demoAuth";
import { useReportingPeriod } from "../app/reportingPeriod";
import {
  getReportCategory,
  reportPresentation,
  type ReportCategory,
} from "../app/reportPresentation";

interface ApprovedReport {
  title: string;
  period: string;
  published: string;
  summary: string;
  metrics: string[];
}

interface NarrativeSection {
  heading: string;
  paragraphs: string[];
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

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getReachBreakdown(report: ApprovedReport) {
  const reachMetric = report.metrics.find((metric) => /reach/i.test(metric));
  const reportedReach = Number(reachMetric?.match(/[\d,]+/)?.[0].replace(/,/g, "") ?? 0);
  const isAnnual = !report.period.includes("Q");
  const labels = isAnnual
    ? ["Jul–Aug", "Sep–Oct", "Nov–Dec", "Jan–Feb", "Mar–Apr", "May–Jun"]
    : (() => {
        const publishedMonth = report.published.split(" ")[1];
        const monthIndex = monthNames.findIndex((month) =>
          publishedMonth.startsWith(month),
        );
        return [2, 1, 0].map((offset) => monthNames[(monthIndex - offset + 12) % 12]);
      })();
  const weights = isAnnual
    ? [0.13, 0.16, 0.15, 0.19, 0.18, 0.19]
    : [0.29, 0.34, 0.37];
  const values = weights.map((weight) => Math.round(reportedReach * weight));
  values[values.length - 1] += reportedReach - values.reduce((sum, value) => sum + value, 0);

  return labels.map((label, index) => ({ label, value: values[index] }));
}

function buildNarrativeSections(
  report: ApprovedReport,
  organisation: string,
  initiatives: string[],
  role: "sponsor" | "partner",
): NarrativeSection[] {
  const initiativeSummary = initiatives.slice(0, 3).join(", ");
  const additionalInitiatives = Math.max(initiatives.length - 3, 0);
  const relationship = role === "sponsor" ? "sponsor-supported" : "grant-supported";

  return [
    {
      heading: "Executive overview",
      paragraphs: [
        `${report.title} provides ${organisation} with an approved account of ${relationship} delivery during ${report.period}. ${report.summary}`,
        `The report brings together validated programme information available at the publication date of ${report.published}. It is intended to support governance, partnership review and forward planning without disclosing identifiable participant records.`,
      ],
    },
    {
      heading: "Delivery during the reporting period",
      paragraphs: [
        `Delivery included activity associated with ${initiativeSummary}${additionalInitiatives > 0 ? ` and ${additionalInitiatives} additional approved initiatives` : ""}. Programmes used a mix of facilitated sessions, practical resources and partner-supported engagement to respond to the priorities agreed for the period.`,
        `Implementation remained focused on accessible participation and consistent reporting. Delivery teams reviewed aggregate attendance and activity records before the information was included in this external report.`,
      ],
    },
    {
      heading: "Approved outcomes and evidence",
      paragraphs: [
        `The approved reporting view records ${report.metrics.join(", ")}. These figures represent aggregate results across the reporting scope and should be read alongside the delivery context for each initiative.`,
        `Evidence was drawn from approved activity totals, de-identified participation summaries and programme-level outcome records. Results indicate continued progress while recognising that outcomes develop over different timeframes across the funded portfolio.`,
      ],
    },
    {
      heading: "Learning and interpretation",
      paragraphs: [
        `The reporting period reinforced the value of combining quantitative measures with structured delivery feedback. Stronger engagement was generally observed where activities had a clear practical purpose, repeat contact and an established referral or partner network.`,
        `Some variation between initiatives reflects differences in duration, delivery format and participant pathway rather than performance alone. Future comparisons will continue to use consistent definitions and approved aggregate measures.`,
      ],
    },
    {
      heading: "Next reporting priorities",
      paragraphs: [
        `The next reporting cycle will continue validation of reach, funded activity and approved outcomes. The programme team will also review how progression and longer-term value can be described more consistently across initiatives.`,
        `Any future publication will remain read-only for external audiences and will contain approved aggregate information only.`,
      ],
    },
  ];
}

export default function SponsorReportsPage({
  role,
}: {
  role: "sponsor" | "partner";
}) {
  const account = getActiveDemoAccount();
  const { period } = useReportingPeriod();
  const [searchParams] = useSearchParams();
  const [selectedReport, setSelectedReport] = useState<ApprovedReport | null>(null);
  const [reportView, setReportView] = useState<"visual" | "narrative">("visual");
  const [selectedCategories, setSelectedCategories] = useState<ReportCategory[]>([]);

  const reports = account ? (reportsByAccount[account.id] ?? []) : [];
  const requestedReport = searchParams.get("report");

  useEffect(() => {
    if (!requestedReport) {
      return;
    }
    const report = reports.find((item) => item.title === requestedReport);
    if (report) {
      setSelectedReport(report);
      setReportView("visual");
    }
  }, [requestedReport, account?.id]);

  if (!account || account.role !== role) {
    return <Navigate to="/access-denied" replace />;
  }

  const includedInitiatives = initiativesByAccount[account.id] ?? [];
  const reportsForPeriod = reports.filter((report) => report.period.startsWith(period));
  const filteredReports = reportsForPeriod.filter(
    (report) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(getReportCategory(report.title)),
  );
  const selectedReportPresentation = selectedReport
    ? reportPresentation[getReportCategory(selectedReport.title)]
    : null;
  const reportCategories = Object.entries(reportPresentation) as [
    ReportCategory,
    (typeof reportPresentation)[ReportCategory],
  ][];
  const narrativeSections = selectedReport
    ? buildNarrativeSections(selectedReport, account.organisation, includedInitiatives, role)
    : [];
  const reachBreakdown = selectedReport ? getReachBreakdown(selectedReport) : [];
  const reachTotal = reachBreakdown.reduce((sum, item) => sum + item.value, 0);
  const highestReach = Math.max(...reachBreakdown.map((item) => item.value), 1);

  function toggleCategory(category: ReportCategory) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  function openReport(report: ApprovedReport) {
    setSelectedReport(report);
    setReportView("visual");
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Reports
          </h1>
          <p className="mt-1 text-sm leading-5 text-muted">
            Approved aggregate reports available to {account.organisation}.
          </p>
          <p className="mt-2 text-xs font-medium text-teal">
            Reporting period: {period}
          </p>
        </div>

        <details className="relative">
          <summary
            className="relative grid size-10 cursor-pointer list-none place-items-center rounded-full border border-line bg-surface text-ink shadow-sm hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            aria-label="Filter reports"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            {selectedCategories.length > 0 && (
              <span
                className="absolute top-0 right-0 size-2.5 rounded-full border-2 border-surface bg-accent-purple"
                aria-hidden="true"
              />
            )}
          </summary>
          <div className="absolute top-12 right-0 z-20 w-72 rounded-xl border border-line bg-surface p-4 shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink">Filter reports</p>
                <p className="mt-1 text-[11px] text-muted">
                  Period is controlled from the header.
                </p>
              </div>
              {selectedCategories.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCategories([])}
                  className="text-xs font-medium text-teal hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="mt-4 border-t border-line pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                Report type
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {reportCategories.map(([category, presentation]) => {
                  const isSelected = selectedCategories.includes(category);

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      aria-pressed={isSelected}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        isSelected
                          ? `${presentation.borderClass} ${presentation.surfaceClass} ${presentation.textClass}`
                          : "border-line bg-surface text-muted hover:bg-slate-50"
                      }`}
                    >
                      {presentation.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] leading-4 text-muted">
                Select one or more types. With no tags selected, all report types are shown.
              </p>
            </div>
          </div>
        </details>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
        {filteredReports.map((report, index) => {
          const presentation = reportPresentation[getReportCategory(report.title)];

          return (
            <article
              key={report.title}
              className={`grid gap-3 border-b border-l-4 border-line p-4 last:border-b-0 hover:bg-slate-50 lg:grid-cols-[40px_1fr_130px_140px_auto] lg:items-center ${presentation.borderClass}`}
            >
              <span
                className={`grid size-9 place-items-center rounded-lg text-xs font-semibold text-white ${presentation.accentClass}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-semibold text-ink">{report.title}</h2>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-medium ${presentation.surfaceClass} ${presentation.textClass}`}
                  >
                    {presentation.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">{report.summary}</p>
              </div>
              <p className="text-xs text-muted">{report.period}</p>
              <p className="text-xs text-muted">{report.published}</p>
              <button
                type="button"
                onClick={() => openReport(report)}
                className="w-full rounded-lg bg-navy px-4 py-2 text-xs font-medium text-white hover:bg-teal sm:w-fit"
              >
                View report
              </button>
            </article>
          );
        })}
        {filteredReports.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-sm font-semibold text-ink">No matching reports</p>
            <p className="mt-1 text-xs leading-5 text-muted">
              No approved reports match {period} and the selected report types.
            </p>
            {selectedCategories.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCategories([])}
                className="mt-4 text-xs font-medium text-teal hover:underline"
              >
                Clear report type filters
              </button>
            )}
          </div>
        )}
      </div>

      {selectedReport && selectedReportPresentation && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-navy/55 p-3 sm:p-5"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedReport(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="external-report-title"
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-line bg-surface p-5 shadow-xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-medium text-teal">
                    Approved report · {selectedReport.period}
                  </p>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-medium ${selectedReportPresentation.surfaceClass} ${selectedReportPresentation.textClass}`}
                  >
                    {selectedReportPresentation.label}
                  </span>
                </div>
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

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <p className="text-sm font-semibold text-ink">Report format</p>
                <p className="mt-1 text-xs text-muted">
                  Review the visual summary or read the complete narrative.
                </p>
              </div>
              <div className="inline-flex rounded-lg border border-line bg-app p-1">
                <button
                  type="button"
                  onClick={() => setReportView("visual")}
                  aria-pressed={reportView === "visual"}
                  className={`rounded-md px-3 py-2 text-xs font-medium transition ${
                    reportView === "visual"
                      ? "bg-surface text-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Visual summary
                </button>
                <button
                  type="button"
                  onClick={() => setReportView("narrative")}
                  aria-pressed={reportView === "narrative"}
                  className={`rounded-md px-3 py-2 text-xs font-medium transition ${
                    reportView === "narrative"
                      ? "bg-navy text-white shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Full narrative
                </button>
              </div>
            </div>

            {reportView === "visual" ? (
              <>
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
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-ink">Reported reach breakdown</h3>
                      <div className="text-right">
                        <p className="text-lg font-semibold tabular-nums text-ink">
                          {reachTotal.toLocaleString("en-AU")}
                        </p>
                        <p className="text-[10px] text-muted">Total reach in report</p>
                      </div>
                    </div>
                    <div
                      className="mt-5 flex h-44 items-end gap-2 border-b border-line pb-1 sm:gap-3"
                      role="img"
                      aria-label={`Reach breakdown: ${reachBreakdown.map(({ label, value }) => `${label} ${value}`).join(", ")}`}
                    >
                      {reachBreakdown.map(({ label, value }, index) => (
                        <div key={label} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-1">
                          <span className="text-center text-[10px] font-semibold tabular-nums text-ink sm:text-xs">
                            {value.toLocaleString("en-AU")}
                          </span>
                          <div
                            className={`min-h-2 rounded-t-md ${index % 2 === 0 ? "bg-accent-purple" : "bg-accent-mint"}`}
                            style={{ height: `${Math.max((value / highestReach) * 78, 8)}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex gap-2 sm:gap-3">
                      {reachBreakdown.map(({ label }) => (
                        <span key={label} className="min-w-0 flex-1 text-center text-[10px] text-muted">
                          {label}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-xl border border-line bg-surface p-5">
                    <h3 className="text-base font-semibold text-ink">
                      {role === "sponsor"
                        ? "Sponsor-funded initiatives"
                        : "Approved grant initiatives"}
                    </h3>
                    <div className="mt-3 divide-y divide-line">
                      {includedInitiatives.map((initiative) => (
                        <div
                          key={initiative}
                          className="flex items-center justify-between gap-3 py-2.5"
                        >
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
              </>
            ) : (
              <article className="mx-auto mt-7 max-w-3xl">
                <div className="rounded-xl border border-line bg-app p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                    Full narrative report
                  </p>
                  <p className="mt-3 text-base font-medium leading-7 text-ink">
                    {selectedReport.summary}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-muted">
                    Prepared for {account.organisation} · Approved aggregate information ·{" "}
                    {selectedReport.period}
                  </p>
                </div>

                <div className="mt-7 space-y-8">
                  {narrativeSections.map((section, index) => (
                    <section key={section.heading}>
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-1 block h-6 w-1 shrink-0 rounded-full ${
                            [
                              "bg-teal",
                              "bg-accent-purple",
                              "bg-accent-orange",
                              "bg-accent-blue",
                              "bg-navy",
                            ][index]
                          }`}
                          aria-hidden="true"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-ink">{section.heading}</h3>
                          <div className="mt-3 space-y-3">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph} className="text-sm leading-7 text-muted">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            )}

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
