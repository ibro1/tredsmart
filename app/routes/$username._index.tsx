import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { AvatarAuto } from "~/components/ui/avatar-auto"
import { ButtonLink } from "~/components/ui/button-link"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { modelUser } from "~/models/user.server"
import { invariant, invariantResponse } from "~/utils/invariant"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  const user = data?.user

  if (!user) {
    return createMeta({
      title: "User profile is not found",
      description: `Cannot find user with the username ${params.username}`,
    })
  }
  return createMeta({
    title: `${user.fullname} (@${user.username})`,
    description: String(user.profiles[0]?.bio ?? ""),
  })
}

/**
 * $username splat route can check for:
 * 1. User from database
 * 2. Organization from database
 * 3. If nothing found, tell this user doesn’t exist
 */
export async function loader({ params }: LoaderFunctionArgs) {
  const username = params.username
  invariant(username, "params.username unavailable")

  const user = await modelUser.getByUsername({ username })
  invariantResponse(user, "User not found", { status: 404 })

  return json({ user })
}

export default function UsernameRoute() {
  const { userSession } = useRootLoaderData()
  const { user } = useLoaderData<typeof loader>()

  const profile = user.profiles[0]
  const isOwner = user.id === userSession?.id

  return (
    <div className="site-container space-y-8">
      <section className="site-section my-4 space-y-2">
        <div className="flex flex-wrap items-end justify-between">
          <AvatarAuto
            user={user}
            imageUrl={user.images[0]?.url}
            className="outline outline-2 outline-background"
            size="xl"
          />
          {isOwner && (
            <ButtonLink to="/user/settings" variant="outline" size="sm">
              Edit profile
            </ButtonLink>
          )}
        </div>

        <div>
          <h2>{user.fullname}</h2>
          <h3 className="text-muted-foreground">@{user.username}</h3>
        </div>
      </section>

      {profile && (
        <section className="site-section space-y-2">
          <h3>{profile.headline}</h3>
          <p className="prose-config">{profile.bio}</p>
        </section>
      )}
    </div>
  )
}
