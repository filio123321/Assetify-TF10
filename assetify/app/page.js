'use client'
import { useAccount } from "@/context/context";
import { useEffect } from "react";

export default function Home() {
  const { signer, connect, logout } = useAccount();

  useEffect(() => {
    console.log("signer: ", signer);
  }, [signer]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Conditionally render the account address if it exists */}
      {signer && (
        <div className="text-center">
          <p>Address: {signer.getAddress()}</p>
        </div>
      )}
    </main>
  );
}
