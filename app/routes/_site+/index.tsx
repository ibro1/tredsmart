import { type MetaFunction } from "@remix-run/node"
import { Link, useNavigation } from "@remix-run/react"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: "TredSmarter - Crypto Influencer Trading Platform",
    description:
      "Real-time crypto influencer tracking platform with AI-powered analysis and automated trading. Monitor influencers, analyze tweets, and execute trades with advanced risk management.",
  })

export default function IndexRoute() {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  return (
    <div className="min-h-screen">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
            <p className="mt-2 text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            Smart Crypto Trading with Influencer Insights
          </h1>
          <p className="mb-8 text-xl text-gray-200">
            Monitor crypto influencers in real-time, analyze their recommendations with AI, and automate your trading with advanced risk management features.
          </p>
          <div className="space-x-4">
            <Link
              to="/dashboard"
              className="inline-block rounded-full bg-gradient-bitcoin px-8 py-4 font-semibold text-white transition hover:opacity-90"
            >
              Start Trading
            </Link>
            <Link
              to="/docs"
              className="inline-block rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Core Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white/10 backdrop-blur-lg p-6 transition-all hover:scale-105"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-400">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Advanced Trading Features</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
                <h3 className="mb-4 text-2xl font-semibold">Order Types</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Market & Limit Orders
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Stop-loss with Auto Execution
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Take-profit Orders
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    DCA with Customizable Intervals
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
                <h3 className="mb-4 text-2xl font-semibold">Risk Management</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Position Size Limits
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Maximum Allocation per Token
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Previous Purchase Detection
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Trading Frequency Limits
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-8">
              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
                <h3 className="mb-4 text-2xl font-semibold">Wallet Management</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Import & Generate Wallets
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Hardware Wallet Support
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Multi-signature Support
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    2FA & IP Whitelisting
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
                <h3 className="mb-4 text-2xl font-semibold">Fee Management</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    0.1% Base Fee per Trade
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    5% Success Fee on Profits
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Network Gas Fee Estimation
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Fee Analytics & Reporting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Data
const features = [
  {
    icon: "🎯",
    title: "Influencer Monitoring",
    description: "Real-time tracking and analysis of crypto influencers on Twitter",
    points: [
      "Automated tweet collection",
      "Historical analysis",
      "Performance metrics",
      "Influencer rankings"
    ]
  },
  {
    icon: "🤖",
    title: "AI-Powered Analysis",
    description: "Advanced natural language processing for crypto-related content",
    points: [
      "Token identification",
      "Sentiment analysis",
      "Price impact prediction",
      "Trade suggestions"
    ]
  },
  {
    icon: "⚡",
    title: "Automated Trading",
    description: "Execute trades automatically with comprehensive risk management",
    points: [
      "Multiple order types",
      "Position management",
      "Risk controls",
      "Helius RPC integration"
    ]
  }
]
