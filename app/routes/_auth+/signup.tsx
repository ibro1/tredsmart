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
import { configUnallowedKeywords } from "~/configs/unallowed-keywords"
import { useAppMode } from "~/hooks/use-app-mode"
import { db } from "~/libs/db.server"
import { modelUser } from "~/models/user.server"
import { issueUsernameUnallowed } from "~/schemas/user"
import { authService } from "~/services/auth.server"
import { createMeta } from "~/utils/meta"
import { createTimer } from "~/utils/timer"
import { generateUsername } from "~/utils/string.server"

// Update schema without username
const schemaUserSignUp = z.object({
  email: z.string().email("Invalid email format"),
  fullname: z.string().min(2, "Name is too short").max(100, "Name is too long"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const meta: MetaFunction = () =>
  createMeta({
    title: `Sign Up for payFlow`,
    description: `Create your account and start managing invoices`,
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

  const [form, { email, fullname, password }] = useForm<z.infer<typeof schemaUserSignUp>>({
    id: "signup",
    lastSubmission: actionData?.submission,
    shouldRevalidate: "onInput",
    constraint: getFieldsetConstraint(schemaUserSignUp),
    onValidate({ formData }) {
      return parse(formData, { schema: schemaUserSignUp })
    },
    defaultValue: isModeDevelopment
      ? {
          email: "example@example.com",
          fullname: "Example Name",
          password: "exampleexample",
        }
      : {},
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-glow">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <LinkText to="/login" className="font-medium text-primary hover:text-primary-600">
                Log in
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
              <FormField>
                <FormLabel htmlFor={fullname.id} className="sr-only">
                  Full Name
                </FormLabel>
                <Input
                  {...conform.input(fullname)}
                  id={fullname.id}
                  className="rounded-xl px-4 py-3"
                  placeholder="Full Name"
                  autoFocus={fullname.error ? true : undefined}
                  required
                />
                <FormErrors>{fullname}</FormErrors>
              </FormField>

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
                    placeholder="Password (8+ characters)"
                    autoComplete="new-password"
                    autoFocus={password.error ? true : undefined}
                    required
                  />
                </div>
                <FormDescription id={password.descriptionId} className="text-xs">
                  Must be at least 8 characters
                </FormDescription>
                <FormErrors>{password}</FormErrors>
              </FormField>
            </div>

            {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}

            <ButtonLoading
              type="submit"
              loadingText="Creating account..."
              isLoading={isSubmitting}
              className="w-full rounded-xl bg-primary py-3 font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Create account
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
    schema: schemaUserSignUp.superRefine(async (data, ctx) => {
      const existingEmail = await db.user.findUnique({
        where: { email: data.email },
        select: { id: true },
      })
      if (existingEmail) {
        ctx.addIssue({
          path: ["email"],
          code: z.ZodIssueCode.custom,
          message: "Email is already registered",
        })
        return
      }
    }),
  })

  await timer.delay()

  if (!submission.value || submission.intent !== "submit") {
    return json({ status: "error", submission }, { status: 400 })
  }

  // Generate username from email and fullname
  const baseUsername = generateUsername(submission.value.email, submission.value.fullname)
  let username = baseUsername
  let counter = 1

  // Keep trying until we find a unique username
  while (true) {
    const existingUsername = await db.user.findUnique({
      where: { username },
      select: { id: true },
    })
    if (!existingUsername) break
    username = `${baseUsername}${counter}`
    counter++
  }

  // Create the user with the generated username
  const user = await modelUser.create({
    ...submission.value,
    username,
  })

  return authService.authenticate("form", request, {
    successRedirect: "/user/dashboard",
    failureRedirect: "/signup",
    formData: {
      userId: user.id,
    },
  })
}
