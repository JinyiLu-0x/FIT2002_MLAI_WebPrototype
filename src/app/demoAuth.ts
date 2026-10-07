import type { SponsorOrganisationId } from "../data/reportingData";

export type DemoRole = "sponsor" | "partner";
export type AccessGroup = "external";

export interface DemoAccount {
  id: string;
  label: string;
  email: string;
  role: DemoRole;
  accessGroup: AccessGroup;
  organisation: string;
  organisationId?: SponsorOrganisationId;
  description: string;
}

export const demoPassword = "Demo123!";

export const demoAccounts: DemoAccount[] = [
  {
    id: "demo-sponsor-a",
    label: "Demo Sponsor A",
    email: "sponsor.a@demo.mlai",
    role: "sponsor",
    accessGroup: "external",
    organisation: "Horizon Community Foundation",
    organisationId: "horizon-community-foundation",
    description: "Sponsor Representative · Organisation A data",
  },
  {
    id: "demo-sponsor-b",
    label: "Demo Sponsor B",
    email: "sponsor.b@demo.mlai",
    role: "sponsor",
    accessGroup: "external",
    organisation: "Northbridge Social Impact Fund",
    organisationId: "northbridge-social-impact-fund",
    description: "Sponsor Representative · Organisation B data",
  },
  {
    id: "partner-grant-provider",
    label: "Partner / Grant Provider",
    email: "partner@demo.mlai",
    role: "partner",
    accessGroup: "external",
    organisation: "Civic Futures Grant Trust",
    description: "Approved funded-project outcomes only",
  },
];

export const demoSponsorAccounts = demoAccounts.filter(
  (account) => account.role === "sponsor",
);

const sessionKey = "mlai-demo-session";

export function authenticateDemoAccount(email: string, password: string) {
  if (password !== demoPassword) {
    return null;
  }

  return (
    demoAccounts.find((account) => account.email === email.trim().toLowerCase()) ??
    null
  );
}

export function startDemoSession(account: DemoAccount) {
  sessionStorage.setItem(sessionKey, account.id);
}

export function getActiveDemoAccount() {
  const accountId = sessionStorage.getItem(sessionKey);
  return demoAccounts.find((account) => account.id === accountId) ?? null;
}

export function clearDemoSession() {
  sessionStorage.removeItem(sessionKey);
}

export function getAccountHomePath(account: DemoAccount) {
  const paths: Record<DemoRole, string> = {
    sponsor: "/sponsor",
    partner: "/partner",
  };
  return paths[account.role];
}

// Compatibility exports for modules retained by Vite HMR from the earlier
// sponsor-only authentication flow.
export function authenticateSponsor(email: string, password: string) {
  const account = authenticateDemoAccount(email, password);
  return account?.role === "sponsor" ? account : null;
}

export function getActiveSponsorAccount() {
  const account = getActiveDemoAccount();
  return account?.role === "sponsor" ? account : null;
}

export const startSponsorSession = startDemoSession;
export const clearSponsorSession = clearDemoSession;
