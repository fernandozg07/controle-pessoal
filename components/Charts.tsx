
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Transaction } from '../types';
import { CATEGORIES } from '../constants';

interface ChartsProps {
  transactions: Transaction[];
}

const Charts: React.FC<ChartsProps> = ({ transactions }) => {
  const expenseData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'EXPENSE');
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(e => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({
        name,
        value,
        color: CATEGORIES.find(c => c.label === name)?.color || '#94a3b8'
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const comparisonData = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'INCOME')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, curr) => acc + curr.amount, 0);

    return [{ name: 'Fluxo', Receitas: income, Despesas: expense }];
  }, [transactions]);

  const hasExpenses = expenseData.length > 0;
  const hasTransactions = transactions.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8">
      {/* Expenses by Category */}
      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 h-[380px] md:h-[400px]">
        <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
          Gastos por Categoria
        </h3>
        {hasExpenses ? (
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={expenseData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                animationDuration={800}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[80%] flex flex-col items-center justify-center text-slate-400 gap-2">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
              <PieChart size={20} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium">Sem dados de despesas</p>
          </div>
        )}
      </div>

      {/* Income vs Expense Comparison */}
      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 h-[380px] md:h-[400px]">
        <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
          Receitas vs Despesas
        </h3>
        {hasTransactions ? (
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" hide />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
              />
              <Legend verticalAlign="bottom" height={36}/>
              <Bar dataKey="Receitas" fill="#10b981" radius={[6, 6, 0, 0]} animationDuration={1000} />
              <Bar dataKey="Despesas" fill="#ef4444" radius={[6, 6, 0, 0]} animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[80%] flex flex-col items-center justify-center text-slate-400 gap-2">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
              <BarChart size={20} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium">Aguardando movimentações</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
