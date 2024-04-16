'use client'
// import { useAccount } from "@/context/context";
// import { useContext } from "react";
import Image from 'next/image';
import { useMediaQuery } from '@react-hook/media-query'
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";


import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"

import { ContainerScroll } from '@/components/container-scroll-animation';
import { LampWhatIsAssetify } from '@/components/lamp';
import { CanvasRevealEffect } from '@/components/canvasRevealEffect';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    function handleResize() {
      setIsDesktop(window.innerWidth > 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <div className='gradient z-0' />

      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="w-full flex justify-center ">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold text-black dark:text-white">
                  Unleash the power of <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                    Blockchain Asset Trading
                  </span>
                </h1>
              </>
            }

          >
            {!isDesktop && (
              <Image
                src="/marketplace_ss.png"
                layout="responsive"
                width={1}
                height={1}
                alt="Assetofy Crypto trader transparent background laptop and phone image"
                className="mx-auto rounded-2xl object-contain h-full w-full"
                draggable={false}
              />
            )}

            {isDesktop && (
              <iframe className='rounded-2xl h-full w-full min-w-max' src="https://www.youtube.com/embed/nyTA5NxHLIQ?si=tcQQ9i4t77okOCpm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            )}

          </ContainerScroll>
        </div>

        <div>

          <div className="mx-auto max-w-7xl p-6 py-16 md:py-24 lg:px-8">
            <div className="grid items-start justify-between gap-5 md:grid-cols-2">
              <div className="pr-8 text-3xl/[1.07] font-bold tracking-tight md:pr-16 md:text-4xl/[1.07]">
                <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                  Who said trading real world assets on the blockchain has to be hard?
                </span>
              </div>

              <div className="text-lg text-zinc-400/80">
                <span className="text-lg text-zinc-400/80">
                  <span className='from-pink-500 to-blue-500 bg-gradient-to-br bg-clip-text text-transparent'>Assetify</span> is a <span className='underline'>decentralized</span> platform that allows you to trade <span className='text-zinc-200'>real-world</span> assets on the blockchain with ease. Our platform is built on the Ethereum blockchain, which means that you can trade assets without the need for a middleman, while also keeping complete <span className='text-zinc-200'>security</span> and <span className='text-zinc-200'>transparency</span>.
                </span>
              </div>
            </div>
          </div>

          {/* Who are we? */}

          {/* Text saying Who are we? */}
          <div className="mx-auto max-w-7xl p-6 py-16 md:py-24 lg:px-8">
            <div className="w-full flex md:justify-center lg:justify-center sm:justify-start">
              <div className="pr-8 text-3xl/[1.07] font-bold tracking-tight md:pr-16 md:text-4xl/[1.07]">
                <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                  Who are we?
                </span>
              </div>
            </div>
          </div>


          <div className="grid items-start justify-between gap-5 md:grid-cols-2">
            <div className="pr-8 text-3xl/[1.07] font-bold tracking-tight md:pr-16 md:text-4xl/[1.07]">
              <Card title="Hristiyana Angelova" icon={<AceternityIcon />}>
                <CanvasRevealEffect
                  animationSpeed={3}
                  containerClassName="bg-black"
                  colors={[
                    [236, 72, 153],
                    [232, 121, 249],
                  ]}
                  dotSize={2}
                />
              </Card>
            </div>


            <div className="text-lg text-zinc-400/80">
              <Card title="Filostratos Titopoulos" icon={<AceternityIcon />}>
                <CanvasRevealEffect
                  animationSpeed={5.1}
                  containerClassName="bg-emerald-900"
                />
              </Card>
            </div>

          </div>


        </div >

      </main>


    </>
  );
}




const Card = ({
  title,
  icon,
  children,
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem]"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};

const AceternityIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
        style={{ mixBlendMode: "darken" }}
      />
    </svg>
  );
};

export const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
