'use client'
// import { useAccount } from "@/context/context";
import { useEffect, useContext, useState } from "react";

import { AppContext } from "@/context/context";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"



export default function Home() {
  const {
    account, connectWallet, error, balance, count,
    refreshCounter, incrementCounter, setNumber
  } = useContext(AppContext);

  const [_number, _setNumber] = useState(0)


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="box" >
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
