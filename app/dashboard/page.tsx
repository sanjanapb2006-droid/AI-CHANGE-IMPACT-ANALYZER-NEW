import Link from "next/link";

const cards = [
  {
    title: "Visual Impact Analyzer",
    description: "Inspect code relationships and dependency heatmaps.",
    link: "/dashboard/analyzer",
  },
  {
    title: "Code Understanding",
    description: "Get quick explanations and refactor suggestions.",
    link: "/dashboard/understanding",
  },
  {
    title: "Bug Detector",
    description: "Scan for anti-patterns and potential issues.",
    link: "/dashboard/bugs",
  },
  {
    title: "Repository AI Chat",
    description: "Ask questions across your repository context.",
    link: "/dashboard/chat",
  },
];

export default function DashboardPage() {
  return (
    <div className="dashboard-home">
      <div className="dashboard-hero">
        <div>
          <span className="eyebrow">AI Software Engineering Hub</span>
          <h1>Choose a tool below to optimize, fix, or analyze your codebase securely.</h1>
          <p>Each feature stores actions and insights in your database so you can track usage over time.</p>
        </div>
      </div>
      <div className="dashboard-cards">
        {cards.map((card) => (
          <Link key={card.title} href={card.link} className="dashboard-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <span>Explore →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
