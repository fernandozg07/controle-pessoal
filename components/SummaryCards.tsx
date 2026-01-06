
import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface SummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ income, expense, balance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-500 text-sm font-medium">Entradas</span>
          <ArrowUpCircle className="text-emerald-500 w-5 h-5" />
        </div>
        <div className="text-2xl font-bold text-slate-800">{formatCurrency(income)}</div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-500 text-sm font-medium">Saídas</span>
          <ArrowDownCircle className="text-rose-500 w-5 h-5" />
        </div>
        <div className="text-2xl font-bold text-slate-800">{formatCurrency(expense)}</div>
      </div>

      <div className={`p-6 rounded-2xl shadow-sm border flex flex-col justify-between ${balance >= 0 ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-rose-600 text-white border-rose-500'}`}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-indigo-100 text-sm font-medium">Saldo Total</span>
          <Wallet className="text-indigo-100 w-5 h-5" />
        </div>
        <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
      </div>
    </div>
  );
};

export default SummaryCards;
