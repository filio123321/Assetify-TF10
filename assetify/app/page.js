// 'use client'
// import { useAccount } from "@/context/context";
// import { useContext } from "react";
import Image from 'next/image';

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"

import { ContainerScroll } from '@/components/container-scroll-animation';


export default function Home() {
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
            <Image
              src="/marketplace_ss.png"
              layout="responsive"
              width={1}
              height={1}
              alt="Assetofy Crypto trader transparent background laptop and phone image"
              className="mx-auto rounded-2xl object-contain h-full w-full"
              draggable={false}
            />

          </ContainerScroll>
        </div>

      </main>
    </>
  );
}


