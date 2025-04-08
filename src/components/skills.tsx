"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const TechGravity = dynamic(() => import('./tech-gravity'), { ssr: false });

// Define tech item interface
interface TechItem {
  name: string;
  color: string | null;
  background: string | null;
}

// Define the skill categories
const categories = [
  { key:1, name: "Languages", color: "from-blue-500/20 to-teal-500/20" },
  { key:2, name: "Frameworks", color: "from-teal-500/20 to-purple-500/20" },
  { key:3, name: "Tools & Infrastructure", color: "from-purple-500/20 to-orange-500/20" },
  { key:4, name: "Design & Collaboration", color: "from-orange-500/20 to-blue-500/20" },
];

// Define slug categories
const slugCategories: Record<string, TechItem[]> = {
  "Languages": [
    { name: "TypeScript", color: null, background: null },
    { name: "JavaScript", color: null, background: null },
    { name: "Dart", color: null, background: null },
    { name: "HTML5", color: null, background: null },
    { name: "CSS3", color: null, background: null },
  ],
  "Frameworks": [
    { name: "React", color: null, background: null },
    { name: "Flutter", color: null, background: null },
    { name: "Android", color: null, background: null },
    { name: "Node.js", color: null, background: null },
    { name: "Express", color: null, background: null },
    { name: "Next.js", color: null, background: null },
    { name: "Prisma", color: null, background: null },
  ],
  "Tools & Infrastructure": [
    { name: "PostgreSQL", color: null, background: null },
    { name: "Firebase", color: null, background: null },
    { name: "NGINX", color: null, background: null },
    { name: "Vercel", color: null, background: null },
    { name: "Docker", color: null, background: null },
    { name: "Git", color: null, background: null },
    { name: "Jest", color: null, background: null },
    { name: "Cypress", color: null, background: null },
  ],
  "Design & Collaboration": [
    { name: "Jira", color: null, background: null },
    { name: "GitHub", color: null, background: null },
    { name: "GitLab", color: null, background: null },
    { name: "SonarQube", color: null, background: null },
    { name: "Figma", color: null, background: null },
    { name: "Miro", color: null, background: "bg-[#ffdd33]" },
  ],
};

export const TechStack = () => {
  // Track which category is active (only one at a time)
  const [activeCategory, setActiveCategory] = useState<string>("Languages");
  // Add a key state to force re-render of TechGravity
  const [gravityKey, setGravityKey] = useState<number>(0);
  
  // Function to activate a category
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Increment the key to force re-render of TechGravity
    setGravityKey(prev => prev + 1);
  };

  return (
    <section className="w-full mt-28 relative overflow-hidden py-16">
      {/* Abstract 3D element in the background */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-md opacity-20 pointer-events-none z-0 blur-sm">
        <div className="aspect-square rounded-full bg-gradient-to-br from-slate-700/30 via-teal-500/20 to-transparent transform rotate-45" />
      </div>

      <div className="relative z-10">
        <motion.p 
          className="text-center text-gray-400 mb-2 tracking-widest text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          I CONSTANTLY TRY TO IMPROVE
        </motion.p>
        <motion.h2 
          className="text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My Tech Stack
        </motion.h2>

        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Category tiles above the icon cloud */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {categories.map((category, index) => (
              <motion.button
                key={category.key}
                onClick={() => handleCategoryClick(category.name)}
                disabled={activeCategory === category.name}
                className={`px-5 py-3 rounded-full bg-gradient-to-r ${category.color} border ${
                  activeCategory === category.name 
                    ? "border-teal-500/50 shadow-teal-500/20 shadow-lg" 
                    : "border-slate-700 hover:border-slate-600"
                } transition-all duration-300 focus:outline-none`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: activeCategory === category.name ? 1 : 1.05 }}
              >
                <span className="text-sm font-medium flex items-center gap-2">
                  {category.name}
                  {activeCategory === category.name && (
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Icon Cloud */}
          <motion.div 
            className="h-[40vh] w-1/2 mx-auto my-10 relative bg-gradient-to-b from-transparent via-slate-900/30 to-transparent rounded-3xl overflow-hidden border border-teal-500/60 shadow-teal-500/40 shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative flex size-full items-center justify-center overflow-hidden">
              <TechGravity 
                key={gravityKey} 
                slugs={slugCategories[activeCategory]} 
              />
            </div>
          </motion.div> 
          {/* Call to action or additional info */}
          <motion.p 
            className="text-center text-gray-400 mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Passionate about exploring emerging technologies and frameworks to build scalable, efficient solutions. Always learning, always improving.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;