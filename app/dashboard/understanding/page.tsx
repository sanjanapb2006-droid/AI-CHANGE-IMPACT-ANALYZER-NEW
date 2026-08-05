"use client";

import { useState } from "react";

const sampleCode = `function add(a: number, b: number) {
  return a + b;
}
`;

export default function UnderstandingPage() {
  const [status, setStatus] = useState("");

  async function recordExplanationAccess() {
    setStatus("Saving your activity…");
    const response = await fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "Opened Code Understanding", description: "User accessed the code explainer tool." }),
    });

    if (response.ok) {
      setStatus("Activity stored successfully.");
      return;
    }

    setStatus("Unable to store activity.");
  }

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>Smart Code Explainer</h1>
        <p>Line-by-line explanation, bug detection, and refactoring guidance.</p>
      </div>
      <div className="explanation-shell">
        <div className="code-card">
          <h2>Sample code</h2>
          <pre>{sampleCode}</pre>
        </div>
        <div className="explanation-card">
          <h2>Explanation</h2>
          <p>
            This function receives two numeric inputs, adds them, and returns the result. In a real AI tool, the explainer would also highlight
            potential refactors, edge cases, and type safety concerns.
          </p>
        </div>
      </div>
      <button className="button primary" onClick={recordExplanationAccess}>
        Store explanation access
      </button>
      <div className="tool-note">
        <p>{status || "Review the sample code snippet and store this activity."}</p>
      </div>
    </div>
  );
}
