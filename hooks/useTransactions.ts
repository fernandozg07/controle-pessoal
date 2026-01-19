
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Transaction, Category, AppSettings } from '../types';

const STORAGE_KEY = 'fintrack_v2_data';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', label: 'Alimentação', color: '#3b82f6', budget: 1000 },
    { id: '2', label: 'Lazer', color: '#10b981', budget: 500 },
    { id: '3', label: 'Moradia', color: '#6366f1', budget: 2000 },
    { id: '4', label: 'Transporte', color: '#f59e0b', budget: 400 },
    { id: '5', label: 'Salário', color: '#10b981' },
  ]);
  const [settings, setSettings] = useState<AppSettings>({
    userName: 'Fernando Zanini',
    currency: 'BRL',
    language: 'pt-BR'
  });
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTransactions(parsed.transactions || []);
      setCategories(parsed.categories || categories);
      setSettings(parsed.settings || settings);
    }
    setLoading(false);
  }, []);

  // Save data
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, categories, settings }));
    }
  }, [transactions, categories, settings, loading]);

  const addTransaction = useCallback((t: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [{ ...t, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const updateCategoryBudget = useCallback((id: string, budget: number) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, budget } : c));
  }, []);

  const addCategory = useCallback((label: string, color: string, budget?: number) => {
    setCategories(prev => [...prev, { id: crypto.randomUUID(), label, color, budget }]);
  }, []);

  const summary = useMemo(() => {
    const income = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0);
    
    // Calcular uso de orçamento por categoria
    const categoryUsage = categories.map(cat => {
      const spent = transactions
        .filter(t => t.type === 'EXPENSE' && t.category === cat.label)
        .reduce((acc, t) => acc + t.amount, 0);
      return { ...cat, spent };
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      categoryUsage
    };
  }, [transactions, categories]);

  return {
    transactions,
    categories,
    settings,
    summary,
    addTransaction,
    deleteTransaction,
    updateCategoryBudget,
    addCategory,
    setSettings,
    clearAll: () => setTransactions([])
  };
};
