import React from 'react';
import Link from 'next/link';

export const About = () => {
  return (
    <section id="about" className="w-full">
      <h1 className="text-5xl font-bold leading-tight tracking-wider mb-14">
        I TRANSFORM IDEAS INTO <br /> INTELLIGENT SOLUTIONS
      </h1>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left column - About text */}
        <div className="flex-1 space-y-8">
          <p className="text-lg">
            My passion lies in leveraging AI and automation to create powerful business solutions. 
            Whether it&apos;s implementing LLMs to revolutionize content creation or building intelligent 
            systems that optimize marketing processes, I love taking businesses from manual 
            operations to intelligent automation.
          </p>
          
          <p className="text-lg">
            From diving into large language models in 2022 to mastering advanced AI implementation techniques, 
            I&apos;ve continually expanded my technical toolkit while maintaining a strong focus on delivering 
            measurable business outcomes. My unique background combining marketing expertise with 
            programming skills allows me to bridge the gap between business challenges and technical solutions.
          </p>
          
          <p className="text-lg">
            Each project presents unique challenges, and I ensure I learn and grow through each one, 
            delivering AI-powered solutions that businesses can rely on to drive growth and innovation. 
            Want to learn more? Here&apos;s{' '}
            <Link href="/resume" className="underline text-teal-400 hover:text-teal-300 transition-colors">
              my résumé
            </Link>
            .
          </p>
        </div>

        {/* Right column - Skills */}
        <div className="lg:max-w-md space-y-14">
          {/* Technical Skills */}
          <div className="relative">
            <h2 className="text-2xl font-bold mb-5">Technical Skills</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-teal-400 font-medium mb-1">Programming</h3>
                <p>Python, JavaScript, TypeScript, NextJS</p>
              </div>
              
              <div>
                <h3 className="text-teal-400 font-medium mb-1">Web Development</h3>
                <p>Frontend development, UI/UX, API integration</p>
              </div>
              
              <div>
                <h3 className="text-teal-400 font-medium mb-1">AI/ML</h3>
                <p>Large Language Models, Machine Learning, Generative AI</p>
              </div>
              
              <div>
                <h3 className="text-teal-400 font-medium mb-1">AI Frameworks</h3>
                <p>LangChain, Crew AI, Marketing automation</p>
              </div>
              
              <div>
                <h3 className="text-teal-400 font-medium mb-1">AI Tools</h3>
                <p>CRM integration, Zapier, Make, Data processing</p>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -right-6 top-1/3 hidden lg:block">
              <div className="w-16 h-16 rounded-full bg-teal-400/20 blur-xl"/>
            </div>
          </div>

          {/* Business Skills */}
          <div>
            <h2 className="text-2xl font-bold mb-5">Business Skills</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-teal-400 font-medium mb-1">Digital Marketing Strategy</h3>
                <p>Social media strategy, Content marketing, SEO, Analytics</p>
              </div>
              
              <div>
                <h3 className="text-teal-400 font-medium mb-1">Client Relationship Management</h3>
                <p>Discovery, Requirements gathering, Stakeholder communication</p>
              </div>
              
              <div>
                <h3 className="text-teal-400 font-medium mb-1">Project Management</h3>
                <p>Agile methodologies, Cross-functional leadership</p>
              </div>
              
              <div>
                <h3 className="text-teal-400 font-medium mb-1">Cross-cultural Communication</h3>
                <p>International marketing, Global audience targeting</p>
              </div>
              
              <div>
                <h3 className="text-teal-400 font-medium mb-1">Financial Analysis</h3>
                <p>ROI assessment, Budget optimization, Performance metrics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;