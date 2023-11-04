/**
 * EDITME: Config Document Links and JSON-LD
 *
 * Favicons
 * Manifest
 */

/**
 * Docs:
 * - https://favicon.io
 * - https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
 */

export const faviconLinks = [
  // Use this if want to change the favicon quickly using emoji
  // {
  // 	rel: 'shortcut icon',
  // 	href: 'https://fav.farm/🐶',
  // },
  // Design and use custom favicon, or get some initial image from:
  // https://emojipedia.org
  {
    rel: "shortcut icon",
    href: "/favicons/favicon.ico",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicons/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicons/favicon-16x16.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicons/apple-touch-icon.png",
  },
]

const manifestLinks = [
  /**
   * Remember to edit the manifest
   * Alternatively this can also be generated from a Remix route
   * Like in `app/other-root-routes.server.ts`
   */
  {
    rel: "manifest",
    href: "/favicons/site.webmanifest",
  },
]

export const configDocumentLinks = [...faviconLinks, ...manifestLinks]
