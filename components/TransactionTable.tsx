
import React from 'react';
import { Trash2, ShoppingCart, Coffee, Home, Truck, Heart, Book, Briefcase, Tag } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'alimentação': return <Coffee size={18} />;
    case 'lazer': return <ShoppingCart size={18} />;
    case 'moradia': return <Home size={18} />;
    case 'transporte': return <Truck size={18} />;
    case 'saúde': return <Heart size={18} />;
    case 'educação': return <Book size={18} />;
    case 'salário': return <Briefcase size={18} />;
    default: return <Tag size={18} />;
  }
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center text-slate-400 border border-slate-100 border-dashed">
        <p className="text-lg">Nenhuma transação encontrada.</p>
        <p className="text-sm">Comece adicionando uma nova entrada!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-800">{t.description}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-semibold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-white">
                      {getCategoryIcon(t.category)}
                    </span>
                    <span className="text-sm">{t.category}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {formatDate(t.date)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDelete(t.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
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
  );
};

export default TransactionTable;
