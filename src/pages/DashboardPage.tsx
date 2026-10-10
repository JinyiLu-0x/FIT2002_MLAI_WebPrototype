import { roles, type UserRole } from "../app/roles";
import ReportingDashboard from "../components/dashboard/ReportingDashboard";
import {
  PlaceholderPanel,
  SummaryCardPlaceholder,
} from "../components/placeholders/ContentPlaceholders";

interface DashboardPageProps {
  role: UserRole;
}

const dashboardCopy: Record<UserRole, { title: string; intro: string }> = {
  internal: {
    title: "Internal MLAI Dashboard",
    intro: "Coordinate approved reporting information and prepare sponsor-ready summaries.",
  },
  approver: {
    title: "Report Approval Dashboard",
    intro: "Review sponsor-facing report drafts before they are released.",
  },
  sponsor: {
    title: "Sponsor Dashboard",
    intro: "Review approved sponsorship reach, activity and impact at an aggregate level.",
  },
  partner: {
    title: "Partner / Grant Provider Dashboard",
    intro: "Review approved grant delivery and impact information relevant to your partnership.",
  },
};

export default function DashboardPage({ role }: DashboardPageProps) {
  if (role === "sponsor" || role === "partner") {
    return <ReportingDashboard role={role} />;
  }

  const copy = dashboardCopy[role];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-700">{roles[role].shortName} workspace</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{copy.title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{copy.intro}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500">
          Reporting period filter
        </div>
      </div>

      <section className="mt-8" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">
          Summary cards
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {["Summary metric", "Reach metric", "Activity metric", "Outcome metric"].map((label) => (
            <SummaryCardPlaceholder key={label} label={label} />
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PlaceholderPanel
          title="Impact overview"
          description="Reserved for an approved aggregate chart."
        />
        <PlaceholderPanel
          title="Activity breakdown"
          description="Reserved for a role-appropriate comparison chart."
        />
        <PlaceholderPanel
          title="Reporting data"
          description="Reserved for filters and an aggregate data table."
          className="xl:col-span-2"
        />
      </div>
    </div>
  );
}
