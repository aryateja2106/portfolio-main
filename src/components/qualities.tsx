"use client";
import React from "react";
import { motion } from "framer-motion";

type Quality = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

export const Qualities = () => {
  const qualities: Quality[] = [
    {
      title: "Positivity",
      description:
        "Approaching AI challenges with optimism and a solutions-oriented mindset, transforming obstacles into opportunities for innovation.",
      icon: "✨",
      color: "from-teal-500/20 to-teal-500/5",
    },
    {
      title: "Passion",
      description:
        "Driven by deep enthusiasm for AI technology that fuels continuous learning and delivers excellence in every project I undertake.",
      icon: "🔥",
      color: "from-cyan-500/20 to-cyan-500/5",
    },
    {
      title: "Ambition",
      description:
        "Setting bold goals and persistently pursuing advancements that push the boundaries of what's possible with AI solutions.",
      icon: "🚀",
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      title: "Innovation",
      description:
        "Constantly exploring creative approaches to leverage AI and automation, turning complex business challenges into elegant solutions.",
      icon: "💡",
      color: "from-purple-500/20 to-purple-500/5",
    },
    {
      title: "Technical Expertise",
      description:
        "Blending AI knowledge with practical programming skills to build intelligent systems that deliver measurable business impact.",
      icon: "⚙️",
      color: "from-emerald-500/20 to-emerald-500/5",
    },
    {
      title: "Client-Focused",
      description:
        "Maintaining exceptional satisfaction rates by translating technical concepts into clear value propositions for stakeholders.",
      icon: "🤝",
      color: "from-teal-500/20 to-teal-500/5",
    },
  ];

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="qualities" className="w-full mt-28">
      <h2 className="flex items-center text-3xl font-bold mb-6">
        <span className="mr-4">What I</span>
        <span className="text-teal-400 mr-3">Bring to the Table</span>
        <div className="h-px bg-gray-600 flex-grow" />
      </h2>
      <p className="text-gray-400 mb-12 text-lg max-w-2xl">
        My core qualities that drive success in every AI solution I deliver
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qualities.map((quality, index) => (
          <motion.div
            key={quality.title}
            className="h-full"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={index}
          >
            <motion.div
              className={"h-full bg-slate-900/60 rounded-xl border border-slate-800 p-6 hover:border-teal-500/50 transition-all duration-300 flex flex-col overflow-hidden relative group"}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${quality.color} opacity-30 group-hover:opacity-40 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="mb-4 text-4xl">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {quality.icon}
                  </motion.div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-teal-400">
                  {quality.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {quality.description}
                </p>
                
                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-16 h-16 text-slate-800/30 flex items-center justify-center">
                  <div className="absolute transform rotate-45 w-20 h-2 bg-slate-700/30 -bottom-6 -right-6 group-hover:bg-teal-500/20 transition-colors duration-300" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Qualities;