import { type MetaFunction } from "@remix-run/node"
import { Link, useNavigation } from "@remix-run/react"
import { IconArrowRight, IconBrandTwitter, IconChartBar, IconRobot, IconShieldLock } from "@tabler/icons-react"
import { motion } from "framer-motion"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading amazing things...</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              Smart Crypto Trading with
              <br />
              Influencer Insights
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Monitor crypto influencers in real-time, analyze their recommendations with AI, and automate your trading with advanced risk management features.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-glow-primary"
              >
                Start Trading
                <IconArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/50 px-8 py-4 font-semibold text-gray-700 backdrop-blur-sm transition-all hover:border-primary-200 hover:bg-primary-50 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:border-primary-800 dark:hover:bg-primary-900/50"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Why Choose TredSmarter?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Our platform combines AI-powered analysis with real-time influencer tracking to give you the edge in crypto trading.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 3) }}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-primary-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-800"
              >
                <div className="mb-4 inline-block rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-900/50">
                  {getFeatureIcon(feature.icon)}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Ready to Transform Your Crypto Trading?
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Join thousands of traders who are already leveraging influencer insights for smarter trading decisions.
            </p>
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-glow-primary"
            >
              Get Started Now
              <IconArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Data
const features = [
  {
    icon: "twitter",
    title: "Real-time Influencer Tracking",
    description: "Monitor top crypto influencers and their trading recommendations as they happen.",
  },
  {
    icon: "ai",
    title: "AI-Powered Analysis",
    description: "Advanced AI algorithms analyze influencer tweets to identify potential trading opportunities.",
  },
  {
    icon: "chart",
    title: "Smart Trading Automation",
    description: "Automate your trades based on influencer signals with customizable risk management.",
  },
  {
    icon: "security",
    title: "Advanced Security",
    description: "Your assets are protected with industry-leading security measures and best practices.",
  },
  {
    icon: "chart",
    title: "Performance Analytics",
    description: "Track your trading performance with detailed analytics and insights.",
  },
  {
    icon: "ai",
    title: "Risk Management",
    description: "Set stop-loss and take-profit levels automatically for each trade.",
  },
]

function getFeatureIcon(type: string) {
  switch (type) {
    case "twitter":
      return <IconBrandTwitter className="h-6 w-6" />
    case "ai":
      return <IconRobot className="h-6 w-6" />
    case "chart":
      return <IconChartBar className="h-6 w-6" />
    case "security":
      return <IconShieldLock className="h-6 w-6" />
    default:
      return null
  }
}
