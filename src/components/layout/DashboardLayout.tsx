import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  clearDemoSession,
  demoAccounts,
  getAccountHomePath,
  startDemoSession,
} from "../../app/demoAuth";
import {
  ReportingPeriodProvider,
  useReportingPeriod,
} from "../../app/reportingPeriod";
import { roles } from "../../app/roles";
import { reportingPeriods } from "../../data/reportingData";

interface DashboardLayoutProps {
  role: "sponsor" | "partner";
  accountLabel?: string;
  organisationName?: string;
}

function NavIcon({ type }: { type: "overview" | "impact" | "initiatives" | "reports" }) {
  const paths = {
    overview: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    impact: (
      <>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19V3" />
      </>
    ),
    initiatives: (
      <>
        <rect x="3" y="5" width="18" height="15" rx="2" />
        <path d="M8 5V3h8v2" />
        <path d="M3 11h18" />
      </>
    ),
    reports: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

function DashboardShell({
  role,
  accountLabel,
  organisationName,
}: DashboardLayoutProps) {
  const currentRole = roles[role];
  const navigate = useNavigate();
  const { period, setPeriod } = useReportingPeriod();
  const basePath = role === "sponsor" ? "/sponsor" : "/partner";
  const navigation = [
    { label: "Overview", to: basePath, end: true, icon: "overview" as const },
    {
      label: "Impact metrics",
      to: role === "sponsor" ? "/sponsor/impact" : "/partner/outcomes",
      end: true,
      icon: "impact" as const,
    },
    {
      label: "Funded initiatives",
      to: `${basePath}/initiatives`,
      end: true,
      icon: "initiatives" as const,
    },
    {
      label: "Reports",
      to: `${basePath}/reports`,
      end: true,
      icon: "reports" as const,
    },
  ];
  const initials = (accountLabel ?? currentRole.shortName)
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-app lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-line bg-sidebar lg:fixed lg:inset-y-0 lg:left-0 lg:w-60 lg:border-r lg:border-b-0">
        <div className="flex h-16 items-center border-b border-line px-5">
          <Link to="/" className="flex items-center gap-3">
            <span className="border-b-3 border-accent-mint text-base font-bold tracking-[0.1em] text-ink">
              MLAI
            </span>
            <span className="border-l border-line pl-3 text-xs font-medium text-muted">
              Reporting
            </span>
          </Link>
        </div>

        <nav
          className="flex gap-1 overflow-x-auto p-3 lg:block lg:space-y-1"
          aria-label="Dashboard navigation"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative flex min-w-40 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                  isActive
                    ? "bg-brand-50 text-navy before:absolute before:top-2 before:bottom-2 before:left-0 before:w-0.5 before:rounded-full before:bg-accent-purple"
                    : "text-muted hover:bg-slate-100 hover:text-ink"
                }`
              }
            >
              <NavIcon type={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute right-3 bottom-3 left-3 hidden rounded-xl border border-line bg-surface p-3 shadow-sm lg:block">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-[10px] font-semibold text-white">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-ink">{accountLabel}</p>
              <p className="mt-0.5 truncate text-[11px] text-muted">{organisationName}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 flex min-h-16 flex-wrap items-center justify-between gap-4 border-b border-line bg-sidebar/95 px-4 py-2.5 sm:px-6">
          <div className="min-w-0 max-w-[46%] sm:max-w-none">
            <p className="truncate text-sm font-semibold text-ink">
              {organisationName ?? "MLAI Australia"}
            </p>
            <p className="text-xs text-muted">{currentRole.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-medium text-muted">
              <span className="hidden md:inline">Reporting period</span>
              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                aria-label="Reporting period"
                className="h-9 w-[104px] rounded-lg border border-line bg-surface px-2 text-xs font-medium text-ink outline-none focus:border-teal focus:ring-2 focus:ring-brand-100 sm:w-auto sm:px-3 sm:text-sm"
              >
                {reportingPeriods.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <details className="relative">
              <summary className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-lg border border-line bg-surface px-2 text-xs font-medium text-ink hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-teal">
                <span className="grid size-6 place-items-center rounded-full bg-navy text-[9px] font-semibold text-white">
                  {initials}
                </span>
                <span className="hidden sm:inline">Account</span>
              </summary>
              <div className="absolute top-11 right-0 z-40 w-64 rounded-xl border border-line bg-surface p-3 shadow-lg">
                <p className="text-xs font-semibold text-ink">{accountLabel}</p>
                <p className="mt-1 text-[11px] text-muted">{currentRole.name}</p>
                <div className="mt-3 border-t border-line pt-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Switch account
                  </p>
                  <div className="space-y-1">
                    {demoAccounts.map((account) => (
                      <button
                        key={account.id}
                        type="button"
                        onClick={() => {
                          startDemoSession(account);
                          navigate(`${getAccountHomePath(account)}?demo=${account.id}`);
                        }}
                        className={`w-full rounded-lg px-2.5 py-2 text-left text-xs font-medium ${
                          account.label === accountLabel
                            ? "bg-brand-50 text-navy"
                            : "text-ink hover:bg-slate-50"
                        }`}
                      >
                        {account.label}
                        <span className="mt-0.5 block truncate text-[11px] font-normal text-muted">
                          {account.organisation}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <Link
                  to="/login"
                  onClick={clearDemoSession}
                  className="mt-3 block rounded-lg border border-line px-3 py-2 text-center text-xs font-medium text-status-error hover:bg-status-error-bg"
                >
                  Sign out
                </Link>
              </div>
            </details>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] p-4 sm:p-6">
          <Outlet />
        </main>

        <footer className="border-t border-line bg-sidebar px-6 py-4 text-xs text-muted">
          Secure reporting portal · Aggregated information only · No identifiable member records
        </footer>
      </div>
    </div>
  );
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <ReportingPeriodProvider>
      <DashboardShell {...props} />
    </ReportingPeriodProvider>
  );
}
