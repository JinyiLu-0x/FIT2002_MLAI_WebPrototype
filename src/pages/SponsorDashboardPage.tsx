import { Navigate } from "react-router";
import { getActiveDemoAccount } from "../app/demoAuth";
import ReportingDashboard from "../components/dashboard/ReportingDashboard";

export default function SponsorDashboardPage({
  view = "overview",
}: {
  view?: "overview" | "impact" | "initiatives";
}) {
  const account = getActiveDemoAccount();

  if (!account || account.role !== "sponsor" || !account.organisationId) {
    return <Navigate to="/access-denied" replace />;
  }

  return (
    <ReportingDashboard
      role="sponsor"
      sponsorOrganisationId={account.organisationId}
      view={view}
    />
  );
}
