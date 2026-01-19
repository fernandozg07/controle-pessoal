
import React from 'react';
import { Trash2, ShoppingCart, Coffee, Home, Truck, Heart, Book, Briefcase, Tag, Calendar as CalendarIcon, MoreVertical } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  const baseClasses = "p-2 rounded-2xl shadow-sm group-hover:scale-110 transition-transform";
  
  if (cat.includes('alimentação')) return <div className={`${baseClasses} bg-orange-100 text-orange-600`}><Coffee size={20} /></div>;
  if (cat.includes('lazer')) return <div className={`${baseClasses} bg-sky-100 text-sky-600`}><ShoppingCart size={20} /></div>;
  if (cat.includes('moradia')) return <div className={`${baseClasses} bg-indigo-100 text-indigo-600`}><Home size={20} /></div>;
  if (cat.includes('transporte')) return <div className={`${baseClasses} bg-slate-100 text-slate-600`}><Truck size={20} /></div>;
  if (cat.includes('saúde')) return <div className={`${baseClasses} bg-rose-100 text-rose-600`}><Heart size={20} /></div>;
  if (cat.includes('educação')) return <div className={`${baseClasses} bg-purple-100 text-purple-600`}><Book size={20} /></div>;
  if (cat.includes('salário')) return <div className={`${baseClasses} bg-emerald-100 text-emerald-600`}><Briefcase size={20} /></div>;
  return <div className={`${baseClasses} bg-slate-100 text-slate-600`}><Tag size={20} /></div>;
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center justify-center text-slate-400 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-6">
          <Tag size={40} className="text-slate-200" />
        </div>
        <p className="text-xl font-black text-slate-800 tracking-tight">Vazio por aqui...</p>
        <p className="text-sm font-medium mt-1">Suas movimentações aparecerão nesta lista.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile & Desktop Unified Card Style */}
      <div className="space-y-3">
        {transactions.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-center gap-5">
              {getCategoryIcon(t.category)}
              <div>
                <h4 className="text-base font-black text-slate-800 leading-tight mb-1">{t.description}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.category}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{formatDate(t.date)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className={`text-lg font-black text-right min-w-[120px] ${t.type === 'INCOME' ? 'text-emerald-500' : 'text-slate-900'}`}>
                {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
              </span>
              <button
                onClick={() => onDelete(t.id)}
                className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
