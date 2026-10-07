export type ReportingRole = "sponsor" | "partner";
export type SponsorOrganisationId =
  | "horizon-community-foundation"
  | "northbridge-social-impact-fund";

export interface DistributionValue {
  label: string;
  value: number;
}

export interface InitiativeRecord {
  id: string;
  name: string;
  period: string;
  interest: string;
  status: "Active" | "Completed";
  reach: number;
  engagements: number;
  funding: number;
  activities: number;
  outcomes: number;
  primaryDistribution: DistributionValue[];
  secondaryDistribution: DistributionValue[];
}

export interface ReportingDashboardConfig {
  role: ReportingRole;
  roleLabel: string;
  organisation: string;
  title: string;
  description: string;
  interestLabel: string;
  primaryChartTitle: string;
  primaryChartDescription: string;
  secondaryChartTitle: string;
  secondaryChartDescription: string;
  records: InitiativeRecord[];
}

export const reportingPeriods = ["2024–25", "2023–24", "2022–23"];

export const reportingDashboards: Record<ReportingRole, ReportingDashboardConfig> = {
  sponsor: {
    role: "sponsor",
    roleLabel: "Sponsor representative",
    organisation: "Horizon Community Foundation",
    title: "Sponsor Dashboard",
    description:
      "Approved reporting on community reach, engagement and sponsor-funded activity.",
    interestLabel: "Sponsor interest",
    primaryChartTitle: "Industry profile",
    primaryChartDescription: "Aggregate participant industry representation.",
    secondaryChartTitle: "Seniority profile",
    secondaryChartDescription: "Aggregate participant career-level representation.",
    records: [
      {
        id: "digital-pathways-25",
        name: "Digital Pathways",
        period: "2024–25",
        interest: "Digital inclusion",
        status: "Active",
        reach: 840,
        engagements: 67,
        funding: 48000,
        activities: 6,
        outcomes: 112,
        primaryDistribution: [
          { label: "Technology", value: 310 },
          { label: "Health", value: 190 },
          { label: "Education", value: 150 },
          { label: "Other sectors", value: 190 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 330 },
          { label: "Mid-level", value: 280 },
          { label: "Senior", value: 150 },
          { label: "Leadership", value: 80 },
        ],
      },
      {
        id: "leadership-circles-25",
        name: "Leadership Circles",
        period: "2024–25",
        interest: "Workforce development",
        status: "Active",
        reach: 620,
        engagements: 82,
        funding: 36000,
        activities: 4,
        outcomes: 98,
        primaryDistribution: [
          { label: "Technology", value: 170 },
          { label: "Health", value: 150 },
          { label: "Education", value: 190 },
          { label: "Other sectors", value: 110 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 90 },
          { label: "Mid-level", value: 220 },
          { label: "Senior", value: 210 },
          { label: "Leadership", value: 100 },
        ],
      },
      {
        id: "community-ai-labs-25",
        name: "Community AI Labs",
        period: "2024–25",
        interest: "Responsible innovation",
        status: "Completed",
        reach: 430,
        engagements: 74,
        funding: 41000,
        activities: 8,
        outcomes: 86,
        primaryDistribution: [
          { label: "Technology", value: 210 },
          { label: "Health", value: 70 },
          { label: "Education", value: 85 },
          { label: "Other sectors", value: 65 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 180 },
          { label: "Mid-level", value: 150 },
          { label: "Senior", value: 75 },
          { label: "Leadership", value: 25 },
        ],
      },
      {
        id: "community-mentoring-25",
        name: "Community Mentoring Exchange",
        period: "2024–25",
        interest: "Workforce development",
        status: "Active",
        reach: 365,
        engagements: 69,
        funding: 29000,
        activities: 5,
        outcomes: 77,
        primaryDistribution: [
          { label: "Technology", value: 95 },
          { label: "Health", value: 80 },
          { label: "Education", value: 120 },
          { label: "Other sectors", value: 70 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 155 },
          { label: "Mid-level", value: 120 },
          { label: "Senior", value: 65 },
          { label: "Leadership", value: 25 },
        ],
      },
      {
        id: "industry-insight-25",
        name: "Industry Insight Sessions",
        period: "2024–25",
        interest: "Responsible innovation",
        status: "Completed",
        reach: 275,
        engagements: 72,
        funding: 26000,
        activities: 4,
        outcomes: 64,
        primaryDistribution: [
          { label: "Technology", value: 105 },
          { label: "Health", value: 55 },
          { label: "Education", value: 65 },
          { label: "Other sectors", value: 50 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 100 },
          { label: "Mid-level", value: 95 },
          { label: "Senior", value: 60 },
          { label: "Leadership", value: 20 },
        ],
      },
      {
        id: "digital-pathways-24",
        name: "Digital Pathways",
        period: "2023–24",
        interest: "Digital inclusion",
        status: "Completed",
        reach: 710,
        engagements: 58,
        funding: 44000,
        activities: 5,
        outcomes: 94,
        primaryDistribution: [
          { label: "Technology", value: 280 },
          { label: "Health", value: 140 },
          { label: "Education", value: 130 },
          { label: "Other sectors", value: 160 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 300 },
          { label: "Mid-level", value: 235 },
          { label: "Senior", value: 120 },
          { label: "Leadership", value: 55 },
        ],
      },
      {
        id: "career-connect-24",
        name: "Career Connect",
        period: "2023–24",
        interest: "Workforce development",
        status: "Completed",
        reach: 520,
        engagements: 63,
        funding: 32000,
        activities: 4,
        outcomes: 81,
        primaryDistribution: [
          { label: "Technology", value: 145 },
          { label: "Health", value: 125 },
          { label: "Education", value: 155 },
          { label: "Other sectors", value: 95 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 210 },
          { label: "Mid-level", value: 180 },
          { label: "Senior", value: 95 },
          { label: "Leadership", value: 35 },
        ],
      },
    ],
  },
  partner: {
    role: "partner",
    roleLabel: "Partner / grant provider representative",
    organisation: "Civic Futures Grant Trust",
    title: "Partner / Grant Provider Dashboard",
    description:
      "Approved reporting on funding use, participant reach and recorded programme outcomes.",
    interestLabel: "Funding priority",
    primaryChartTitle: "Funding use",
    primaryChartDescription: "Approved funding allocated by activity type.",
    secondaryChartTitle: "Recorded outcomes",
    secondaryChartDescription: "Aggregate outcomes recorded across funded activity.",
    records: [
      {
        id: "regional-skills-25",
        name: "Regional Skills Bursary",
        period: "2024–25",
        interest: "Education access",
        status: "Active",
        reach: 560,
        engagements: 46,
        funding: 92000,
        activities: 7,
        outcomes: 134,
        primaryDistribution: [
          { label: "Programme delivery", value: 51000 },
          { label: "Participant support", value: 24000 },
          { label: "Evaluation", value: 10000 },
          { label: "Resources", value: 7000 },
        ],
        secondaryDistribution: [
          { label: "Skills gained", value: 58 },
          { label: "Progression", value: 34 },
          { label: "New connections", value: 27 },
          { label: "Other approved", value: 15 },
        ],
      },
      {
        id: "community-research-25",
        name: "Community Research Fund",
        period: "2024–25",
        interest: "Community research",
        status: "Active",
        reach: 390,
        engagements: 38,
        funding: 76000,
        activities: 5,
        outcomes: 87,
        primaryDistribution: [
          { label: "Programme delivery", value: 34000 },
          { label: "Participant support", value: 16000 },
          { label: "Evaluation", value: 18000 },
          { label: "Resources", value: 8000 },
        ],
        secondaryDistribution: [
          { label: "Skills gained", value: 24 },
          { label: "Progression", value: 18 },
          { label: "New connections", value: 31 },
          { label: "Other approved", value: 14 },
        ],
      },
      {
        id: "innovation-grants-25",
        name: "Local Innovation Grants",
        period: "2024–25",
        interest: "Local innovation",
        status: "Completed",
        reach: 475,
        engagements: 52,
        funding: 68000,
        activities: 9,
        outcomes: 106,
        primaryDistribution: [
          { label: "Programme delivery", value: 31000 },
          { label: "Participant support", value: 21000 },
          { label: "Evaluation", value: 9000 },
          { label: "Resources", value: 7000 },
        ],
        secondaryDistribution: [
          { label: "Skills gained", value: 38 },
          { label: "Progression", value: 29 },
          { label: "New connections", value: 25 },
          { label: "Other approved", value: 14 },
        ],
      },
      {
        id: "access-participation-25",
        name: "Access and Participation Grants",
        period: "2024–25",
        interest: "Inclusive participation",
        status: "Active",
        reach: 305,
        engagements: 33,
        funding: 61000,
        activities: 6,
        outcomes: 79,
        primaryDistribution: [
          { label: "Programme delivery", value: 28000 },
          { label: "Participant support", value: 19000 },
          { label: "Evaluation", value: 8000 },
          { label: "Resources", value: 6000 },
        ],
        secondaryDistribution: [
          { label: "Skills gained", value: 25 },
          { label: "Progression", value: 16 },
          { label: "New connections", value: 27 },
          { label: "Other approved", value: 11 },
        ],
      },
      {
        id: "evaluation-capability-25",
        name: "Evaluation Capability Grants",
        period: "2024–25",
        interest: "Community research",
        status: "Completed",
        reach: 240,
        engagements: 29,
        funding: 54000,
        activities: 4,
        outcomes: 61,
        primaryDistribution: [
          { label: "Programme delivery", value: 22000 },
          { label: "Participant support", value: 10000 },
          { label: "Evaluation", value: 17000 },
          { label: "Resources", value: 5000 },
        ],
        secondaryDistribution: [
          { label: "Skills gained", value: 19 },
          { label: "Progression", value: 12 },
          { label: "New connections", value: 21 },
          { label: "Other approved", value: 9 },
        ],
      },
      {
        id: "regional-skills-24",
        name: "Regional Skills Bursary",
        period: "2023–24",
        interest: "Education access",
        status: "Completed",
        reach: 490,
        engagements: 41,
        funding: 84000,
        activities: 6,
        outcomes: 116,
        primaryDistribution: [
          { label: "Programme delivery", value: 47000 },
          { label: "Participant support", value: 22000 },
          { label: "Evaluation", value: 9000 },
          { label: "Resources", value: 6000 },
        ],
        secondaryDistribution: [
          { label: "Skills gained", value: 49 },
          { label: "Progression", value: 31 },
          { label: "New connections", value: 24 },
          { label: "Other approved", value: 12 },
        ],
      },
      {
        id: "participation-fund-24",
        name: "Participation Support Fund",
        period: "2023–24",
        interest: "Inclusive participation",
        status: "Completed",
        reach: 345,
        engagements: 35,
        funding: 59000,
        activities: 5,
        outcomes: 72,
        primaryDistribution: [
          { label: "Programme delivery", value: 26000 },
          { label: "Participant support", value: 21000 },
          { label: "Evaluation", value: 7000 },
          { label: "Resources", value: 5000 },
        ],
        secondaryDistribution: [
          { label: "Skills gained", value: 22 },
          { label: "Progression", value: 17 },
          { label: "New connections", value: 23 },
          { label: "Other approved", value: 10 },
        ],
      },
    ],
  },
};

export const sponsorReportingDashboards: Record<
  SponsorOrganisationId,
  ReportingDashboardConfig
> = {
  "horizon-community-foundation": reportingDashboards.sponsor,
  "northbridge-social-impact-fund": {
    role: "sponsor",
    roleLabel: "Sponsor representative",
    organisation: "Northbridge Social Impact Fund",
    title: "Sponsor Dashboard",
    description:
      "Approved reporting on community reach, engagement and Northbridge-funded activity.",
    interestLabel: "Sponsor interest",
    primaryChartTitle: "Industry profile",
    primaryChartDescription: "Aggregate participant industry representation.",
    secondaryChartTitle: "Seniority profile",
    secondaryChartDescription: "Aggregate participant career-level representation.",
    records: [
      {
        id: "green-skills-25",
        name: "Green Skills Network",
        period: "2024–25",
        interest: "Sustainable careers",
        status: "Active",
        reach: 510,
        engagements: 71,
        funding: 55000,
        activities: 5,
        outcomes: 89,
        primaryDistribution: [
          { label: "Environment", value: 190 },
          { label: "Engineering", value: 135 },
          { label: "Public services", value: 105 },
          { label: "Other sectors", value: 80 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 220 },
          { label: "Mid-level", value: 175 },
          { label: "Senior", value: 85 },
          { label: "Leadership", value: 30 },
        ],
      },
      {
        id: "community-tech-25",
        name: "Community Tech Sessions",
        period: "2024–25",
        interest: "Digital inclusion",
        status: "Active",
        reach: 360,
        engagements: 64,
        funding: 39000,
        activities: 7,
        outcomes: 73,
        primaryDistribution: [
          { label: "Environment", value: 55 },
          { label: "Engineering", value: 120 },
          { label: "Public services", value: 105 },
          { label: "Other sectors", value: 80 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 170 },
          { label: "Mid-level", value: 115 },
          { label: "Senior", value: 55 },
          { label: "Leadership", value: 20 },
        ],
      },
      {
        id: "mentoring-access-25",
        name: "Mentoring Access Fund",
        period: "2024–25",
        interest: "Workforce development",
        status: "Completed",
        reach: 290,
        engagements: 78,
        funding: 32000,
        activities: 4,
        outcomes: 68,
        primaryDistribution: [
          { label: "Environment", value: 70 },
          { label: "Engineering", value: 65 },
          { label: "Public services", value: 95 },
          { label: "Other sectors", value: 60 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 95 },
          { label: "Mid-level", value: 105 },
          { label: "Senior", value: 65 },
          { label: "Leadership", value: 25 },
        ],
      },
      {
        id: "climate-careers-25",
        name: "Climate Careers Exchange",
        period: "2024–25",
        interest: "Sustainable careers",
        status: "Active",
        reach: 335,
        engagements: 68,
        funding: 37000,
        activities: 5,
        outcomes: 71,
        primaryDistribution: [
          { label: "Environment", value: 130 },
          { label: "Engineering", value: 90 },
          { label: "Public services", value: 70 },
          { label: "Other sectors", value: 45 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 145 },
          { label: "Mid-level", value: 115 },
          { label: "Senior", value: 55 },
          { label: "Leadership", value: 20 },
        ],
      },
      {
        id: "regional-leadership-25",
        name: "Regional Leadership Forum",
        period: "2024–25",
        interest: "Workforce development",
        status: "Completed",
        reach: 260,
        engagements: 75,
        funding: 30000,
        activities: 4,
        outcomes: 59,
        primaryDistribution: [
          { label: "Environment", value: 65 },
          { label: "Engineering", value: 60 },
          { label: "Public services", value: 85 },
          { label: "Other sectors", value: 50 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 55 },
          { label: "Mid-level", value: 90 },
          { label: "Senior", value: 80 },
          { label: "Leadership", value: 35 },
        ],
      },
      {
        id: "green-skills-24",
        name: "Green Skills Network",
        period: "2023–24",
        interest: "Sustainable careers",
        status: "Completed",
        reach: 425,
        engagements: 66,
        funding: 49000,
        activities: 4,
        outcomes: 76,
        primaryDistribution: [
          { label: "Environment", value: 165 },
          { label: "Engineering", value: 110 },
          { label: "Public services", value: 85 },
          { label: "Other sectors", value: 65 },
        ],
        secondaryDistribution: [
          { label: "Early career", value: 185 },
          { label: "Mid-level", value: 145 },
          { label: "Senior", value: 70 },
          { label: "Leadership", value: 25 },
        ],
      },
    ],
  },
};
