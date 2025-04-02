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
    <div className="w-full px-4 md:max-w-4xl lg:px-0 pb-28 pt-36 m-auto space-y-28 overflow-hidden">
      <div className="flex flex-col items-center gap-24">
        <Hero />
        {/* Removed duplicate ExploreButton here */}
      </div>
      <About/>
      <Experience/>
      <TechStack/>
      <Qualities/>
      <Projects/>
      <Blogs/>
    </div>
  )
}