
import React, { useState, useMemo } from 'react';
import { 
  Plus, LayoutDashboard, History, Settings, TrendingUp, 
  Menu, X, Trash2, PieChart as PieIcon, Download, 
  ArrowUpRight, ArrowDownLeft, Wallet, Bell, Search as SearchIcon
} from 'lucide-react';
import SummaryCards from './components/SummaryCards';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import Charts from './components/Charts';
import Filters from './components/Filters';
import BudgetManager from './components/BudgetManager';
import { useTransactions } from './hooks/useTransactions';

const App: React.FC = () => {
  const { 
    transactions, categories, settings, summary, 
    addTransaction, deleteTransaction, updateCategoryBudget, clearAll 
  } = useTransactions();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'settings'>('dashboard');
  
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');

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
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col lg:flex-row font-['Inter']">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-80 bg-[#0F172A] m-4 rounded-[2.5rem] text-white shadow-2xl p-8 sticky top-4 h-[calc(100vh-2rem)]">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase italic">FinTrack</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 font-bold scale-105' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
          >
            <LayoutDashboard size={22} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'transactions' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 font-bold scale-105' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
          >
            <History size={22} /> Extrato
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all">
            <PieIcon size={22} /> Planejamento
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 font-bold scale-105' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
          >
            <Settings size={22} /> Configurações
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="bg-slate-800/40 p-5 rounded-3xl flex items-center gap-4 border border-slate-700/30">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center font-black text-white text-lg shadow-inner">
              {settings.userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate leading-none mb-1">{settings.userName}</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Premium</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative pb-32 lg:pb-8 h-screen overflow-y-auto">
        
        {/* Header Superior - Glassmorphism */}
        <header className="sticky top-0 z-30 px-6 py-4 lg:py-6 bg-[#F1F5F9]/80 backdrop-blur-xl flex items-center justify-between">
          <div className="lg:hidden flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tighter italic">FinTrack</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-500 font-medium bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all w-96">
            <SearchIcon size={18} />
            <input type="text" placeholder="Pesquisar..." className="bg-transparent outline-none flex-1 text-sm" />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
            >
              <Plus size={20} /> Nova Transação
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto w-full p-6 md:p-8">
          
          <div className="mb-10">
            <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-2">
              Painel Geral
            </h1>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
              Bem-vindo de volta, {settings.userName.split(' ')[0]}
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8">
              <SummaryCards 
                income={summary.totalIncome} 
                expense={summary.totalExpense} 
                balance={summary.balance}
                categoryUsage={summary.categoryUsage}
              />
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                <div className="xl:col-span-2 space-y-8">
                  <Charts transactions={filteredTransactions} />
                  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black text-slate-800">Transações Recentes</h3>
                      <button onClick={() => setActiveTab('transactions')} className="text-sm font-bold text-indigo-600 hover:underline">Ver todas</button>
                    </div>
                    <TransactionTable transactions={transactions.slice(0, 5)} onDelete={deleteTransaction} />
                  </div>
                </div>
                <div className="space-y-8">
                  <BudgetManager categories={summary.categoryUsage} onUpdateBudget={updateCategoryBudget} />
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                      <TrendingUp size={160} />
                    </div>
                    <h4 className="text-xl font-black mb-2">Dica do FinTrack</h4>
                    <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                      Você economizou <span className="font-black text-white">12% a mais</span> que no mês passado. Continue assim para bater sua meta!
                    </p>
                    <button className="w-full bg-white text-indigo-600 py-3 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-colors">
                      Ver Análise Completa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-8">Extrato Detalhado</h2>
                <Filters 
                  search={search} onSearchChange={setSearch}
                  categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter}
                  typeFilter={typeFilter} onTypeChange={setTypeFilter}
                  monthFilter={monthFilter} onMonthChange={setMonthFilter}
                />
                <div className="mt-8">
                  <TransactionTable transactions={filteredTransactions} onDelete={deleteTransaction} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm max-w-2xl mx-auto">
               <h2 className="text-2xl font-black text-slate-900 mb-8">Preferências</h2>
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2">Seu Nome</label>
                   <input 
                    type="text" 
                    value={settings.userName} 
                    onChange={(e) => clearAll()} // Exemplo, aqui você atualizaria o estado
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                   />
                 </div>
                 <button 
                  onClick={clearAll}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-colors"
                 >
                   <Trash2 size={20} /> Apagar Todos os Dados
                 </button>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* Navegação Inferior Mobile - Glassmorphism */}
      <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2rem] flex items-center justify-around py-4 px-6 z-50">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}
        >
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-black uppercase">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('transactions')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'transactions' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}
        >
          <History size={24} />
          <span className="text-[10px] font-black uppercase">Extrato</span>
        </button>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-2xl -mt-10 shadow-xl shadow-indigo-600/40 active:scale-90 transition-transform"
        >
          <Plus size={28} />
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <PieIcon size={24} />
          <span className="text-[10px] font-black uppercase">Metas</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'settings' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}
        >
          <Settings size={24} />
          <span className="text-[10px] font-black uppercase">Ajustes</span>
        </button>
      </nav>

      <TransactionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onAdd={addTransaction} />
    </div>
  );
};

export default App;
