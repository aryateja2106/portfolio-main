"use client"
import React from 'react';

type Project = {
  logo: string;
  company: string;
  website: string;
  category: string;
  period: string;
  role: string;
  description: string;
};

export const Projects = () => {
  const projects: Project[] = [
    {
      logo: '/images/projects/golf.svg',
      company: 'Tee Time Platform',
      website: 'intelligentbooking.ai',
      category: 'AI Integration',
      period: '2024 - Present',
      role: 'Lead AI Engineer',
      description: 'Architected and deployed an intelligent tee time aggregation platform connecting with 15 different golf course booking systems and implementing ML algorithms for availability prediction.'
    },
    {
      logo: '/images/projects/content.svg',
      company: 'LLM Content Engine',
      website: 'ispeakai.com',
      category: 'Generative AI',
      period: '2023 - 2024',
      role: 'AI Implementation Specialist',
      description: 'Pioneered integration of various Large Language Models for multi-modal content creation, generating text, image, video, 3D, and audio assets with consistent brand voice.'
    },
    {
      logo: '/images/projects/crm.svg',
      company: 'Marketing Automation',
      website: 'hempsynergistics.com',
      category: 'Workflow Automation',
      period: '2023 - 2024',
      role: 'Automation Engineer',
      description: 'Developed sophisticated CRM integration with automation tools like Zapier and Make, creating data-driven marketing workflows that increased client engagement by 35%.'
    },
    {
      logo: '/images/projects/analytics.svg',
      company: 'AI Analytics Dashboard',
      website: 'hexagon-tech.com',
      category: 'Data Visualization',
      period: '2024',
      role: 'AI Solutions Architect',
      description: 'Built custom analytics platform with AI-powered insights for a Pittsburgh roofing client, optimizing their customer acquisition funnel and improving conversion rates.'
    },
    {
      logo: '/images/projects/student.svg',
      company: 'CRM Automation System',
      website: 'duq.edu',
      category: 'Process Automation',
      period: '2022 - 2023',
      role: 'Automation Developer',
      description: 'Implemented AI tools to automate manual CRM tasks for international student recruitment, enhancing data management capabilities and improving workflow efficiency.'
    },
  ];

  return (
    <section id="projects" className="w-full mt-28">
      <div className="flex items-center mb-6">
        <svg 
          aria-hidden="true"
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-teal-400 mr-3"
        >
          <path 
            d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-3xl font-bold mr-4">My projects</h2>
        <div className="h-px bg-gray-600 flex-grow"/>
      </div>
      <p className="text-gray-400 mb-12 text-lg">
        Navigating AI implementation challenges with technical expertise and business acumen.
      </p>

      <div className="space-y-6">
        {projects.map((project) => (
          <div 
            key={project.company} 
            className="bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-slate-800 rounded-md p-3 mr-4">
                    {/* This would be replaced with an actual image once available */}
                    <div className="w-10 h-10 text-teal-400 flex items-center justify-center text-xl font-bold">
                      {project.company.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{project.company}</h3>
                    <p className="text-gray-500 text-sm">{project.website}</p>
                  </div>
                  <span className="ml-4 px-3 py-1 bg-slate-800 rounded-full text-xs text-gray-400">
                    {project.category}
                  </span>
                </div>
                <span className="text-gray-400">{project.period}</span>
              </div>
              
              <div className="mb-2">
                <h4 className="text-lg font-medium text-teal-400">{project.role}</h4>
              </div>
              
              <p className="text-gray-300">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;