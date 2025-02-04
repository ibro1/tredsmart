import { type MetaFunction } from "@remix-run/node"
import { IconBrain, IconChartBar, IconRobot, IconShieldLock } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { Link } from "@remix-run/react"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: "How It Works - TredSmarter",
    description:
      "Discover how our platform combines AI-powered analysis with automated trading to help you make smarter cryptocurrency investment decisions.",
  })

const features = [
  {
    icon: IconBrain,
    title: "AI-Powered Analysis",
    description:
      "Our advanced AI algorithms continuously monitor and analyze crypto influencers' activities, identifying potential trading opportunities and market trends.",
  },
  {
    icon: IconRobot,
    title: "Automated Trading",
    description:
      "Execute trades automatically based on influencer signals with customizable strategies, risk management, and position sizing.",
  },
  {
    icon: IconChartBar,
    title: "Performance Analytics",
    description:
      "Track and analyze your trading performance with detailed metrics, historical data, and comprehensive reporting tools.",
  },
  {
    icon: IconShieldLock,
    title: "Security First",
    description:
      "Your security is our priority with features like 2FA, IP whitelisting, and hardware wallet support for safe trading.",
  },
]

const steps = [
  {
    number: "01",
    title: "Sign Up & Connect",
    description:
      "Create your account and connect your preferred crypto wallet. We support multiple wallet types for maximum flexibility and security.",
  },
  {
    number: "02",
    title: "Configure Your Strategy",
    description:
      "Set up your trading preferences, risk parameters, and choose which influencers to track. Customize alerts and notifications.",
  },
  {
    number: "03",
    title: "Monitor & Trade",
    description:
      "Watch real-time influencer activities and market movements. Execute trades manually or let our automated system handle it based on your strategy.",
  },
  {
    number: "04",
    title: "Track & Optimize",
    description:
      "Review your performance, analyze trade history, and refine your strategy using our comprehensive analytics tools.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
            <h1 className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              How TredSmarter Works
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Discover how our platform combines AI-powered analysis with automated
              trading to help you make smarter cryptocurrency investment decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Key Features
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Our platform combines cutting-edge technology with user-friendly features
              to give you the edge in crypto trading.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((Feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 3) }}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-primary-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-800"
              >
                <div className="mb-4 inline-block rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-900/50">
                  <Feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {Feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{Feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Getting Started is Easy
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Follow these simple steps to start trading with TredSmarter
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 7) }}
                className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-primary-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-800"
              >
                <div className="mb-4 text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Join TredSmarter today and start trading smarter with AI-powered insights.
            </p>
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-glow-primary"
            >
              Create Your Account
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
