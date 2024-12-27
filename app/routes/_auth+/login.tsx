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
    title: `Log In to payFlow`,
    description: `Access your invoicing dashboard`,
  })

export const loader = ({ request }: ActionFunctionArgs) => {
  return authService.isAuthenticated(request, {
    successRedirect: "/user/dashboard",
  })
}

export default function LoginRoute() {
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-glow">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <LinkText to="/signup" className="font-medium text-primary hover:text-primary-600">
                Sign up for free
              </LinkText>
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <AuthButtons />
          </div>

          <SectionOr />

          <Form
            replace
            method="POST"
            className="mt-8 space-y-6"
            {...form.props}
          >
            <div className="space-y-4">
              {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}

              <FormField>
                <FormLabel htmlFor={email.id} className="sr-only">
                  Email address
                </FormLabel>
                <Input
                  {...conform.input(email, {
                    type: "email",
                    description: true,
                  })}
                  id={email.id}
                  className="rounded-xl px-4 py-3"
                  placeholder="Email address"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoFocus={email.error ? true : undefined}
                  required
                />
                <FormErrors>{email}</FormErrors>
              </FormField>

              <FormField>
                <FormLabel htmlFor={password.id} className="sr-only">
                  Password
                </FormLabel>
                <div className="relative w-full">
                  <InputPassword
                    {...conform.input(password, {
                      description: true,
                    })}
                    id={password.id}
                    className="w-full rounded-xl px-4 py-3"
                    placeholder="Password"
                    autoComplete="current-password"
                    autoFocus={password.error ? true : undefined}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <FormDescription id={password.descriptionId} className="text-xs">
                    At least 8 characters
                  </FormDescription>
                  <LinkText to="/forgot-password" className="text-xs font-medium text-primary hover:text-primary-600">
                    Forgot your password?
                  </LinkText>
                </div>
                <FormErrors>{password}</FormErrors>
              </FormField>
            </div>

            <ButtonLoading
              type="submit"
              loadingText="Logging in..."
              isLoading={isSubmitting}
              className="w-full rounded-xl bg-primary py-3 font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Log in to your account
            </ButtonLoading>
          </Form>
        </div>
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
