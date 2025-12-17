import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Activity, 
  Target, 
  ClipboardCheck, 
  MapPin, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Menu,
  X,
  ChevronRight,
  ArrowUp
} from 'lucide-react';
import { Section } from './components/Section';
import { DiagnosisRadar, ObjectivesBar, StakeholderChart, TimelineChart } from './components/Charts';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#context", label: "Philosophie" },
    { href: "#diagnosis", label: "Diagnostic" },
    { href: "#objectives", label: "Objectifs" },
    { href: "#action-plan", label: "Plan d'Action" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without jumping
      window.history.pushState(null, '', href);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
            <img 
              src="https://pr-gallery029.netlify.app/Stock_images/logo_lamuka_242.png" 
              alt="Logo LAMUKA" 
              className="h-10 w-auto object-contain" 
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium hover:text-orange-500 transition-colors ${scrolled ? 'text-slate-600' : 'text-slate-800'}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 z-40 bg-white pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl font-bold text-slate-900 hover:text-orange-500"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50 -z-10" />
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-100 rounded-bl-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-orange-100 rounded-tr-full blur-3xl opacity-50 -z-10" />

        <div className="container mx-auto px-4 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 mb-8 text-sm font-semibold text-blue-900">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Rapport Stratégique & Plan d'Action
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
              Collectif <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-600">LAMUKA</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
              Formation Atelier Vision • 26 Novembre 2025
            </p>

            <blockquote className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-orange-500 max-w-2xl mx-auto shadow-lg">
              <p className="text-lg text-slate-700 italic font-medium">
                "L'absence de financement est une conséquence, pas une cause. L'amélioration interne est la clé."
              </p>
            </blockquote>
          </motion.div>
        </div>
      </header>

      <main>
        {/* 1. Philosophy */}
        <Section 
          id="context" 
          title="Philosophie du Changement" 
          subtitle="Approche médicale pour résoudre les problèmes structurels du projet SIÈGE."
          icon={<Stethoscope size={32} />}
          accentColor="blue"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "Identifier les 'douleurs' de l'organisation. Comprendre que les pratiques actuelles bloquent l'accès aux partenaires.",
                color: "bg-blue-500"
              },
              {
                step: "02",
                title: "Diagnostic",
                desc: "Analyser les causes profondes. Le manque de financement est un symptôme d'un manque de gestion et d'activités.",
                color: "bg-orange-500"
              },
              {
                step: "03",
                title: "Prescription",
                desc: "Un plan d'action strict et planifiable. Une discipline rigoureuse pour garantir la 'guérison' (le succès).",
                color: "bg-cyan-500"
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 relative overflow-hidden group"
              >
                <div className={`absolute top-0 left-0 w-full h-2 ${card.color}`}></div>
                <div className="text-6xl font-black text-slate-100 absolute -bottom-4 -right-4 group-hover:text-slate-50 transition-colors duration-500 select-none">
                  {card.step}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 relative z-10">{card.title}</h3>
                <p className="text-slate-600 relative z-10 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* 2. Diagnosis */}
        <Section 
          id="diagnosis" 
          title="Diagnostic des Faiblesses" 
          subtitle="Analyse radar des axes critiques de défaillance organisationnelle."
          icon={<Activity size={32} />}
          accentColor="orange"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <AlertTriangle className="text-orange-500" />
                  Zones de Fragilité
                </h3>
                <div className="space-y-6">
                  {[
                    { title: "Gestion Financière", desc: "Absence de gestionnaire qualifié et méconnaissance budgétaire." },
                    { title: "Opérationnel", desc: "Membres instables ('épargés') et absence de chronogramme annuel." },
                    { title: "Ancrage & Visibilité", desc: "Invisible sur le terrain et sur le web (Pas de Google Maps, pas de site)." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-orange-50 transition-colors duration-300">
                      <div className="w-1 h-full bg-orange-400 rounded-full flex-shrink-0"></div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-slate-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 bg-slate-50 rounded-2xl p-4">
                <DiagnosisRadar />
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Objectives */}
        <Section 
          id="objectives" 
          title="Objectifs & Écarts" 
          subtitle="Visualisation du chemin à parcourir entre la situation actuelle et la cible."
          icon={<Target size={32} />}
          accentColor="blue"
        >
           <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-12">
             <ObjectivesBar />
             <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
               {['Vie Associative', 'Chronogramme', 'Compétences', 'Staff RH', 'Visibilité'].map((tag, i) => (
                 <div key={i} className="text-center p-3 bg-blue-50 text-blue-900 rounded-lg text-xs font-bold uppercase tracking-wider">
                   {tag}
                 </div>
               ))}
             </div>
           </div>
        </Section>

        {/* 4. Action Plan Analysis */}
        <Section 
          id="action-plan" 
          title="Analyse du Plan d'Action" 
          subtitle="Répartition de la charge de travail et temporalité."
          icon={<ClipboardCheck size={32} />}
          accentColor="cyan"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="font-bold text-xl text-slate-800">Responsabilités</h3>
                 <Users className="text-blue-500" size={20}/>
              </div>
              <StakeholderChart />
              <p className="mt-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                Le <strong>Service RH</strong> est fortement sollicité pour la restructuration initiale.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="font-bold text-xl text-slate-800">Temporalité</h3>
                 <TrendingUp className="text-orange-500" size={20}/>
              </div>
              <TimelineChart />
              <p className="mt-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                Forte concentration d'actions à <strong>Court Terme</strong> pour stabiliser les fondations.
              </p>
            </div>
          </div>
        </Section>

        {/* 5. Detailed Roadmap */}
        <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
          {/* Background Gradients */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 blur-[128px] opacity-20 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 blur-[128px] opacity-20 rounded-full"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold mb-4">Feuille de Route Opérationnelle</h3>
              <p className="text-slate-400">Le chemin vers la résilience en 4 étapes clés.</p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 h-full w-px bg-slate-700 transform md:-translate-x-1/2"></div>

              {/* Timeline Items */}
              {[
                {
                  time: "1 Mois",
                  title: "Restructuration Immédiate",
                  subtitle: "Priorité Absolue",
                  desc: "Élaboration fiches de poste, Désignation staff qualifié, Référencement Google Map.",
                  color: "bg-orange-500",
                  textColor: "text-orange-500",
                  icon: <AlertTriangle size={20} />
                },
                {
                  time: "2 Mois",
                  title: "Visibilité Physique",
                  subtitle: "Ancrage Local",
                  desc: "Conception et installation de la maquette pancarte. Matérialiser l'existence.",
                  color: "bg-blue-600",
                  textColor: "text-blue-500",
                  icon: <MapPin size={20} />
                },
                {
                  time: "6 Mois",
                  title: "Culture Associative",
                  subtitle: "Formation",
                  desc: "Session de formation intensive sur la vie associative pour tous les membres.",
                  color: "bg-blue-600",
                  textColor: "text-blue-500",
                  icon: <Users size={20} />
                },
                {
                  time: "1 An",
                  title: "Expertise & Digital",
                  subtitle: "Long Terme",
                  desc: "Formation rédaction projets, mise en place Suivi-Évaluation & Site Web.",
                  color: "bg-cyan-600",
                  textColor: "text-cyan-500",
                  icon: <TrendingUp size={20} />
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative mb-12 flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content Box */}
                  <div className="md:w-5/12 w-full pl-20 md:px-0 md:text-right group cursor-pointer">
                    <div className={`bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-${item.color.replace('bg-', '')} transition-all duration-300 hover:shadow-lg hover:shadow-${item.color.replace('bg-', '')}/20 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                        <span className={`text-xs font-bold uppercase tracking-widest ${item.textColor}`}>{item.subtitle}</span>
                      </div>
                      <h4 className="font-bold text-xl text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                    <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] border-4 border-slate-900`}>
                      <span className="text-white font-bold text-xs">{item.time}</span>
                    </div>
                  </div>

                  {/* Empty space for alternate side */}
                  <div className="md:w-5/12 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 text-center border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="mb-4 flex justify-center items-center gap-2">
            <img 
              src="https://pr-gallery029.netlify.app/Stock_images/logo_lamuka_242.png" 
              alt="Logo LAMUKA" 
              className="h-12 w-auto object-contain" 
            />
          </div>
          <p className="text-slate-500 mb-6">Projet SIÈGE • Collectif LAMUKA.</p>
          <div className="text-xs text-slate-700 uppercase tracking-widest">
            Designed by POWERFUL REACH © 2025
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors z-50"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;