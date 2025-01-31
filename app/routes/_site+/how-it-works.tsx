import { type MetaFunction } from "@remix-run/node"
import { IconBrain, IconChartBar, IconRobot, IconShieldLock } from "@tabler/icons-react"

export const meta: MetaFunction = () => {
  return [{ title: "How It Works - TredSmarter" }]
}

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
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          How TredSmarter Works
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Discover how our platform combines AI-powered analysis with automated
          trading to help you make smarter cryptocurrency investment decisions.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
          >
            <feature.icon className="mb-4 h-8 w-8 text-primary-500" />
            <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Steps Section */}
      <div className="mb-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Getting Started is Easy
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 text-3xl font-bold text-primary-500">
                {step.number}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg bg-primary-500 p-8 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mb-6 text-lg">
          Join TredSmarter today and start trading smarter with AI-powered insights.
        </p>
        <a
          href="/signup"
          className="inline-block rounded-lg bg-white px-6 py-3 text-lg font-semibold text-primary-500 transition-colors hover:bg-gray-100"
        >
          Create Your Account
        </a>
      </div>
    </div>
  )
}
