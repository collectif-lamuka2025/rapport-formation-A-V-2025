import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, RadialBarChart, RadialBar
} from 'recharts';
import { RadarDataPoint, BarDataPoint, StakeholderDataPoint, TimelineDataPoint } from '../types';

// --- Diagnosis Radar Chart ---
export const DiagnosisRadar: React.FC = () => {
  const data: RadarDataPoint[] = [
    { subject: 'Finance', A: 1, fullMark: 5 },
    { subject: 'Vie Assoc.', A: 2, fullMark: 5 },
    { subject: 'Planification', A: 1, fullMark: 5 },
    { subject: 'Projets', A: 2, fullMark: 5 },
    { subject: 'Visibilité', A: 0, fullMark: 5 },
    { subject: 'Stabilité', A: 3, fullMark: 5 },
  ];

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
          <Radar
            name="Maturité Actuelle"
            dataKey="A"
            stroke="#f97316"
            strokeWidth={3}
            fill="#f97316"
            fillOpacity={0.4}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Objectives Bar Chart ---
export const ObjectivesBar: React.FC = () => {
  const data: BarDataPoint[] = [
    { name: 'Vie Assoc', Actuel: 20, Cible: 90 },
    { name: 'Chrono.', Actuel: 10, Cible: 100 },
    { name: 'Compétences', Actuel: 25, Cible: 85 },
    { name: 'Staff RH', Actuel: 10, Cible: 100 },
    { name: 'Visibilité', Actuel: 5, Cible: 95 },
  ];

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip 
             cursor={{ fill: '#f1f5f9' }}
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="Actuel" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Situation Actuelle" />
          <Bar dataKey="Cible" fill="#1e3a8a" radius={[4, 4, 0, 0]} name="Objectif Cible" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Stakeholder Chart (Using RadialBar to mimic Polar Area elegantly) ---
export const StakeholderChart: React.FC = () => {
  const data: StakeholderDataPoint[] = [
    { name: 'Service RH', value: 5, fill: '#1e3a8a' },
    { name: 'Membres', value: 3, fill: '#f97316' },
    { name: 'Experts Ext.', value: 2, fill: '#64748b' },
    { name: 'Resp. Comm', value: 2, fill: '#9333ea' },
    { name: 'PDG', value: 1, fill: '#06b6d4' },
  ];

  return (
    <div className="h-[300px] w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="20%" 
          outerRadius="100%" 
          barSize={20} 
          data={data}
          startAngle={180} 
          endAngle={0}
        >
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff', fontSize: 10, fontWeight: 'bold' }}
            background
            dataKey="value"
            cornerRadius={10}
          />
          <Legend 
            iconSize={10} 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="text-xs text-slate-500 mt-2 text-center italic">Niveau d'implication dans le plan d'action</p>
    </div>
  );
};

// --- Timeline Doughnut ---
export const TimelineChart: React.FC = () => {
  const data: TimelineDataPoint[] = [
    { name: 'Court Terme (1-2 Mois)', value: 4, fill: '#f97316' }, // High Urgency
    { name: 'Moyen Terme (6 Mois)', value: 1, fill: '#06b6d4' },
    { name: 'Long Terme (12 Mois)', value: 2, fill: '#1e3a8a' },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle"/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};