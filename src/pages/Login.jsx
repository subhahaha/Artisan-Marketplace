import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectTo = location.state?.from || "/seller/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-plum mb-2">Seller Login</h1>
      <p className="text-ink-soft text-sm mb-8">
        This is a demo — no real backend. Use the credentials below to log in.
      </p>

      <div className="bg-white/60 border border-gold/40 rounded-sm px-4 py-3 mb-6 text-sm font-mono text-ink-soft">
        <p>seller@kaarigar.com</p>
        <p>password123</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-ink-soft mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/70 border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold/60"
            placeholder="seller@kaarigar.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-soft mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/70 border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold/60"
            placeholder="password123"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-plum text-paper px-8 py-3 rounded-sm font-medium hover:bg-plum-light transition-colors"
        >
          Log in
        </button>
      </form>
    </div>
  );
}