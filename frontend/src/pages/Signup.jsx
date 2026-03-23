import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { Eye, EyeOff, Loader2, Link as LinkIcon, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('All fields are required', { style: { background: '#333', color: '#fff' } });
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters', { style: { background: '#333', color: '#fff' } });
      return;
    }

    setIsLoading(true);
    try {
      const data = await authService.signup({ name, email, password });
      toast.success(data.message || 'Account created successfully!', { style: { background: '#333', color: '#fff' } });
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create account', { style: { background: '#333', color: '#fff' } });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0B] text-white">
      {/* Left Panel - Branding/Hero */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-[#0A0A0B] border-r border-zinc-800">
        <div className="absolute bottom-[-20%] right-[-10%] w-[120%] h-[120%] bg-gradient-to-tr from-emerald-600/10 via-transparent to-transparent opacity-50 blur-[100px] pointer-events-none"></div>
        <div className="z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <LinkIcon className="text-black w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">Transformer</span>
        </div>
        
        <div className="z-10 mb-20">
          <div className="inline-flex flex-row items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-xs font-medium text-emerald-400 mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Webhook Handling</span>
          </div>
          <h1 className="text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
            Sign up and scale<br />your infrastructure.
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
            Create an account to begin processing Webhooks immediately. We'll handle the parsing, formatting, and routing for you.
          </p>
        </div>
        
        <div className="z-10 flex items-center text-sm font-medium text-zinc-500 gap-6">
          <span>&copy; {new Date().getFullYear()} Webhook Transformer Inc.</span>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-sm">
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="flex lg:hidden items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <LinkIcon className="text-black w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">Transformer</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight mb-2">Create an account</h2>
            <p className="text-zinc-400 text-sm">Fill in your details to get started instantly.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#121214] border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 transition-all"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#121214] border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 transition-all font-mono"
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#121214] border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 transition-all font-mono pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-1">Must be at least 6 characters long.</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-2.5 px-4 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Register account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800/60 text-center">
            <p className="text-zinc-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:text-zinc-300 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
