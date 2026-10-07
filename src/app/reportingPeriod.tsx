import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface ReportingPeriodValue {
  period: string;
  setPeriod: (period: string) => void;
}

const ReportingPeriodContext = createContext<ReportingPeriodValue | null>(null);

export function ReportingPeriodProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState("2024–25");
  const value = useMemo(() => ({ period, setPeriod }), [period]);

  return (
    <ReportingPeriodContext.Provider value={value}>
      {children}
    </ReportingPeriodContext.Provider>
  );
}

export function useReportingPeriod() {
  const context = useContext(ReportingPeriodContext);
  if (!context) {
    throw new Error("useReportingPeriod must be used inside ReportingPeriodProvider");
  }
  return context;
}
