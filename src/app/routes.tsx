import { Navigate, createBrowserRouter } from "react-router";
import {
  getActiveDemoAccount,
  type DemoRole,
} from "./demoAuth";
import DashboardLayout from "../components/layout/DashboardLayout";
import PublicLayout from "../components/layout/PublicLayout";
import AccessDeniedPage from "../pages/AccessDeniedPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PartnerDashboardPage from "../pages/PartnerDashboardPage";
import SponsorDashboardPage from "../pages/SponsorDashboardPage";
import SponsorReportsPage from "../pages/SponsorReportsPage";

function ProtectedRoleLayout({
  requiredRole,
  layoutRole,
}: {
  requiredRole: DemoRole;
  layoutRole: "sponsor" | "partner";
}) {
  const account = getActiveDemoAccount();

  if (!account || account.role !== requiredRole) {
    return <Navigate to="/access-denied" replace />;
  }

  return (
    <DashboardLayout
      role={layoutRole}
      accountLabel={account.label}
      organisationName={account.organisation}
    />
  );
}

export const router = createBrowserRouter([
  {
    Component: PublicLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "access-denied", Component: AccessDeniedPage },
    ],
  },
  {
    path: "sponsor",
    element: <ProtectedRoleLayout requiredRole="sponsor" layoutRole="sponsor" />,
    children: [
      { index: true, Component: SponsorDashboardPage },
      { path: "impact", element: <SponsorDashboardPage view="impact" /> },
      { path: "initiatives", element: <SponsorDashboardPage view="initiatives" /> },
      { path: "reports", element: <SponsorReportsPage role="sponsor" /> },
    ],
  },
  {
    path: "partner",
    element: <ProtectedRoleLayout requiredRole="partner" layoutRole="partner" />,
    children: [
      { index: true, Component: PartnerDashboardPage },
      {
        path: "outcomes",
        element: <PartnerDashboardPage view="impact" />,
      },
      {
        path: "initiatives",
        element: <PartnerDashboardPage view="initiatives" />,
      },
      { path: "reports", element: <SponsorReportsPage role="partner" /> },
    ],
  },
  { path: "*", element: <Navigate to="/access-denied" replace /> },
]);
