
import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface FiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  typeFilter: string;
  onTypeChange: (val: string) => void;
  monthFilter: string;
  onMonthChange: (val: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  search, 
  onSearchChange, 
  categoryFilter, 
  onCategoryChange,
  typeFilter,
  onTypeChange,
  monthFilter,
  onMonthChange
}) => {
  const months = [
    { value: 'all', label: 'Todo o período' },
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Busca por texto */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por descrição..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm shadow-sm"
          />
        </div>

        {/* Filtro de Mês */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <select
            value={monthFilter}
            onChange={(e) => onMonthChange(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm appearance-none min-w-[150px] shadow-sm cursor-pointer"
          >
            {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Filtro de Tipo */}
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium hover:border-indigo-300 transition-colors cursor-pointer shadow-sm"
        >
          <option value="all">Todos os tipos</option>
          <option value="INCOME">Apenas Entradas</option>
          <option value="EXPENSE">Apenas Saídas</option>
        </select>

        {/* Filtro de Categoria */}
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium hover:border-indigo-300 transition-colors cursor-pointer shadow-sm"
        >
          <option value="all">Todas Categorias</option>
          {CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.label}>{cat.label}</option>
          ))}
        </select>

        <button 
          onClick={() => {
            onSearchChange('');
            onCategoryChange('all');
            onTypeChange('all');
            onMonthChange('all');
          }}
          className="px-4 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
};

export default Filters;
