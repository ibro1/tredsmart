import { Link } from "@remix-run/react"
import { IconBrandGithub, IconBrandTwitter, IconBrandDiscord } from "@tabler/icons-react"

export function SiteFooter() {
  return (
    <footer className="bg-secondary-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">TredSmarter</h4>
            <p className="text-sm text-gray-400">
              Real-time cryptocurrency influencer tracking platform with AI-powered analysis and automated trading capabilities.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/tredsmarter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Follow us on Twitter"
              >
                <IconBrandTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://discord.gg/tredsmarter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Join our Discord community"
              >
                <IconBrandDiscord className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/tredsmarter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="View our GitHub repository"
              >
                <IconBrandGithub className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/influencers" 
                  className="text-gray-400 hover:text-white"
                >
                  Influencer Tracking
                </Link>
              </li>
              <li>
                <Link 
                  to="/trades" 
                  className="text-gray-400 hover:text-white"
                >
                  Auto Trading
                </Link>
              </li>
              <li>
                <Link 
                  to="/analytics" 
                  className="text-gray-400 hover:text-white"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link 
                  to="/wallet" 
                  className="text-gray-400 hover:text-white"
                >
                  Wallet Management
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/docs" 
                  className="text-gray-400 hover:text-white"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  to="/api" 
                  className="text-gray-400 hover:text-white"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-400 hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-gray-400 hover:text-white"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/risk" 
                  className="text-gray-400 hover:text-white"
                >
                  Risk Disclosure
                </Link>
              </li>
              <li>
                <Link 
                  to="/fees" 
                  className="text-gray-400 hover:text-white"
                >
                  Fee Structure
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} TredSmarter. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                to="/terms" 
                className="text-sm text-gray-400 hover:text-white"
              >
                Terms
              </Link>
              <Link 
                to="/privacy" 
                className="text-sm text-gray-400 hover:text-white"
              >
                Privacy
              </Link>
              <Link 
                to="/risk" 
                className="text-sm text-gray-400 hover:text-white"
              >
                Risk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
