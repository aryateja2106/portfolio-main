'use client';

import { useState, type FC, type ReactNode, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
// Fix import from framer-motion instead of motion/react
import { motion, useAnimation, AnimatePresence, type Variants } from 'framer-motion';
// Assume cn utility is available
import { cn } from '@/lib/utils'; // Make sure this path is correct for your project

// --- Project Data ---
interface Project {
  id: string;
  title: string;
  status: 'Active' | 'Passive' | 'Forked' | 'Showcase';
  // statusVariant maps to the badge color variants
  statusVariant: 'active' | 'passive' | 'forked' | 'showcase';
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
}

// Data remains the same, statusVariant keys map to new badge colors
const projectsData: Project[] = [
   {
    id: 'lesearch-ai',
    title: 'Lesearch AI - Research Advisor',
    status: 'Active',
    statusVariant: 'active', // Teal
    description: 'Building an AI research agent designed to assist users throughout their research paper reading journey, enhancing comprehension and discovery.',
    techStack: ['Next.js', 'Python', 'Langchain', 'VectorDB', 'Shadcn UI', 'AI/ML'],
    githubLink: '#', // Replace with actual link
  },
  {
    id: 'mcp-servers',
    title: 'MCP Server Experiments',
    status: 'Active',
    statusVariant: 'active', // Teal
    description: 'Integrating and testing various Multi-Context Prompting (MCP) servers (like Windsurf, Cline) within custom AI IDEs and desktop applications.',
    techStack: ['Python', 'AI/ML', 'API Integration', 'Desktop Apps'],
    githubLink: '#', // Replace with actual link
  },
  {
    id: 'openai-agents',
    title: 'OpenAI Agents SDK Exploration',
    status: 'Passive',
    statusVariant: 'passive', // Amber
    description: 'Experimenting with the OpenAI Agents SDK to understand and build autonomous agent capabilities.',
    techStack: ['Python', 'OpenAI API', 'SDK', 'AI Agents'],
    githubLink: '#', // Replace with actual link
  },
   {
    id: 'ai-inference',
    title: 'LLM Inference Libraries',
    status: 'Forked',
    statusVariant: 'forked', // Sky Blue
    description: 'Evaluating and testing different large language model inference libraries like vLLM and Nvidia TensorRT-LLM for performance and usability.',
    techStack: ['Python', 'vLLM', 'TensorRT-LLM', 'PyTorch', 'Docker'],
    githubLink: '#', // Replace with actual link
  },
  {
    id: 'bolt-ollama',
    title: 'Bolt.new + Ollama',
    status: 'Forked',
    statusVariant: 'forked', // Sky Blue
    description: 'Utilizing Bolt.new (a rapid app development tool) in conjunction with Ollama (for local model execution) to prototype small AI-powered applications.',
    techStack: ['Bolt.new', 'Ollama', 'Docker', 'AI/ML', 'Rapid Prototyping'],
    githubLink: '#', // Replace with actual link
  },
  {
    id: 'phidata',
    title: 'Phidata Agent Framework',
    status: 'Forked',
    statusVariant: 'forked', // Sky Blue
    description: 'Exploring the Phidata framework to build AI agents equipped with long-term memory, contextual knowledge access, and function-calling abilities.',
    techStack: ['Python', 'Phidata', 'AI Agents', 'VectorDB', 'Function Calling'],
    githubLink: '#', // Replace with actual link
  },
  {
    id: 'vercel-chatbot',
    title: 'big-AGI Vercel Chatbot',
    status: 'Showcase',
    statusVariant: 'showcase', // Teal (same as active)
    description: 'Developed and deployed a feature-rich chatbot application based on big-AGI, enabling professional-grade AI interactions with voice, personas, coding tools, and more.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Vercel', 'AI/ML', 'Shadcn UI'],
    githubLink: '#', // Replace with actual link
    liveLink: '#', // Add live link if available
  },
  // Add more projects here...
];

// --- Animations for Project Cards ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const accordionVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { 
    height: "auto", 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// --- UPDATED Custom Badge Component ---
interface BadgeProps {
  // Variants now include colors for status and neutral for tech stack
  variant: 'active' | 'passive' | 'forked' | 'showcase' | 'neutral-outline';
  children: ReactNode;
  className?: string;
}

const Badge: FC<BadgeProps> = ({ variant, children, className = '' }) => {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';
  // --- RESTORED COLOR VARIANT CLASSES ---
  const variantClasses = {
    // Status variants with distinct colors
    active:    'bg-teal-400/10 text-teal-400 border border-teal-400/20',
    showcase:  'bg-teal-400/10 text-teal-400 border border-teal-400/20', // Same as active
    passive:   'bg-amber-400/10 text-amber-500 border border-amber-400/20', // Amber/Orange
    forked:    'bg-sky-400/10 text-sky-500 border border-sky-400/20',       // Sky Blue
    // Neutral variant for tech stack
    'neutral-outline': 'bg-transparent text-neutral-400 border border-neutral-700 hover:bg-neutral-800/50', // Simple outline, subtle hover
  };
  const selectedVariant = variantClasses[variant] || variantClasses['neutral-outline'];

  return (
    <span className={`${baseClasses} ${selectedVariant} ${className}`}>
      {children}
    </span>
  );
};

// --- Custom Button Component (Styles remain neutral) ---
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({ variant = 'default', size = 'default', children, className = '', disabled = false, asChild = false, href, onClick, type = 'button' }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500/40 focus:ring-offset-2 focus:ring-offset-neutral-950';
  const variantClasses = {
    default: 'bg-neutral-700/80 text-neutral-100 hover:bg-neutral-700',
    outline: 'border border-neutral-700 bg-transparent hover:bg-neutral-800/60 text-neutral-300 hover:text-neutral-100',
    ghost: 'bg-transparent hover:bg-neutral-800/60 text-neutral-400 hover:text-neutral-100',
  };
  const sizeClasses = { sm: 'h-8 px-3 text-xs', default: 'h-10 px-4 py-2 text-sm', lg: 'h-11 px-8 text-base' };
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  if (asChild && href) {
    return ( <a href={href} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`} target="_blank" rel="noopener noreferrer"> {children} </a> );
  }
  return ( <button type={type} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`} disabled={disabled} onClick={onClick}> {children} </button> );
};

// --- Custom Accordion Components (Updated with animations) ---
interface AccordionProps { children: ReactNode; className?: string; }
const Accordion: FC<AccordionProps> = ({ children, className = '' }) => ( <div className={className}>{children}</div> );
interface AccordionItemProps { value: string; children: ReactNode; className?: string; }
const AccordionItem: FC<AccordionItemProps> = ({ value, children, className = '' }) => ( <div className={`${className}`} data-value={value}>{children}</div> );
interface AccordionTriggerProps { children: ReactNode; className?: string; onClick: () => void; isOpen: boolean; }
const AccordionTrigger: FC<AccordionTriggerProps> = ({ children, className = '', onClick, isOpen }) => (
    <button aria-hidden="true" type="button" aria-expanded={isOpen} className={`flex w-full items-center justify-between py-3 text-sm font-medium transition-all hover:text-neutral-100 text-neutral-400 ${className}`} onClick={onClick}>
      {children}
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="transition-transform duration-200"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      > 
        <path d="m6 9 6 6 6-6"/> 
      </motion.svg>
    </button>
);
interface AccordionContentProps { children: ReactNode; className?: string; isOpen: boolean; }
const AccordionContent: FC<AccordionContentProps> = ({ children, className = '', isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={`overflow-hidden text-sm ${className}`}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={accordionVariants}
        > 
          <div className="pb-4 pt-1">{children}</div> 
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Static ArrowRight Icon ---
const ArrowRightIcon: FC<{ className?: string }> = ({ className = '' }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"> <path d="M5 12h14"/> <path d="m12 5 7 7-7 7"/> </svg> );

// --- Animated GithubIcon Component (Provided by User) ---
export interface GithubIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface GithubIconProps {
  size?: number;
  className?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
const githubBodyVariants: Variants = { normal: { opacity: 1, pathLength: 1, scale: 1, transition: { duration: 0.3, }, }, animate: { opacity: [0, 1], pathLength: [0, 1], scale: [0.9, 1], transition: { duration: 0.4, }, }, };
const githubTailVariants: Variants = { normal: { pathLength: 1, rotate: 0, transition: { duration: 0.3, }, }, draw: { pathLength: [0, 1], rotate: 0, transition: { duration: 0.5, }, }, wag: { pathLength: 1, rotate: [0, -15, 15, -10, 10, -5, 5], transition: { duration: 2.5, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY, }, }, };

const GithubIcon = forwardRef<GithubIconHandle, GithubIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 16, ...props }, ref) => { // Default size adjusted
    const bodyControls = useAnimation();
    const tailControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: async () => { bodyControls.start('animate'); await tailControls.start('draw'); tailControls.start('wag'); },
        stopAnimation: () => { bodyControls.start('normal'); tailControls.start('normal'); },
      };
    });

    const handleMouseEnter = useCallback( async (e: React.MouseEvent<HTMLDivElement>) => { if (!isControlledRef.current) { bodyControls.start('animate'); await tailControls.start('draw'); tailControls.start('wag'); } else { onMouseEnter?.(e); } }, [bodyControls, onMouseEnter, tailControls] );
    const handleMouseLeave = useCallback( (e: React.MouseEvent<HTMLDivElement>) => { if (!isControlledRef.current) { bodyControls.start('normal'); tailControls.start('normal'); } else { onMouseLeave?.(e); } }, [bodyControls, tailControls, onMouseLeave] );

    return (
      // Removed internal padding/hover bg from icon div, let button handle it
      <div
        className={cn("select-none flex items-center justify-center", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="GitHub icon">
          <motion.path variants={githubBodyVariants} initial="normal" animate={bodyControls} d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <motion.path variants={githubTailVariants} initial="normal" animate={tailControls} d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </div>
    );
  }
);
GithubIcon.displayName = 'GithubIcon';
// Removed export { GithubIcon } as it's defined locally


// --- Custom Card Components (Updated with animations) ---
interface CardProps { children: ReactNode; className?: string; }
const Card: FC<CardProps> = ({ children, className = '' }) => ( 
  <div className={`bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-lg shadow-md overflow-hidden flex flex-col ${className}`}> 
    {children} 
  </div> 
);
interface CardHeaderProps { children: ReactNode; className?: string; }
const CardHeader: FC<CardHeaderProps> = ({ children, className = '' }) => ( <div className={`p-5 md:p-6 ${className}`}>{children}</div> );
interface CardTitleProps { children: ReactNode; className?: string; }
const CardTitle: FC<CardTitleProps> = ({ children, className = '' }) => ( <h3 className={`text-base md:text-lg font-semibold text-neutral-100 ${className}`}>{children}</h3> );
interface CardContentProps { children: ReactNode; className?: string; }
const CardContent: FC<CardContentProps> = ({ children, className = '' }) => ( <div className={`px-5 md:px-6 pb-5 md:pb-6 flex-grow ${className}`}>{children}</div> );


// --- REVISED Project Card Component ---
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const toggleTechStack = () => setIsTechStackOpen(!isTechStackOpen);
  const statusBadgeVariant = project.statusVariant;

  return (
    <motion.div variants={cardVariants}>
      <motion.div
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
      >
        <Card className="h-full hover:border-neutral-600/80 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-teal-500/10">
          <CardHeader className="pb-3 md:pb-4">
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="mb-1">{project.title}</CardTitle>
              {/* Use the mapped color badge variant */}
              <Badge variant={statusBadgeVariant} className="whitespace-nowrap mt-0.5 flex-shrink-0">
                {project.status}
              </Badge>
            </div>
          </CardHeader>

          {/* Use flex-col and flex-grow to manage space */}
          <CardContent className="flex flex-col flex-grow">
            {/* Description Section: Fixed height for alignment */}
            {/* Adjusted height slightly, ensure line-clamp works */}
            <div className="h-[72px] mb-4 overflow-hidden"> {/* Approx 3 lines height */}
              <p className="text-sm text-neutral-400 line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Links Section: Fixed height for alignment */}
            <div className="flex justify-start items-center gap-2 mb-4 pt-1 h-[32px]"> {/* Fixed height for one row of sm buttons */}
              {project.githubLink && (
                <Button variant="outline" size="sm" asChild href={project.githubLink} className="flex items-center">
                  <span>
                    {/* Use Animated GithubIcon */}
                    <GithubIcon size={14} className="mr-1.5" /> {/* Adjusted size */}
                    Code
                  </span>
                </Button>
              )}
              {project.liveLink && (
                <Button variant="outline" size="sm" asChild href={project.liveLink} className="flex items-center">
                  <span>
                    <ArrowRightIcon className="inline-block h-3.5 w-3.5 mr-1.5" />
                    Demo
                  </span>
                </Button>
              )}
              {!project.liveLink && !project.githubLink && (
                <Button variant="ghost" size="sm" disabled type="button" className="text-xs"> No Links </Button>
              )}
            </div>

            {/* Accordion for Tech Stack - Pushed to bottom */}
            <div className="mt-auto border-t border-neutral-800 pt-1">
              <Accordion className="w-full">
                <AccordionItem value={`tech-stack-${project.id}`} className="border-b-0">
                  <AccordionTrigger
                    onClick={toggleTechStack}
                    isOpen={isTechStackOpen}
                    className="text-xs uppercase tracking-wider font-semibold hover:text-neutral-100"
                  >
                    Technology Stack
                  </AccordionTrigger>
                  <AccordionContent isOpen={isTechStackOpen}>
                    {/* Use neutral-outline for tech stack badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="neutral-outline" className="text-xs font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};


// --- Main Projects Section Component ---
export const Projects: FC = () => {
  const initialProjectCount = 6;
  const displayedProjects = projectsData.slice(0, initialProjectCount);
  const hasMoreProjects = projectsData.length > initialProjectCount;

  return (
    <section id="projects" className="py-16 md:py-24 bg-neutral-950 text-neutral-200">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: 0.1
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-neutral-100">
            Projects & Contributions
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
            A selection of work I&apos;m involved in, from active development and experiments to contributions and forks.
          </p>
        </motion.div>

        {/* Grid layout with staggered animation */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* "View More" Button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {hasMoreProjects && (
            <Button variant="outline" size="lg" asChild href="https://github.com/your-username">
              <span> Explore More on GitHub <ArrowRightIcon className="inline-block h-4 w-4 ml-2" /> </span>
            </Button>
          )}
          {!hasMoreProjects && projectsData.length > 0 && (
            <p className="text-neutral-400">More projects coming soon!</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};
export default Projects;

// Helper function (if not already defined globally in your project)
// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
