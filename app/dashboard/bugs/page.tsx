"use client";

import { useState } from "react";

type Issue = {
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
};

const issues: Issue[] = [
  {
    title: "Missing error handling in login flow",
    description: "The login API can return 401 with no user-facing feedback.",
    severity: "medium",
  },
  {
    title: "Hard-coded secret fallback",
    description: "JWT signing falls back to a default secret in development.",
    severity: "high",
  },
  {
    title: "Potential XSS in message output",
    description: "Chat output should be sanitized before rendering in a real app.",
    severity: "low",
  },
];

export default function BugsPage() {
  const [status, setStatus] = useState("");

  async function recordBugScan() {
    setStatus("Recording bug scanner access…");
    const response = await fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "Opened Bug Detector", description: "User opened the bug detection tool." }),
    });

    if (response.ok) {
      setStatus("Record created.");
      return;
    }

    setStatus("Unable to store record.");
  }

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>Bug Detector</h1>
        <p>Proactively scan patterns to detect anti-patterns and potential bugs.</p>
      </div>
      <div className="issue-list">
        {issues.map((issue) => (
          <div key={issue.title} className={`issue-card severity-${issue.severity}`}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <span>{issue.severity.toUpperCase()}</span>
          </div>
        ))}
      </div>
      <button className="button primary" onClick={recordBugScan}>
        Save bug scan record
      </button>
      <div className="tool-note">
        <p>{status || "Review the detected patterns and store this scan."}</p>
      </div>
    </div>
  );
}
