import Link from "next/link";

const tools = [
  {
    label: "Visual Impact Analyzer",
    href: "/dashboard/analyzer",
    description: "Heatmaps and dependency graphs for safer code changes.",
    emoji: "🕸️",
  },
  {
    label: "Code Understanding",
    href: "/dashboard/understanding",
    description: "Line-by-line explanation, bug detection, and refactoring.",
    emoji: "🤖",
  },
  {
    label: "Bug Detector",
    href: "/dashboard/bugs",
    description: "Proactively scans patterns to detect anti-patterns and potential bugs.",
    emoji: "🐛",
  },
  {
    label: "Repository AI Chat",
    href: "/dashboard/chat",
    description: "Interact directly with your uploaded context via embeddings.",
    emoji: "💬",
  },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">AI software engineering hub</span>
          <h1>Build secure, smarter code with AI-powered tools.</h1>
          <p>
            Explore a unified dashboard for impact analysis, code explanation, bug detection, and repo chat.
          </p>
          <div className="cta-row">
            <Link className="button primary" href="/login">
              Sign In
            </Link>
            <Link className="button secondary" href="/signup">
              Create Account
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-inner">
            <p className="hero-card-title">AI Change Impact Analyzer</p>
            <p className="hero-card-text">Track code risks, visualize dependencies, and save every action in a persistent backend.</p>
            <div className="hero-stat-grid">
              <div>
                <strong>5+</strong>
                <span>Trusted tools</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Cloud-ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tool-grid">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="tool-card">
            <span className="tool-emoji">{tool.emoji}</span>
            <h3>{tool.label}</h3>
            <p>{tool.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
