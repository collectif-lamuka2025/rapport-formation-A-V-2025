import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  icon?: ReactNode;
  accentColor?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, icon, accentColor = "blue" }) => {
  return (
    <section id={id} className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            {icon && <div className={`text-${accentColor}-600`}>{icon}</div>}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              {title}
            </h2>
          </div>
          {subtitle && (
            <div className={`h-1 w-20 bg-${accentColor}-500 rounded-full mb-4`}></div>
          )}
          {subtitle && (
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};