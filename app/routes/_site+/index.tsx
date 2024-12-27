import { type MetaFunction } from "@remix-run/node"
import { Link, useNavigation } from "@remix-run/react"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: "payFlow - Invoicing Made Simple",
    description:
      "Streamline your invoicing and payment management with payFlow. Perfect for sole business owners.",
  })

export default function IndexRoute() {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  return (
    <div className="min-h-screen">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      {/* Hero/Overview Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Simplify Your Business Finances
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Create, manage, and get paid for your invoices with ease.
            Built specifically for sole business owners.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
              Get Started Free
            </Link>
            <Link
              to="#features"
              className="inline-block rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Everything You Need
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg p-6 text-center shadow-lg transition hover:shadow-xl"
              >
                <div className="mb-4 text-4xl text-blue-600">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            What Our Users Say
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-lg"
              >
                <p className="mb-4 italic text-gray-600">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="rounded-lg border p-6 shadow-lg transition hover:shadow-xl"
              >
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <p className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </p>
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="block w-full rounded-lg bg-blue-600 py-3 text-center text-white transition hover:bg-blue-700"
                >
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Data
const features = [
  {
    icon: "📋",
    title: "Smart Invoicing",
    description: "Create and send professional invoices in seconds with our intuitive interface."
  },
  {
    icon: "💳",
    title: "Secure Payments",
    description: "Accept payments online with our secure payment processing system."
  },
  {
    icon: "📊",
    title: "Financial Insights",
    description: "Track your business performance with detailed analytics and reports."
  }
]

const testimonials = [
  {
    quote: "payFlow has completely transformed how I handle my business finances. It's a game-changer!",
    name: "Sarah Johnson",
    role: "Freelance Designer"
  },
  {
    quote: "The automated reminders have helped me get paid faster. My cash flow has never been better.",
    name: "Michael Chen",
    role: "Marketing Consultant"
  },
  {
    quote: "Simple, efficient, and professional. Everything a small business owner needs.",
    name: "Emma Davis",
    role: "Business Coach"
  }
]

const pricingPlans = [
  {
    name: "Starter",
    price: "0",
    features: [
      "Up to 5 invoices/month",
      "Basic reporting",
      "Email support",
      "Single user"
    ]
  },
  {
    name: "Professional",
    price: "29",
    features: [
      "Unlimited invoices",
      "Advanced reporting",
      "Priority support",
      "Multiple payment methods"
    ]
  },
  {
    name: "Enterprise",
    price: "99",
    features: [
      "Everything in Professional",
      "Custom branding",
      "API access",
      "Dedicated account manager"
    ]
  }
]
