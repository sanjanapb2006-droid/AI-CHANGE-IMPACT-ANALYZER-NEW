import Link from "next/link";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="brand-block">
          <span className="brand-icon">⚙️</span>
          <div>
            <p className="brand-caption">Impact Analyzer</p>
            <h2>AI Hub</h2>
          </div>
        </div>
        <nav className="dashboard-nav">
          <Link href="/dashboard" className="nav-link">
            🏠 Dashboard Home
          </Link>
          <Link href="/dashboard/analyzer" className="nav-link">
            🕸️ Impact Analyzer
          </Link>
          <Link href="/dashboard/understanding" className="nav-link">
            🤖 Smart Code Explainer
          </Link>
          <Link href="/dashboard/bugs" className="nav-link">
            🐛 Bug Detector
          </Link>
          <Link href="/dashboard/chat" className="nav-link">
            💬 Repo AI Chat
          </Link>
        </nav>
        <Link href="/login" className="signout-button">
          🚪 Sign Out
        </Link>
      </aside>
      <section className="dashboard-content">{children}</section>
    </main>
  );
}
