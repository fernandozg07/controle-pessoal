
import React, { useState, useMemo } from 'react';
import { Plus, LayoutDashboard, History, Settings, TrendingUp, Menu, X, Trash2 } from 'lucide-react';
import SummaryCards from './components/SummaryCards';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import Charts from './components/Charts';
import Filters from './components/Filters';
import { useTransactions } from './hooks/useTransactions';

const App: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction, clearAllData, getSummary } = useTransactions();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // States para Filtros
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');

  const { totalIncome, totalExpense, balance } = getSummary();

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
      const matchesType = typeFilter === 'all' || t.type === typeFilter;
      
      let matchesMonth = true;
      if (monthFilter !== 'all') {
        const transactionMonth = new Date(t.date).getMonth() + 1;
        matchesMonth = transactionMonth === parseInt(monthFilter);
      }

      return matchesSearch && matchesCategory && matchesType && matchesMonth;
    });
  }, [transactions, search, categoryFilter, typeFilter, monthFilter]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-indigo-900 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-lg">
            <TrendingUp className="text-indigo-900 w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">FinTrack</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Desktop / Overlay Mobile */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-indigo-900 text-white transition-transform duration-300 transform 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:flex md:flex-col
      `}>
        <div className="p-6 hidden md:flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl">
            <TrendingUp className="text-indigo-900 w-6 h-6" />
          </div>
          <span className="font-bold text-2xl tracking-tight">FinTrack</span>
        </div>

        <nav className="flex-1 px-4 py-6 md:py-0 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-800 text-white shadow-inner font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-indigo-200 hover:bg-indigo-800/50 hover:text-white transition-all font-medium">
            <History size={20} /> Transações
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-indigo-200 hover:bg-indigo-800/50 hover:text-white transition-all font-medium">
            <TrendingUp size={20} /> Metas
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-indigo-200 hover:bg-indigo-800/50 hover:text-white transition-all font-medium">
            <Settings size={20} /> Ajustes
          </button>
        </nav>

        <div className="p-4 border-t border-indigo-800 space-y-4">
          <button 
            onClick={clearAllData}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-900/30 rounded-lg transition-all"
          >
            <Trash2 size={14} /> Limpar Dados
          </button>
          <div className="bg-indigo-800/40 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">ME</div>
            <div>
              <p className="text-sm font-semibold">Meu Perfil</p>
              <p className="text-xs text-indigo-300">Local Storage</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Seu Controle Financeiro</h1>
              <p className="text-slate-500">Registre suas movimentações para gerar gráficos.</p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <Plus size={20} /> Nova Transação
            </button>
          </div>

          <SummaryCards income={totalIncome} expense={totalExpense} balance={balance} />

          <Charts transactions={filteredTransactions} />

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <History className="text-indigo-600" size={20} />
              Lista de Movimentações
            </h2>
            <span className="text-sm text-slate-400 font-medium">
              {filteredTransactions.length} exibidas
            </span>
          </div>

          <Filters 
            search={search} onSearchChange={setSearch}
            categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter}
            typeFilter={typeFilter} onTypeChange={setTypeFilter}
            monthFilter={monthFilter} onMonthChange={setMonthFilter}
          />

          <TransactionTable transactions={filteredTransactions} onDelete={deleteTransaction} />
        </div>
      </main>

      <TransactionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onAdd={addTransaction} />

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
};

export default App;
