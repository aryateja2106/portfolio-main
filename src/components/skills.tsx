"use client"
import React from 'react';

type TechItem = {
  name: string;
  icon: string;
  color: string;
  textColor?: string;
};

export const TechStack = () => {
  // AI & Machine Learning
  const aiTech: TechItem[] = [
    { name: 'Python', icon: '🐍', color: 'bg-blue-900/30' },
    { name: 'LangChain', icon: '🔗', color: 'bg-green-900/30' },
    { name: 'Crew AI', icon: '👥', color: 'bg-purple-900/30' },
    { name: 'TensorFlow', icon: '📊', color: 'bg-orange-900/30' },
    { name: 'OpenAI', icon: '🧠', color: 'bg-teal-900/30' },
  ];

  // Programming & Web Development
  const webTech: TechItem[] = [
    { name: 'JavaScript', icon: 'JS', color: 'bg-yellow-900/30', textColor: 'text-yellow-400' },
    { name: 'TypeScript', icon: 'TS', color: 'bg-blue-900/30', textColor: 'text-blue-400' },
    { name: 'NextJS', icon: 'N', color: 'bg-white/10', textColor: 'text-white' },
    { name: 'React', icon: '⚛️', color: 'bg-blue-900/30' },
    { name: 'API Integration', icon: '🔌', color: 'bg-purple-900/30' },
  ];

  // Automation & Tools
  const toolsTech: TechItem[] = [
    { name: 'Zapier', icon: '⚡', color: 'bg-orange-900/30' },
    { name: 'Make', icon: '⚙️', color: 'bg-green-900/30' },
    { name: 'Google Cloud', icon: '☁️', color: 'bg-blue-900/30' },
    { name: 'CRM Systems', icon: '👥', color: 'bg-purple-900/30' },
    { name: 'Data Analytics', icon: '📈', color: 'bg-teal-900/30' },
  ];

  // Marketing & Creative
  const marketingTech: TechItem[] = [
    { name: 'Adobe Suite', icon: 'Ps', color: 'bg-blue-900/30', textColor: 'text-blue-400' },
    { name: 'Content Gen', icon: '✍️', color: 'bg-purple-900/30' },
    { name: 'SEO', icon: '🔍', color: 'bg-green-900/30' },
    { name: 'Social Media', icon: '📱', color: 'bg-blue-900/30' },
    { name: 'Email Marketing', icon: '📧', color: 'bg-yellow-900/30' },
  ];

  // Hardware & Infrastructure
  const hardwareTech: TechItem[] = [
    { name: 'Raspberry Pi', icon: '🥧', color: 'bg-red-900/30' },
    { name: 'NVIDIA GPU', icon: '🖥️', color: 'bg-green-900/30' },
    { name: 'Linux', icon: '🐧', color: 'bg-yellow-900/30' },
    { name: 'Git', icon: '📝', color: 'bg-orange-900/30' },
    { name: 'Postman', icon: '📬', color: 'bg-orange-900/30' },
  ];

  const renderTechItems = (items: TechItem[]) => {
    return items.map((item) => (
      <div 
        key={item.name} 
        className={`flex items-center space-x-2 px-4 py-2 rounded-full ${item.color} border border-slate-700 hover:border-teal-500/50 transition-all duration-300`}
      >
        <span className={`flex items-center justify-center w-6 h-6 ${item.textColor || 'text-white'}`}>
          {item.icon}
        </span>
        <span className="text-sm font-medium">{item.name}</span>
      </div>
    ));
  };

  return (
    <section className="w-full mt-28 relative overflow-hidden">
      {/* Abstract 3D element in the background */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-md opacity-20 pointer-events-none z-0 blur-sm">
        <div className="aspect-square rounded-full bg-gradient-to-br from-slate-700/30 via-teal-500/20 to-transparent transform rotate-45" />
      </div>

      <div className="relative z-10">
        <p className="text-center text-gray-400 mb-2 tracking-widest text-sm">I CONSTANTLY TRY TO IMPROVE</p>
        <h2 className="text-5xl font-bold text-center mb-16">My Tech Stack</h2>

        <div className="max-w-4xl mx-auto">
          {/* AI & Machine Learning */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {renderTechItems(aiTech)}
          </div>

          {/* Programming & Web Development */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {renderTechItems(webTech)}
          </div>

          {/* Automation & Tools */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {renderTechItems(toolsTech)}
          </div>

          {/* Marketing & Creative */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {renderTechItems(marketingTech)}
          </div>

          {/* Hardware & Infrastructure */}
          <div className="flex flex-wrap justify-center gap-3">
            {renderTechItems(hardwareTech)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;