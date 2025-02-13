// import { json, redirect, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node"
// import { useNavigate } from "@remix-run/react"
// import { useWallet } from "@solana/wallet-adapter-react"
// import { useEffect, useState } from "react"
// import { Card } from "~/components/ui/card"
// import { Button } from "~/components/ui/button"
// import { IconWallet, IconPlus } from "@tabler/icons-react"
// import { authService } from "~/services/auth.server"
// import { createMeta } from "~/utils/meta"
// import { WalletLogin } from "~/components/auth/wallet-login"
// import { WalletCreate } from "~/components/auth/wallet-create"

// export const meta: MetaFunction = () =>
//   createMeta({
//     title: "Login - TredSmart",
//     description: "Connect or create your wallet to start trading",
//   })

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   return authService.isAuthenticated(request, {
//     successRedirect: "/dashboard",
//   })
// }

// export default function LoginPage() {
//   const [mode, setMode] = useState<"select" | "connect" | "create">("select")
//   const { connected } = useWallet()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (connected) {
//       navigate("/dashboard")
//     }
//   }, [connected, navigate])

//   if (mode === "connect") {
//     return <WalletLogin onBack={() => setMode("select")} />
//   }

//   if (mode === "create") {
//     return <WalletCreate onBack={() => setMode("select")} />
//   }

//   return (
//     <div className="container mx-auto max-w-lg px-4 py-12">
//       <Card className="p-6">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold">Welcome to TredSmart</h1>
//           <p className="mt-2 text-muted-foreground">
//             Connect your existing wallet or create a new one to get started
//           </p>
//         </div>

//         <div className="mt-8 grid gap-4">
//           <Button
//             size="lg"
//             className="h-auto py-4"
//             onClick={() => setMode("connect")}
//           >
//             <IconWallet className="mr-2 h-5 w-5" />
//             Connect Existing Wallet
//           </Button>
          
//           <Button
//             variant="outline"
//             size="lg"
//             className="h-auto py-4"
//             onClick={() => setMode("create")}
//           >
//             <IconPlus className="mr-2 h-5 w-5" />
//             Create New Wallet
//           </Button>
//         </div>
//       </Card>
//     </div>
//   )
// }

import { conform, useForm } from "@conform-to/react"
import { getFieldsetConstraint, parse } from "@conform-to/zod"
import { json, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node"
import { Form, useActionData, useNavigation, useSearchParams } from "@remix-run/react"
import { z } from "zod"

import { IconMatch } from "~/components/libs/icon"
import { AuthButtons } from "~/components/shared/auth-buttons"
import { SectionOr } from "~/components/shared/section-or"
import { ButtonLoading } from "~/components/ui/button-loading"
import { FormDescription, FormErrors, FormField, FormLabel } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { InputPassword } from "~/components/ui/input-password"
import { LinkText } from "~/components/ui/link-text"
import { useAppMode } from "~/hooks/use-app-mode"
import { db } from "~/libs/db.server"
import { schemaUserLogIn } from "~/schemas/user"
import { authService } from "~/services/auth.server"
import { checkPassword } from "~/utils/encryption.server"
import { createMeta } from "~/utils/meta"
import { createTimer } from "~/utils/timer"

export const meta: MetaFunction = () =>
  createMeta({
    title: `Log In`,
    description: `Continue to dashboard`,
  })

export const loader = ({ request }: ActionFunctionArgs) => {
  return authService.isAuthenticated(request, {
    successRedirect: "/user/dashboard",
  })
}

export default function SignUpRoute() {
  const actionData = useActionData<typeof action>()
  const { isModeDevelopment } = useAppMode()

  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirectTo")

  const [form, { email, password }] = useForm<z.infer<typeof schemaUserLogIn>>({
    id: "login",
    lastSubmission: actionData?.submission,
    shouldRevalidate: "onInput",
    constraint: getFieldsetConstraint(schemaUserLogIn),
    onValidate({ formData }) {
      return parse(formData, { schema: schemaUserLogIn })
    },
    defaultValue: isModeDevelopment
      ? { email: "example@example.com", password: "exampleexample" }
      : {},
  })

  return (
    <div className="site-container">
      <div className="site-section-md space-y-8">
        <header className="site-header">
          <h2 className="inline-flex items-center gap-2">
            <IconMatch icon="sign-in" />
            <span>Log in to continue</span>
          </h2>
          <p>
            Don't have an account?{" "}
            <LinkText to="/signup" className="transition hover:text-primary">
              Sign up
            </LinkText>
          </p>
        </header>

        <section className="space-y-2">
          <AuthButtons />
        </section>

        <SectionOr />

        <section>
          <Form
            replace
            action="/login"
            method="POST"
            className="flex flex-col gap-2"
            {...form.props}
          >
            <fieldset className="flex flex-col gap-2" disabled={isSubmitting}>
              {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}

              <FormField>
                <FormLabel htmlFor={email.id}>Email</FormLabel>
                <Input
                  {...conform.input(email, {
                    type: "email",
                    description: true,
                  })}
                  id={email.id}
                  placeholder="yourname@example.com"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoFocus={email.error ? true : undefined}
                  required
                />
                <FormErrors>{email}</FormErrors>
              </FormField>

              <FormField>
                <FormLabel htmlFor={password.id}>Password</FormLabel>
                <InputPassword
                  {...conform.input(password, {
                    description: true,
                  })}
                  id={password.id}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  autoFocus={password.error ? true : undefined}
                  required
                  className="w-full"
                />
                <FormDescription id={password.descriptionId}>At least 8 characters</FormDescription>
                <FormErrors>{password}</FormErrors>
              </FormField>

              <ButtonLoading type="submit" loadingText="Logging In..." isLoading={isSubmitting}>
                Log In
              </ButtonLoading>
            </fieldset>
          </Form>
        </section>
      </div>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const clonedRequest = request.clone()
  const formData = await clonedRequest.formData()

  const submission = await parse(formData, {
    async: true,
    schema: schemaUserLogIn.superRefine(async (data, ctx) => {
      const existingUser = await db.user.findUnique({
        where: { email: data.email },
        include: { password: true },
      })
      if (!existingUser) {
        ctx.addIssue({
          path: ["email"],
          code: z.ZodIssueCode.custom,
          message: "User with this email is not found",
        })
        return
      }
      if (!existingUser?.password) {
        ctx.addIssue({
          path: ["password"],
          code: z.ZodIssueCode.custom,
          message: "User cannot log in with a password. Try using 3rd party services below",
        })
        return
      }

      const isPasswordCorrect = await checkPassword(data.password, existingUser.password.hash)
      if (!isPasswordCorrect) {
        ctx.addIssue({
          path: ["password"],
          code: z.ZodIssueCode.custom,
          message: "Password is incorrect",
        })
        return
      }
    }),
  })

  await timer.delay()

  if (!submission.value || submission.intent !== "submit") {
    return json({ status: "error", submission }, { status: 400 })
  }

  return authService.authenticate("form", request, {
    successRedirect: "/user/dashboard",
  })
}