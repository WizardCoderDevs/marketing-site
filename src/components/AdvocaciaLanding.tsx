import { useContactForm } from '@/contexts/ContactFormContext';
import {
    ArrowRight,
    Award,
    BarChart3,
    Briefcase,
    CheckCircle2,
    ChevronDown,
    ShieldCheck,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

// Setup fonts
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function AdvocaciaLanding() {
  const { t, i18n } = useTranslation();
  const contactForm = useContactForm();
  const currentLang = i18n.language.startsWith('en') ? 'en' : 'pt';

  return (
    <div className={`text-slate-900 dark:text-slate-100 selection:bg-violet-500/30 ${inter.className} ${playfair.variable}`}>
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[100px] mix-blend-screen opacity-20" />
      </div>

      <main className="relative z-10">
        
        {/* SEÇÃO 1: HERO SECTION */}
        <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 px-6 overflow-hidden">
          {/* Background Ambient Effects */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-10 animate-fade-in-up">
                {/* Brand Header */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-violet-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                      <Image
                        src="/lightning-icon.svg"
                        alt="Brands - Logo"
                        width={48}
                        height={48}
                        className="w-12 h-12 relative z-10 drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                      />
                    </div>
                    <span className="text-3xl xs:text-4xl md:text-5xl font-extrabold font-poppins text-slate-900 dark:text-white">
                      BRANDS
                    </span>
                  </div>

                  <div className="space-y-4">
                    <p className="text-2xl md:text-3xl text-violet-700 dark:text-violet-300 font-playfair font-medium tracking-tight leading-none italic opacity-90 border-l-2 border-violet-500/50 pl-6 py-1">
                      {t('advocaciaLanding.hero.quote')}
                    </p>
                    
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-[0.2em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.8)]"></span>
                      {t('advocaciaLanding.hero.badge')}
                    </div>
                  </div>
                </div>
                
                <h1 className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold leading-[1.1] text-slate-900 dark:text-white">
                  {t('advocaciaLanding.hero.titlePart1')}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400">
                    {t('advocaciaLanding.hero.titleHighlight')}
                  </span>
                  {t('advocaciaLanding.hero.titlePart2')}
                </h1>
                
                <p className="text-xl text-slate-700 dark:text-slate-400 leading-relaxed font-light max-w-2xl">
                  {t('advocaciaLanding.hero.description')}
                </p>
                
                <div className="pt-6 flex flex-wrap gap-6 items-center">
                  <button 
                    onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white dark:text-slate-950 bg-gradient-to-r from-violet-600 to-blue-600 dark:bg-white rounded-xl hover:from-violet-500 hover:to-blue-500 dark:hover:bg-violet-50 transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(124,58,237,0.6)] transform hover:-translate-y-1"
                  >
                    {t('advocaciaLanding.hero.cta')}
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </button>
                  
                  <div className="flex items-center gap-4 text-slate-500 border-l border-slate-800 pl-6">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium">{t('advocaciaLanding.hero.stats')}</span>
                  </div>
                </div>
              </div>

              {/* Authority Dominance Dashboard */}
              <div className="relative h-[500px] lg:h-[600px] w-full">
                <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/40 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] p-6 lg:p-10 overflow-hidden group">
                   {/* Grid Pattern Overlay */}
                   <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
                   
                   <div className="relative z-10 h-full flex flex-col justify-between">
                     {/* Dashboard Header */}
                     <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{t('advocaciaLanding.hero.dashboard.statusLabel')}</div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                             {t('advocaciaLanding.hero.dashboard.statusValue')} <ShieldCheck className="w-5 h-5 text-emerald-400" />
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-bold animate-pulse">
                          {t('advocaciaLanding.hero.dashboard.live')}
                        </div>
                     </div>

                     {/* Central Score Wheel - Stylized */}
                     <div className="flex justify-center items-center py-8">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                           <svg className="w-full h-full transform -rotate-90">
                              <circle cx="96" cy="96" r="88" className="stroke-slate-800 fill-none" strokeWidth="6" />
                              <circle cx="96" cy="96" r="88" className="stroke-violet-500 fill-none" strokeWidth="8" strokeDasharray="553" strokeDashoffset="44" strokeLinecap="round" />
                           </svg>
                           <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-5xl font-bold text-slate-900 dark:text-white leading-none">92</span>
                              <span className="text-xs text-slate-500 font-bold tracking-tighter mt-1 uppercase">{t('advocaciaLanding.hero.dashboard.scoreLabel')}</span>
                           </div>
                        </div>
                     </div>

                     {/* Stats Indicators */}
                     <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 xs:gap-6">
                        <div className="p-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl space-y-3 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                           <div className="flex items-center gap-2 text-violet-400 font-bold text-sm">
                              <TrendingUp className="w-4 h-4" /> {t('advocaciaLanding.hero.dashboard.growthLabel')}
                           </div>
                           <div className="text-3xl font-bold text-slate-900 dark:text-white">{t('advocaciaLanding.hero.dashboard.growthValue')}</div>
                           <div className="text-xs text-slate-500">{t('advocaciaLanding.hero.dashboard.growthSub')}</div>
                        </div>
                        <div className="p-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl space-y-3 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                           <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                              <Award className="w-4 h-4" /> {t('advocaciaLanding.hero.dashboard.positionLabel')}
                           </div>
                           <div className="text-3xl font-bold text-slate-900 dark:text-white">{t('advocaciaLanding.hero.dashboard.positionValue')}</div>
                           <div className="text-xs text-slate-500">{t('advocaciaLanding.hero.dashboard.positionSub')}</div>
                        </div>
                     </div>
                   </div>

                   {/* Decorative elements inside the card */}
                   <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-violet-600/30 transition-colors" />
                </div>
                
                {/* Floating Tooltips for depth */}
                <div className="hidden lg:block absolute -left-12 top-1/4 p-4 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl animate-bounce-slow">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                         <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                         <div className="text-[10px] text-slate-500 font-bold uppercase">{t('advocaciaLanding.hero.dashboard.targetReached')}</div>
                         <div className="text-sm font-bold text-slate-900 dark:text-white">{t('advocaciaLanding.hero.dashboard.eliteFirm')}</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-30 select-none">
               <ChevronDown className="w-8 h-8 text-white" />
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: A AGITAÇÃO DO PROBLEMA (SITUAÇÃO) */}
        <section className="relative py-24 bg-slate-100 dark:bg-slate-900/20 border-y border-slate-200 dark:border-white/5 overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-violet-600/5 blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="text-center space-y-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white tracking-tight">
                {t('advocaciaLanding.problem.titlePart1')} <br className="hidden md:block"/> 
                <span className="italic text-violet-700 dark:text-violet-300">{t('advocaciaLanding.problem.titleItalic')}</span> {t('advocaciaLanding.problem.titlePart2')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-10 text-left items-start">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-light first-letter:text-5xl first-letter:font-playfair first-letter:text-violet-600 dark:first-letter:text-violet-400 first-letter:mr-3 first-letter:float-left">
                  {t('advocaciaLanding.problem.description1')}
                </p>
                <div className="space-y-6">
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                    {t('advocaciaLanding.problem.description2')}
                  </p>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light italic border-l border-violet-500/30 pl-6">
                    {t('advocaciaLanding.problem.highlight')}
                  </p>
                </div>
              </div>

              <div className="pt-8">
                 <div className="inline-block relative">
                    <div className="absolute inset-0 bg-violet-400 blur-2xl opacity-10 animate-pulse" />
                    <span className="relative flex flex-col items-center gap-2">
                       <span className="h-px w-24 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></span>
                       <span className="py-4 px-8 text-2xl md:text-3xl font-playfair font-bold text-violet-700 dark:text-violet-300 tracking-tight">
                          {t('advocaciaLanding.problem.footer')}
                       </span>
                       <span className="h-px w-24 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></span>
                    </span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 3: DIAGNÓSTICO DE GARGALOS (PROBLEMA & IMPLICAÇÃO) */}
        <section className="py-32 bg-white dark:bg-slate-950 px-6 relative overflow-hidden">
          {/* Decorative background flare */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
                {t('advocaciaLanding.diagnostics.badge')}
              </div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white">
                {t('advocaciaLanding.diagnostics.title')}
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-400 font-light leading-relaxed">
                {t('advocaciaLanding.diagnostics.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Target,
                  title: t('advocaciaLanding.diagnostics.cards.0.title'),
                  description: t('advocaciaLanding.diagnostics.cards.0.description'),
                  color: "violet"
                },
                {
                  icon: Users,
                  title: t('advocaciaLanding.diagnostics.cards.1.title'),
                  description: t('advocaciaLanding.diagnostics.cards.1.description'),
                  color: "blue"
                },
                {
                  icon: TrendingUp,
                  title: t('advocaciaLanding.diagnostics.cards.2.title'),
                  description: t('advocaciaLanding.diagnostics.cards.2.description'),
                  color: "indigo"
                },
                {
                  icon: BarChart3,
                  title: t('advocaciaLanding.diagnostics.cards.3.title'),
                  description: t('advocaciaLanding.diagnostics.cards.3.description'),
                  color: "emerald"
                }
              ].map((item, idx) => (
                <div key={idx} className="group relative">
                  {/* Card Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
                  
                  <div className="relative h-full bg-slate-50 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/5 p-8 rounded-2xl hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-slate-200 dark:bg-slate-800/50 flex items-center justify-center mb-6 relative overflow-hidden group-hover:bg-slate-300 dark:group-hover:bg-slate-800 transition-colors">
                       <div className={`absolute inset-0 bg-${item.color}-500/10 blur-lg`} />
                       <item.icon className={`w-7 h-7 text-${item.color}-400 relative z-10`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">{item.title}</h3>
                    <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed font-light">
                      {item.description}
                    </p>
                    
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                          {t('advocaciaLanding.diagnostics.impactLabel')} <span className="w-1 h-1 rounded-full bg-red-500/50 animate-pulse"></span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO 4: A SOLUÇÃO (NECESSIDADE) */}
        <section className="py-32 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-white/5 px-6 relative overflow-hidden">
          {/* Methodology Line Visual in Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
             <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-violet-500 -translate-y-1/2" />
             <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-violet-400 -translate-y-1/2" />
             <div className="absolute top-1/2 left-3/4 w-2 h-2 rounded-full bg-violet-500 -translate-y-1/2" />
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <div className="space-y-4">
                  <span className="text-violet-600 dark:text-violet-400 text-sm font-bold uppercase tracking-[0.3em]">{t('advocaciaLanding.methodology.badge')}</span>
                  <h3 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white leading-tight">
                    {t('advocaciaLanding.methodology.title')} <br/>
                    <span className="text-slate-400 dark:text-slate-500">{t('advocaciaLanding.methodology.subtitle')}</span>
                  </h3>
                </div>
                
                <div className="prose prose-slate dark:prose-invert prose-lg text-slate-700 dark:text-slate-400 font-light leading-relaxed">
                   <p>
                     {t('advocaciaLanding.methodology.description1')} 
                   </p>
                   <p>
                     {t('advocaciaLanding.methodology.description2')}
                   </p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: t('advocaciaLanding.methodology.steps.0.title'),
                    desc: t('advocaciaLanding.methodology.steps.0.description'),
                    color: "blue"
                  },
                  {
                    icon: Briefcase,
                    title: t('advocaciaLanding.methodology.steps.1.title'),
                    desc: t('advocaciaLanding.methodology.steps.1.description'),
                    color: "violet"
                  },
                  {
                    icon: TrendingUp,
                    title: t('advocaciaLanding.methodology.steps.2.title'),
                    desc: t('advocaciaLanding.methodology.steps.2.description'),
                    color: "emerald"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="group flex gap-6 p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300">
                    <div className="shrink-0">
                       <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center border border-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
                          <item.icon className={`w-7 h-7 text-${item.color}-400`} />
                       </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">{item.title}</h4>
                      <p className="text-slate-700 dark:text-slate-400 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 5: SOBRE A BRANDS */}
        <section id="sobre" className="py-32 bg-slate-100 dark:bg-slate-950 px-6 relative overflow-hidden">
           {/* Sophisticated background flare */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
           
           <div className="container mx-auto max-w-5xl relative z-10">
              <div className="bg-white/95 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200 dark:border-white/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
                 {/* Internal decorative lines */}
                 <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
                                  <div className="flex flex-col items-center text-center space-y-10 relative z-10">
                    <div className="relative">
                       <div className="absolute inset-0 bg-violet-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                       <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center relative z-10 border border-violet-500/30">
                          <Image src="/lightning-icon.svg" width={48} height={48} alt="Logo" className="w-12 h-12" />
                       </div>
                    </div>
                    
                    <div className="space-y-6 max-w-3xl">
                       <h2 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white tracking-tight">
                         {t('advocaciaLanding.about.title')} <br className="md:hidden"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400">{t('advocaciaLanding.about.highlight')}</span>
                       </h2>
                       
                       <div className="h-px w-20 bg-violet-500/30 mx-auto" />
                       
                       <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xl font-light">
                         {t('advocaciaLanding.about.content')}
                       </p>
                    </div>

                    <div className="pt-4 flex items-center gap-4 text-violet-500/60 font-bold text-xs uppercase tracking-[0.4em]">
                       <span className="w-12 h-px bg-violet-500/20"></span>
                       {t('advocaciaLanding.about.badge')}
                       <span className="w-12 h-px bg-violet-500/20"></span>
                    </div>
                  </div>
              </div>
           </div>
        </section>

        {/* SEÇÃO 6: CTA FINAL FORM */}
        <section id="agendar" className="py-32 bg-white dark:bg-slate-950 px-6 relative overflow-hidden border-t border-slate-200 dark:border-white/5">
           {/* Final background intense glow */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-violet-600/10 blur-[150px] pointer-events-none" />
           
           <div className="container mx-auto max-w-6xl relative z-10">
              <div className="flex flex-col items-center text-center space-y-16">
                 <div className="space-y-6 max-w-4xl">
                    <h2 className="text-5xl md:text-7xl font-playfair font-bold text-slate-900 dark:text-white leading-[1.05] tracking-tight">
                       {t('advocaciaLanding.cta.titlePart1')} <span className="text-violet-600 dark:text-violet-400">{t('advocaciaLanding.cta.titleHighlight')}</span><br/>
                       {t('advocaciaLanding.cta.titlePart2')}
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                       {t('advocaciaLanding.cta.description')}
                    </p>
                 </div>

                 <div className="w-full max-w-md space-y-8">
                    <button 
                       onClick={() => contactForm?.openForm()}
                       className="w-full bg-gradient-to-r from-violet-600 to-blue-600 dark:bg-white text-white dark:text-slate-950 hover:from-violet-500 hover:to-blue-500 dark:hover:bg-violet-50 font-bold px-10 py-6 rounded-2xl transition-all duration-500 shadow-[0_10px_40px_-5px_rgba(124,58,237,0.3)] dark:shadow-[0_10px_40px_-5px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_60px_-5px_rgba(124,58,237,0.5)] dark:hover:shadow-[0_20px_60px_-5px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 text-xl flex items-center justify-center gap-4 group"
                    >
                       {t('contactCta.button')}
                       <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-500 text-sm font-bold uppercase tracking-widest">
                       <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          {t('advocaciaLanding.cta.check1')}
                       </div>
                       <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          {t('advocaciaLanding.cta.check2')}
                       </div>
                    </div>
                 </div>

                 {/* Elite Trust Indicator */}
                 <div className="pt-20 opacity-40">
                    <span className="text-[10px] font-bold tracking-[1em] text-slate-500 uppercase">
                       {t('advocaciaLanding.cta.trustIndicator')}
                    </span>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
