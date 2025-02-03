import { configMeta, createMetaConfig } from "~/configs/meta"

/**
 * Metadata Creator Function
 *
 * Validate using:
 * - https://opengraph.dev
 * - https://opengraph.xyz
 */

export function createMeta(
  {
    title = configMeta.defaultTitle,
    description = configMeta.defaultDescription,
    canonicalPath = "/",
    locale = configMeta.locale,
    name = configMeta.defaultName,
    ogImageAlt = configMeta.ogImageAlt,
    ogImagePath = configMeta.ogImagePath,
    ogImageType = configMeta.ogImageType,
    ogType = configMeta.ogType,
    themeColor = configMeta.themeColor,
    twitterAuthorHandle = configMeta.author.handle,
    twitterImagePath = configMeta.twitterImagePath,
    url = configMeta.url,
  }: CreateMeta,
  environment: { isDevelopment: boolean } = { isDevelopment: false }
) {
  const meta = createMetaConfig(environment)
  return [
    {
      title:
        title === meta.defaultTitle
          ? meta.defaultTitle
          : `${title} ${meta.defaultSeparator} ${meta.defaultName}`,
    },
    {
      name: "description",
      content: description,
    },
    {
      name: "application-name",
      content: name,
    },
    {
      name: "apple-mobile-web-app-title",
      content: name,
    },
    {
      name: "theme-color",
      content: themeColor,
    },
    {
      name: "msapplication-TileColor",
      content: themeColor,
    },
    {
      name: "msapplication-config",
      content: `${meta.url}/browserconfig.xml`,
    },
    {
      property: "og:site_name",
      content: name,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:url",
      content: canonicalPath ? `${meta.url}${canonicalPath}` : url,
    },
    {
      property: "og:type",
      content: ogType,
    },
    {
      property: "og:locale",
      content: locale,
    },
    {
      property: "og:image:alt",
      content: ogImageAlt,
    },
    {
      property: "og:image:type",
      content: ogImageType,
    },
    {
      property: "og:image",
      content: ogImagePath
        ? `${meta.url}${ogImagePath}`
        : `${meta.url}${meta.ogImagePath}`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: twitterAuthorHandle,
    },
    {
      name: "twitter:creator",
      content: twitterAuthorHandle,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:domain",
      content: meta.domain,
    },
    {
      name: "twitter:url",
      content: canonicalPath ? `${meta.url}${canonicalPath}` : url || meta.url,
    },
    {
      name: "twitter:image",
      content: twitterImagePath
        ? `${meta.url}${twitterImagePath}`
        : `${meta.url}${meta.twitterImagePath}`,
    },
    {
      name: "fb:app_id",
      content: meta.fbAppId,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: canonicalPath ? `${meta.url}${canonicalPath}` : url,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: meta.defaultTitle,
      },
    },
  ]
}

interface CreateMeta {
  title?: string
  description?: string
  canonicalPath?: string
  locale?: string
  name?: string
  ogImageAlt?: string
  ogImagePath?: string
  ogImageType?: string
  ogType?: string
  themeColor?: string
  twitterAuthorHandle?: string
  twitterImagePath?: string
  url?: string
}
