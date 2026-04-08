import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { 
  LogOut, User, Activity, Loader2, Link as LinkIcon, 
  Settings, Key, Database, Bell, Plug, CheckCircle2,
  MoreHorizontal
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getMe();
        setUser(data.user);
      } catch (error) {
        toast.error('Session expired or unauthorized. Please login again.', { style: { background: '#333', color: '#fff' } });
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success('Logged out successfully', { style: { background: '#333', color: '#fff' } });
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout', { style: { background: '#333', color: '#fff' } });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#0A0A0B] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
          <p className="text-zinc-500 font-medium text-sm">Authenticating session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0A0A0B] text-white font-sans overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 border-r border-zinc-800/60 bg-[#0A0A0B] flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/60 gap-3">
          <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
            <LinkIcon className="text-black w-4 h-4" />
          </div>
          <span className="font-semibold tracking-tight">Transformer</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Platform</p>
          <NavItem icon={<Activity />} label="Dashboard" active />
          <NavItem icon={<Plug />} label="Webhooks" />
          <NavItem icon={<Database />} label="Event Logs" />
          
          <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-6 mb-2">Settings</p>
          <NavItem icon={<Key />} label="API Keys" />
          <NavItem icon={<Bell />} label="Notifications" />
          <NavItem icon={<Settings />} label="Workspace" />
        </div>

        <div className="p-4 border-t border-zinc-800/60">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1A1A1C] transition-colors cursor-pointer" onClick={handleLogout}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-xs font-bold shrink-0">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium truncate">{user?.name}</span>
                <span className="text-xs text-zinc-500 truncate">{user?.email}</span>
              </div>
            </div>
            <LogOut className="w-4 h-4 text-zinc-500 shrink-0" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0A0A0B]">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-zinc-800/60 bg-[#0A0A0B] shrink-0">
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-400">
            <span className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">ramsh / workspace</span>
            <span>/</span>
            <span className="text-white">Dashboard</span>
          </div>
          <button className="md:hidden p-2 text-zinc-400" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Dash Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Welcome back, {user?.name.split(' ')[0]}</h2>
                <p className="text-zinc-400 text-sm">Here is a high-level overview of your webhook pipeline infrastructure.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-[#1A1A1C] hover:bg-[#252528] border border-zinc-800 text-sm font-medium rounded-lg transition-colors text-white">
                  Documentation
                </button>
                <button className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                  <Plug className="w-4 h-4" /> Connect Endpoint
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="Events Received" value="1,248" change="+12%" period="from last week" />
              <StatCard title="Transformation Success" value="99.9%" change="+0.1%" period="from last week" isGood />
              <StatCard title="Active Endpoints" value="4" />
            </div>

            {/* Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Activity Log */}
              <div className="lg:col-span-2 border border-zinc-800/60 rounded-xl bg-[#0A0A0B] overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-800/60">
                  <h3 className="font-semibold text-sm">Recent Events</h3>
                  <button className="text-xs text-zinc-400 hover:text-white transition-colors">View all</button>
                </div>
                <div className="divide-y divide-zinc-800/60">
                  <EventRow source="GitHub Push" time="2 mins ago" status="Delivered" />
                  <EventRow source="Razorpay Payment" time="15 mins ago" status="Delivered" />
                  <EventRow source="GitHub PR Opened" time="1 hr ago" status="Delivered" />
                  <EventRow source="Stripe Charge Failed" time="3 hrs ago" status="Failed" isError />
                </div>
              </div>

              {/* Profile/Config Widget */}
              <div className="border border-zinc-800/60 rounded-xl bg-[#0A0A0B] p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-lg font-bold shrink-0 shadow-lg shadow-violet-500/20">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-zinc-500">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="bg-[#121214] border border-zinc-800/60 rounded-lg p-4">
                    <p className="text-xs text-zinc-500 uppercase font-semibold tracking-wider mb-1">Account ID</p>
                    <p className="font-mono text-xs text-zinc-300 break-all">{user?._id || user?.id}</p>
                  </div>
                  
                  <div className="bg-[#121214] border border-zinc-800/60 rounded-lg p-4">
                    <p className="text-xs text-zinc-500 uppercase font-semibold tracking-wider mb-2">Network Status</p>
                    <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                      All Systems Operational
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

    </div>
  );
}

// Subcomponents for the Dashboard to keep code clean

function NavItem({ icon, label, active }) {
  const Icon = React.cloneElement(icon, { className: 'w-4 h-4' });
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium ${active ? 'bg-[#1A1A1C] text-white' : 'text-zinc-400 hover:text-white hover:bg-[#121214]'}`}>
      {Icon}
      <span>{label}</span>
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>}
    </div>
  );
}

function StatCard({ title, value, change, period, isGood }) {
  return (
    <div className="border border-zinc-800/60 rounded-xl bg-[#0A0A0B] p-5 flex flex-col justify-between">
      <p className="text-zinc-400 text-sm font-medium mb-4">{title}</p>
      <div className="flex items-end justify-between items-baseline gap-2">
        <h4 className="text-3xl font-semibold tracking-tight text-white">{value}</h4>
        {change && (
          <div className="flex items-center gap-1 text-xs font-medium">
            <span className={isGood ? 'text-emerald-400' : 'text-zinc-400 text-emerald-400'}>{change}</span>
            <span className="text-zinc-600 font-normal">{period}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function EventRow({ source, time, status, isError }) {
  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-[#121214] transition-colors cursor-pointer group">
      <div className="flex items-center gap-4 border-l-2 border-transparent group-hover:border-zinc-500 pl-2 -ml-[2px] transition-all">
        <div className={`p-2 rounded-md ${isError ? 'bg-red-500/10 text-red-400' : 'bg-zinc-800 text-zinc-300'}`}>
          {isError ? <Activity className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
        </div>
        <div>
          <p className="font-medium text-sm text-zinc-200">{source}</p>
          <p className="text-xs text-zinc-500">{time}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${isError ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
          {status}
        </span>
        <MoreHorizontal className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
    </div>
  );
}
