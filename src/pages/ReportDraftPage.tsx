import { useState } from "react";
import { Link, useParams } from "react-router";

export default function ReportDraftPage() {
  const { reportId } = useParams();
  const isNew = reportId === "new";
  const [title, setTitle] = useState(
    isNew ? "" : "Horizon Community Foundation · Q2 Impact",
  );
  const [audience, setAudience] = useState("Sponsor Representative");
  const [summary, setSummary] = useState(
    isNew
      ? ""
      : "Approved aggregate summary of community reach, engagement and funded activities.",
  );
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-6xl">
      <Link to="/internal/reports" className="text-sm font-black text-ink underline underline-offset-4">
        ← Report drafts
      </Link>
      <div className="mt-6">
        <p className="inline-flex rounded-full border border-ink bg-accent-yellow px-3 py-1.5 text-xs font-black uppercase tracking-widest text-ink">
          Reporting Administrator
        </p>
        <h1 className="mt-3 text-2xl font-black uppercase leading-none text-ink sm:text-3xl">
          {isNew ? "Create report draft" : "Edit report draft"}
        </h1>
        <p className="mt-3 text-sm font-medium text-ink/60">
          Prepare an aggregate report for internal approval.
        </p>
      </div>
      <form
        className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <section className="space-y-5 rounded-xl border border-slate-400 bg-cream-light p-5">
          <div>
            <label htmlFor="report-title" className="text-sm font-black text-ink">
              Report title
            </label>
            <input
              id="report-title"
              required
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setSaved(false);
              }}
              className="mt-2 w-full rounded-xl border border-ink bg-cream-light px-4 py-3 font-semibold text-ink outline-none focus:ring-4 focus:ring-accent-purple"
              placeholder="Enter report title"
            />
          </div>
          <div>
            <label htmlFor="report-audience" className="text-sm font-black text-ink">
              Audience
            </label>
            <select
              id="report-audience"
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              className="mt-2 w-full rounded-xl border border-ink bg-cream-light px-4 py-3 font-semibold text-ink outline-none focus:ring-4 focus:ring-accent-purple"
            >
              <option>Sponsor Representative</option>
              <option>Partner / Grant Provider</option>
            </select>
          </div>
          <div>
            <label htmlFor="report-summary" className="text-sm font-black text-ink">
              Approved aggregate summary
            </label>
            <textarea
              id="report-summary"
              rows={7}
              value={summary}
              onChange={(event) => {
                setSummary(event.target.value);
                setSaved(false);
              }}
              className="mt-2 w-full resize-y rounded-xl border border-ink bg-cream-light px-4 py-3 font-semibold leading-6 text-ink outline-none focus:ring-4 focus:ring-accent-purple"
              placeholder="Add an aggregate reporting summary"
            />
          </div>
        </section>
        <aside className="rounded-xl border border-slate-400 bg-accent-mint/40 p-5">
          <p className="text-xs font-black uppercase tracking-widest text-ink/60">
            Draft controls
          </p>
          <p className="mt-4 text-sm font-semibold leading-6 text-ink/70">
            Audience: {audience}. Submit for approval after checking all figures are aggregated.
          </p>
          <button
            type="submit"
            className="mt-6 w-full rounded-full border border-ink bg-ink px-5 py-3 text-sm font-black text-white hover:bg-accent-blue"
          >
            Save draft
          </button>
          {saved && (
            <p role="status" className="mt-4 rounded-xl border border-ink bg-accent-yellow p-3 text-xs font-black text-ink">
              Draft saved successfully.
            </p>
          )}
        </aside>
      </form>
    </div>
  );
}
