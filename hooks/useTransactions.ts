
import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '../types';
import { INITIAL_TRANSACTIONS } from '../constants';

const STORAGE_KEY = 'fintrack_transactions_v1';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTransactions(JSON.parse(saved));
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, loading]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAllData = useCallback(() => {
    if (confirm('Tem certeza que deseja apagar TODOS os seus registros? Esta ação não pode ser desfeita.')) {
      setTransactions([]);
    }
  }, []);

  const getSummary = useCallback(() => {
    const income = transactions
      .filter(t => t.type === 'INCOME')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, curr) => acc + curr.amount, 0);

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    };
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    clearAllData,
    getSummary,
    loading
  };
};
