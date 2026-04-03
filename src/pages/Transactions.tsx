import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit2, 
  Download,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { useFinance } from '../store/FinanceContext';
import { Card, Button, Badge, StaggerContainer } from '../components/UI';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction } from '../types';

export const Transactions: React.FC = () => {
  const { transactions, role, addTransaction, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Income' | 'Expense'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState<Omit<Transaction, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    category: 'General',
    type: 'Expense',
    description: ''
  });

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction(newTx);
    setIsModalOpen(false);
    setNewTx({
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      category: 'General',
      type: 'Expense',
      description: ''
    });
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "transactions.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-slate-500 mt-1">Manage and track your financial activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={exportData} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          {role === 'Admin' && (
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      <Card hover={false}>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by description or category..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {(['All', 'Income', 'Expense'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                  filterType === type 
                    ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-300" 
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 font-medium">Description</th>
                <th className="pb-4 font-medium">Category</th>
                <th className="pb-4 font-medium">Type</th>
                <th className="pb-4 font-medium text-right">Amount</th>
                {role === 'Admin' && <th className="pb-4 font-medium text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((t, idx) => (
                  <motion.tr 
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 100, damping: 15 }}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 text-sm text-slate-500">
                      {formatDate(t.date)}
                    </td>
                    <td className="py-4">
                      <p className="text-sm font-semibold">{t.description}</p>
                    </td>
                    <td className="py-4">
                      <Badge>{t.category}</Badge>
                    </td>
                    <td className="py-4">
                      <Badge variant={t.type === 'Income' ? 'income' : 'expense'}>
                        {t.type}
                      </Badge>
                    </td>
                    <td className={cn(
                      "py-4 text-sm font-bold text-right",
                      t.type === 'Income' ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                    {role === 'Admin' && (
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 rounded-lg transition-all">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteTransaction(t.id)}
                            className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredTransactions.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold">No transactions found</h3>
              <p className="text-slate-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing {filteredTransactions.length} results</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold">Add New Transaction</h3>
              </div>
              <form onSubmit={handleAdd} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <select 
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                      value={newTx.type}
                      onChange={e => setNewTx({...newTx, type: e.target.value as any})}
                    >
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount</label>
                    <input 
                      type="number" 
                      required
                      min="0"
                      step="0.01"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                      value={isNaN(newTx.amount) ? '' : newTx.amount}
                      onChange={e => {
                        const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        setNewTx({...newTx, amount: val});
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newTx.description}
                    onChange={e => setNewTx({...newTx, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                      value={newTx.category}
                      onChange={e => setNewTx({...newTx, category: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                      value={newTx.date}
                      onChange={e => setNewTx({...newTx, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Save Transaction
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
