import { Connection } from "@solana/web3.js"
import { retry } from "~/utils/retry"

export class RPCManager {
  private static endpoints: string[] = []
  private static currentIndex = 0
  private static retryCount = 0
  private static MAX_RETRIES = 3

  static initialize(mainEndpoint: string) {
    this.endpoints = [
      mainEndpoint,
      "https://api.mainnet-beta.solana.com",
      "https://solana-api.projectserum.com",
      "https://rpc.ankr.com/solana",
    ].filter(Boolean)
  }

  static getCurrentEndpoint(): string {
    return this.endpoints[this.currentIndex]
  }

  static rotateEndpoint() {
    this.currentIndex = (this.currentIndex + 1) % this.endpoints.length
    return this.getCurrentEndpoint()
  }

  static async createConnection(): Promise<Connection> {
    const endpoint = this.getCurrentEndpoint()
    const connection = new Connection(endpoint, "confirmed")

    try {
      await retry(
        async () => {
          await connection.getLatestBlockhash()
        },
        {
          retries: 2,
          delay: 1000,
          onRetry: (attempt, error) => {
            if (error.message.includes("429")) {
              this.rotateEndpoint()
            }
            console.warn(`RPC attempt ${attempt} failed, rotating to ${this.getCurrentEndpoint()}`)
          },
        }
      )
      return connection
    } catch (error) {
      console.error("All RPC endpoints failed", error)
      throw error
    }
  }
}
