"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (response.ok) {
      router.push("/dashboard");
      return;
    }

    const payload = await response.json();
    setError(payload?.message || "Unable to sign in.");
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <span className="eyebrow">Welcome back</span>
        <h1>Sign in to AI Change Impact Analyzer</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
            />
          </label>
          <button className="button primary" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
          {error ? <p className="form-error">{error}</p> : null}
        </form>
        <p className="auth-footnote">
          Don&apos;t have an account? <a href="/signup">Sign up</a>
        </p>
      </section>
    </main>
  );
}
