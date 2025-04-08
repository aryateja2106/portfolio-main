"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const TechGravity = dynamic(() => import('./tech-gravity'), { ssr: false });

// Define the skill categories
const categories = [
  { name: "Languages", color: "from-blue-500/20 to-teal-500/20" },
  { name: "Frameworks", color: "from-teal-500/20 to-purple-500/20" },
  { name: "Tools & Infrastructure", color: "from-purple-500/20 to-orange-500/20" },
  { name: "Design & Collaboration", color: "from-orange-500/20 to-blue-500/20" },
];

export const TechStack = () => {
  // Track which category is active (only one at a time)
  const [activeCategory, setActiveCategory] = useState<string>("Languages");
  
  // Function to activate a category
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
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
                key={category.name}
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
            className="h-[60vh] w-full my-10 relative bg-gradient-to-b from-transparent via-slate-900/30 to-transparent rounded-3xl overflow-hidden border border-slate-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative flex size-full items-center justify-center overflow-hidden">
              <TechGravity activeCategory={activeCategory} />
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