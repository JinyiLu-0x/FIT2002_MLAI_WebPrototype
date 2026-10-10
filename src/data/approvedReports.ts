export interface ApprovedReport {
  title: string;
  period: string;
  published: string;
  summary: string;
  metrics: string[];
  initiativeIds: string[];
}

export const reportsByAccount: Record<string, ApprovedReport[]> = {
  "demo-sponsor-a": [
    {
      title: "Q2 Community Impact Summary",
      period: "2024–25 · Q2",
      published: "20 June 2025",
      summary: "Approved aggregate summary of community reach and sponsor-funded engagement.",
      metrics: ["1,890 aggregate reach", "18 funded activities", "74% engagement"],
      initiativeIds: ["digital-pathways-25", "leadership-circles-25", "community-ai-labs-25"],
    },
    {
      title: "Digital Pathways Initiative Update",
      period: "2024–25 · Q1",
      published: "08 April 2025",
      summary: "Approved initiative-level progress for Digital Pathways.",
      metrics: ["840 aggregate reach", "6 activities", "112 approved outcomes"],
      initiativeIds: ["digital-pathways-25"],
    },
    {
      title: "Industry Insight Sessions Review",
      period: "2024–25 · Q1",
      published: "22 March 2025",
      summary: "Approved reach, engagement and outcome summary for industry sessions.",
      metrics: ["275 aggregate reach", "72% engagement", "64 approved outcomes"],
      initiativeIds: ["industry-insight-25"],
    },
    {
      title: "Community Mentoring Outcomes Brief",
      period: "2024–25 · Q1",
      published: "28 February 2025",
      summary: "Aggregate mentoring participation, engagement and progression outcomes.",
      metrics: ["365 aggregate reach", "69% engagement", "77 approved outcomes"],
      initiativeIds: ["community-mentoring-25"],
    },
    {
      title: "Annual Sponsor Value Report",
      period: "2023–24",
      published: "30 August 2024",
      summary: "Annual approved summary of sponsor-supported reach and programme delivery.",
      metrics: ["1,230 aggregate reach", "9 funded activities", "175 approved outcomes"],
      initiativeIds: ["digital-pathways-24", "career-connect-24"],
    },
    {
      title: "Community AI Labs Completion Report",
      period: "2024–25 · Q2",
      published: "25 June 2025",
      summary: "Completion report for approved Community AI Labs activity and outcomes.",
      metrics: ["430 aggregate reach", "8 funded activities", "86 approved outcomes"],
      initiativeIds: ["community-ai-labs-25"],
    },
  ],
  "demo-sponsor-b": [
    {
      title: "Northbridge Sponsorship Impact Update",
      period: "2024–25 · Q2",
      published: "18 June 2025",
      summary: "Approved aggregate reporting across sustainable careers and digital inclusion.",
      metrics: ["1,160 aggregate reach", "16 funded activities", "71% engagement"],
      initiativeIds: ["green-skills-25", "community-tech-25", "mentoring-access-25"],
    },
    {
      title: "Green Skills Network Summary",
      period: "2024–25 · Q1",
      published: "02 April 2025",
      summary: "Approved programme reach and engagement summary.",
      metrics: ["510 aggregate reach", "5 activities", "89 approved outcomes"],
      initiativeIds: ["green-skills-25"],
    },
    {
      title: "Regional Leadership Forum Review",
      period: "2024–25 · Q1",
      published: "19 March 2025",
      summary: "Aggregate participation and outcomes across regional leadership activity.",
      metrics: ["260 aggregate reach", "75% engagement", "59 approved outcomes"],
      initiativeIds: ["regional-leadership-25"],
    },
    {
      title: "Digital Inclusion Portfolio Update",
      period: "2024–25 · Q1",
      published: "24 February 2025",
      summary: "Approved aggregate progress across Northbridge digital inclusion activity.",
      metrics: ["360 aggregate reach", "64% engagement", "73 approved outcomes"],
      initiativeIds: ["community-tech-25"],
    },
    {
      title: "Sustainable Careers Annual Review",
      period: "2023–24",
      published: "26 August 2024",
      summary: "Annual reporting on sustainable careers reach, activity and outcomes.",
      metrics: ["425 aggregate reach", "4 funded activities", "76 approved outcomes"],
      initiativeIds: ["green-skills-24"],
    },
    {
      title: "Mentoring Access Fund Completion Report",
      period: "2024–25 · Q2",
      published: "23 June 2025",
      summary: "Completion summary for mentoring reach, engagement and approved outcomes.",
      metrics: ["290 aggregate reach", "78% engagement", "68 approved outcomes"],
      initiativeIds: ["mentoring-access-25"],
    },
  ],
  "partner-grant-provider": [
    {
      title: "Grant-Supported Outcomes Report",
      period: "2024–25 · Q2",
      published: "21 June 2025",
      summary: "Approved aggregate outcomes from programmes supported by Civic Futures Grant Trust.",
      metrics: ["1,425 participant reach", "21 funded activities", "327 outcomes"],
      initiativeIds: ["regional-skills-25", "community-research-25", "innovation-grants-25"],
    },
    {
      title: "Regional Skills Bursary Update",
      period: "2024–25 · Q1",
      published: "11 April 2025",
      summary: "Aggregate delivery and outcomes for the approved bursary programme.",
      metrics: ["560 participant reach", "A$92,000 approved funding", "134 outcomes"],
      initiativeIds: ["regional-skills-25"],
    },
    {
      title: "Evaluation Capability Grant Review",
      period: "2024–25 · Q1",
      published: "15 March 2025",
      summary: "Approved aggregate delivery and capability outcomes for evaluation grants.",
      metrics: ["240 participant reach", "A$54,000 approved funding", "61 outcomes"],
      initiativeIds: ["evaluation-capability-25"],
    },
    {
      title: "Local Innovation Grant Closure Report",
      period: "2024–25 · Q1",
      published: "27 February 2025",
      summary: "Approved completion summary for locally funded innovation activity.",
      metrics: ["475 participant reach", "A$68,000 approved funding", "106 outcomes"],
      initiativeIds: ["innovation-grants-25"],
    },
    {
      title: "Participation Support Evidence Brief",
      period: "2023–24",
      published: "22 August 2024",
      summary: "Evidence brief covering participation support delivery and aggregate outcomes.",
      metrics: ["345 participant reach", "A$59,000 approved funding", "72 outcomes"],
      initiativeIds: ["participation-fund-24"],
    },
    {
      title: "2023–24 Grant Outcomes Annual Report",
      period: "2023–24",
      published: "29 August 2024",
      summary: "Annual approved summary of funded delivery, reach and recorded outcomes.",
      metrics: ["835 participant reach", "A$143,000 approved funding", "188 outcomes"],
      initiativeIds: ["regional-skills-24", "participation-fund-24"],
    },
  ],
};

export function getInitiativeReport(accountId: string, initiativeId: string, period: string) {
  return (reportsByAccount[accountId] ?? [])
    .filter((report) => report.period.startsWith(period) && report.initiativeIds.includes(initiativeId))
    .sort((a, b) => a.initiativeIds.length - b.initiativeIds.length)[0];
}

export function getLatestReport(accountId: string, period: string) {
  return (reportsByAccount[accountId] ?? [])
    .filter((report) => report.period.startsWith(period))
    .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))[0];
}
