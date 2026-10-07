export type ReportCategory = "periodic" | "activity" | "annual";

const activityReportTerms = [
  "Initiative",
  "Sessions",
  "Mentoring",
  "Skills",
  "Forum",
  "Portfolio",
  "Fund",
  "Grant",
  "Completion",
  "Closure",
  "Evidence",
];

export function getReportCategory(title: string): ReportCategory {
  if (title.includes("Annual")) {
    return "annual";
  }

  if (activityReportTerms.some((term) => title.includes(term))) {
    return "activity";
  }

  return "periodic";
}

export const reportPresentation = {
  periodic: {
    label: "Periodic impact",
    accentClass: "bg-teal",
    borderClass: "border-teal",
    surfaceClass: "bg-brand-50",
    textClass: "text-teal",
  },
  activity: {
    label: "Activity output",
    accentClass: "bg-accent-purple",
    borderClass: "border-accent-purple",
    surfaceClass: "bg-status-progress-bg",
    textClass: "text-status-progress",
  },
  annual: {
    label: "Annual report",
    accentClass: "bg-navy",
    borderClass: "border-navy",
    surfaceClass: "bg-status-published-bg",
    textClass: "text-status-published",
  },
} satisfies Record<
  ReportCategory,
  {
    label: string;
    accentClass: string;
    borderClass: string;
    surfaceClass: string;
    textClass: string;
  }
>;
