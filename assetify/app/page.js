'use client'
import { useAccount } from "@/context/context";
import { useEffect, useContext } from "react";

import { AppContext } from "@/context/context";

export default function Home() {
  const { account, connectWallet, error } = useContext(AppContext);


  useEffect(() => {
    console.log("account: ", account);
  }, [account]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="box">
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
        {error && <p className={`error shadow-border`}>{`Error: ${error}`}</p>}
      </div>

    </main>
  );
}
