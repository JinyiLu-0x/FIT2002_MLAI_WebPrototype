import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  authenticateDemoAccount,
  clearDemoSession,
  demoAccounts,
  getAccountHomePath,
  startDemoSession,
} from "../app/demoAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showDemoSelector, setShowDemoSelector] = useState(
    searchParams.get("demo") === "1",
  );
  const [showInternalNotice, setShowInternalNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearDemoSession();
    const account = authenticateDemoAccount(email, password);

    if (!account) {
      setError(
        "The email or password is incorrect. Try again or use Explore demo portal.",
      );
      return;
    }

    setError("");
    startDemoSession(account);
    navigate(getAccountHomePath(account));
  }

  function enterDemoPortal(account: (typeof demoAccounts)[number]) {
    clearDemoSession();
    startDemoSession(account);
    navigate(getAccountHomePath(account));
  }

  return (
    <div className="bg-app lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-10 sm:px-8 lg:h-full lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-5">
        <figure className="relative min-h-80 overflow-hidden rounded-xl border border-line bg-brand-50 lg:h-[44rem] lg:max-h-[calc(100vh-7rem)] lg:min-h-[32rem]">
          <img
            src="https://images.unsplash.com/photo-1651313950959-9eeef2477f4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
            alt="A community group gathering outdoors"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/20" aria-hidden="true" />
          <div className="absolute top-5 left-5 rounded-full bg-accent-mint px-4 py-2 text-xs font-semibold text-navy shadow-sm">
            Approved impact
          </div>
          <div className="absolute right-5 bottom-5 left-5 rounded-xl border border-white/40 bg-navy/90 p-4 text-white shadow-lg">
            <p className="text-2xl font-semibold leading-none">Community impact</p>
            <p className="mt-2 text-sm leading-5 text-white/75">
              Clear, role-based reporting for trusted sponsors and grant partners.
            </p>
            <figcaption className="mt-4 text-[10px] text-white/55">
              Photo by Andy Wang on Unsplash
            </figcaption>
          </div>
        </figure>

        <section className="rounded-xl border border-line bg-surface p-6 shadow-sm sm:p-8 lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto">
          <Link
            to="/"
            className="inline-flex text-sm font-medium text-teal hover:underline"
          >
            ← Back to Home
          </Link>
          <div className="mt-8">
            <p className="text-sm font-medium text-teal">
              Secure dashboard access
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
              Sign in
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
              Your account automatically connects you to the correct role and permitted reporting area.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 block h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-brand-100"
                placeholder="you@example.org"
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 block h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-brand-100"
                placeholder="Enter your password"
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>

            {error && (
              <div
                id="login-error"
                role="alert"
                className="rounded-lg border border-status-error/20 bg-status-error-bg px-4 py-3 text-sm leading-5 text-status-error"
              >
                <span className="font-semibold">Unable to sign in.</span> {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-navy px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              Sign In
            </button>
          </form>

          <div className="mt-7 border-t border-slate-300 pt-6 text-center">
            <button
              type="button"
              onClick={() => setShowDemoSelector(true)}
              className="w-full rounded-lg border border-line bg-surface px-5 py-3 text-sm font-medium text-ink hover:bg-slate-50"
            >
              Explore demo portal /
            </button>
            <p className="mt-2 text-xs font-medium text-ink/55">
              Select an authorised sample account to review the reporting portal.
            </p>
            <button
              type="button"
              onClick={() => setShowInternalNotice(true)}
              className="mt-4 text-xs font-medium text-teal hover:underline"
            >
              Internal access
            </button>
          </div>
        </section>

      </div>

      {showDemoSelector && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-navy/55 p-5"
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-portal-title"
            className="w-full max-w-lg rounded-xl border border-line bg-surface p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-medium text-teal">
                  Quick demo access
                </p>
                <h2
                  id="demo-portal-title"
                  className="mt-2 text-2xl font-semibold text-ink"
                >
                  Explore the reporting portal
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Choose an organisation-specific sample account.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowDemoSelector(false);
                }}
                className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-lg text-muted hover:bg-slate-50"
                aria-label="Close account selector"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {demoAccounts.map((account, index) => (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => enterDemoPortal(account)}
                  className="group flex w-full items-center gap-4 rounded-lg border border-line bg-surface p-4 text-left transition hover:border-teal hover:bg-brand-50"
                >
                  <span className={`grid size-10 shrink-0 place-items-center rounded-lg text-xs font-semibold text-white ${
                    ["bg-teal", "bg-accent-purple", "bg-navy"][index]
                  }`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">
                      {account.role === "partner"
                        ? "Demo Partner / Grant Provider"
                        : account.label}
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      {account.organisation}
                    </span>
                  </span>
                  <span className="text-lg text-muted" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs leading-5 text-muted">
              Sample access uses aggregated reporting data and creates no live account.
            </p>
          </section>
        </div>
      )}

      {showInternalNotice && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/55 p-5">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="internal-access-title"
            className="w-full max-w-md rounded-xl border border-line bg-surface p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-teal">MLAI staff access</p>
                <h2 id="internal-access-title" className="mt-2 text-xl font-semibold text-ink">
                  Internal access
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowInternalNotice(false)}
                className="grid size-9 place-items-center rounded-lg border border-line text-lg text-muted hover:bg-slate-50"
                aria-label="Close internal access notice"
              >
                ×
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              Internal reporting access is retained for MLAI staff but is not included in the
              current external sponsor reporting portal.
            </p>
            <button
              type="button"
              onClick={() => setShowInternalNotice(false)}
              className="mt-5 rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-white hover:bg-teal"
            >
              Return to sign in
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
