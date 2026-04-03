import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, glass = true, hover = true }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
      }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.01,
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } 
      } : {}}
      whileTap={hover ? { scale: 0.99 } : {}}
      className={cn(
        "rounded-[2.5rem] p-10 transition-all duration-500",
        glass ? "glass" : "bg-white dark:bg-slate-800",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl", className)} />
  );
};

export const StaggerContainer: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className, delay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        show: {
          transition: {
            staggerChildren: delay,
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedNumber: React.FC<{ value: number, prefix?: string }> = ({ value, prefix = "" }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (isNaN(value)) {
      setDisplayValue(0);
      return;
    }
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}{new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(displayValue)}
    </span>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className,
  ...props 
}) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30",
    secondary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
    ghost: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
    danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/30"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none tracking-tight flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode, variant?: 'income' | 'expense' | 'neutral' }> = ({ children, variant = 'neutral' }) => {
  const variants = {
    income: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    expense: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold", variants[variant])}>
      {children}
    </span>
  );
};
