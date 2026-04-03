export type Role = 'Admin' | 'Viewer';

export type TransactionType = 'Income' | 'Expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface SummaryData {
  totalBalance: number;
  income: number;
  expenses: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  balance: number;
  income: number;
  expenses: number;
}
