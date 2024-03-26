'use client'
// import { useAccount } from "@/context/context";
import { useEffect, useContext, useState } from "react";

import { AppContext } from "@/context/context";

import { ethers } from 'ethers'
import { Counter__factory } from '@/generated/contract-types'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"



export default function Home() {
  const {
    account, connectWallet, error, balance, count,
    refreshCounter, incrementCounter, setNumber
  } = useContext(AppContext);


  useEffect(() => {
    console.log("account: ", account);
  }, [account]);

  // const [address, setAddress] = useState()
  // const [balance, setBalance] = useState()
  // const [count, setCount] = useState(0)
  const [_number, _setNumber] = useState(0)
  // const [time, setTime] = useState(Date.now())
  // const COUNTER_ADDRESS = '0x97d0d80Dc46D56EE7342b47BAd2211C23b509e78'


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
          account ? (
            <>
              <div>{account}</div>
              <div>{balance}</div>
            </>
          ) : (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          )
        }

        <div className="text-3xl font-bold">Counter {count}</div>
        <Button color="light" onClick={refreshCounter}>
          Refresh Counter
        </Button>

        <div>
          <Button onClick={incrementCounter}>Increment Counter</Button>
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
              value={_number}
              required={true}
              onChange={(e) => { _setNumber(parseInt(e.target.value)) }}
            />
          </div>

          <Button onClick={() => setNumber(_number)}>
            Submit
          </Button>
        </div>


      </div>

    </main >
  );
}
