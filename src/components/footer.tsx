"use client";
import Link from "next/link";
import React from "react";

export const Footer = () => {
	return (
		<footer id="contact" className="relative mt-32 pb-6 overflow-hidden">
			{/* Background with stars and cosmic element */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute inset-0 bg-[#050816]" />

				{/* Stars effect - small dots */}
				<div className="stars-small absolute inset-0" />
				<div className="stars-medium absolute inset-0" />

				{/* Cosmic glow effect */}
				<div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-teal-500/5 blur-[100px]" />
				<div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] rounded-full bg-teal-400/10 blur-[60px]" />
			</div>

			<div className="container mx-auto px-4 pt-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
					{/* Left column */}
					<div>
						<h3 className="text-2xl font-bold mb-4">Arya Teja .</h3>
						<p className="text-gray-400 mb-6">
							Crafting intelligent{" "}
							<span className="text-teal-400">AI solutions</span> with code,
							creativity & a passion for innovation.
						</p>
						<p className="text-gray-500">Thanks for stopping by!</p>
					</div>

					{/* Middle column - Quick Links */}
					<div>
						<h4 className="text-lg font-semibold mb-6">Quick Links</h4>
						<nav className="flex flex-col space-y-3">
							<Link
								href="/"
								className="text-gray-400 hover:text-teal-400 transition-colors"
							>
								Home
							</Link>
							<Link
								href="/about"
								className="text-gray-400 hover:text-teal-400 transition-colors"
							>
								About
							</Link>
							<Link
								href="/projects"
								className="text-gray-400 hover:text-teal-400 transition-colors"
							>
								Projects
							</Link>
							<Link
								href="/blog"
								className="text-gray-400 hover:text-teal-400 transition-colors"
							>
								Blog
							</Link>
							<Link
								href="/contact"
								className="text-gray-400 hover:text-teal-400 transition-colors"
							>
								Contact
							</Link>
						</nav>
					</div>

					{/* Right column - Get in Touch & Connect */}
					<div className="space-y-8">
						<div>
							<h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
							<div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4">
								<p className="text-sm text-gray-300 mb-4">
									AI Engineer & Marketing Specialist with a passion for creating
									intelligent solutions that deliver measurable business impact.
								</p>

								<div className="grid grid-cols-2 gap-3">
									<Link
										href="mailto:aryateja2106@gmail.com"
										className="flex items-center justify-center py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-md text-sm text-gray-300 hover:text-white transition-colors"
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
										href="/contact"
										className="flex items-center justify-center py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-md text-sm text-gray-300 hover:text-white transition-colors"
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
							<h4 className="text-lg font-semibold mb-4">Connect</h4>
							<div className="flex space-x-4">
								<Link
									href="https://github.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
									aria-label="GitHub"
								>
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
									</svg>
								</Link>
								<Link
									href="https://linkedin.com/in/arya-teja-rudraraju"
									target="_blank"
									rel="noopener noreferrer"
									className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
									aria-label="LinkedIn"
								>
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
									</svg>
								</Link>
								<Link
									href="https://twitter.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
									aria-label="Twitter"
								>
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom bar with copyright and links */}
				<div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
					<p>© 2025 Arya Teja Rudraraju | Portfolio. All rights reserved.</p>
					<div className="flex space-x-6 mt-4 md:mt-0">
						<Link
							href="/privacy"
							className="hover:text-teal-400 transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="hover:text-teal-400 transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>

			{/* CSS for star effect */}
			<style jsx>{`
        .stars-small {
          background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1.5px 1.5px at 200px 50px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 250px 160px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 320px 10px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1.5px 1.5px at 400px 90px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 450px 160px, #ffffff, rgba(0, 0, 0, 0)),
                           radial-gradient(1px 1px at 500px 30px, #ffffff, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 600px 400px;
          opacity: 0.2;
        }

        .stars-medium {
          background-image: radial-gradient(2px 2px at 100px 300px, #4fd1c5, rgba(0, 0, 0, 0)),
                           radial-gradient(2px 2px at 200px 200px, #4fd1c5, rgba(0, 0, 0, 0)),
                           radial-gradient(2px 2px at 300px 400px, #4fd1c5, rgba(0, 0, 0, 0)),
                           radial-gradient(2px 2px at 500px 200px, #4fd1c5, rgba(0, 0, 0, 0)),
                           radial-gradient(2px 2px at 600px 300px, #4fd1c5, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 800px 600px;
          opacity: 0.1;
        }
      `}</style>
		</footer>
	);
};

export default Footer;
