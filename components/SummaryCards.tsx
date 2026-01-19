
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface SummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
  categoryUsage: any[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ income, expense, balance, categoryUsage }) => {
  const totalBudget = categoryUsage.reduce((acc, c) => acc + (c.budget || 0), 0);
  const totalSpentOnBudget = categoryUsage.reduce((acc, c) => acc + (c.budget ? c.spent : 0), 0);
  const budgetPercent = totalBudget > 0 ? (totalSpentOnBudget / totalBudget) * 100 : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Saldo Principal - Dark Theme Card */}
      <div className="bg-[#0F172A] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
          <Wallet size={80} className="text-white" />
        </div>
        <div className="relative z-10">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Saldo Total</p>
          <h3 className={`text-3xl font-black text-white mb-4 ${balance < 0 ? 'text-rose-400' : ''}`}>
            {formatCurrency(balance)}
          </h3>
          <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full text-[10px] font-bold text-indigo-300 uppercase">
            <ShieldCheck size={12} /> Protegido
          </div>
        </div>
      </div>

      {/* Receitas */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:shadow-xl transition-all duration-500">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
            <ArrowUpRight size={24} />
          </div>
          <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">MENSAL</span>
        </div>
        <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Entradas</p>
        <h3 className="text-3xl font-black text-slate-900">{formatCurrency(income)}</h3>
      </div>

      {/* Despesas */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:shadow-xl transition-all duration-500">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl group-hover:scale-110 transition-transform">
            <ArrowDownLeft size={24} />
          </div>
          <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">MENSAL</span>
        </div>
        <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Saídas</p>
        <h3 className="text-3xl font-black text-slate-900">{formatCurrency(expense)}</h3>
      </div>

      {/* Orçamento/Meta */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:shadow-xl transition-all duration-500 overflow-hidden relative">
        <div className="flex justify-between items-center mb-4">
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Orçamento Gasto</p>
          <span className={`text-xs font-black px-3 py-1 rounded-full ${budgetPercent > 90 ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
            {Math.round(budgetPercent)}%
          </span>
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-4">{formatCurrency(totalSpentOnBudget)}</h3>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${budgetPercent > 90 ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
            style={{ width: `${Math.min(budgetPercent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
