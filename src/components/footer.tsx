"use client";
import Link from "next/link";
import React from "react";

export const Footer = () => {
	return (
		<footer id="contact" className="relative mt-32 pb-6 overflow-hidden">
			{/* Background with subtle gradient overlay */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute inset-0 bg-black" />
				
				{/* Subtle gradient accents */}
				<div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-full bg-teal-500/5 blur-[120px]" />
				<div className="absolute right-1/4 top-1/3 translate-x-1/4 -translate-y-1/2 w-[250px] h-[150px] rounded-full bg-purple-500/5 blur-[100px]" />
			</div>

			<div className="container mx-auto px-6 pt-16">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
					{/* Brand/Identity column */}
					<div className="md:col-span-4 space-y-5">
						<h3 className="text-2xl font-bold text-neutral-100">Arya Teja<span className="text-teal-400">.</span></h3>
						<p className="text-neutral-400 max-w-sm">
							Crafting intelligent{" "}
							<span className="text-teal-400">AI solutions</span> with code,
							creativity & a passion for innovation.
						</p>
						<p className="text-neutral-500">Thanks for stopping by!</p>
					</div>

					{/* Quick Links column */}
					<div className="md:col-span-3 md:ml-auto">
						<h4 className="text-lg font-medium text-neutral-200 mb-5">Quick Links</h4>
						<nav className="flex flex-col space-y-3">
							<Link
								href="/"
								className="text-neutral-400 hover:text-teal-400 transition-colors duration-300"
							>
								Home
							</Link>
							<Link
								href="#about"
								className="text-neutral-400 hover:text-teal-400 transition-colors duration-300"
							>
								About
							</Link>
							<Link
								href="#projects"
								className="text-neutral-400 hover:text-teal-400 transition-colors duration-300"
							>
								Projects
							</Link>
							<Link
								href="#blog"
								className="text-neutral-400 hover:text-teal-400 transition-colors duration-300"
							>
								Blog
							</Link>
							<Link
								href="#contact"
								className="text-neutral-400 hover:text-teal-400 transition-colors duration-300"
							>
								Contact
							</Link>
						</nav>
					</div>

					{/* Contact/Social column */}
					<div className="md:col-span-5 space-y-8">
						<div>
							<h4 className="text-lg font-medium text-neutral-200 mb-5">Get in Touch</h4>
							<div className="bg-neutral-900/50 border border-neutral-800/60 rounded-lg backdrop-blur-sm p-5">
								<p className="text-neutral-300 mb-5">
									AI Engineer & Marketing Specialist with a passion for creating
									intelligent solutions that deliver measurable business impact.
								</p>

								<div className="grid grid-cols-2 gap-3">
									<Link
										href="mailto:admin@aryateja.com"
										className="flex items-center justify-center py-2.5 px-4 bg-neutral-800/80 hover:bg-teal-500/20 border border-neutral-700 hover:border-teal-500/40 rounded-md text-sm text-neutral-300 hover:text-teal-400 transition-all duration-300"
									>
										<svg
											aria-hidden="true"
											className="w-4 h-4 mr-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
										Email Me
									</Link>
									<Link
										href="#schedule"
										className="flex items-center justify-center py-2.5 px-4 bg-neutral-800/80 hover:bg-teal-500/20 border border-neutral-700 hover:border-teal-500/40 rounded-md text-sm text-neutral-300 hover:text-teal-400 transition-all duration-300"
									>
										<svg
											aria-hidden="true"
											className="w-4 h-4 mr-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
										Schedule Call
									</Link>
								</div>
							</div>
						</div>

						<div>
							<h4 className="text-lg font-medium text-neutral-200 mb-5">Connect</h4>
							<div className="flex space-x-4">
								{/* GitHub */}
								<Link
									href="https://github.com/aryateja2106"
									target="_blank"
									rel="noopener noreferrer"
									className="group"
									aria-label="GitHub"
								>
									<div className="w-11 h-11 rounded-full bg-neutral-900/80 border border-neutral-800 hover:border-teal-500/40 hover:bg-teal-500/10 flex items-center justify-center text-neutral-400 group-hover:text-teal-400 transition-all duration-300">
										<svg
											aria-hidden="true"
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
										</svg>
									</div>
								</Link>
								
								{/* LinkedIn */}
								<Link
									href="https://www.linkedin.com/in/arya-teja-rudraraju/"
									target="_blank"
									rel="noopener noreferrer"
									className="group"
									aria-label="LinkedIn"
								>
									<div className="w-11 h-11 rounded-full bg-neutral-900/80 border border-neutral-800 hover:border-teal-500/40 hover:bg-teal-500/10 flex items-center justify-center text-neutral-400 group-hover:text-teal-400 transition-all duration-300">
										<svg
											aria-hidden="true"
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
										</svg>
									</div>
								</Link>
								
								{/* X (Twitter) */}
								<Link
									href="https://x.com/r_aryateja"
									target="_blank"
									rel="noopener noreferrer"
									className="group"
									aria-label="X (Twitter)"
								>
									<div className="w-11 h-11 rounded-full bg-neutral-900/80 border border-neutral-800 hover:border-teal-500/40 hover:bg-teal-500/10 flex items-center justify-center text-neutral-400 group-hover:text-teal-400 transition-all duration-300">
										<svg 
											aria-hidden="true" 
											className="w-4 h-4" 
											fill="currentColor" 
											viewBox="0 0 24 24" 
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z" />
										</svg>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom bar with copyright and links */}
				<div className="pt-8 border-t border-neutral-800/60 flex flex-col md:flex-row justify-between items-center text-sm">
					<p className="text-neutral-500">&copy; {new Date().getFullYear()} Arya Teja Rudraraju | Portfolio. All rights reserved.</p>
					<div className="flex space-x-8 mt-4 md:mt-0">
						<Link
							href="/privacy"
							className="text-neutral-500 hover:text-teal-400 transition-colors duration-300"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="text-neutral-500 hover:text-teal-400 transition-colors duration-300"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
