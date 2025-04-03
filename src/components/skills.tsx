"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IconCloud } from './IconCloud';


export const TechStack = () => {
  // Define technology slugs for the IconCloud
  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
  ];

  // Technology categories for structuring the visual presentation
  const categories = [
    { name: "Languages", color: "from-blue-500/20 to-teal-500/20" },
    { name: "Frameworks", color: "from-teal-500/20 to-purple-500/20" },
    { name: "Tools & Infrastructure", color: "from-purple-500/20 to-orange-500/20" },
    { name: "Design & Collaboration", color: "from-orange-500/20 to-blue-500/20" },
  ];

  // Map slugs to image URLs for the IconCloud component
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

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
              <motion.div
                key={category.name}
                className={`px-5 py-3 rounded-full bg-gradient-to-r ${category.color} border border-slate-700 shadow-lg`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(45, 212, 191, 0.5)' }}
              >
                <span className="text-sm font-medium">{category.name}</span>
              </motion.div>
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
            <div className="relative flex size-full items-center justify-center overflow-hidden bg-accent-foreground">
              <IconCloud images={images} />
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