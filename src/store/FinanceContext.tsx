import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Role } from '../types';

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  isDarkMode: boolean;
  setRole: (role: Role) => void;
  toggleDarkMode: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2026-03-28', amount: 4500, category: 'Salary', type: 'Income', description: 'Monthly Salary - Tech Corp' },
  { id: '2', date: '2026-03-27', amount: 85.50, category: 'Food', type: 'Expense', description: 'Whole Foods Market' },
  { id: '3', date: '2026-03-26', amount: 1200, category: 'Rent', type: 'Expense', description: 'Monthly Apartment Rent' },
  { id: '4', date: '2026-03-25', amount: 45.20, category: 'Transport', type: 'Expense', description: 'Uber - To Office' },
  { id: '5', date: '2026-03-24', amount: 350, category: 'Freelance', type: 'Income', description: 'Logo Design - Client X' },
  { id: '6', date: '2026-03-23', amount: 12.99, category: 'Entertainment', type: 'Expense', description: 'Netflix Subscription' },
  { id: '7', date: '2026-03-22', amount: 150, category: 'Shopping', type: 'Expense', description: 'Nike Store - Running Shoes' },
  { id: '8', date: '2026-03-21', amount: 25.00, category: 'Food', type: 'Expense', description: 'Starbucks Coffee' },
  { id: '9', date: '2026-03-20', amount: 500, category: 'Bonus', type: 'Income', description: 'Quarterly Performance Bonus' },
  { id: '10', date: '2026-03-19', amount: 200, category: 'Utilities', type: 'Expense', description: 'Electricity Bill' },
  { id: '11', date: '2026-03-18', amount: 65.00, category: 'Food', type: 'Expense', description: 'Dinner at Italian Bistro' },
  { id: '12', date: '2026-03-17', amount: 30.00, category: 'Transport', type: 'Expense', description: 'Gas Station' },
];

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finvision_transactions');
    return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
  });

  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('finvision_role');
    return (saved as Role) || 'Admin';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('finvision_darkmode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('finvision_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finvision_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('finvision_darkmode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...t, id: Math.random().toString(36).substr(2, 9) };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, updated: Partial<Transaction>) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      isDarkMode,
      setRole,
      toggleDarkMode,
      addTransaction,
      deleteTransaction,
      updateTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within a FinanceProvider');
  return context;
};
