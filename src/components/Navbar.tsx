import React from 'react';
import { Search, Bell, Sun, Moon, Menu, User, ShieldCheck, Eye } from 'lucide-react';
import { useFinance } from '../store/FinanceContext';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { isDarkMode, toggleDarkMode, role, setRole } = useFinance();

  return (
    <header className="sticky top-4 z-30 w-[calc(100%-2rem)] mx-auto glass rounded-[2.5rem] px-8 lg:px-12 py-6 border-none">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMenuClick}
            className="p-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors shadow-sm"
          >
            <Menu className="w-7 h-7" />
          </motion.button>
          
          <div className="hidden md:flex items-center bg-slate-100/50 dark:bg-slate-800/50 rounded-[1.5rem] px-6 py-3.5 w-80 lg:w-[450px] border border-transparent focus-within:border-indigo-500/30 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all shadow-inner group">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search transactions, insights..." 
              className="bg-transparent border-none focus:ring-0 text-sm ml-4 w-full outline-none font-semibold placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Role Switcher */}
          <div className="flex items-center bg-slate-100/50 dark:bg-slate-800/50 rounded-[1.5rem] p-1.5 shadow-inner">
            <button 
              onClick={() => setRole('Viewer')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                role === 'Viewer' 
                  ? 'bg-white dark:bg-slate-700 shadow-xl text-indigo-600 dark:text-indigo-300 scale-105' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Viewer</span>
            </button>
            <button 
              onClick={() => setRole('Admin')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                role === 'Admin' 
                  ? 'bg-white dark:bg-slate-700 shadow-xl text-indigo-600 dark:text-indigo-300 scale-105' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <motion.button 
              whileHover={{ scale: 1.15, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-600 dark:text-slate-400 shadow-sm"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0, scale: 0 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Sun className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0, scale: 0 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Moon className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-600 dark:text-slate-400 shadow-sm"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-3.5 right-3.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 shadow-xl"></span>
            </motion.button>
          </div>

          <div className="flex items-center gap-5 pl-6 border-l-2 border-slate-200/50 dark:border-slate-800/50">
            <div className="hidden lg:block text-right">
              <p className="text-sm font-black tracking-tight">Satyam Kumar</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">{role}</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -8 }}
              className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-2xl shadow-indigo-500/40 border-2 border-white/50 dark:border-slate-800/50"
            >
              <User className="w-8 h-8" />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};
