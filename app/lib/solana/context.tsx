import { useMemo, useEffect } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { getClientEnv } from "~/utils/env.shared"
import { RPCManager } from "./rpc-manager"

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const env = getClientEnv()

  useEffect(() => {
    RPCManager.initialize(env.RPC_URL || "")
  }, [env.RPC_URL])

  const endpoint = useMemo(() => RPCManager.getCurrentEndpoint(), [])

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
