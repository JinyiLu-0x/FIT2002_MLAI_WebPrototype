import { Link, NavLink, Outlet } from "react-router";
import BrandMark from "../BrandMark";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-navy" : "text-muted hover:text-ink"
  }`;

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-app">
      <header className="border-b border-line bg-sidebar">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-4" aria-label="MLAI home">
            <BrandMark compact />
            <span className="hidden text-lg font-bold tracking-[0.1em] text-ink sm:block">
              MLAI
            </span>
            <span className="hidden border-l border-line pl-4 text-xs font-medium leading-5 text-muted sm:block">
              Sponsor &amp; Impact
              <br />
              Reporting
            </span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-7" aria-label="Public navigation">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <Link
              to="/login"
              className="rounded-full bg-accent-mint px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-navy text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 sm:px-8">
          <div>
            <p className="text-base font-semibold tracking-[0.1em]">MLAI</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
              Responsible sponsor and impact reporting for trusted external partners.
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm font-medium text-white">Sponsor &amp; Impact Reporting</p>
            <p className="mt-2 text-xs leading-5 text-white/70">
              Approved aggregate information only. No identifiable member records.
            </p>
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="mx-auto w-full max-w-7xl px-5 py-4 text-xs text-white/60 sm:px-8">
            MLAI Sponsor &amp; Impact Reporting
          </div>
        </div>
      </footer>
    </div>
  );
}
