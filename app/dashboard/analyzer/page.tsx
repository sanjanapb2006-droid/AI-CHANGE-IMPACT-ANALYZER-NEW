"use client";

import { useEffect, useState } from "react";

type RecordItem = {
  id: number;
  action: string;
  description: string;
  createdAt: string;
};

export default function AnalyzerPage() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [status, setStatus] = useState("Loading analysis…");

  async function loadRecords() {
    const response = await fetch("/api/records");

    if (!response.ok) {
      setStatus("Unable to load records. Sign in to view saved items.");
      return;
    }

    const data = await response.json();
    setRecords(data.records || []);
    setStatus("Records loaded.");
  }

  async function logAnalyzerAccess() {
    setStatus("Saving analyzer activity…");
    const response = await fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "Opened Impact Analyzer", description: "User viewed the visual analyzer." }),
    });

    if (response.ok) {
      await loadRecords();
      setStatus("Analyzer activity stored.");
      return;
    }

    setStatus("Failed to store analyzer activity.");
  }

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>Visual Impact Analyzer</h1>
        <p>Heatmaps and dependency graphs for safer code changes.</p>
      </div>
      <div className="tool-summary-grid">
        <div className="summary-card">
          <h3>Recent insights</h3>
          <p>Analyze the impact of code changes and track stored activity records.</p>
        </div>
        <div className="summary-card">
          <h3>Saved records</h3>
          <p>{records.length} actions stored for this user.</p>
        </div>
      </div>
      <button className="button primary" onClick={logAnalyzerAccess}>
        Record analyzer visit
      </button>
      <div className="tool-note">
        <p>{status}</p>
      </div>
      <div className="record-list">
        <h2>Recent activity</h2>
        {records.length === 0 ? (
          <p>No records yet. Use a tool page to store a new item.</p>
        ) : (
          records.slice(0, 6).map((record) => (
            <div key={record.id} className="record-item">
              <strong>{record.action}</strong>
              <p>{record.description}</p>
              <span>{new Date(record.createdAt).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
