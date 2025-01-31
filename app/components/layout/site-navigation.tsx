import { Link, NavLink, type NavLinkProps } from "@remix-run/react"
import { SiteNavigationMenu } from "~/components/layout/site-navigation-menu"
import { IconMatch } from "~/components/libs/icon"
import { IndicatorUser } from "~/components/shared/indicator-user"
import { Logo } from "~/components/shared/logo"
import { ThemeButton } from "~/components/shared/theme-button"
import { ButtonLink } from "~/components/ui/button-link"
import { configNavigationItems, type NavItem } from "~/configs/navigation"
import { configSite } from "~/configs/site"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { cn } from "~/utils/cn"

export function SiteNavigation() {
  return (
    <>
      <SiteNavigationSmall />
      <SiteNavigationLarge />
    </>
  )
}

function SiteNavigationSmall() {
  const { userSession } = useRootLoaderData()

  return (
    <nav className={cn(
      "sticky top-0 z-20 flex items-center justify-between gap-2 bg-primary-500 p-4 transition-colors lg:hidden",
    )}>
      <div className="flex items-center justify-between gap-2">
        <Link
          to="/"
          prefetch="intent"
          className="focus-ring block rounded-xs transition hover:opacity-75"
        >
          <Logo text="TredSmarter" className="text-white" />
        </Link>

        <ThemeButton size="sm" />
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/influencers"
          className="text-sm font-medium text-white hover:text-white/80"
        >
          Influencers
        </Link>
        <Link
          to="/trades"
          className="text-sm font-medium text-white hover:text-white/80"
        >
          Trades
        </Link>
        {userSession ? (
          <ButtonLink
            to="/dashboard"
            size="sm"
            className="bg-success-500 text-white hover:opacity-90"
          >
            Dashboard
          </ButtonLink>
        ) : (
          <ButtonLink
            to="/login"
            size="sm"
            className="bg-success-500 text-white hover:opacity-90"
          >
            Get Started
          </ButtonLink>
        )}
      </div>
    </nav>
  )
}

function SiteNavigationLarge() {
  const { userSession } = useRootLoaderData()

  return (
    <nav className={cn(
      "sticky top-0 z-20 hidden bg-primary-500 lg:block",
      "border-b border-white/10",
    )}>
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            prefetch="intent"
            className="focus-ring block rounded-xs transition hover:opacity-75"
          >
            <Logo text="TredSmarter" className="text-white" />
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/influencers"
              className="text-sm font-medium text-white hover:text-white/80"
            >
              Influencers
            </Link>
            <Link
              to="/trades"
              className="text-sm font-medium text-white hover:text-white/80"
            >
              Trades
            </Link>
            <Link
              to="/analytics"
              className="text-sm font-medium text-white hover:text-white/80"
            >
              Analytics
            </Link>
            <Link
              to="/docs"
              className="text-sm font-medium text-white hover:text-white/80"
            >
              Documentation
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeButton size="sm" />
          {userSession ? (
            <>
              <ButtonLink
                to="/dashboard"
                size="sm"
                className="bg-success-500 text-white hover:opacity-90"
              >
                Dashboard
              </ButtonLink>
              <IndicatorUser size="sm" />
            </>
          ) : (
            <>
              <ButtonLink
                to="/login"
                variant="ghost"
                size="sm"
                className="text-white hover:text-white/80"
              >
                Log In
              </ButtonLink>
              <ButtonLink
                to="/signup"
                size="sm"
                className="bg-success-500 text-white hover:opacity-90"
              >
                Sign Up
              </ButtonLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function NavItemLink({
  navItem,
  onClick,
}: {
  navItem: NavItem
} & Pick<NavLinkProps, "onClick">) {
  return (
    <NavLink
      key={navItem.path}
      to={navItem.path}
      onClick={onClick}
      prefetch="intent"
      className={({ isActive }) =>
        cn(
          "focus-ring flex items-center gap-2 rounded-xs px-2 py-1.5 text-[15px] transition",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          isActive && "bg-gray-100 font-medium dark:bg-gray-800",
        )
      }
    >
      <IconMatch icon={navItem.icon} className="h-4 w-4" />
      <span>{navItem.name}</span>
    </NavLink>
  )
}
