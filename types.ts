
export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}

export interface SummaryData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export type Category = {
  id: string;
  label: string;
  color: string;
};
