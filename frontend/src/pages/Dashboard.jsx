import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  ShieldCheck, 
  Clock,
  Globe,
  CreditCard,
  BarChart3
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { getEvents } from '../services/eventService';
import { getRules } from '../services/ruleService';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/5 blur-3xl -mr-8 -mt-8 rounded-full group-hover:bg-${color}-500/10 transition-all duration-500`}></div>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-500 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      {trendValue && (
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
    <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-1 tracking-tight">{value}</p>
  </motion.div>
);

const EventRow = ({ event }) => {
  const isGithub = event.source?.toLowerCase().includes('github');
  const isRazorpay = event.source?.toLowerCase().includes('razorpay');

  return (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-border/50 last:border-0 group">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg transition-all ${isGithub ? 'bg-zinc-800' : isRazorpay ? 'bg-blue-900/40 text-blue-400' : 'bg-primary/20 text-primary'} group-hover:scale-110`}>
          {isGithub ? <Globe size={18} /> : isRazorpay ? <CreditCard size={18} /> : <Zap size={18} />}
        </div>
        <div>
          <p className="font-medium text-sm">{event.summary || event.type || 'Webhook Event'}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded text-muted-foreground">{event.source}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={12} />
              {new Date(event.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${event.processed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
          {event.processed ? 'PROCESSED' : 'PENDING'}
        </span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, ruleData] = await Promise.all([
          getEvents(),
          getRules()
        ]);
        
        const allEvents = Array.isArray(eventData) ? eventData : [];
        setEvents(allEvents);
        setRules(Array.isArray(ruleData) ? ruleData : []);

        // Prepare chart data from real events
        const groups = {};
        allEvents.forEach(e => {
          const hour = new Date(e.createdAt).getHours() + ':00';
          groups[hour] = (groups[hour] || 0) + 1;
        });

        const sortedChart = Object.keys(groups)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map(hour => ({ name: hour, events: groups[hour] }));
        
        // Ensure at least some points if data is sparse
        setChartData(sortedChart.length > 0 ? sortedChart : [{name: '00:00', events: 0}]);

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalEvents = events.length;
  const successRate = totalEvents > 0 
    ? ((events.filter(e => e.processed).length / totalEvents) * 100).toFixed(1) + '%' 
    : '0%';

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground mt-1">Real-time pulse of your data pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              LIVE
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Volume" value={totalEvents} icon={Activity} color="indigo" />
        <StatCard title="Delivery Rate" value={successRate} icon={ShieldCheck} color="emerald" />
        <StatCard title="Active Rules" value={rules.length} icon={Zap} color="purple" />
        <StatCard title="Processed" value={events.filter(e => e.processed).length} icon={Clock} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Chart */}
          <div className="glass-card p-6 rounded-2xl h-[350px]">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2 text-lg">
                  <BarChart3 size={20} className="text-primary" />
                  Traffic volume
                </h3>
                <span className="text-xs text-muted-foreground">Recent Activity</span>
             </div>
             <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0f0f14', borderRadius: '12px', border: '1px solid #ffffff10'}}
                    itemStyle={{color: '#7c3aed', fontWeight: 'bold'}}
                  />
                  <Area type="monotone" dataKey="events" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorEvents)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                Live Stream
              </h3>
              <button className="text-xs text-primary hover:underline font-medium">Auto-sync ON</button>
            </div>
            <div className="divide-y divide-border/50">
              {loading ? (
                <div className="p-12 text-center text-muted-foreground">Syncing stream...</div>
              ) : events.length > 0 ? (
                events.slice(0, 5).map((event, i) => <EventRow key={event._id || i} event={event} />)
              ) : (
                <div className="p-12 text-center text-muted-foreground">Waiting for incoming data...</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              Inbound Health
            </h3>
            <div className="space-y-6">
              {[
                { name: 'Github Webhooks', status: 'Healthy' },
                { name: 'Razorpay Webhooks', status: 'Healthy' },
                { name: 'Manual Simulation', status: 'Active' },
                { name: 'Database Sink', status: 'Stable' }
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{service.name}</span>
                  <span className="text-emerald-500 font-bold text-[10px] uppercase">{service.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
