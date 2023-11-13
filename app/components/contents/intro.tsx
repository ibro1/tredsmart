import { Anchor } from "~/components/ui/anchor"

export function ContentIntro() {
  return (
    <div className="space-y-10">
      <header className="space-y-10 [text-wrap:balance]">
        <h1
          id="intro"
          className="text-5xl text-primary sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Dogokit is a web app template kit
        </h1>
        <h2>
          Using Remix, React, Tailwind CSS, Radix UI, Prisma ORM, and more
        </h2>
      </header>

      <div className="prose-config">
        <p>
          The goal is to start and be as productive as possible to ship a full
          stack web app quickly with{" "}
          <Anchor href="https://remix.run">Remix</Anchor> web framework.
        </p>

        <p>
          Dogokit is a highly opinionated collection of application structure,
          interactive UI components, software engineering and web development
          workflow, functionality hooks and utilities, also integration with 3rd
          party services.
        </p>

        <p>
          This Dogokit variant is using Remix. There's a possibility to have
          more variants in the future.
        </p>

        <ul>
          <li>
            Repo:{" "}
            <Anchor href="https://github.com/dogokit/dogokit-remix">
              github.com/dogokit/dogokit-remix
            </Anchor>
          </li>
          <li>
            Demo:{" "}
            <Anchor href="https://dogokit.allnimal.com">
              dogokit.allnimal.com
            </Anchor>
          </li>
        </ul>
      </div>
    </div>
  )
}
