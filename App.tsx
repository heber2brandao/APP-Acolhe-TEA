
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Heart, Home, BarChart2, BookOpen, ArrowLeft, 
  CheckCircle, Info, AlertTriangle, Bell, Settings, 
  Clock, Trash2, Check, X, BookMarked, GraduationCap,
  MessageCircleHeart, Utensils, Lightbulb, Footprints, 
  Sparkles, Palette, Puzzle, Smile, User, Mail, Phone,
  ChevronRight, FileText, Calendar as CalendarIcon, Lock, LogOut, Eye, EyeOff,
  Download, Share, MoreVertical
} from 'lucide-react';
import { DISCLAIMER_TEXT, LIBRARY_CONTENT } from './constants';
import { AppState, TeaLevel, ChildProfile, Activity, CompletedActivity, NotificationSettings, AppNotification, ActivityCategory, LibraryModule, LibraryArticle } from './types';
import { generateDailyRoutine } from './services/routineEngine';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- TYPES FOR AUTH ---
interface UserAccount extends AppState {
  id: string;
  password?: string; // Simple storage for demo
  email: string;
}

// --- CUSTOM LOGO IMAGE ---

const BrandLogo = ({ className = "w-32 h-32" }: { className?: string }) => {
  const [error, setError] = useState(false);

  if (!error) {
    return (
      <img 
        src="logo.png" 
        alt="AcolheTEA" 
        className={`object-contain ${className} transition-opacity duration-300`}
        onError={() => setError(true)} 
      />
    );
  }

  return (
    <div className={`flex items-center justify-center bg-white border border-stone-100 rounded-[2rem] p-6 shadow-sm ${className}`}>
      <div className="relative w-full h-full flex items-center justify-center">
         <Heart className="w-full h-full text-green-600" fill="currentColor" fillOpacity={0.1} strokeWidth={1.5} />
         <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-1.5 border-4 border-white shadow-sm">
           <Sparkles className="w-4 h-4 text-white" strokeWidth={3} />
         </div>
      </div>
    </div>
  );
};

const BrandName = ({ className = "text-4xl" }: { className?: string }) => (
  <h1 className={`font-bold tracking-tight ${className}`}>
    <span className="text-red-500">A</span>
    <span className="text-amber-400">c</span>
    <span className="text-blue-500">o</span>
    <span className="text-blue-500">l</span>
    <span className="text-blue-500">h</span>
    <span className="text-blue-500">e</span>
    <span className="text-blue-600">T</span>
    <span className="text-amber-400">E</span>
    <span className="text-green-500">A</span>
  </h1>
);

// --- CUSTOM SVG ILLUSTRATIONS ---

const SvgCommunication = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
    <circle cx="50" cy="50" r="45" className="fill-sky-100" />
    <path d="M25 35 h35 a10 10 0 0 1 10 10 v20 a10 10 0 0 1 -10 10 h-5 l-10 10 v-10 h-20 a10 10 0 0 1 -10 -10 v-20 a10 10 0 0 1 10 -10" className="fill-sky-400" />
    <path d="M55 25 h25 a10 10 0 0 1 10 10 v20 a10 10 0 0 1 -10 10 h-5 v10 l-10 -10 h-10 a10 10 0 0 1 -10 -10 v-20 a10 10 0 0 1 10 -10" className="fill-indigo-400 opacity-90" />
    <circle cx="42" cy="50" r="3" fill="white"/>
    <circle cx="50" cy="50" r="3" fill="white"/>
    <circle cx="58" cy="50" r="3" fill="white"/>
    <path d="M75 40 l-5 5 l5 5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SvgSensory = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
    <circle cx="50" cy="50" r="45" className="fill-purple-100" />
    <path d="M30 65 Q 30 40 50 30 Q 70 40 70 65 Q 65 85 50 90 Q 35 85 30 65" className="fill-rose-300" />
    <circle cx="70" cy="35" r="8" className="fill-yellow-300 animate-pulse" />
    <path d="M20 30 L25 40 L15 45 Z" className="fill-teal-300" />
    <circle cx="25" cy="70" r="5" className="fill-indigo-300" />
    <path d="M80 70 L75 80 L85 80 Z" className="fill-orange-300" />
    <path d="M15 60 Q 25 60 25 50" stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M85 50 Q 75 50 75 60" stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const SvgCognitive = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
    <circle cx="50" cy="50" r="45" className="fill-amber-100" />
    <rect x="32" y="32" width="18" height="18" rx="2" className="fill-red-400" />
    <rect x="50" y="32" width="18" height="18" rx="2" className="fill-blue-400" />
    <rect x="32" y="50" width="18" height="18" rx="2" className="fill-yellow-400" />
    <rect x="50" y="50" width="18" height="18" rx="2" className="fill-emerald-400" />
    <circle cx="50" cy="50" r="6" className="fill-white" />
    <path d="M50 32 v36 M32 50 h36" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
  </svg>
);

const SvgMotor = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
    <circle cx="50" cy="50" r="45" className="fill-emerald-100" />
    <rect x="30" y="70" width="40" height="10" rx="4" className="fill-rose-500" />
    <rect x="35" y="60" width="30" height="10" rx="4" className="fill-orange-400" />
    <rect x="40" y="50" width="20" height="10" rx="4" className="fill-yellow-400" />
    <rect x="45" y="40" width="10" height="10" rx="3" className="fill-blue-500" />
    <path d="M50 30 v45" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
  </svg>
);

const SvgFeeding = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
    <circle cx="50" cy="50" r="45" className="fill-rose-100" />
    <path d="M35 40 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0" transform="translate(0, 15)" className="fill-red-500" />
    <path d="M50 45 q 5 -15 15 -15" stroke="#166534" strokeWidth="3" fill="none" strokeLinecap="round" />
    <ellipse cx="65" cy="35" rx="8" ry="4" transform="rotate(-30 65 35)" className="fill-green-500" />
    <path d="M65 65 L80 50 L85 55 L70 70 Z" className="fill-orange-500" />
    <path d="M80 50 L85 45 L90 50 L85 55 Z" className="fill-green-600" />
    <circle cx="55" cy="50" r="2" className="fill-white opacity-50" />
  </svg>
);

const SvgSocial = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
    <circle cx="50" cy="50" r="45" className="fill-orange-100" />
    <circle cx="35" cy="50" r="12" className="fill-amber-300" />
    <circle cx="65" cy="50" r="12" className="fill-amber-300" />
    <path d="M35 52 q0 3 4 3" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M65 52 q0 3 4 3" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="32" cy="48" r="1.5" fill="#92400e" />
    <circle cx="38" cy="48" r="1.5" fill="#92400e" />
    <circle cx="62" cy="48" r="1.5" fill="#92400e" />
    <circle cx="68" cy="48" r="1.5" fill="#92400e" />
    <path d="M45 65 q 5 5 10 0" stroke="#fca5a5" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const SvgDefault = () => (
   <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
    <circle cx="50" cy="50" r="45" className="fill-slate-100" />
    <circle cx="50" cy="50" r="20" className="fill-slate-300" />
    <path d="M40 50 l10 10 l20 -20" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- VISUAL COMPONENTS ---

const CategoryIllustration = ({ category, className = "" }: { category: ActivityCategory, className?: string }) => {
  const getAssets = (cat: ActivityCategory) => {
    switch (cat) {
      case ActivityCategory.COMMUNICATION:
        return { bg: 'bg-sky-50', Component: SvgCommunication };
      case ActivityCategory.SENSORY:
        return { bg: 'bg-purple-50', Component: SvgSensory };
      case ActivityCategory.COGNITIVE:
        return { bg: 'bg-amber-50', Component: SvgCognitive };
      case ActivityCategory.OT: // Motor
        return { bg: 'bg-emerald-50', Component: SvgMotor };
      case ActivityCategory.FEEDING:
        return { bg: 'bg-rose-50', Component: SvgFeeding };
      case ActivityCategory.SOCIAL:
        return { bg: 'bg-orange-50', Component: SvgSocial };
      default:
        return { bg: 'bg-slate-50', Component: SvgDefault };
    }
  };

  const { bg, Component } = getAssets(category);

  return (
    <div className={`relative overflow-hidden ${bg} ${className} flex items-center justify-center`}>
      <div className="w-full h-full max-w-[80%] max-h-[80%] flex items-center justify-center transform transition-transform hover:scale-105 duration-300">
         <Component />
      </div>
    </div>
  );
};

// --- SCREENS: AUTHENTICATION ---

const AuthScreen = ({ onLogin, onRegister }: { onLogin: (e: string, p: string) => void, onRegister: (n: string, e: string, p: string) => void }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      setError("Por favor preencha todos os campos");
      return;
    }
    if (mode === 'register' && !name) {
      setError("O nome é obrigatório");
      return;
    }
    
    setError('');
    if (mode === 'login') {
      onLogin(email, password);
    } else {
      onRegister(name, email, password);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full flex flex-col items-center">
        <BrandLogo className="w-32 h-32 mb-6" />
        <BrandName className="mb-10" />

        <Card className="w-full p-8 rounded-3xl border-none shadow-xl">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
            {mode === 'login' ? 'Bem-vinda de volta' : 'Criar Conta'}
          </h2>

          {error && (
            <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm font-medium mb-4 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">Seu Nome</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nome completo"
                    className="w-full pl-12 p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  type={showPass ? "text" : "password"} 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="******"
                  className="w-full pl-12 pr-12 p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                />
                <button 
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button fullWidth onClick={handleSubmit} className="py-4 mt-4 text-lg shadow-green-200">
              {mode === 'login' ? 'Entrar' : 'Cadastrar'}
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              {mode === 'login' ? 'Não tem uma conta?' : 'Já tem conta?'}
              <button 
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                className="ml-2 text-green-600 font-bold hover:underline"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- SCREEN: CALENDAR ---

const CalendarView = ({ history, onBack }: { history: CompletedActivity[], onBack: () => void }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  
  // Helpers
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 = Sun, 1 = Mon...

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  
  const monthName = currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  // Map history to days
  const historyMap = useMemo(() => {
    const map: Record<number, number> = {}; // Day -> Count
    history.forEach(h => {
      const d = new Date(h.date);
      // Check if matches current view month/year
      if (d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear()) {
        map[d.getDate()] = (map[d.getDate()] || 0) + 1;
      }
    });
    return map;
  }, [history, currentMonth]);

  const renderDays = () => {
    const days = [];
    // Padding for empty days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14"></div>);
    }
    // Real days
    for (let i = 1; i <= daysInMonth; i++) {
      const count = historyMap[i] || 0;
      const isToday = i === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
      
      days.push(
        <div key={i} className={`h-14 rounded-xl flex flex-col items-center justify-center relative border ${isToday ? 'border-green-500 bg-green-50' : 'border-stone-100 bg-white'}`}>
          <span className={`text-sm font-bold ${isToday ? 'text-green-700' : 'text-slate-600'}`}>{i}</span>
          {count > 0 && (
            <div className="flex mt-1 gap-0.5">
               {Array.from({length: Math.min(count, 3)}).map((_, idx) => (
                 <div key={idx} className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
               ))}
               {count > 3 && <div className="w-1.5 h-1.5 bg-green-300 rounded-full"></div>}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
       <div className="p-6 bg-white rounded-b-3xl shadow-sm">
          <div className="flex items-center mb-6">
            <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-full">
               <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 ml-2">Calendário de Atividades</h1>
          </div>

          <div className="flex items-center justify-between mb-6 bg-stone-50 p-2 rounded-2xl">
             <button onClick={prevMonth} className="p-2 hover:bg-white rounded-xl transition-colors">
               <ChevronRight className="w-5 h-5 rotate-180 text-slate-600" />
             </button>
             <h2 className="font-bold text-slate-800 capitalize">{monthName}</h2>
             <button onClick={nextMonth} className="p-2 hover:bg-white rounded-xl transition-colors">
               <ChevronRight className="w-5 h-5 text-slate-600" />
             </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2 text-center">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
              <span key={d} className="text-xs text-slate-400 font-medium uppercase">{d}</span>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
             {renderDays()}
          </div>
       </div>

       <div className="p-6">
          <h3 className="font-bold text-slate-700 mb-4">Resumo do Mês</h3>
          <div className="grid grid-cols-2 gap-4">
             <Card className="bg-white flex flex-col items-center p-4">
                <span className="text-3xl font-bold text-green-600">{Object.values(historyMap).reduce((a,b) => a+b, 0)}</span>
                <span className="text-xs text-slate-400 mt-1 text-center uppercase">Atividades Feitas</span>
             </Card>
             <Card className="bg-white flex flex-col items-center p-4">
                <span className="text-3xl font-bold text-amber-500">{Object.keys(historyMap).length}</span>
                <span className="text-xs text-slate-400 mt-1 text-center uppercase">Dias Ativos</span>
             </Card>
          </div>
       </div>
    </div>
  );
};

// --- COMPONENT: INSTALL GUIDE ---

const InstallGuide = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-slide-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">Instalar Aplicativo</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        
        <p className="text-slate-500 text-sm mb-6">
          Adicione o AcolheTEA à sua tela inicial para usar em tela cheia, igual a um aplicativo nativo.
        </p>

        <div className="space-y-6">
          {/* iPhone Instructions */}
          <div className="flex gap-4 items-start">
            <div className="bg-stone-100 p-3 rounded-xl">
               <Share className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-700 text-sm">No iPhone (Safari)</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                1. Toque no ícone de <strong>Compartilhar</strong> (quadrado com seta) na barra inferior.<br/>
                2. Role para baixo e selecione <strong>"Adicionar à Tela de Início"</strong>.
              </p>
            </div>
          </div>

          {/* Android Instructions */}
          <div className="flex gap-4 items-start">
            <div className="bg-stone-100 p-3 rounded-xl">
               <MoreVertical className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-700 text-sm">No Android (Chrome)</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                1. Toque nos <strong>três pontinhos</strong> no canto superior direito.<br/>
                2. Selecione <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar aplicativo"</strong>.
              </p>
            </div>
          </div>
        </div>
        
        <Button fullWidth onClick={onClose} className="mt-8">Entendi</Button>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Onboarding = ({ onComplete }: { onComplete: (name: string, phone: string, child: ChildProfile) => void }) => {
  const [step, setStep] = useState(1);
  // Campos do Responsável
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');

  // Campos da Criança
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number>(3);
  const [level, setLevel] = useState<TeaLevel>(TeaLevel.LEVEL_1);
  const [needs, setNeeds] = useState({
    food: false,
    speech: false,
    motor: false,
    sensory: false
  });

  const handleFinish = () => {
    const profile: ChildProfile = {
      name: childName,
      age: childAge,
      level: level,
      hasFoodSelectivity: needs.food,
      hasSpeechDelay: needs.speech,
      hasMotorDifficulty: needs.motor,
      hasSensoryIssues: needs.sensory
    };
    onComplete(parentName, phone, profile);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10 flex flex-col items-center">
           <BrandLogo className="w-28 h-28 mb-6" />
           <BrandName />
           <p className="text-slate-500 text-sm mt-3 font-medium">Seu apoio diário no desenvolvimento</p>
        </div>

        <Card className="p-8 animate-fade-in rounded-3xl shadow-lg border-none">
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">Vamos criar seu perfil!</h2>
              <p className="text-sm text-slate-500 mb-8 text-center px-4">Já temos seu email, precisamos apenas de alguns detalhes.</p>
              
              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1 uppercase tracking-wider">Nome da Mãe / Cuidador(a)</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Seu nome completo" 
                      className="w-full pl-12 p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 text-gray-900 focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-all placeholder:text-slate-400"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1 uppercase tracking-wider">Telefone / WhatsApp</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                    <input 
                      type="tel" 
                      placeholder="(XX) 99999-9999" 
                      className="w-full pl-12 p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 text-gray-900 focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-all placeholder:text-slate-400"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button 
                fullWidth 
                disabled={!parentName || !phone} 
                onClick={() => setStep(2)}
                className="py-4 text-lg shadow-green-200"
              >
                Continuar
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">Quem vamos acolher hoje?</h2>
              <div className="space-y-6 mb-8 mt-8">
                <input 
                  type="text" 
                  placeholder="Nome da criança" 
                  className="w-full p-4 rounded-2xl border border-stone-200 bg-stone-50/50 text-gray-900 text-lg placeholder:text-slate-400 focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                />
                <div className="flex items-center justify-center space-x-4 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                   <label className="text-slate-600 font-medium">Idade da criança:</label>
                   <input 
                    type="number" 
                    min="1" max="12"
                    className="p-2 rounded-xl border border-stone-200 bg-white text-gray-900 w-20 text-center text-xl font-bold focus:ring-2 focus:ring-green-200 outline-none"
                    value={childAge}
                    onChange={(e) => setChildAge(parseInt(e.target.value))}
                   />
                   <span className="text-slate-500">anos</span>
                </div>
              </div>
              <Button fullWidth disabled={!childName} onClick={() => setStep(3)} className="py-4">Próximo</Button>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-bold text-slate-800 mb-2 text-center">Nível de Suporte</h2>
              <p className="text-sm text-slate-500 mb-8 text-center">Essa informação ajuda a calibrar a complexidade das atividades.</p>
              <div className="space-y-4 mb-8">
                {[1, 2, 3].map((l) => (
                  <div 
                    key={l}
                    onClick={() => setLevel(l as TeaLevel)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${level === l ? 'border-green-500 bg-green-50 shadow-sm' : 'border-stone-100 hover:border-green-200 hover:bg-stone-50'}`}
                  >
                    <div>
                      <span className={`font-bold text-lg ${level === l ? 'text-green-700' : 'text-slate-700'}`}>Grau {l}</span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {l === 1 ? 'Suporte Leve' : l === 2 ? 'Suporte Moderado' : 'Suporte Substancial'}
                      </p>
                    </div>
                    {level === l && <CheckCircle className="w-6 h-6 text-green-500" />}
                  </div>
                ))}
              </div>
              <Button fullWidth onClick={() => setStep(4)} className="py-4">Próximo</Button>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-xl font-bold text-slate-800 mb-2 text-center">Necessidades Específicas</h2>
              <p className="text-sm text-slate-500 mb-6 text-center">Selecione o que se aplica no momento:</p>
              <div className="space-y-3 mb-8">
                 <label className={`flex items-center space-x-4 p-4 border rounded-2xl cursor-pointer transition-all ${needs.food ? 'bg-amber-50 border-amber-200' : 'hover:bg-stone-50 border-stone-100'}`}>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${needs.food ? 'bg-amber-500 border-amber-500' : 'border-slate-300'}`}>
                      {needs.food && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <input type="checkbox" checked={needs.food} onChange={e => setNeeds({...needs, food: e.target.checked})} className="hidden" />
                    <span className="text-slate-700 font-medium">Seletividade Alimentar</span>
                 </label>
                 
                 <label className={`flex items-center space-x-4 p-4 border rounded-2xl cursor-pointer transition-all ${needs.speech ? 'bg-sky-50 border-sky-200' : 'hover:bg-stone-50 border-stone-100'}`}>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${needs.speech ? 'bg-sky-500 border-sky-500' : 'border-slate-300'}`}>
                      {needs.speech && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <input type="checkbox" checked={needs.speech} onChange={e => setNeeds({...needs, speech: e.target.checked})} className="hidden" />
                    <span className="text-slate-700 font-medium">Atraso na Fala</span>
                 </label>

                 <label className={`flex items-center space-x-4 p-4 border rounded-2xl cursor-pointer transition-all ${needs.motor ? 'bg-emerald-50 border-emerald-200' : 'hover:bg-stone-50 border-stone-100'}`}>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${needs.motor ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                      {needs.motor && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <input type="checkbox" checked={needs.motor} onChange={e => setNeeds({...needs, motor: e.target.checked})} className="hidden" />
                    <span className="text-slate-700 font-medium">Dificuldades Motoras</span>
                 </label>

                 <label className={`flex items-center space-x-4 p-4 border rounded-2xl cursor-pointer transition-all ${needs.sensory ? 'bg-purple-50 border-purple-200' : 'hover:bg-stone-50 border-stone-100'}`}>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${needs.sensory ? 'bg-purple-500 border-purple-500' : 'border-slate-300'}`}>
                      {needs.sensory && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <input type="checkbox" checked={needs.sensory} onChange={e => setNeeds({...needs, sensory: e.target.checked})} className="hidden" />
                    <span className="text-slate-700 font-medium">Questões Sensoriais</span>
                 </label>
              </div>
              <div className="bg-rose-50 p-4 rounded-xl mb-6 text-xs text-rose-800 flex items-start leading-relaxed">
                <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                {DISCLAIMER_TEXT}
              </div>
              <Button fullWidth onClick={handleFinish} className="py-4 shadow-lg shadow-green-200">Criar Rotina Personalizada</Button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

const NotificationCenter = ({ 
  notifications, 
  onClose, 
  onMarkRead,
  onClearAll 
}: { 
  notifications: AppNotification[], 
  onClose: () => void, 
  onMarkRead: (id: string) => void,
  onClearAll: () => void 
}) => {
  return (
    <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl animate-slide-in flex flex-col">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Bell className="w-5 h-5 text-green-600" />
            Notificações
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center">
              <Bell className="w-12 h-12 mb-4 opacity-20" />
              <p>Tudo tranquilo por aqui.</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div 
                key={notif.id} 
                onClick={() => onMarkRead(notif.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${notif.isRead ? 'bg-white border-stone-100 opacity-60' : 'bg-white border-green-200 shadow-sm border-l-4 border-l-green-500'}`}
              >
                <div className="flex justify-between items-start mb-1">
                   <span className={`text-xs font-bold uppercase tracking-wider ${notif.type === 'reminder' ? 'text-amber-500' : notif.type === 'tip' ? 'text-purple-500' : 'text-green-500'}`}>
                     {notif.type === 'reminder' ? 'Lembrete' : notif.type === 'tip' ? 'Sugestão' : 'Conquista'}
                   </span>
                   <span className="text-[10px] text-slate-400">{new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <h4 className={`font-bold text-sm ${notif.isRead ? 'text-slate-600' : 'text-slate-800'}`}>{notif.title}</h4>
                <p className="text-sm text-slate-500 mt-1 leading-snug">{notif.message}</p>
              </div>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-4 border-t border-stone-100 bg-white">
            <Button variant="ghost" fullWidth onClick={onClearAll} className="text-rose-500 hover:bg-rose-50 hover:text-rose-600">
              Limpar todas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const SettingsView = ({ 
  settings, 
  onUpdateSettings, 
  childName,
  onLogout,
  onOpenInstall
}: { 
  settings: NotificationSettings, 
  onUpdateSettings: (s: NotificationSettings) => void,
  childName: string,
  onLogout: () => void,
  onOpenInstall: () => void
}) => {
  
  const requestPermission = () => {
    if (!("Notification" in window)) {
      alert("Este navegador não suporta notificações.");
    } else if (Notification.permission === "granted") {
      // Already granted
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
           onUpdateSettings({...settings, enabled: true});
        }
      });
    }
  };

  const toggleEnabled = (checked: boolean) => {
    if(checked) requestPermission();
    onUpdateSettings({...settings, enabled: checked});
  };

  return (
    <div className="p-6 pb-24 animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Settings className="w-6 h-6 text-green-600" />
        Configurações
      </h1>

      <Card className="mb-6 bg-gradient-to-r from-green-600 to-teal-600 border-none text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Instalar Aplicativo</h3>
            <p className="text-xs text-green-100 opacity-90 mt-1">Tenha o AcolheTEA na tela inicial</p>
          </div>
          <Button onClick={onOpenInstall} className="bg-white text-green-700 hover:bg-green-50 px-4 py-2 h-auto text-sm shadow-none">
             <Download className="w-4 h-4 mr-2" /> Instalar
          </Button>
        </div>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-slate-800">Ativar Notificações</h3>
            <p className="text-xs text-slate-500">Receba lembretes no seu dispositivo</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={settings.enabled} onChange={(e) => toggleEnabled(e.target.checked)} />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>

        <div className={`space-y-6 ${!settings.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Horários da Rotina
            </h4>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-xs text-slate-500 block mb-1">Manhã</label>
                  <input 
                    type="time" 
                    value={settings.morningReminder}
                    onChange={(e) => onUpdateSettings({...settings, morningReminder: e.target.value})}
                    className="w-full p-2 bg-white text-gray-900 border border-stone-200 rounded-lg text-sm text-center font-medium"
                  />
               </div>
               <div>
                  <label className="text-xs text-slate-500 block mb-1">Tarde</label>
                  <input 
                    type="time" 
                    value={settings.afternoonReminder}
                    onChange={(e) => onUpdateSettings({...settings, afternoonReminder: e.target.value})}
                    className="w-full p-2 bg-white text-gray-900 border border-stone-200 rounded-lg text-sm text-center font-medium"
                  />
               </div>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-4">
             <h4 className="text-sm font-bold text-slate-700 mb-3">Personalização Inteligente</h4>
             
             <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-stone-50 rounded-lg -mx-2">
                   <span className="text-sm text-slate-600">Dicas baseadas na evolução</span>
                   <input 
                      type="checkbox" 
                      checked={settings.smartTips}
                      onChange={(e) => onUpdateSettings({...settings, smartTips: e.target.checked})}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                   />
                </label>
                <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-stone-50 rounded-lg -mx-2">
                   <span className="text-sm text-slate-600">Alerta de inatividade (+24h)</span>
                   <input 
                      type="checkbox" 
                      checked={settings.inactivityAlert}
                      onChange={(e) => onUpdateSettings({...settings, inactivityAlert: e.target.checked})}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                   />
                </label>
             </div>
          </div>
        </div>
      </Card>

      <Button fullWidth variant="outline" onClick={onLogout} className="border-rose-200 text-rose-500 hover:bg-rose-50">
        <LogOut className="w-4 h-4 mr-2" />
        Sair da Conta
      </Button>
      
      <div className="text-center mt-8 text-xs text-slate-400">
        <p>AcolheTEA v1.2.0</p>
      </div>
    </div>
  );
};

const Dashboard = ({ 
  child, 
  routine, 
  onOpenActivity, 
  userName,
  notifications,
  onOpenNotifications,
  onOpenCalendar
}: { 
  child: ChildProfile, 
  routine: Activity[], 
  onOpenActivity: (a: Activity) => void,
  userName: string,
  notifications: AppNotification[],
  onOpenNotifications: () => void,
  onOpenCalendar: () => void
}) => {
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="pb-24">
      <header className="bg-white p-6 rounded-b-3xl shadow-sm mb-6">
        <div className="flex justify-between items-start">
          <div>
             <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">{today}</p>
             <h1 className="text-2xl font-bold text-slate-800 mt-1">Bom dia, {userName}!</h1>
             <p className="text-slate-500 text-sm mt-1">Vamos estimular o {child.name} hoje?</p>
          </div>
          <div className="flex space-x-3">
            <button onClick={onOpenNotifications} className="relative p-2 bg-stone-50 rounded-full text-slate-500 hover:bg-green-50 hover:text-green-600 transition-colors">
               <Bell className="w-6 h-6" />
               {unreadCount > 0 && (
                 <span className="absolute top-0 right-0 h-4 w-4 bg-rose-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                   {unreadCount}
                 </span>
               )}
            </button>
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-lg">
              {child.name.charAt(0)}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          <div className="bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
            ❤️ Autocuidado
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
            ⭐ Grau {child.level}
          </div>
          {child.hasFoodSelectivity && (
             <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
               🍎 Alimentação
             </div>
          )}
        </div>
      </header>

      <main className="px-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Rotina de Hoje</h2>
          <button onClick={onOpenCalendar} className="text-green-600 text-sm font-medium flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors">
            <CalendarIcon className="w-4 h-4" /> Ver calendário
          </button>
        </div>

        <div className="space-y-4">
          {routine.map((act, idx) => (
            <Card key={act.id} onClick={() => onOpenActivity(act)} className="group hover:border-green-300 transition-colors">
              <div className="flex justify-between items-center">
                 <div className="flex space-x-4 w-full">
                   <div className="flex-shrink-0">
                      <CategoryIllustration category={act.category} className="w-20 h-20 rounded-xl" />
                   </div>
                   <div className="flex flex-col justify-center flex-1">
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">{act.category}</span>
                      <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{act.title}</h3>
                      <p className="text-slate-400 text-xs flex items-center">
                        ⏱️ {act.durationMin} min
                      </p>
                   </div>
                 </div>
                 <div className="text-slate-300 group-hover:text-green-500 pl-2">
                   <ArrowLeft className="rotate-180 w-6 h-6" />
                 </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 border-none text-white mt-8">
          <div className="flex items-start space-x-4">
             <div className="bg-white/20 p-3 rounded-full">
               <Info className="w-6 h-6 text-white" />
             </div>
             <div>
               <h3 className="font-bold text-lg">Dica do dia</h3>
               <p className="text-indigo-100 text-sm mt-1">Crianças aprendem melhor quando estão reguladas. Antes de uma atividade difícil, tente uma brincadeira sensorial calmante.</p>
             </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

const ActivityDetail = ({ activity, onBack, onComplete }: { activity: Activity, onBack: () => void, onComplete: (feedback: 'easy' | 'medium' | 'hard') => void }) => {
  return (
    <div className="min-h-screen bg-white pb-24">
       <div className="relative h-64">
          <CategoryIllustration category={activity.category} className="w-full h-full" />
          <button onClick={onBack} className="absolute top-6 left-6 bg-white/90 p-2 rounded-full shadow-lg text-slate-700 backdrop-blur-sm z-20">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent h-24 z-10"></div>
       </div>

       <div className="px-6 -mt-10 relative z-20">
         <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
            {activity.category}
         </span>
         <h1 className="text-3xl font-bold text-slate-800 mt-3 mb-2">{activity.title}</h1>
         <div className="flex items-center space-x-4 text-slate-500 text-sm mb-6">
            <span className="flex items-center">⏱️ {activity.durationMin} min</span>
            <span>•</span>
            <span>🎯 {activity.objective}</span>
         </div>

         <div className="space-y-8">
            {/* Scientific Validation Section */}
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
               <div className="flex items-start space-x-3">
                 <GraduationCap className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                 <div>
                   <h4 className="text-indigo-900 font-bold text-sm mb-1">Fundamentação Científica</h4>
                   <p className="text-indigo-800 text-xs leading-relaxed">
                     {activity.scientificBasis}
                   </p>
                 </div>
               </div>
            </div>

            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Materiais Necessários</h3>
              <ul className="flex flex-wrap gap-2">
                {activity.materials.map((m, i) => (
                  <li key={i} className="bg-stone-100 px-3 py-1.5 rounded-lg text-slate-600 text-sm border border-stone-200">
                    {m}
                  </li>
                ))}
              </ul>
            </section>

            <section>
               <h3 className="text-lg font-bold text-slate-800 mb-4">Passo a Passo</h3>
               <div className="space-y-6">
                  {activity.steps.map((step, i) => (
                    <div key={i} className="flex space-x-4">
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                         {i + 1}
                       </div>
                       <p className="text-slate-600 leading-relaxed mt-1">{step}</p>
                    </div>
                  ))}
               </div>
            </section>

            <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
               <h4 className="text-rose-800 font-bold text-sm mb-2">Benefícios Esperados</h4>
               <ul className="list-disc list-inside text-rose-700 text-sm space-y-1">
                 {activity.benefits.map((b, i) => <li key={i}>{b}</li>)}
               </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
               <h3 className="text-center text-slate-500 font-medium mb-4">Como foi a atividade?</h3>
               <div className="grid grid-cols-3 gap-3">
                 <button onClick={() => onComplete('easy')} className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:bg-green-50 hover:border-green-300 transition-colors flex flex-col items-center gap-2">
                    <span className="text-2xl">😄</span>
                    <span className="text-xs font-bold text-slate-600">Fácil</span>
                 </button>
                 <button onClick={() => onComplete('medium')} className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:bg-amber-50 hover:border-amber-300 transition-colors flex flex-col items-center gap-2">
                    <span className="text-2xl">🙂</span>
                    <span className="text-xs font-bold text-slate-600">Médio</span>
                 </button>
                 <button onClick={() => onComplete('hard')} className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:bg-rose-50 hover:border-rose-300 transition-colors flex flex-col items-center gap-2">
                    <span className="text-2xl">😓</span>
                    <span className="text-xs font-bold text-slate-600">Difícil</span>
                 </button>
               </div>
               <Button variant="ghost" fullWidth className="mt-4 text-slate-400" onClick={onBack}>
                  Não consegui fazer hoje
               </Button>
            </div>
         </div>
       </div>
    </div>
  );
};

const ProgressView = ({ history, childName }: { history: CompletedActivity[], childName: string }) => {
  // Mock data preparation for charts
  const total = history.length;
  
  const data = useMemo(() => {
    const cats: Record<string, number> = {};
    history.forEach(h => {
      // In a real app, we'd join with activity DB to get category name. 
      // Here we fake it based on ID prefix for demo visualization
      let label = 'Outro';
      if(h.activityId.startsWith('comm')) label = 'Comunicação';
      if(h.activityId.startsWith('sens')) label = 'Sensorial';
      if(h.activityId.startsWith('cog')) label = 'Cognitivo';
      if(h.activityId.startsWith('ot')) label = 'Motor';
      if(h.activityId.startsWith('feed')) label = 'Alimentar';
      
      cats[label] = (cats[label] || 0) + 1;
    });
    return Object.keys(cats).map(key => ({ name: key, value: cats[key] }));
  }, [history]);

  const COLORS = ['#16a34a', '#f43f5e', '#8b5cf6', '#f59e0b', '#3b82f6'];

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Evolução de {childName}</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="flex flex-col items-center justify-center py-6 bg-green-50 border-green-100">
           <span className="text-4xl font-bold text-green-600">{total}</span>
           <span className="text-xs text-green-700 mt-1 font-medium uppercase">Atividades Feitas</span>
        </Card>
        <Card className="flex flex-col items-center justify-center py-6 bg-rose-50 border-rose-100">
           <span className="text-4xl font-bold text-rose-500">{Math.floor(total * 0.8)}</span>
           <span className="text-xs text-rose-700 mt-1 font-medium uppercase">Pontos XP</span>
        </Card>
      </div>

      <h3 className="font-bold text-slate-700 mb-4">Áreas Estimuladas</h3>
      <div className="h-64 w-full bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-center text-sm">
            Complete atividades para ver o gráfico!
          </div>
        )}
      </div>
      
      <div className="mt-8">
         <h3 className="font-bold text-slate-700 mb-4">Conquistas Recentes</h3>
         <div className="space-y-3">
            {history.slice(0, 3).map((h, i) => (
               <div key={i} className="flex items-center p-4 bg-white rounded-xl border border-stone-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 text-sm">Atividade Concluída</p>
                    <p className="text-xs text-slate-400">{new Date(h.date).toLocaleDateString()}</p>
                  </div>
               </div>
            ))}
            {history.length === 0 && <p className="text-slate-400 text-sm italic">Nenhuma conquista ainda. Vamos começar?</p>}
         </div>
      </div>
    </div>
  );
};

const ModulesView = () => {
   const [activeModule, setActiveModule] = useState<LibraryModule | null>(null);
   const [activeArticle, setActiveArticle] = useState<LibraryArticle | null>(null);

   // Level 1: List of Modules
   if (!activeModule && !activeArticle) {
     return (
       <div className="p-6 pb-24 animate-fade-in">
          <div className="relative z-20 bg-stone-50"> {/* Container with higher Z-index */}
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Biblioteca de Apoio</h1>
            <p className="text-slate-500 text-sm mb-6">Guias práticos e embasados cientificamente para o dia a dia.</p>
            <div className="grid grid-cols-1 gap-4">
               {LIBRARY_CONTENT.map((m) => (
                 <div 
                  key={m.id} 
                  onClick={() => setActiveModule(m)}
                  className="flex items-center p-5 bg-white rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all cursor-pointer active:scale-95 group"
                 >
                    <div className={`w-14 h-14 rounded-2xl ${m.color} flex items-center justify-center text-3xl mr-4 shadow-inner`}>
                       {m.icon}
                    </div>
                    <div className="flex-1">
                       <h3 className="font-bold text-slate-800 text-lg group-hover:text-green-700 transition-colors">{m.title}</h3>
                       <p className="text-sm text-slate-500">{m.desc}</p>
                    </div>
                    <ChevronRight className="text-slate-300 w-6 h-6" />
                 </div>
               ))}
            </div>
            
            <div className="mt-8 p-6 bg-green-50 rounded-3xl text-center border border-green-100">
               <h3 className="font-bold text-green-800 text-lg mb-2">Precisa de ajuda profissional?</h3>
               <p className="text-green-600 text-sm mb-4">Nosso diretório contém especialistas em TEA na sua região.</p>
               <Button variant="outline" className="bg-white text-green-600 border-green-200 hover:bg-green-50">Buscar Especialista</Button>
            </div>
          </div>
       </div>
     );
   }

   // Level 2: List of Articles inside a Module
   if (activeModule && !activeArticle) {
      return (
        <div className="min-h-screen bg-stone-50 pb-24 animate-slide-in">
          <div className={`p-8 pb-12 z-0 ${activeModule.color} rounded-b-[2.5rem] relative`}>
             <button 
              onClick={() => setActiveModule(null)}
              className="absolute top-6 left-6 bg-white/60 p-2 rounded-full hover:bg-white transition-colors"
             >
               <ArrowLeft className="w-6 h-6 text-slate-800" />
             </button>
             <div className="text-center mt-4">
                <div className="text-6xl mb-4">{activeModule.icon}</div>
                <h1 className="text-2xl font-bold text-slate-900">{activeModule.title}</h1>
                <p className="text-slate-700 opacity-80 text-sm max-w-xs mx-auto mt-2">{activeModule.desc}</p>
             </div>
          </div>

          <div className="px-6 -mt-8 space-y-4 relative z-20">
             {activeModule.articles.map((article) => (
               <Card key={article.id} onClick={() => setActiveArticle(article)} className="p-5 flex items-start gap-4 hover:border-green-300 transition-colors cursor-pointer">
                  <div className="p-3 bg-stone-100 rounded-full">
                    <FileText className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{article.title}</h3>
                    <span className="text-xs text-slate-400 font-medium bg-stone-100 px-2 py-0.5 rounded-full mt-2 inline-block">⏱️ {article.readTime} de leitura</span>
                  </div>
               </Card>
             ))}
          </div>
        </div>
      );
   }

   // Level 3: Article Content
   if (activeArticle) {
     return (
       <div className="min-h-screen bg-white pb-24 animate-fade-in">
          {/* Sticky Header */}
          <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-stone-100 p-4 flex items-center gap-4 z-20">
            <button onClick={() => setActiveArticle(null)} className="p-2 hover:bg-stone-100 rounded-full">
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h2 className="font-bold text-slate-800 truncate pr-4">{activeArticle.title}</h2>
          </div>

          <div className="p-6 max-w-lg mx-auto">
             <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{activeArticle.title}</h1>
             
             <div className="prose prose-slate prose-lg">
               {activeArticle.content.map((paragraph, idx) => (
                 <p key={idx} className="text-slate-600 mb-4 leading-relaxed text-base">
                   {paragraph}
                 </p>
               ))}
             </div>

             {activeArticle.tipBox && (
               <div className="mt-8 p-5 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-4">
                  <Lightbulb className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                  <p className="text-indigo-800 text-sm font-medium italic">
                    {activeArticle.tipBox}
                  </p>
               </div>
             )}

             <div className="mt-12 pt-8 border-t border-stone-100 text-center">
                <p className="text-slate-400 text-xs mb-4">Este conteúdo foi útil?</p>
                <div className="flex justify-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-full text-slate-600 text-sm hover:bg-green-50 hover:text-green-700 transition-colors">
                     <Smile className="w-4 h-4" /> Sim, ajudou
                  </button>
                  <button onClick={() => setActiveArticle(null)} className="text-slate-400 text-sm underline decoration-slate-300">
                     Voltar para a lista
                  </button>
                </div>
             </div>
          </div>
       </div>
     );
   }

   return null;
};

// --- MAIN APP COMPONENT ---

export default function App() {
  // New State for Auth
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [usersDB, setUsersDB] = useState<UserAccount[]>(() => {
    // Initialize simulated DB from localStorage
    const db = localStorage.getItem('acolhetea_db');
    return db ? JSON.parse(db) : [];
  });

  const [view, setView] = useState<'onboarding' | 'dashboard' | 'progress' | 'modules' | 'detail' | 'settings' | 'calendar'>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

  // --- AUTH EFFECTS ---

  // Save DB whenever it changes
  useEffect(() => {
    if (usersDB.length > 0) {
      localStorage.setItem('acolhetea_db', JSON.stringify(usersDB));
    }
  }, [usersDB]);

  // Update DB when current user state changes (sync session to DB)
  useEffect(() => {
    if (currentUser) {
      setUsersDB(prev => prev.map(u => u.id === currentUser.id ? currentUser : u));
    }
  }, [currentUser]);


  // --- AUTH HANDLERS ---

  const handleRegister = (name: string, email: string, pass: string) => {
    // Check if email exists
    if (usersDB.find(u => u.email === email)) {
      alert("Este email já está cadastrado.");
      return;
    }

    const newUser: UserAccount = {
      id: Date.now().toString(),
      email,
      password: pass, // In a real app, this would be hashed!
      user: { name, email, phone: '' },
      child: null,
      onboardingComplete: false,
      history: [],
      notifications: [],
      settings: {
         enabled: false,
         morningReminder: "09:00",
         afternoonReminder: "15:00",
         smartTips: true,
         inactivityAlert: true
      },
      lastNotificationCheck: ""
    };

    setUsersDB([...usersDB, newUser]);
    setCurrentUser(newUser);
    setView('onboarding'); // New users go to onboarding
  };

  const handleLogin = (email: string, pass: string) => {
    const user = usersDB.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(user);
      setView(user.onboardingComplete ? 'dashboard' : 'onboarding');
    } else {
      alert("Email ou senha inválidos.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('dashboard'); // Will default to AuthScreen because currentUser is null
  };


  // --- APP LOGIC ---

  // Notification Logic Engine
  useEffect(() => {
    if (!currentUser || !currentUser.settings.enabled || !currentUser.child) return;

    const checkNotifications = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      const dateString = now.toDateString(); // "Mon Sep 28 2024"
      
      // Prevent multiple triggers per day for same reminders
      if (currentUser.lastNotificationCheck === dateString + "-" + timeString) {
         return;
      }

      const newNotifs: AppNotification[] = [];
      let shouldUpdate = false;

      // Helper to trigger
      const trigger = (title: string, body: string, type: AppNotification['type']) => {
         // Browser Notification
         if (Notification.permission === "granted") {
            new Notification(title, { body, icon: "/favicon.ico" });
         }
         // In-App Notification
         newNotifs.push({
           id: Date.now().toString() + Math.random().toString(),
           title,
           message: body,
           type,
           isRead: false,
           createdAt: new Date().toISOString()
         });
         shouldUpdate = true;
      };

      // 1. Morning Reminder
      if (timeString === currentUser.settings.morningReminder && !currentUser.lastNotificationCheck.includes(dateString + "-morning")) {
         trigger(`Bom dia, ${currentUser.user?.name}!`, `As atividades de hoje para ${currentUser.child.name} já estão prontas.`, 'reminder');
         setCurrentUser(prev => prev ? ({...prev, lastNotificationCheck: dateString + "-morning"}) : null);
         return; 
      }

      // 2. Afternoon Reminder
      if (timeString === currentUser.settings.afternoonReminder && !currentUser.lastNotificationCheck.includes(dateString + "-afternoon")) {
         trigger(`Hora da atividade!`, `Que tal tirar 15 minutinhos com o ${currentUser.child.name} agora?`, 'reminder');
         setCurrentUser(prev => prev ? ({...prev, lastNotificationCheck: dateString + "-afternoon"}) : null);
         return;
      }

      if (shouldUpdate) {
        setCurrentUser(prev => prev ? ({
          ...prev,
          notifications: [...newNotifs, ...prev.notifications]
        }) : null);
      }
    };

    const interval = setInterval(checkNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleOnboardingComplete = (parentName: string, phone: string, child: ChildProfile) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      user: { ...currentUser.user!, name: parentName, phone: phone },
      child: child,
      onboardingComplete: true
    });
    setView('dashboard');
  };

  const handleOpenActivity = (act: Activity) => {
    setCurrentActivity(act);
    setView('detail');
  };

  const handleCompleteActivity = (feedback: 'easy' | 'medium' | 'hard') => {
    if (!currentActivity || !currentUser) return;
    
    const newEntry: CompletedActivity = {
      activityId: currentActivity.id,
      date: new Date().toISOString(),
      feedback
    };

    // Logic for immediate achievement notification
    const newNotifs = [...currentUser.notifications];
    if (currentUser.history.length % 5 === 4) { // Every 5 activities (4 + current 1)
       newNotifs.unshift({
         id: Date.now().toString(),
         title: "Parabéns!",
         message: `Você completou ${currentUser.history.length + 1} atividades! O ${currentUser.child?.name} está evoluindo.`,
         type: 'achievement',
         isRead: false,
         createdAt: new Date().toISOString()
       });
    }

    setCurrentUser({
      ...currentUser,
      history: [newEntry, ...currentUser.history],
      notifications: newNotifs
    });
    
    setView('dashboard');
  };

  // Generate Routine
  const dailyRoutine = useMemo(() => {
    if (!currentUser?.child) return [];
    return generateDailyRoutine(currentUser.child);
  }, [currentUser?.child]);


  // --- RENDER ---

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} onRegister={handleRegister} />;
  }

  if (!currentUser.onboardingComplete || view === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (view === 'detail' && currentActivity) {
    return (
      <ActivityDetail 
        activity={currentActivity} 
        onBack={() => setView('dashboard')} 
        onComplete={handleCompleteActivity}
      />
    );
  }
  
  if (view === 'calendar') {
    return (
      <CalendarView 
        history={currentUser.history} 
        onBack={() => setView('dashboard')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 font-sans max-w-lg mx-auto shadow-2xl overflow-hidden relative">
      
      {showInstallGuide && <InstallGuide onClose={() => setShowInstallGuide(false)} />}

      {showNotifications && (
        <NotificationCenter 
          notifications={currentUser.notifications}
          onClose={() => setShowNotifications(false)}
          onMarkRead={(id) => {
            setCurrentUser(prev => prev ? ({
              ...prev,
              notifications: prev.notifications.map(n => n.id === id ? {...n, isRead: true} : n)
            }) : null);
          }}
          onClearAll={() => {
             setCurrentUser(prev => prev ? ({ ...prev, notifications: [] }) : null);
          }}
        />
      )}

      <div className="h-full overflow-y-auto scroll-smooth">
        {view === 'dashboard' && currentUser.child && (
          <Dashboard 
            child={currentUser.child} 
            userName={currentUser.user?.name || 'Mãe'} 
            routine={dailyRoutine} 
            onOpenActivity={handleOpenActivity}
            notifications={currentUser.notifications}
            onOpenNotifications={() => setShowNotifications(true)}
            onOpenCalendar={() => setView('calendar')}
          />
        )}
        {view === 'progress' && currentUser.child && (
          <ProgressView history={currentUser.history} childName={currentUser.child.name} />
        )}
        {view === 'modules' && (
          <ModulesView />
        )}
        {view === 'settings' && currentUser.child && (
          <SettingsView 
            settings={currentUser.settings} 
            childName={currentUser.child.name}
            onUpdateSettings={(newSettings) => setCurrentUser(prev => prev ? ({...prev, settings: newSettings}) : null)} 
            onLogout={handleLogout}
            onOpenInstall={() => setShowInstallGuide(true)}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 flex justify-around items-center z-50 max-w-lg mx-auto">
        <button 
          onClick={() => setView('dashboard')} 
          className={`flex flex-col items-center ${view === 'dashboard' ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Rotina</span>
        </button>
        <button 
          onClick={() => setView('progress')} 
          className={`flex flex-col items-center ${view === 'progress' ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <BarChart2 className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Evolução</span>
        </button>
        <button 
          onClick={() => setView('modules')} 
          className={`flex flex-col items-center ${view === 'modules' ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Aprender</span>
        </button>
        <button 
          onClick={() => setView('settings')} 
          className={`flex flex-col items-center ${view === 'settings' ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Ajustes</span>
        </button>
      </div>
    </div>
  );
}
