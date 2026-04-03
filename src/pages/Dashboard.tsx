import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { useFinance } from '../store/FinanceContext';
import { Card, Badge, Button, StaggerContainer, AnimatedNumber, Skeleton } from '../components/UI';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const { transactions } = useFinance();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const income = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expenses;

  const summaryCards = [
    { title: 'Total Balance', value: balance, icon: Wallet, color: 'from-indigo-600 to-purple-600', trend: '+12.5%' },
    { title: 'Total Income', value: income, icon: TrendingUp, color: 'from-emerald-500 to-teal-500', trend: '+8.2%' },
    { title: 'Total Expenses', value: expenses, icon: TrendingDown, color: 'from-rose-500 to-orange-500', trend: '-2.4%' },
  ];

  // Mock data for charts
  const trendData = [
    { month: 'Jan', income: 4000, expenses: 2400 },
    { month: 'Feb', income: 3000, expenses: 1398 },
    { month: 'Mar', income: 2000, expenses: 9800 },
    { month: 'Apr', income: 2780, expenses: 3908 },
    { month: 'May', income: 1890, expenses: 4800 },
    { month: 'Jun', income: 2390, expenses: 3800 },
  ];

  const categoryData = [
    { name: 'Food', value: 400, color: '#6366f1' },
    { name: 'Rent', value: 300, color: '#10b981' },
    { name: 'Transport', value: 300, color: '#f59e0b' },
    { name: 'Entertainment', value: 200, color: '#f43f5e' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-12 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <Skeleton className="md:col-span-8 h-[450px] rounded-[2.5rem]" />
          <div className="md:col-span-4 space-y-8">
            <Skeleton className="h-[210px] rounded-[2.5rem]" />
            <Skeleton className="h-[210px] rounded-[2.5rem]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <Skeleton className="md:col-span-8 h-[500px] rounded-[2.5rem]" />
          <Skeleton className="md:col-span-4 h-[500px] rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Welcome back, Satyam 👋</h1>
          <p className="text-slate-500 mt-2 font-medium">Here's your financial summary for today.</p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group">
          <span className="text-sm font-bold">Last 30 Days</span>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
        </button>
      </div>

      {/* Bento Grid Layout */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Balance Card */}
        <Card glass={false} className="md:col-span-8 relative overflow-hidden group border-none bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col h-full justify-between gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 opacity-80">
                <Wallet className="w-6 h-6" />
                <span className="text-sm font-black uppercase tracking-[0.2em]">Current Balance</span>
              </div>
              <h2 className="text-6xl font-black tracking-tighter">
                <AnimatedNumber value={balance} prefix="$" />
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 flex-1 min-w-[200px] border border-white/10">
                <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Monthly Income</p>
                <p className="text-2xl font-black tracking-tight">{formatCurrency(income)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 flex-1 min-w-[200px] border border-white/10">
                <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Monthly Expenses</p>
                <p className="text-2xl font-black tracking-tight">{formatCurrency(expenses)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions / Stats */}
        <div className="md:col-span-4 grid grid-cols-1 gap-8">
          <Card glass={false} className="bg-emerald-500 text-white border-none p-10 flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <div className="p-4 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform">
                <TrendingUp className="w-8 h-8" />
              </div>
              <Badge className="bg-white/20 text-white border-none">+12.5%</Badge>
            </div>
            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Growth</p>
              <h3 className="text-3xl font-black tracking-tight">Financial Health</h3>
            </div>
          </Card>
          <Card glass={false} className="bg-rose-500 text-white border-none p-10 flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <div className="p-4 bg-white/20 rounded-2xl group-hover:-rotate-12 transition-transform">
                <TrendingDown className="w-8 h-8" />
              </div>
              <Badge className="bg-white/20 text-white border-none">-2.4%</Badge>
            </div>
            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Alert</p>
              <h3 className="text-3xl font-black tracking-tight">High Spending</h3>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <Card className="md:col-span-8" hover={false}>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black tracking-tight">Cash Flow</h3>
              <p className="text-slate-500 text-sm font-medium mt-1">Detailed view of your income vs expenses</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/30" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Income</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-rose-500 shadow-lg shadow-rose-500/30" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" opacity={1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--chart-text)', fontWeight: 800 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--chart-text)', fontWeight: 800 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', 
                    padding: '20px',
                    backgroundColor: 'var(--tooltip-bg, #ffffff)',
                    color: 'var(--tooltip-text, #0f172a)'
                  }}
                  labelStyle={{ fontWeight: 800, marginBottom: '8px', color: 'var(--tooltip-text, #0f172a)' }}
                  itemStyle={{ fontWeight: 600 }}
                  cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="md:col-span-4" hover={false}>
          <h3 className="text-2xl font-black tracking-tight mb-12">Categories</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-8">
            {categoryData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}50` }} />
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-sm font-black">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </StaggerContainer>

      {/* Recent Transactions Preview */}
      <Card hover={false}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Recent Transactions</h3>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <th className="pb-4 font-medium">Transaction</th>
                <th className="pb-4 font-medium">Category</th>
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.slice(0, 5).map((t) => (
                <tr key={t.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        t.type === 'Income' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                      )}>
                        {t.type === 'Income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.description}</p>
                        <p className="text-xs text-slate-500">{t.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge>{t.category}</Badge>
                  </td>
                  <td className="py-4 text-sm text-slate-500">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className={cn(
                    "py-4 text-sm font-bold text-right",
                    t.type === 'Income' ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
