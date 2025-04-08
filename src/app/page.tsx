'use client';

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import Experience from "@/components/experience";
import { Qualities } from "@/components/qualities";
import { Projects } from "@/components/projects";
import { Blogs } from "@/components/blogs";
import { TechStack } from "@/components/skills";


export default function Page() {
  return (
    <div className="relative w-full">
      <Hero />
      {/* Main content container */}
      <div className="w-full px-4 md:max-w-4xl lg:px-0 pb-28 pt-20 m-auto space-y-28 overflow-hidden">
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