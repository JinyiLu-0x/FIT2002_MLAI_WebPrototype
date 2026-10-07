import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useReportingPeriod } from "../../app/reportingPeriod";
import {
  reportingDashboards,
  sponsorReportingDashboards,
  type DistributionValue,
  type InitiativeRecord,
  type ReportingRole,
  type SponsorOrganisationId,
} from "../../data/reportingData";

const numberFormatter = new Intl.NumberFormat("en-GB");
const formatAustralianCurrency = (value: number) =>
  `A$${numberFormatter.format(value)}`;

const relatedReportsByInitiative: Record<string, string> = {
  "community-ai-labs-25": "Community AI Labs Completion Report",
  "industry-insight-25": "Industry Insight Sessions Review",
  "digital-pathways-24": "Annual Sponsor Value Report",
  "career-connect-24": "Annual Sponsor Value Report",
  "innovation-grants-25": "Local Innovation Grant Closure Report",
  "evaluation-capability-25": "Evaluation Capability Grant Review",
  "regional-skills-24": "2023–24 Grant Outcomes Annual Report",
  "participation-fund-24": "2023–24 Grant Outcomes Annual Report",
  "mentoring-access-25": "Mentoring Access Fund Completion Report",
  "regional-leadership-25": "Regional Leadership Forum Review",
  "green-skills-24": "Sustainable Careers Annual Review",
};

function getInitiativeProgress(record: InitiativeRecord) {
  if (record.status === "Completed") {
    return 100;
  }
  const seed = Array.from(record.id).reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return 58 + (seed % 29);
}

function getProgressWidth(progress: number) {
  if (progress >= 100) return "w-full";
  if (progress >= 80) return "w-4/5";
  if (progress >= 70) return "w-3/4";
  if (progress >= 60) return "w-2/3";
  return "w-3/5";
}

interface ReportingDashboardProps {
  role: ReportingRole;
  sponsorOrganisationId?: SponsorOrganisationId;
  view?: "overview" | "impact" | "initiatives";
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  allLabel?: string;
  onChange: (value: string) => void;
}

function SelectField({
  id,
  label,
  value,
  options,
  allLabel,
  onChange,
}: SelectFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-xs font-medium text-muted">
        {label}
      </span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 block h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-brand-100"
      >
        {allLabel && <option value="all">{allLabel}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PrivacyNotice() {
  return (
    <aside className="flex items-center gap-2.5 rounded-lg border border-line bg-status-published-bg/60 px-3 py-2">
      <span
        className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-blue text-[10px] font-semibold text-white"
        aria-hidden="true"
      >
        i
      </span>
      <div>
        <p className="text-xs font-semibold text-ink">Aggregated data only</p>
        <p className="mt-0.5 text-[11px] leading-4 text-muted">
          No names, contact details or identifiable member records.
        </p>
      </div>
    </aside>
  );
}

function MetricCard({
  label,
  value,
  description,
  accentClass,
}: {
  label: string;
  value: string;
  description: string;
  accentClass: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-line bg-sidebar/70 p-4 shadow-sm">
      <span className={`absolute top-0 right-0 left-0 h-1 ${accentClass}`} aria-hidden="true" />
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-1 text-xs leading-4 text-muted">{description}</p>
    </article>
  );
}

function PanelHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold leading-tight text-ink">{title}</h2>
      <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
    </div>
  );
}

function ChartEmptyState({ message }: { message: string }) {
  return (
    <div className="mt-5 grid min-h-48 place-items-center rounded-lg border border-dashed border-line bg-app p-6 text-center">
      <div>
        <p className="text-sm font-semibold text-ink">No chart data</p>
        <p className="mt-1 text-xs leading-5 text-muted">{message}</p>
      </div>
    </div>
  );
}

function BarChart({
  title,
  description,
  values,
  formatValue = (value) => numberFormatter.format(value),
  emptyMessage,
}: {
  title: string;
  description: string;
  values: DistributionValue[];
  formatValue?: (value: number) => string;
  emptyMessage: string;
}) {
  const maximum = Math.max(...values.map((item) => item.value), 1);

  return (
    <section className="rounded-xl border border-line bg-surface p-5 shadow-sm">
      <PanelHeading title={title} description={description} />
      {values.length === 0 ? (
        <ChartEmptyState message={emptyMessage} />
      ) : (
        <div className="mt-4 space-y-3">
          {values.map((item, index) => {
            const width = Math.max((item.value / maximum) * 100, 3);
            return (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-4 text-xs">
                  <span className="font-medium text-muted">{item.label}</span>
                  <span className="font-semibold tabular-nums text-ink">
                    {formatValue(item.value)}
                  </span>
                </div>
                <svg
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  className={`h-2 w-full overflow-hidden rounded-full bg-slate-100 ${
                    barColours[index % barColours.length]
                  }`}
                  role="img"
                  aria-label={`${item.label}: ${formatValue(item.value)}`}
                >
                  <rect width={width} height="6" rx="3" fill="currentColor" />
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

const donutColours = [
  "text-navy",
  "text-teal",
  "text-accent-purple",
  "text-accent-orange",
];

const barColours = [
  "text-navy",
  "text-teal",
  "text-accent-purple",
  "text-accent-yellow",
];

function DonutChart({
  title,
  description,
  values,
  emptyMessage,
}: {
  title: string;
  description: string;
  values: DistributionValue[];
  emptyMessage: string;
}) {
  const total = values.reduce((sum, item) => sum + item.value, 0);
  let accumulated = 0;

  return (
    <section className="rounded-xl border border-line bg-surface p-5 shadow-sm">
      <PanelHeading title={title} description={description} />
      {values.length === 0 ? (
        <ChartEmptyState message={emptyMessage} />
      ) : (
        <div className="mt-4 grid items-center gap-4 sm:grid-cols-[130px_1fr]">
          <div className="relative mx-auto size-30">
            <svg viewBox="0 0 36 36" className="size-full" role="img" aria-label={title}>
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-slate-100"
              />
              {values.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const offset = -accumulated;
                accumulated += percentage;
                return (
                  <circle
                    key={item.label}
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={`${percentage} ${100 - percentage}`}
                    strokeDashoffset={offset}
                    transform="rotate(-90 18 18)"
                    className={donutColours[index % donutColours.length]}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-2xl font-semibold text-ink">{numberFormatter.format(total)}</p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                  Total
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {values.map((item, index) => (
              <div key={item.label} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`size-2.5 rounded-sm bg-current ${
                      donutColours[index % donutColours.length]
                    }`}
                    aria-hidden="true"
                  />
                  <span className="font-medium text-muted">{item.label}</span>
                </div>
                <span className="font-semibold tabular-nums text-ink">
                  {Math.round((item.value / total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function TrendChart({ total }: { total: number }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
      <PanelHeading
        title="Community reach"
        description="Approved aggregate reach across the current reporting period."
      />
      <div
        className="mt-5 flex h-36 items-end gap-3 border-b border-line px-1"
        role="img"
        aria-label={`Community reach trend ending at ${numberFormatter.format(total)}`}
      >
        {["h-[42%]", "h-[66%]", "h-[54%]", "h-[80%]", "h-[71%]", "h-[92%]"].map(
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
      <div className="flex items-end justify-between pt-3">
        <p className="text-[11px] text-muted">Start of period</p>
        <div className="text-right">
          <p className="text-xl font-semibold text-ink">{numberFormatter.format(total)}</p>
          <p className="text-[10px] font-medium uppercase text-muted">Current reach</p>
        </div>
      </div>
    </section>
  );
}

function QuarterlyLineChart({
  total,
  title,
}: {
  total: number;
  title: string;
}) {
  const values = [0.18, 0.41, 0.68, 1].map((factor) => Math.round(total * factor));
  const maximum = Math.max(...values, 1);
  const points = values
    .map((value, index) => `${28 + index * 82},${104 - (value / maximum) * 76}`)
    .join(" ");

  return (
    <section className="rounded-xl border border-line bg-surface p-5 shadow-sm">
      <PanelHeading
        title={title}
        description="Cumulative approved results across the selected reporting period."
      />
      <svg
        viewBox="0 0 310 130"
        className="mt-4 h-40 w-full"
        role="img"
        aria-label={`${title}, ending at ${numberFormatter.format(total)}`}
      >
        {[28, 53, 78, 103].map((y) => (
          <line
            key={y}
            x1="20"
            x2="290"
            y1={y}
            y2={y}
            stroke="currentColor"
            className="text-line"
          />
        ))}
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent-blue"
        />
        {values.map((value, index) => (
          <g key={`${value}-${index}`}>
            <circle
              cx={28 + index * 82}
              cy={104 - (value / maximum) * 76}
              r="5"
              fill="currentColor"
              className="text-accent-mint"
            />
            <text
              x={28 + index * 82}
              y="124"
              textAnchor="middle"
              className="fill-muted text-[9px]"
            >
              Q{index + 1}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex items-center justify-between border-t border-line pt-3">
        <span className="text-xs text-muted">Current approved total</span>
        <span className="text-lg font-semibold text-ink">{numberFormatter.format(total)}</span>
      </div>
    </section>
  );
}

function aggregateDistribution(
  records: InitiativeRecord[],
  key: "primaryDistribution" | "secondaryDistribution",
) {
  const totals = new Map<string, number>();
  records.forEach((record) => {
    record[key].forEach((item) => {
      totals.set(item.label, (totals.get(item.label) ?? 0) + item.value);
    });
  });
  return Array.from(totals, ([label, value]) => ({ label, value }));
}

function InitiativeTable({
  role,
  records,
  emptyMessage,
  onSelect,
}: {
  role: ReportingRole;
  records: InitiativeRecord[];
  emptyMessage: string;
  onSelect: (record: InitiativeRecord) => void;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
      <div className="border-b border-line px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <PanelHeading
            title="Funded initiatives"
            description="Approved initiative-level totals for the selected reporting view."
          />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["Initiatives", numberFormatter.format(records.length)],
              [
                "Reach",
                numberFormatter.format(records.reduce((sum, record) => sum + record.reach, 0)),
              ],
              [
                "Activities",
                numberFormatter.format(
                  records.reduce((sum, record) => sum + record.activities, 0),
                ),
              ],
              [
                "Outcomes",
                numberFormatter.format(records.reduce((sum, record) => sum + record.outcomes, 0)),
              ],
            ].map(([label, value], index) => (
              <div
                key={label}
                className="relative overflow-hidden rounded-lg border border-line bg-app px-3 py-2"
              >
                <span
                  className={`absolute top-0 right-0 left-0 h-0.5 ${
                    ["bg-accent-mint", "bg-accent-blue", "bg-accent-orange", "bg-accent-purple"][
                      index
                    ]
                  }`}
                />
                <p className="text-[10px] text-muted">{label}</p>
                <p className="mt-0.5 text-sm font-semibold text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {records.length === 0 ? (
        <div className="grid min-h-40 place-items-center px-5 py-8 text-center">
          <div>
            <p className="text-sm font-semibold text-ink">No matching initiatives</p>
            <p className="mt-1 text-xs leading-5 text-muted">{emptyMessage}</p>
          </div>
        </div>
      ) : (
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1120px] border-collapse text-left">
            <thead className="border-b border-line bg-slate-50">
              <tr className="text-xs font-semibold text-muted">
                <th className="px-5 py-3.5 sm:px-6">Initiative</th>
                <th className="px-5 py-3.5">{role === "sponsor" ? "Interest" : "Priority"}</th>
                <th className="px-5 py-3.5">Period</th>
                <th className="px-5 py-3.5">Reach</th>
                <th className="px-5 py-3.5">
                  {role === "sponsor" ? "Engagement" : "Funding"}
                </th>
                <th className="px-5 py-3.5">Activities</th>
                <th className="px-5 py-3.5">Outcomes</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Progress</th>
                <th className="px-5 py-3.5">
                  <span className="sr-only">Open detail</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {records.map((record) => (
                <tr key={record.id} className="text-sm text-muted hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-ink sm:px-6">{record.name}</td>
                  <td className="px-5 py-4">{record.interest}</td>
                  <td className="px-5 py-4 whitespace-nowrap">{record.period}</td>
                  <td className="px-5 py-4 tabular-nums">
                    {numberFormatter.format(record.reach)}
                  </td>
                  <td className="px-5 py-4 tabular-nums">
                    {role === "sponsor"
                      ? `${record.engagements}%`
                      : formatAustralianCurrency(record.funding)}
                  </td>
                  <td className="px-5 py-4 tabular-nums">{record.activities}</td>
                  <td className="px-5 py-4 tabular-nums">{record.outcomes}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        record.status === "Active"
                          ? "bg-status-progress-bg text-status-progress"
                          : "bg-status-approved-bg text-status-approved"
                      }`}
                    >
                      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                      {record.status === "Active" ? "In progress" : "Approved"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex min-w-24 items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full ${
                            record.status === "Completed"
                              ? "bg-status-approved"
                              : "bg-accent-purple"
                          } ${getProgressWidth(getInitiativeProgress(record))}`}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-muted">
                        {getInitiativeProgress(record)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => onSelect(record)}
                      className="whitespace-nowrap text-xs font-medium text-teal hover:underline"
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {records.length > 0 && (
        <div className="divide-y divide-line lg:hidden">
          {records.map((record) => (
            <article key={record.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-ink">{record.name}</h3>
                  <p className="mt-1 text-xs text-muted">
                    {role === "sponsor" ? "Sponsor interest" : "Funding priority"} ·{" "}
                    {record.interest}
                  </p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    record.status === "Active"
                      ? "bg-status-progress-bg text-status-progress"
                      : "bg-status-approved-bg text-status-approved"
                  }`}
                >
                  <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                  {record.status === "Active" ? "In progress" : "Approved"}
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-app p-3">
                <div>
                  <dt className="text-[11px] text-muted">Reporting period</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{record.period}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-muted">Participants reached</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">
                    {numberFormatter.format(record.reach)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] text-muted">
                    {role === "sponsor" ? "Engagement" : "Approved funding"}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-ink">
                    {role === "sponsor"
                      ? `${record.engagements}%`
                      : formatAustralianCurrency(record.funding)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] text-muted">Approved outcomes</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">
                    {numberFormatter.format(record.outcomes)}
                  </dd>
                </div>
              </dl>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span>Delivery progress</span>
                  <span>{getInitiativeProgress(record)}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${
                      record.status === "Completed" ? "bg-status-approved" : "bg-accent-purple"
                    } ${getProgressWidth(getInitiativeProgress(record))}`}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelect(record)}
                className="mt-3 text-xs font-medium text-teal hover:underline"
              >
                View aggregate details
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default function ReportingDashboard({
  role,
  sponsorOrganisationId,
  view = "overview",
}: ReportingDashboardProps) {
  const config =
    role === "sponsor" && sponsorOrganisationId
      ? sponsorReportingDashboards[sponsorOrganisationId]
      : reportingDashboards[role];
  const { period } = useReportingPeriod();
  const [interest, setInterest] = useState("all");
  const [initiative, setInitiative] = useState("all");
  const [selectedInitiative, setSelectedInitiative] =
    useState<InitiativeRecord | null>(null);

  useEffect(() => {
    setInterest("all");
    setInitiative("all");
  }, [period]);

  const interests = useMemo(
    () => Array.from(new Set(config.records.map((record) => record.interest))).sort(),
    [config.records],
  );
  const initiatives = useMemo(
    () => Array.from(new Set(config.records.map((record) => record.name))).sort(),
    [config.records],
  );
  const periodRecords = config.records.filter((record) => record.period === period);
  const filteredRecords = periodRecords.filter(
    (record) =>
      (interest === "all" || record.interest === interest) &&
      (initiative === "all" || record.name === initiative),
  );
  const hasFilters = interest !== "all" || initiative !== "all";
  const hasPeriodData = periodRecords.length > 0;
  const emptyMessage = hasPeriodData
    ? "No approved records match this combination. Adjust or clear the filters."
    : "No approved aggregate reporting has been published for this period.";

  const totals = filteredRecords.reduce(
    (sum, record) => ({
      reach: sum.reach + record.reach,
      engagements: sum.engagements + record.engagements,
      funding: sum.funding + record.funding,
      activities: sum.activities + record.activities,
      outcomes: sum.outcomes + record.outcomes,
    }),
    { reach: 0, engagements: 0, funding: 0, activities: 0, outcomes: 0 },
  );
  const averageEngagement =
    filteredRecords.length > 0
      ? Math.round(totals.engagements / filteredRecords.length)
      : 0;
  const primaryDistribution = aggregateDistribution(filteredRecords, "primaryDistribution");
  const secondaryDistribution = aggregateDistribution(filteredRecords, "secondaryDistribution");
  const initiativeReach = filteredRecords.map((record) => ({
    label: record.name,
    value: role === "sponsor" ? record.reach : record.funding,
  }));

  const sponsorMetrics = [
    {
      label: "Community reach",
      value: filteredRecords.length ? numberFormatter.format(totals.reach) : "—",
      description: "Approved aggregate participants reached",
    },
    {
      label: "Engagement",
      value: filteredRecords.length ? `${averageEngagement}%` : "—",
      description: "Average aggregate engagement rate",
    },
    {
      label: "Funded activities",
      value: filteredRecords.length ? numberFormatter.format(totals.activities) : "—",
      description: "Approved sponsor-supported activities",
    },
    {
      label: "Funded initiatives",
      value: filteredRecords.length ? numberFormatter.format(filteredRecords.length) : "—",
      description: "Initiatives in the selected view",
    },
  ];
  const partnerMetrics = [
    {
      label: "Funding use",
      value: filteredRecords.length ? formatAustralianCurrency(totals.funding) : "—",
      description: "Approved funding allocated",
    },
    {
      label: "Funded activities",
      value: filteredRecords.length ? numberFormatter.format(totals.activities) : "—",
      description: "Activities delivered or underway",
    },
    {
      label: "Participant reach",
      value: filteredRecords.length ? numberFormatter.format(totals.reach) : "—",
      description: "Approved aggregate participants reached",
    },
    {
      label: "Recorded outcomes",
      value: filteredRecords.length ? numberFormatter.format(totals.outcomes) : "—",
      description: "Outcomes supported by approved data",
    },
  ];
  const metrics = role === "sponsor" ? sponsorMetrics : partnerMetrics;

  function clearFilters() {
    setInterest("all");
    setInitiative("all");
  }

  const pageTitle =
    view === "impact"
      ? role === "sponsor"
        ? "Impact metrics"
        : "Approved outcomes"
      : view === "initiatives"
        ? "Funded initiatives"
        : config.title;

  const reachChart = (
    <BarChart
      title={role === "sponsor" ? "Community reach by initiative" : "Funding by initiative"}
      description={
        role === "sponsor"
          ? "Aggregate participant reach across funded activity."
          : "Approved funding use across funded initiatives."
      }
      values={initiativeReach}
      formatValue={role === "partner" ? formatAustralianCurrency : undefined}
      emptyMessage={emptyMessage}
    />
  );
  const recentReport =
    role === "partner"
      ? "Grant-Supported Outcomes Report"
      : config.organisation === "Horizon Community Foundation"
        ? "Q2 Community Impact Summary"
        : "Northbridge Sponsorship Impact Update";
  const selectedProgress = selectedInitiative
    ? getInitiativeProgress(selectedInitiative)
    : 0;
  const selectedReportTitle = selectedInitiative
    ? relatedReportsByInitiative[selectedInitiative.id]
    : undefined;
  const reportsPath = role === "sponsor" ? "/sponsor/reports" : "/partner/reports";

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-4 xl:grid-cols-[1fr_360px] xl:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {pageTitle}
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-muted">
            {config.description}
          </p>
        </div>
        <PrivacyNotice />
      </div>

      {view !== "overview" && (
      <section className="mt-6 rounded-xl border border-line bg-sidebar/70 p-4 shadow-sm">
        <div
          className={`grid gap-3 md:items-end ${
            "lg:grid-cols-[auto_1fr_1fr_auto]"
          }`}
        >
          <div className="pb-2">
            <h2 className="text-sm font-semibold text-ink">Filters</h2>
            <p className="mt-1 hidden text-[11px] text-muted xl:block">Updates all results</p>
          </div>
          <SelectField
            id={`${role}-interest`}
            label={config.interestLabel}
            value={interest}
            options={interests}
            allLabel={`All ${config.interestLabel.toLowerCase()}s`}
            onChange={setInterest}
          />
          <SelectField
            id={`${role}-initiative`}
            label="Funded initiative"
            value={initiative}
            options={initiatives}
            allLabel="All funded initiatives"
            onChange={setInitiative}
          />
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasFilters}
            className="h-10 rounded-lg border border-line bg-surface px-4 text-xs font-medium text-muted hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear filters
          </button>
        </div>
      </section>
      )}

      {!hasPeriodData || filteredRecords.length === 0 ? (
        <div className="mt-4 rounded-xl border border-status-error/20 bg-status-error-bg px-5 py-4">
          <p className="text-sm font-semibold text-status-error">
            {hasPeriodData ? "No matching results" : `No approved data available for ${period}`}
          </p>
          <p className="mt-1 text-xs text-status-error">{emptyMessage}</p>
        </div>
      ) : null}

      {view !== "initiatives" && (
        <section className="mt-4" aria-labelledby={`${role}-summary-heading`}>
          <h2 id={`${role}-summary-heading`} className="sr-only">
            Reporting summary
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                {...metric}
                accentClass={
                  [
                    "bg-teal",
                    "bg-navy",
                    "bg-accent-purple",
                    "bg-accent-orange",
                  ][index]
                }
              />
            ))}
          </div>
        </section>
      )}

      {view === "overview" && (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-[1.25fr_0.9fr_280px]">
          <TrendChart total={totals.reach} />
          <section className="rounded-xl border border-line bg-sidebar/70 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Funded initiatives</h2>
              <span className="rounded-full bg-status-draft-bg px-2.5 py-1 text-[10px] font-medium text-status-draft">
                {filteredRecords.length} total
              </span>
            </div>
            <div className="mt-3 divide-y divide-line">
              {filteredRecords.slice(0, 3).map((record) => (
                <div key={record.id} className="py-2.5">
                  <p className="text-sm font-medium text-ink">{record.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {numberFormatter.format(record.reach)} reach ·{" "}
                    {record.status === "Active" ? "In progress" : "Approved"}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to={role === "sponsor" ? "/sponsor/initiatives" : "/partner/initiatives"}
              className="mt-3 inline-flex text-xs font-medium text-teal hover:underline"
            >
              View all initiatives
            </Link>
          </section>
          <section className="rounded-2xl border border-accent-blue bg-accent-blue p-5 text-white shadow-sm md:col-span-2 xl:col-span-1">
            <p className="text-xs font-medium text-white/65">
              Recent report
            </p>
            <h2 className="mt-3 text-xl font-semibold leading-tight text-white">
              {recentReport}
            </h2>
            <p className="mt-2 text-xs leading-5 text-white/65">
              Approved aggregate reporting · {period}
            </p>
            <div className="mt-6 rounded-lg bg-white/15 p-3">
              <p className="flex items-center gap-1.5 text-xs font-medium text-white">
                <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                Published for {config.organisation}
              </p>
            </div>
            <Link
              to={role === "sponsor" ? "/sponsor/reports" : "/partner/reports"}
              className="mt-5 inline-flex text-xs font-medium text-white underline underline-offset-4"
            >
              View approved reports
            </Link>
          </section>
        </div>
      )}

      {view === "impact" && (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {reachChart}
          <DonutChart
            title={config.primaryChartTitle}
            description={config.primaryChartDescription}
            values={primaryDistribution}
            emptyMessage={emptyMessage}
          />
          <BarChart
            title={config.secondaryChartTitle}
            description={config.secondaryChartDescription}
            values={secondaryDistribution}
            emptyMessage={emptyMessage}
          />
          <QuarterlyLineChart
            title={role === "sponsor" ? "Cumulative reach trend" : "Recorded outcomes trend"}
            total={role === "sponsor" ? totals.reach : totals.outcomes}
          />
        </div>
      )}

      {view === "initiatives" && (
        <div className="mt-4">
          <InitiativeTable
            role={role}
            records={filteredRecords}
            emptyMessage={emptyMessage}
            onSelect={setSelectedInitiative}
          />
        </div>
      )}

      {selectedInitiative && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/55 p-3 sm:p-5">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="initiative-detail-title"
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-line bg-surface p-4 shadow-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-teal">
                  {role === "sponsor"
                    ? "Sponsor-funded aggregate initiative"
                    : "Approved grant initiative"}
                </p>
                <h2
                  id="initiative-detail-title"
                  className="mt-2 text-2xl font-semibold leading-tight text-ink"
                >
                  {selectedInitiative.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInitiative(null)}
                className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-lg text-muted hover:bg-slate-50"
                aria-label="Close initiative details"
              >
                ×
              </button>
            </div>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Funding area", selectedInitiative.interest],
                ["Reporting period", selectedInitiative.period],
                ["Status", selectedInitiative.status],
                [
                  role === "sponsor" ? "Aggregate engagement" : "Approved funding",
                  role === "sponsor"
                    ? `${selectedInitiative.engagements}%`
                    : formatAustralianCurrency(selectedInitiative.funding),
                ],
                [
                  "Participants reached",
                  numberFormatter.format(selectedInitiative.reach),
                ],
                ["Funded activities", numberFormatter.format(selectedInitiative.activities)],
                ["Approved outcomes", numberFormatter.format(selectedInitiative.outcomes)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-line bg-app p-3"
                >
                  <dt className="text-[11px] font-medium text-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 rounded-xl border border-line bg-app p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-ink">Delivery progress</p>
                  <p className="mt-1 text-[11px] text-muted">
                    {selectedInitiative.status === "Completed"
                      ? "Initiative delivery is complete."
                      : "Delivery is continuing in the current reporting period."}
                  </p>
                </div>
                <span className="text-xl font-semibold text-ink">{selectedProgress}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${
                    selectedInitiative.status === "Completed"
                      ? "bg-status-approved"
                      : "bg-accent-purple"
                  } ${getProgressWidth(selectedProgress)}`}
                />
              </div>
            </div>
            <div className="mt-5 rounded-lg border border-line bg-status-published-bg/60 p-4">
              <p className="text-xs font-semibold text-ink">Outcome summary</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {role === "sponsor"
                  ? `${numberFormatter.format(selectedInitiative.outcomes)} approved aggregate outcomes were recorded across ${selectedInitiative.activities} sponsor-funded activities.`
                  : `${formatAustralianCurrency(selectedInitiative.funding)} supported ${selectedInitiative.activities} approved activities and ${numberFormatter.format(selectedInitiative.outcomes)} recorded outcomes.`}{" "}
                No identifiable participant records are included.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-line bg-surface p-4">
              {selectedReportTitle ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold text-ink">Related approved report</p>
                    <p className="mt-1 text-xs text-muted">{selectedReportTitle}</p>
                  </div>
                  <Link
                    to={`${reportsPath}?report=${encodeURIComponent(selectedReportTitle)}`}
                    className="inline-flex shrink-0 items-center justify-center rounded-lg bg-navy px-4 py-2.5 text-xs font-medium text-white hover:bg-teal"
                  >
                    View report →
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-ink">Related report</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    This initiative is still in progress. An approved report will be available
                    after delivery and validation are complete.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
