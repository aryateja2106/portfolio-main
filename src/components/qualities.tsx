"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Quality = {
  title: string;
  description: string;
  emoji: string;
};

export const Qualities = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const qualities: Quality[] = [
    {
      title: "Passion",
      description:
        "An unwavering passion that grows beyond boundaries, shaping innovative AI solutions with every project I undertake.",
      emoji: "∞",
    },
    {
      title: "Innovation",
      description:
        "Constantly seeking creative approaches to leverage AI and automation, turning complex business challenges into elegant solutions.",
      emoji: "💡",
    },
    {
      title: "Technical Aptitude",
      description:
        "Blending AI expertise with practical programming skills to build intelligent systems that deliver measurable business impact.",
      emoji: "⚙️",
    },
    {
      title: "Adaptability",
      description:
        "Quickly learning and applying new technologies and methodologies, from LLMs to marketing automation across diverse industries.",
      emoji: "🔄",
    },
    {
      title: "Client-Focused",
      description:
        "Maintaining 90%+ satisfaction rates by translating technical concepts into clear business value propositions for stakeholders.",
      emoji: "🤝",
    },
  ];

  // Store qualities length in a ref to avoid dependency in useCallback
  const qualitiesLengthRef = useRef(qualities.length);

  const goToPrevious = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? qualitiesLengthRef.current - 1 : prevIndex - 1
    );
  };

  const goToNext = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === qualitiesLengthRef.current - 1 ? 0 : prevIndex + 1
    );
  }, []);   

  // Auto-rotate qualities every 5 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "left" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
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
        apart from a positive attitude and polite demeanour
      </p>

      <div className="flex flex-col md:flex-row items-stretch gap-10 md:gap-16 md:min-h-[20rem] relative overflow-hidden">
        {/* Left side - Card with emoji */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 flex flex-col items-center justify-center shadow-xl relative overflow-hidden z-10">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                className="text-9xl text-white text-center glow"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
                custom={direction}
              >
                {qualities[currentIndex].emoji}
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 right-4 text-teal-500/10 text-9xl font-bold">
              {currentIndex + 1}
            </div>
          </div>
        </div>

        {/* Right side - Description */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="text-teal-400 mr-3">
                {qualities[currentIndex].title}
              </span>
              <div className="h-px bg-teal-500/30 w-24" />
            </h3>
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.p
                key={currentIndex}
                className="text-lg text-gray-300 leading-relaxed max-w-xl"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
                custom={direction}
              >
                {qualities[currentIndex].description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Navigation and indicators */}
          <div className="mt-auto">
            {/* Indicators */}
            <div className="flex gap-2 mb-6">
              {qualities.map((q, index) => (
                <button
                  title={q.title}
                  type="button"
                  key={q.title}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentIndex
                      ? "bg-teal-400 w-8"
                      : "bg-gray-600 w-4 hover:bg-gray-500"
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? "left" : "right");
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors border border-gray-700 hover:border-teal-500 group"
                aria-label="Previous quality"
              >
                <span className="text-teal-400 group-hover:scale-125 transition-transform">
                  ←
                </span>
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors border border-gray-700 hover:border-teal-500 group"
                aria-label="Next quality"
              >
                <span className="text-teal-400 group-hover:scale-125 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .glow {
          text-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Qualities;
