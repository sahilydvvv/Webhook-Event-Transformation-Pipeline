import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Zap, 
  Settings, 
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { getRules, createRule, deleteRule } from '../services/ruleService';
import toast from 'react-hot-toast';

const RuleModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    source: 'GITHUB',
    eventType: 'push',
    transformations: [{ from: '', to: '' }]
  });

  const addTransformation = () => {
    setFormData({
      ...formData,
      transformations: [...formData.transformations, { from: '', to: '' }]
    });
  };

  const updateTransformation = (index, field, value) => {
    const newTransforms = [...formData.transformations];
    newTransforms[index][field] = value;
    setFormData({ ...formData, transformations: newTransforms });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createRule(formData);
      toast.success("Transformation rule created!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to create rule");
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
            <Settings size={20} className="text-primary" />
            New Transformation Rule
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Rule Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g., GitHub to Slack"
              className="w-full bg-white/5 border border-border rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary/20"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

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
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Event Type</label>
              <input 
                required
                type="text" 
                placeholder="push"
                className="w-full bg-white/5 border border-border rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary/20"
                value={formData.eventType}
                onChange={e => setFormData({...formData, eventType: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-3">
             <label className="text-xs font-bold text-muted-foreground uppercase block">Field Mappings</label>
             {formData.transformations.map((t, i) => (
               <div key={i} className="flex items-center gap-3">
                  <input 
                    placeholder="Original field"
                    className="flex-1 bg-white/5 border border-border rounded-lg p-2 text-xs outline-none"
                    value={t.from}
                    onChange={e => updateTransformation(i, 'from', e.target.value)}
                  />
                  <ArrowRight size={14} className="text-muted-foreground" />
                  <input 
                    placeholder="Target field"
                    className="flex-1 bg-white/5 border border-border rounded-lg p-2 text-xs outline-none"
                    value={t.to}
                    onChange={e => updateTransformation(i, 'to', e.target.value)}
                  />
               </div>
             ))}
             <button 
               type="button"
               onClick={addTransformation}
               className="text-xs text-primary font-bold flex items-center gap-1 mt-2 hover:underline"
             >
               <Plus size={14} /> Add mapping
             </button>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Save Rule"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Rules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRules();
      setRules(data || []);
    } catch (error) {
      toast.error("Failed to load rules");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteRule(id);
      toast.success("Rule deleted");
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Transformation Rules</h2>
          <p className="text-muted-foreground">Define how incoming data is mapped to your destination schema.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          Create Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground col-span-full">Loading rules...</div>
        ) : rules.length > 0 ? (
          rules.map((rule) => (
            <motion.div 
              layout
              key={rule._id}
              className="glass-card p-6 rounded-2xl relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Zap size={24} />
                </div>
                <button 
                  onClick={() => handleDelete(rule._id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <h3 className="text-xl font-bold mb-1">{rule.name}</h3>
              <div className="flex gap-2 items-center mb-4">
                 <span className="text-[10px] font-bold uppercase bg-white/5 px-2 py-0.5 rounded text-muted-foreground">{rule.source}</span>
                 <span className="text-[10px] font-bold uppercase bg-primary/5 px-2 py-0.5 rounded text-primary">{rule.eventType}</span>
              </div>
              
              <div className="space-y-2 border-t border-border/50 pt-4">
                 <p className="text-xs font-bold text-muted-foreground uppercase opacity-50">Mappings ({rule.transformations.length})</p>
                 {rule.transformations.slice(0, 3).map((t, i) => (
                   <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <code className="text-[10px] bg-white/5 px-1 rounded">{t.from}</code>
                      <ArrowRight size={10} className="text-muted-foreground" />
                      <code className="text-[10px] bg-primary/5 text-primary px-1 rounded">{t.to}</code>
                   </div>
                 ))}
                 {rule.transformations.length > 3 && (
                   <p className="text-[10px] text-muted-foreground font-medium">+{rule.transformations.length - 3} more...</p>
                 )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 py-20 text-center glass-card rounded-3xl border-dashed">
             <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                <AlertCircle size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2">No rules yet</h3>
             <p className="text-muted-foreground max-w-sm mx-auto mb-6">Create your first transformation rule to start processing webhooks intelligently.</p>
             <button 
                onClick={() => setShowModal(true)}
                className="text-primary font-bold hover:underline"
              >
                Create your first rule
              </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && <RuleModal onClose={() => setShowModal(false)} onSuccess={fetchData} />}
      </AnimatePresence>
    </div>
  );
};

export default Rules;
