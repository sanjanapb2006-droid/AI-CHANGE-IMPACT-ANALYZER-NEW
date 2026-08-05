"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (response.ok) {
      router.push("/dashboard");
      return;
    }

    const payload = await response.json();
    setError(payload?.message || "Unable to create account.");
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <span className="eyebrow">Get started</span>
        <h1>Create your team access.</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Jane Doe"
              required
            />
          </label>
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
              placeholder="Choose a password"
              required
            />
          </label>
          <button className="button primary" type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Sign Up"}
          </button>
          {error ? <p className="form-error">{error}</p> : null}
        </form>
        <p className="auth-footnote">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </section>
    </main>
  );
}
