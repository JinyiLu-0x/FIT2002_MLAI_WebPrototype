export type UserRole = "internal" | "approver" | "sponsor" | "partner";

export interface RoleDefinition {
  id: UserRole;
  name: string;
  shortName: string;
  dashboardPath: string;
  description: string;
}

export const roles: Record<UserRole, RoleDefinition> = {
  internal: {
    id: "internal",
    name: "Internal MLAI reporting administrator",
    shortName: "MLAI administrator",
    dashboardPath: "/internal",
    description: "Manage approved reporting views and draft impact reports.",
  },
  approver: {
    id: "approver",
    name: "MLAI report approver",
    shortName: "Report approver",
    dashboardPath: "/approver",
    description: "Review pending reports and record approval decisions.",
  },
  sponsor: {
    id: "sponsor",
    name: "Sponsor representative",
    shortName: "Sponsor",
    dashboardPath: "/sponsor",
    description: "View approved, aggregated sponsorship outcomes.",
  },
  partner: {
    id: "partner",
    name: "Partner / grant provider representative",
    shortName: "Partner / grant provider",
    dashboardPath: "/partner",
    description: "Review approved grant activity and impact summaries.",
  },
};
