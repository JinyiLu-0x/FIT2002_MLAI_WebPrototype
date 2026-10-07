import ReportingDashboard from "../components/dashboard/ReportingDashboard";

export default function PartnerDashboardPage({
  view = "overview",
}: {
  view?: "overview" | "impact" | "initiatives";
}) {
  return <ReportingDashboard role="partner" view={view} />;
}
