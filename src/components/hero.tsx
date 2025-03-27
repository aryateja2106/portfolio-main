import Image from 'next/image'

import { Typewriter } from './typewriter'

import Robot from '../../public/assets/Robot.png'

export function Hero() {
  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-between">
      <div className="absolute -z-50 h-64 w-64 bg-[conic-gradient(transparent,rgb(0,0,0))] opacity-15 blur-2xl dark:bg-[conic-gradient(transparent,rgb(255,255,255))] md:left-36" />

      <div className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 opacity-10 dark:opacity-5 md:hidden">
        <Image
          src={Robot}
          alt="Deconstructed Robot Light"
          className="w-96 object-cover"
        />
      </div>

      <div className="flex w-full items-center gap-12 md:justify-between">
        <div className="flex w-full flex-col items-center gap-4 md:w-fit md:items-start">
          <span className="w-min font-bold text-black drop-shadow-2xl dark:text-neutral-50 md:w-max">
            <span className="text-5xl text-teal-400">Arya Teja</span> <br /> <span className="text-7xl text-neutral-400">Rudraraju</span>
          </span>
          <span className="flex w-full items-center justify-center text-center text-2xl text-neutral-400 md:min-h-fit md:justify-start md:text-left md:text-3xl">
            <Typewriter
              words={[
                  'AI Engineer',
                  'LLM Enthusiast',
                  'Automation Specialist',
                  'Full stack developer'
                ]}
              loop
            />
          </span>
        </div>
        <div className="hidden flex-1 items-center justify-end md:flex">
          <Image
            src={Robot}
            alt="Deconstructed Robot Light"
            className="w-72 object-cover"
          />
          <div className="absolute -z-50 h-64 w-64 bg-[conic-gradient(transparent,rgb(0,0,0))] opacity-40 blur-2xl dark:bg-[conic-gradient(transparent,rgb(255,255,255))] md:right-0" />
        </div>
      </div>
    </div>
  )
}