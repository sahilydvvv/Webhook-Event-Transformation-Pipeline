import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  RefreshCcw, 
  Code,
  Globe,
  CreditCard,
  Zap,
  ChevronRight,
  Plus,
  Send,
  Loader2
} from 'lucide-react';
import { getEvents, createEvent } from '../services/eventService';
import toast from 'react-hot-toast';

const SimulationModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    source: 'GITHUB',
    type: 'push',
    summary: 'New commit to main branch',
    raw: JSON.stringify({ ref: "refs/heads/main", commits: [] }, null, 2)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let parsedRaw = {};
      try {
        parsedRaw = JSON.parse(formData.raw);
      } catch (e) {
        toast.error("Invalid JSON in payload");
        setLoading(false);
        return;
      }

      await createEvent({ ...formData, raw: parsedRaw });
      toast.success("Event simulated successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to simulate event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-card border border-border w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border bg-muted/30 flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap size={20} className="text-primary" />
            Simulate Webhook Event
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Source</label>
              <select 
                className="w-full bg-white/5 border border-border rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary/20"
                value={formData.source}
                onChange={e => setFormData({...formData, source: e.target.value})}
              >
                <option value="GITHUB">GITHUB</option>
                <option value="RAZORPAY">RAZORPAY</option>
                <option value="STRIPE">STRIPE</option>
                <option value="CUSTOM">CUSTOM</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Event Type</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-border rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary/20"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Summary</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-border rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary/20"
              value={formData.summary}
              onChange={e => setFormData({...formData, summary: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">JSON Payload</label>
            <textarea 
              className="w-full bg-zinc-950 border border-border rounded-lg p-3 font-mono text-sm text-emerald-400 outline-none focus:ring-2 focus:ring-primary/20 h-40"
              value={formData.raw}
              onChange={e => setFormData({...formData, raw: e.target.value})}
            ></textarea>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Send Event</>}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const EventDetailModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
          <div>
            <h3 className="text-xl font-bold">Event Details</h3>
            <p className="text-sm text-muted-foreground">{event._id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground">&times;</button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-xl">
              <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Source</span>
              <p className="font-semibold">{event.source}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl">
              <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Type</span>
              <p className="font-semibold">{event.type}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl">
              <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Timestamp</span>
              <p className="font-semibold">{new Date(event.createdAt).toLocaleString()}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl">
              <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Status</span>
              <p className={`font-semibold ${event.processed ? 'text-emerald-500' : 'text-amber-500'}`}>
                {event.processed ? 'PROCESSED' : 'PENDING'}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold flex items-center gap-2 mb-3">
              <Code size={18} className="text-primary" />
              Raw Payload
            </h4>
            <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 font-mono text-sm overflow-x-auto text-emerald-400">
              <pre>{JSON.stringify(event.raw || {}, null, 2)}</pre>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSimulate, setShowSimulate] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(e => 
    e.source?.toLowerCase().includes(search.toLowerCase()) || 
    e.type?.toLowerCase().includes(search.toLowerCase()) ||
    e.summary?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-bold">Live Events</h2>
           <p className="text-sm text-muted-foreground">Monitor and simulate webhook activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSimulate(true)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            <span>Simulate Event</span>
          </button>
          
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-card border border-border pl-10 pr-4 py-2 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-48 transition-all"
            />
          </div>
          <button 
            onClick={fetchData}
            className="p-2 border border-border rounded-xl hover:bg-white/5 transition-all text-muted-foreground hover:text-foreground"
          >
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-widest font-bold">
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Event Type</th>
                <th className="px-6 py-4">Summary</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center text-muted-foreground">Fetching event logs...</td></tr>
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr 
                    key={event._id} 
                    onClick={() => setSelectedEvent(event)}
                    className="group hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded bg-white/5">
                          {event.source?.toLowerCase().includes('github') ? <Globe size={14} /> : 
                           event.source?.toLowerCase().includes('razorpay') ? <CreditCard size={14} /> : <Zap size={14} />}
                        </div>
                        <span className="font-medium">{event.source}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md font-mono">{event.type}</code>
                    </td>
                    <td className="px-6 py-4 text-sm max-w-xs truncate">{event.summary || '-'}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(event.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${event.processed ? 'text-emerald-500' : 'text-amber-500'}`}>
                         <span className={`w-1.5 h-1.5 rounded-full ${event.processed ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`}></span>
                         {event.processed ? 'Success' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <ChevronRight size={18} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="px-6 py-12 text-center text-muted-foreground">No matching events found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        {showSimulate && <SimulationModal onClose={() => setShowSimulate(false)} onSuccess={fetchData} />}
      </AnimatePresence>
    </div>
  );
};

export default Events;
