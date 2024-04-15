'use client'
// import { useAccount } from "@/context/context";
// import { useContext } from "react";
import Image from 'next/image';
import { useMediaQuery } from '@react-hook/media-query'

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"

import { ContainerScroll } from '@/components/container-scroll-animation';
import { LampWhatIsAssetify } from '@/components/lamp';


export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)")


  return (
    <>
      <div className='gradient z-0' />

      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="w-full flex justify-center mt-10">
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

      </main>

      {/* Text below */}
      <div>
        <div>
          <h2>

          </h2>

          <LampWhatIsAssetify />
        </div>


        <div>
          <div>
            <p className="text-xl sm:text-2xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
              Who said trading assets on the blockchain had to be hard?
            </p>
          </div>

          <div>
            <p>
              Assetofy is a decentralized platform that allows you to trade assets on the blockchain with ease. Our platform is built on the Ethereum blockchain, which means that you can trade assets without the need for a middleman, while also keeping complete security and transparency.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}


