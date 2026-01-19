
import React from 'react';
import { Target, AlertCircle, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface BudgetManagerProps {
  categories: any[];
  onUpdateBudget: (id: string, budget: number) => void;
}

const BudgetManager: React.FC<BudgetManagerProps> = ({ categories, onUpdateBudget }) => {
  const categoriesWithBudget = categories.filter(c => c.budget && c.budget > 0);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20">
            <Target size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none">Minhas Metas</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Limite de Gastos</p>
          </div>
        </div>
        <button className="text-indigo-600 p-2 hover:bg-indigo-50 rounded-xl transition-colors">
          <Sparkles size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {categoriesWithBudget.length > 0 ? (
          categoriesWithBudget.map(cat => {
            const percent = (cat.spent / cat.budget) * 100;
            const isOver = percent >= 100;
            const isWarning = percent >= 85 && !isOver;

            return (
              <div key={cat.id} className="group">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-700">{cat.label}</span>
                    {isOver && <AlertCircle size={14} className="text-rose-500 animate-bounce" />}
                  </div>
                  <span className={`text-xs font-black ${isOver ? 'text-rose-600' : 'text-slate-500'}`}>
                    {Math.round(percent)}%
                  </span>
                </div>
                
                <div className="h-4 bg-slate-50 rounded-full p-1 border border-slate-100 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${isOver ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]' : isWarning ? 'bg-amber-400' : 'bg-indigo-600'}`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
                
                <div className="flex justify-between mt-2">
                   <span className="text-[10px] font-black text-slate-400 uppercase">{formatCurrency(cat.spent)}</span>
                   <span className="text-[10px] font-black text-slate-300 uppercase">Limite: {formatCurrency(cat.budget)}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
            <p className="text-slate-400 text-xs font-bold px-6">Você ainda não definiu metas de gastos por categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetManager;
