"use client"
import React, { useState } from 'react';

export const Experience = () => {
  const [activeTab, setActiveTab] = useState('hexagon');

  const experiences = {
    hexagon: {
      company: 'Hexagon Technology',
      role: 'AI Consultant',
      period: 'August 2024 - Present',
      description: [
        <span key="1">Architected and deployed an <span className="text-teal-400">intelligent tee time aggregation platform</span> connecting with 15 different golf course booking systems.</span>,
        <span key="2">Implemented <span className="text-teal-400">machine learning algorithms</span> to predict availability patterns and optimize customer experience.</span>,
        <span key="3">Redesigned web presence with <span className="text-teal-400">conversion-optimized architecture</span> for a Pittsburgh roofing client, increasing lead generation.</span>,
        <span key="4">Translated complex <span className="text-teal-400">technical concepts</span> into business value propositions for stakeholders.</span>,
        <span key="5">Led cross-functional implementation teams through <span className="text-teal-400">agile development</span> methodologies.</span>,
      ]
    },
    ispeak: {
      company: 'iSpeak AI',
      role: 'Director of AI Marketing',
      period: 'August 2023 - January 2024',
      description: [
        <span key="1">Led marketing initiatives positioning company as a top <span className="text-teal-400">&quot;AI Automation Service Provider&quot;</span> in search rankings.</span>,
        <span key="2">Pioneered integration of various <span className="text-teal-400">Large Language Models (LLMs)</span> for text, image, video, 3D, and audio content creation.</span>,
        <span key="3">Developed <span className="text-teal-400">NextJS websites</span> using TypeScript and JavaScript, delivering tailored online solutions for clients.</span>,
        <span key="4">Implemented <span className="text-teal-400">advanced analytics</span> and AI in marketing strategies, leading to a 30% improvement in campaign effectiveness.</span>,
        <span key="5">Maintained <span className="text-teal-400">client satisfaction</span> rate of over 90% through consistent delivery and clear communication.</span>,
      ]
    },
    hemp: {
      company: 'Hemp Synergistics',
      role: 'Social Media Marketing Consultant',
      period: 'May 2023 - January 2024',
      description: [
        <span key="1">Collaborated with the <span className="text-teal-400">Chief Marketing Officer</span> to develop and implement targeted social media strategy, achieving a 35% increase in appointments.</span>,
        <span key="2">Utilized <span className="text-teal-400">Generative AI</span> to create compelling content, boosting engagement rates by 60% across platforms.</span>,
        <span key="3">Implemented <span className="text-teal-400">CRM integration</span> with automation tools like Zapier and Make for post-sale client management.</span>,
        <span key="4">Pioneered innovative <span className="text-teal-400">email marketing campaigns</span>, resulting in a 35% increase in client engagement and sales.</span>,
        <span key="5">Conducted regular <span className="text-teal-400">social media analytics</span> reviews, leading to data-driven approach improving campaign ROI.</span>,
      ]
    },
    sage: {
      company: 'Sage Wealth Advisory',
      role: 'Financial Analyst Intern',
      period: 'May 2023 - August 2023',
      description: [
        <span key="1">Assisted in the development of <span className="text-teal-400">tailored investment strategies</span>, focusing on Equities and Fixed-Income.</span>,
        <span key="2">Conducted comprehensive <span className="text-teal-400">financial research</span> and analysis, contributing to portfolio strategy improvements.</span>,
        <span key="3">Developed diverse <span className="text-teal-400">portfolio strategies</span> (growth, blended, value) based on client requirements.</span>,
        <span key="4">Utilized <span className="text-teal-400">Excel</span> and Morning Star for effective data management and financial reporting.</span>,
        <span key="5">Supported <span className="text-teal-400">budget preparation</span> and financial forecasting, improving accuracy of projections.</span>,
      ]
    },
    duquesne: {
      company: 'Duquesne University',
      role: 'Graduate Assistant',
      period: 'September 2022 - May 2023',
      description: [
        <span key="1">Executed <span className="text-teal-400">digital marketing campaigns</span> for international student recruitment, increasing engagement by 40%.</span>,
        <span key="2">Utilized <span className="text-teal-400">CRM tools</span> including SLATE and Terradotta for analyzing student application data.</span>,
        <span key="3">Implemented <span className="text-teal-400">AI tools</span> to automate manual CRM tasks, enhancing efficiency and data management.</span>,
        <span key="4">Organized and managed multiple <span className="text-teal-400">events</span> for over 100 students, employing product marketing techniques.</span>,
        <span key="5">Created <span className="text-teal-400">visual content</span> using Canva to support marketing campaigns and event promotions.</span>,
      ]
    },
    yupptv: {
      company: 'YuppTV Inc.',
      role: 'Content Writing / Digital Marketing Intern',
      period: 'December 2021 - May 2022',
      description: [
        <span key="1">Created engaging <span className="text-teal-400">social media content</span>, increasing audience engagement by 30%.</span>,
        <span key="2">Managed <span className="text-teal-400">Facebook and Google Ads</span> campaigns, achieving an ROI of 150% through targeted strategies.</span>,
        <span key="3">Played key role in <span className="text-teal-400">online reputation management</span>, improving customer satisfaction by 20%.</span>,
        <span key="4">Enhanced <span className="text-teal-400">digital marketing</span> effectiveness by integrating user feedback into content strategy.</span>,
        <span key="5">Collaborated in developing <span className="text-teal-400">content marketing strategies</span>, increasing audience reach by 25%.</span>,
      ]
    },
    annapurna: {
      company: 'Annapurna Studios',
      role: 'Social Media Marketing Intern',
      period: 'August 2021 - December 2021',
      description: [
        <span key="1">Led <span className="text-teal-400">influencer outreach</span> initiatives for movie promotion campaigns.</span>,
        <span key="2">Conducted analysis of <span className="text-teal-400">influencer metrics</span> (views, engagement rates, audience demographics).</span>,
        <span key="3">Successfully collaborated with <span className="text-teal-400">20+ influencers</span>, increasing promotional reach by 35%.</span>,
        <span key="4">Analyzed <span className="text-teal-400">campaign data</span> to identify high-performing strategies for future improvements.</span>,
        <span key="5">Coordinated with <span className="text-teal-400">marketing teams</span> to align influencer content with overall promotional objectives.</span>,
      ]
    },
    ambhos: {
      company: 'AMBHOS',
      role: 'Digital Marketing Intern',
      period: 'June 2021 - August 2021',
      description: [
        <span key="1">Developed targeted <span className="text-teal-400">email marketing campaigns</span>, increasing subscriber engagement by 15%.</span>,
        <span key="2">Executed <span className="text-teal-400">on-page and off-page SEO</span> strategies, growing organic search traffic by 20%.</span>,
        <span key="3">Created engaging <span className="text-teal-400">newsletters</span> and email content, reducing unsubscribe rates.</span>,
        <span key="4">Utilized <span className="text-teal-400">Google Analytics</span> for campaign analysis and optimization.</span>,
        <span key="5">Collaborated in a <span className="text-teal-400">team environment</span>, ensuring project deliverables were met on time.</span>,
      ]
    },
  };

  return (
    <section id="experience" className="w-full mt-28">
      <h2 className="flex items-center text-3xl font-bold mb-16">
        <span className="mr-4">Where I&apos;ve </span>
        <span className="text-teal-400 mr-3">Worked</span> 
        <div className="h-px bg-gray-600 flex-grow"/>
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Company tabs */}
        <div className="md:w-64 flex md:flex-col overflow-x-auto md:overflow-visible">
          {Object.entries(experiences).map(([key, { company }]) => (
            <button
              type="button"
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-3 px-4 text-left border-l-2 whitespace-nowrap transition-all duration-300 ${
                activeTab === key 
                  ? 'bg-slate-800/50 text-teal-400 border-l-teal-400' 
                  : 'hover:bg-slate-800/30 border-l-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {company}
            </button>
          ))}
        </div>

        {/* Experience details */}
        <div className="flex-1">
          <div className="mb-2">
            <h3 className="text-2xl font-semibold">
              {experiences[activeTab as keyof typeof experiences].role}{' '}
              <span className="text-teal-400">@ {experiences[activeTab as keyof typeof experiences].company}</span>
            </h3>
            <p className="text-gray-400 mt-1">{experiences[activeTab as keyof typeof experiences].period}</p>
          </div>
          
          <ul className="space-y-4 mt-6">
            {experiences[activeTab as keyof typeof experiences].description.map((item) => (
              <li key={item.key} className="flex">
                <span className="text-teal-400 mr-2 mt-1">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;