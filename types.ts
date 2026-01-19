
export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}

export interface Category {
  id: string;
  label: string;
  color: string;
  icon?: string;
  budget?: number; // Orçamento mensal para esta categoria
}

export interface AppSettings {
  userName: string;
  currency: 'BRL' | 'USD' | 'EUR';
  language: 'pt-BR' | 'en-US';
}

export interface SummaryData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  budgetUsage: number; // Porcentagem do orçamento total usado
}
