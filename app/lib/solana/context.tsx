import { useMemo } from "react"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { getClientEnv } from "~/utils/env.shared"

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const env = getClientEnv()
  const network = WalletAdapterNetwork.MainnetBeta

  const endpoint = useMemo(() => env.RPC_URL || clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
