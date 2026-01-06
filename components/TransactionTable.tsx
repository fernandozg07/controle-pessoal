
import React from 'react';
import { Trash2, ShoppingCart, Coffee, Home, Truck, Heart, Book, Briefcase, Tag, Calendar as CalendarIcon } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('alimentação')) return <Coffee size={18} />;
  if (cat.includes('lazer')) return <ShoppingCart size={18} />;
  if (cat.includes('moradia')) return <Home size={18} />;
  if (cat.includes('transporte')) return <Truck size={18} />;
  if (cat.includes('saúde')) return <Heart size={18} />;
  if (cat.includes('educação')) return <Book size={18} />;
  if (cat.includes('salário')) return <Briefcase size={18} />;
  return <Tag size={18} />;
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-slate-400 border border-slate-100 border-dashed text-center">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <Tag size={32} className="text-slate-300" />
        </div>
        <p className="text-lg font-medium text-slate-600">Nenhuma transação encontrada.</p>
        <p className="text-sm">Comece adicionando uma nova entrada!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile View: Cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {transactions.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm active:scale-[0.98] transition-transform">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                  {getCategoryIcon(t.category)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{t.description}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    <CalendarIcon size={10} />
                    {formatDate(t.date)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDelete(t.id)}
                className="p-2 text-slate-300 hover:text-rose-600 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 rounded text-slate-500">
                {t.category}
              </span>
              <span className={`text-base font-bold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Descrição</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Valor</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Categoria</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Data</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-700">{t.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5 text-slate-600">
                      <span className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                        {getCategoryIcon(t.category)}
                      </span>
                      <span className="text-sm font-medium">{t.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onDelete(t.id)}
                      className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      title="Excluir transação"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
