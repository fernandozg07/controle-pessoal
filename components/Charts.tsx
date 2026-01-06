
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

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
      color: CATEGORIES.find(c => c.label === name)?.color || '#94a3b8'
    }));
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Expenses by Category */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[350px]">
        <h3 className="text-slate-800 font-bold mb-4">Gastos por Categoria</h3>
        {expenseData.length > 0 ? (
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={expenseData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">Sem dados de despesas</div>
        )}
      </div>

      {/* Income vs Expense Comparison */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[350px]">
        <h3 className="text-slate-800 font-bold mb-4">Receitas vs Despesas</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={comparisonData}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip cursor={{fill: '#f8fafc'}} />
            <Legend />
            <Bar dataKey="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
