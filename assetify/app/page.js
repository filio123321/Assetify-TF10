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

      <main className="flex min-h-full flex-col items-center justify-between p-4 lg:p-16">
        <div className="w-full flex items-center justify-center p-2 lg:p-8">
          <div className='font-bold text-3xl lg:text-5xl text-center max-w-[90%] lg:max-w-[60%] drop-shadow-lg'>
            <p className="bg-gradient-to-r from-pink-500 to-indigo-500 inline-block text-transparent bg-clip-text">Blockchain</p> real world asset marketplace
          </div>
        </div>

        <div className="flex flex-col items-center mt-4 lg:mt-10 w-full">
          <div className="text-xl lg:text-2xl text-center max-w-[80%] lg:max-w-[40%]">
            <span className='lg:text-3xl text-2xl'>T</span>he <span className='bg-gradient-to-r from-white via-indigo-500 to-pink-500 inline-block text-transparent bg-clip-text'>revolutionary</span> <span className='text-pink-500'>decentralised</span> platform for <span className='text-pink-500'>tokenizing</span> real world assets onto the <span className='text-pink-500'>blockchain</span> <span className='bg-gradient-to-r from-pink-500  to-indigo-500 inline-block text-transparent bg-clip-text'>network</span>.
          </div>

          <div className="w-full flex justify-center">
            <ContainerScroll>
              <Image
                src="/marketplace_ss.png"
                layout="responsive"
                width={500}
                height={300}
                alt="Assetofy Crypto trader transparent background laptop and phone image"
                objectFit="contain"
              />
            </ContainerScroll>
          </div>

        </div>
      </main>
    </>
  );
}


