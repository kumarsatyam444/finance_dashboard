import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  TrendingUp, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -320,
          transition: { type: "spring", stiffness: 250, damping: 30 }
        }}
        className={cn(
          "fixed top-4 left-4 bottom-4 w-72 glass rounded-[2.5rem] z-50 transition-all lg:translate-x-0 border-none",
          !isOpen && "lg:w-72"
        )}
      >
        <div className="p-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.15 }}
              className="w-14 h-14 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-indigo-500/50"
            >
              <TrendingUp className="text-white w-8 h-8" />
            </motion.div>
            <span className="text-2xl font-black tracking-tighter text-gradient">
              FinVision
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 px-6 space-y-3">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) onClose();
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4.5 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                activeTab === item.id 
                  ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-500/50" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600"
              )}
            >
              <item.icon className={cn("w-6 h-6 transition-transform duration-500", activeTab === item.id ? "text-white scale-110" : "group-hover:text-indigo-600 group-hover:scale-110")} />
              <span className="font-extrabold tracking-tight text-sm uppercase tracking-widest">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute left-0 w-1.5 h-10 bg-white rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-10 left-0 w-full px-6">
          <motion.button 
            whileHover={{ x: 6, backgroundColor: "rgba(244, 63, 94, 0.1)" }}
            className="w-full flex items-center gap-4 px-6 py-4.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 rounded-2xl transition-all duration-500 font-black tracking-tight uppercase text-xs tracking-widest"
          >
            <LogOut className="w-6 h-6" />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};
