import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart as PieIcon,
  Calendar
} from 'lucide-react';
import { useFinance } from '../store/FinanceContext';
import { Card, Badge, Button, StaggerContainer } from '../components/UI';
import { formatCurrency } from '../lib/utils';

export const Insights: React.FC = () => {
  const { transactions } = useFinance();

  const expenses = transactions.filter(t => t.type === 'Expense');
  const categories = [...new Set(expenses.map(t => t.category))];
  
  const categoryTotals = categories.map(cat => ({
    name: cat,
    total: expenses.filter(t => t.category === cat).reduce((acc, t) => acc + t.amount, 0)
  })).sort((a, b) => b.total - a.total);

  const highestSpending = categoryTotals[0] || { name: 'N/A', total: 0 };

  const insights = [
    {
      title: 'Highest Spending',
      value: highestSpending.name,
      subtitle: `${formatCurrency(highestSpending.total)} this month`,
      icon: AlertCircle,
      color: 'text-rose-500',
      bg: 'bg-rose-100 dark:bg-rose-900/20'
    },
    {
      title: 'Savings Potential',
      value: '$450.00',
      subtitle: 'Based on recurring expenses',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-100 dark:bg-amber-900/20'
    },
    {
      title: 'Monthly Growth',
      value: '+14.2%',
      subtitle: 'Compared to last month',
      icon: TrendingUp,
      color: 'text-emerald-500',
      bg: 'bg-emerald-100 dark:bg-emerald-900/20'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Insights</h1>
        <p className="text-slate-500 mt-1">AI-powered analysis of your spending habits.</p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {insights.map((insight, idx) => (
          <Card key={idx} className="flex items-center gap-6 p-8">
            <div className={`p-5 rounded-3xl ${insight.bg} transform transition-transform group-hover:rotate-6`}>
              <insight.icon className={`w-10 h-10 ${insight.color}`} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-semibold tracking-wide uppercase">{insight.title}</p>
              <h3 className="text-2xl font-extrabold tracking-tight">{insight.value}</h3>
              <p className="text-xs font-medium text-slate-400">{insight.subtitle}</p>
            </div>
          </Card>
        ))}
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hover={false}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Category Breakdown</h3>
            <PieIcon className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {categoryTotals.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{cat.name}</span>
                  <span className="font-bold">{formatCurrency(cat.total)}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-50 rounded-full" 
                    style={{ 
                      width: `${categoryTotals[0]?.total > 0 ? (cat.total / categoryTotals[0].total) * 100 : 0}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card hover={false} className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Financial Health Score</h3>
            <Badge className="bg-white/20 text-white border-none">Excellent</Badge>
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-white/10"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * 85) / 100}
                  strokeLinecap="round"
                  className="text-white"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold">85</span>
                <span className="text-xs opacity-70 uppercase tracking-widest">Score</span>
              </div>
            </div>
            <p className="text-center mt-6 text-sm opacity-90 max-w-xs">
              Your financial health is in the top 10% of users. You've saved 20% more than last month!
            </p>
            <Button variant="secondary" className="mt-8 bg-white text-indigo-600 hover:bg-indigo-50 shadow-none">
              View Detailed Report
            </Button>
          </div>
        </Card>
      </div>

      <Card hover={false}>
        <h3 className="text-lg font-bold mb-6">Upcoming Recurring Payments</h3>
        <div className="space-y-4">
          {[
            { name: 'Netflix Subscription', date: 'April 12, 2024', amount: 15.99, icon: Calendar },
            { name: 'Adobe Creative Cloud', date: 'April 15, 2024', amount: 52.99, icon: Calendar },
            { name: 'Gym Membership', date: 'April 20, 2024', amount: 45.00, icon: Calendar },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm">
                  <item.icon className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-xs text-slate-500">Next payment: {item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatCurrency(item.amount)}</p>
                <div className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>Scheduled</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
