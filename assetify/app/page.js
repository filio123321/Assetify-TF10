'use client'
// import { useAccount } from "@/context/context";
import { useEffect, useContext, useState } from "react";

// import { AppContext } from "@/context/context";

import { ethers } from 'ethers'
import { Counter__factory } from '@/generated/contract-types'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"



export default function Home() {
  // const { account, connectWallet, error } = useContext(AppContext);


  // useEffect(() => {
  //   console.log("account: ", account);
  // }, [account]);
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState()
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(0)
  const [time, setTime] = useState(Date.now())
  const COUNTER_ADDRESS = '0x97d0d80Dc46D56EE7342b47BAd2211C23b509e78'


  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const provider = new ethers.providers.StaticJsonRpcProvider()
    const counter = Counter__factory.connect(COUNTER_ADDRESS, provider)
    if (counter) {
      counter.number().then((count) => {
        setCount(count.toNumber())
      })
    }
  }, [time])

  const handleConnectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    setAddress(await signer.getAddress())
    setBalance(ethers.utils.formatEther(await signer.getBalance()))
  }

  const handleRefresh = async () => {
    const provider = new ethers.providers.StaticJsonRpcProvider()
    const counter = Counter__factory.connect(COUNTER_ADDRESS, provider)
    const n = await counter.number()
    setCount(n.toNumber())
  }

  const handleIncrement = async () => {
    console.log('increment')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner()
    const counter = Counter__factory.connect(COUNTER_ADDRESS, signer)
    await counter.increment()
  }

  const handleSetNumber = async () => {
    console.log('set number')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = Counter__factory.connect(COUNTER_ADDRESS, signer)
    await contract.setNumber(number)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="box" >

        {/* 
        <h2>
          MetaMask <span className="block">Connect.</span>
        </h2>

        {account ? (
          <div className="account-box">
            <p className="shadow-border">{account}</p>
          </div>
        ) : (
          <button className="btn shadow-border" onClick={connectWallet}>
            Connect
          </button>
        )}
        {error && <p className={`error shadow-border`}>{`Error: ${error}`}</p>} */}

        {
          address ? (
            <>
              <div>{address}</div>
              <div>{balance}</div>
            </>
          ) : (
            <Button onClick={handleConnectWallet}>Connect Wallet</Button>
          )
        }

        <div className="text-3xl font-bold">Counter {count}</div>
        <Button color="light" onClick={handleRefresh}>
          Refresh Counter
        </Button>

        <div>
          <Button onClick={handleIncrement}>Increment Counter</Button>
        </div>

        <div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="number" value="Set Number" />
            </div>
            <Textarea
              id="number"
              type="number"
              placeholder="Enter number"
              value={number}
              required={true}
              onChange={(e) => setNumber(parseInt(e.target.value))}
            />
          </div>

          <Button type="submit" onClick={handleSetNumber}>
            Submit
          </Button>
        </div>


      </div>

    </main >
  );
}
