// import flatRoutes from 'remix-flat-routes'
import { flatRoutes } from 'remix-flat-routes';

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  tailwind: true,
  postcss: true,

  ignoredRouteFiles: ["**/.*"],
  routes: async (defineRoutes) => {
    return flatRoutes('routes', defineRoutes);
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",

  browserNodeBuiltinsPolyfill: {
    modules: {
      punycode: true,
      http: true,
      https: true,
      url: true,
      buffer: true,
      stream: true,
      zlib: true, // Common dependency
      util: true,
      assert: true,
      events: true,
      string_decoder: true,
      os: true, // Preemptively add common ones
      path: true,
      vm: true
    },
  },

  serverDependenciesToBundle: [
    "@phosphor-icons/react",
    "@icons-pack/react-simple-icons",
    "@remixicon/react",
  ],
}
