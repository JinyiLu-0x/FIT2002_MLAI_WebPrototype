import { Link } from "react-router";

export default function AccessDeniedPage() {
  return (
    <div className="mx-auto grid w-full max-w-3xl place-items-center px-5 py-20 text-center sm:px-8 sm:py-28">
      <div className="rounded-xl border border-line bg-surface p-8 shadow-sm sm:p-10">
        <p className="inline-flex items-center gap-2 rounded-full bg-status-error-bg px-3 py-1.5 text-sm font-medium text-status-error">
          <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
          Access denied
        </p>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink">
          Authorised sign-in required
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted">
          This reporting area is limited to a specific role or organisation. Sign in with an
          authorised account that has permission to continue.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/login"
            className="rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-teal"
          >
            Go to Sign in
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
