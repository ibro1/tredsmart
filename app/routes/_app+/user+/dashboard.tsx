import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node"
import { Link, useLoaderData, useRouteError } from "@remix-run/react"
import {
  IconWallet,
  IconChartLine,
  IconBrandTwitter,
  IconArrowRight,
  IconAlertCircle,
} from "@tabler/icons-react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useEffect, useState, useCallback } from "react"

import { Card } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { requireUser } from "~/helpers/auth"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"
import { getSolanaBalance, shortenAddress } from "~/lib/solana/utils"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `Dashboard - TredSmart`,
    description: `View your portfolio performance and wallet status`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await requireUser(request)
  return json({ user })
}

export function ErrorBoundary() {
  const error = useRouteError()
  const reload = useCallback(() => {
    window.location.reload()
  }, [])
  console.log(error)
  return (
    <div className="app-container space-y-8">
      <header className="app-header">
        <h1 className="text-2xl font-bold">Dashboard Error</h1>
      </header>

      <Alert variant="destructive">
        <IconAlertCircle className="h-5 w-5" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="mt-2 flex flex-col gap-2">
          <p>
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred while loading the dashboard."}
          </p>
          <div className="flex gap-2">
            <Button onClick={reload} variant="outline" size="sm">
              Try again
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/">Return home</Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default function UserDashboardRoute() {
  const { user } = useLoaderData<typeof loader>()
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    async function fetchBalance() {
      if (!publicKey || !connected) return
      try {
        const solBalance = await getSolanaBalance(connection, publicKey)
        setBalance(solBalance)
      } catch (error) {
        throw new Error(
          "Failed to fetch wallet balance. Please check your connection and try again."
        )
      }
    }

    fetchBalance()
  }, [publicKey, connected, connection])

  return (
    <div className="app-container space-y-8">
      <header className="app-header items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.fullname}
          </p>
        </div>
        <WalletMultiButton />
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Wallet Status */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <IconWallet className="h-5 w-5 text-muted-foreground" />
                <h2 className="font-semibold">Wallet Status</h2>
              </div>
              {connected && publicKey ? (
                <>
                  <p className="mt-2 text-2xl font-bold">
                    {balance.toFixed(4)} SOL
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {shortenAddress(publicKey.toBase58())}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Connect your wallet to view balance
                </p>
              )}
            </div>
            <Link
              to="/user/wallet"
              className="text-sm text-primary hover:underline"
            >
              Manage Wallet
            </Link>
          </div>
        </Card>

        {/* Portfolio Performance */}
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <IconChartLine className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">Portfolio Performance</h2>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold">
              ${(balance * 95).toFixed(2)} USD
            </p>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </div>
          <Link
            to="/app/user/portfolio"
            className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View Details
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <IconBrandTwitter className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">Influencer Activity</h2>
          </div>
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">
              No recent influencer activity
            </p>
          </div>
          <Link
            to="/app/user/activity"
            className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View All Activity
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link to="/user/wallet">Manage Wallet</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/user/portfolio">View Portfolio</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/user/settings">Settings</Link>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          {connected ? (
            <div className="mt-4">
              <Link
                to="/user/wallet"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View All Transactions
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Connect your wallet to view transactions
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
