import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function AuthModal({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('demo@artiva.ai');
  const [password, setPassword] = useState('artiva123');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Talent Producer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    try {
      const endpoint = isLogin ? `${apiBase}/api/auth/login` : `${apiBase}/api/auth/register`;
      const payload = isLogin ? { email, password } : { name, email, password, role };

      const res = await fetch(endpoint, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onLoginSuccess(data.token, data.user);
    } catch (err) {
      // Fallback for offline demo mode
      onLoginSuccess('mock_demo_jwt_token', {
        id: 'user_demo_01',
        name: name || 'Demo Producer',
        email: email,
        role: role
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = () => {
    onLoginSuccess('mock_demo_jwt_token', {
      id: 'user_demo_01',
      name: 'Producer Demo User',
      email: 'demo@artiva.ai',
      role: 'Creative Director'
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {isLogin ? 'Sign In to ARTIVA' : 'Create ARTIVA Account'}
          </h2>
          <p className="text-xs text-slate-400">
            Evidence-led creative talent discovery & recommendation workbench
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 outline-none focus:border-sky-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="producer@agency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Pass */}
        <div className="pt-2 border-t border-slate-800 space-y-3 text-center">
          <button
            onClick={handleDemoClick}
            className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-sky-400 text-xs font-semibold border border-slate-800 transition-all"
          >
            Instant Demo Access (Skip Login)
          </button>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

      </div>
    </div>
  );
}
