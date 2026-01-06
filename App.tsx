
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
        const transactionMonth = new Date(t.date).getUTCMonth() + 1;
        matchesMonth = transactionMonth === parseInt(monthFilter);
      }

      return matchesSearch && matchesCategory && matchesType && matchesMonth;
    });
  }, [transactions, search, categoryFilter, typeFilter, monthFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-['Inter']">
      {/* Mobile Header */}
      <header className="md:hidden bg-indigo-900 text-white p-4 flex justify-between items-center shadow-lg z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <TrendingUp className="text-indigo-900 w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">FinTrack</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Desktop / Mobile Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-[#1E293B] text-white transition-transform duration-300 ease-in-out transform 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:flex md:flex-col shadow-2xl md:shadow-none
      `}>
        <div className="p-8 hidden md:flex items-center gap-3">
          <div className="bg-indigo-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-2xl tracking-tight">FinTrack</span>
        </div>

        <nav className="flex-1 px-4 py-6 md:py-2 space-y-1.5">
          <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 font-semibold transition-all">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-medium">
            <History size={20} /> Transações
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-medium">
            <TrendingUp size={20} /> Metas
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-medium">
            <Settings size={20} /> Ajustes
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800 space-y-6">
          <button 
            onClick={clearAllData}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all"
          >
            <Trash2 size={16} /> Limpar Todos os Dados
          </button>
          <div className="bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3 border border-slate-700/50">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">FZ</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Fernando Zanini</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Free Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Painel Financeiro</h1>
              <p className="text-slate-500 mt-1 font-medium text-sm md:text-base">Mantenha seus gastos sob controle em tempo real.</p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 w-full md:w-auto justify-center group"
            >
              <Plus size={22} className="group-hover:rotate-90 transition-transform duration-300" /> 
              Nova Transação
            </button>
          </div>

          <SummaryCards income={totalIncome} expense={totalExpense} balance={balance} />

          <Charts transactions={filteredTransactions} />

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <History className="text-indigo-600" size={18} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Minhas Movimentações</h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              {filteredTransactions.length} REGISTROS
            </div>
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

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-6 right-6 md:hidden w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform border-4 border-white"
      >
        <Plus size={32} />
      </button>

      <TransactionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onAdd={addTransaction} />

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-300" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
};

export default App;
