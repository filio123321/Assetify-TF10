// 'use client'
// import { useAccount } from "@/context/context";
// import { useContext } from "react";
import Image from 'next/image';

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"



export default function Home() {
  // const {
  //   account, connectWallet, error, balance, count,
  //   refreshCounter, incrementCounter, setNumber
  // } = useContext(AppContext);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="box" >
        {/* TItle */}
        <div className="font-bold lg:text-5xl text-4xl text-center max-w-screen-auto drop-shadow-lg pt-8">
          <div className='w-max-screen-md'>
            <p className="bg-gradient-to-r from-pink-500 to-indigo-500 inline-block text-transparent bg-clip-text">Blockchain</p> real world asset marketplace
          </div>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-20 max-w-screen-auto">
          <div className="lg:w-1/2 lg:text-2xl text-xl">
            <span className='lg:text-3xl text-2xl'>T</span>he revolutionary decentralised platform for tokenizing real world assets onto the blockchain network.
          </div>

          <div className="lg:w-1/2 flex justify-center relative w-1/2 h-64 lg:h-auto">
            <Image
              src="/crypto-web-trader.png"
              layout="responsive"
              width={500}
              height={300}
              alt="Assetofy Crypto trader transparent background laptop and phone image"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </main >
  );
}
