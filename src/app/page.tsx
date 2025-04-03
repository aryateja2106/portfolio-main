'use client';

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import Experience from "@/components/experience";
import { Qualities } from "@/components/qualities";
import { Projects } from "@/components/projects";
import { Blogs } from "@/components/blogs";
import { TechStack } from "@/components/skills";
import { motion } from "framer-motion";
import Image from "next/image";
import Robot from "../../public/assets/Robot.png";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export default function Page() {
  return (
    <div className="relative w-full">
      {/* Robot positioned conditionally based on screen size */}
      {/* On larger screens: positioned as floating element */}
      {/* On mobile/tablet: hidden (will be shown within Hero section) */}
      <motion.div 
        className="absolute right-1/9 top-90 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ 
          scale: 1.03,
          transition: { duration: 0.3 }
        }}
      >
        <div className="relative">
          <Image
            src={Robot}
            alt="Deconstructed Robot Light"
            className="w-72 object-cover drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]"
            priority
          />
          <div className="absolute -z-50 h-64 w-64 bottom-20 right-0 bg-[conic-gradient(transparent,rgb(0,0,0))] opacity-15 blur-2xl dark:bg-[conic-gradient(transparent,rgb(255,255,255))]" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400/5 to-transparent blur-xl" />
        </div>
      </motion.div>

      {/* Main content container */}
      <div className="w-full px-4 md:max-w-4xl lg:px-0 pb-28 pt-20 m-auto space-y-28 overflow-hidden">
        <div className="flex flex-col items-center">
          {/* Robot for mobile/tablet views */}
          <motion.div 
            className="md:hidden w-full flex justify-center"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative">
              <Image
                src={Robot}
                alt="Deconstructed Robot Light"
                className="w-64 object-cover drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                priority
              />
              <div className="absolute -z-50 h-64 w-64 bottom-20 right-0 bg-[conic-gradient(transparent,rgb(0,0,0))] opacity-15 blur-2xl dark:bg-[conic-gradient(transparent,rgb(255,255,255))]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400/5 to-transparent blur-xl" />
            </div>
          </motion.div>

          <Hero />
        </div>
        <About/>
        <Experience/>
        <TechStack/>
        <Qualities/>
        <Projects/>
        <Blogs/>
      </div>
    </div>
  )
}