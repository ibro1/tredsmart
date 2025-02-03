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

  browserNodeBuiltinsPolyfill: {
    modules: {
      // Core modules
      punycode: true,
      http: true,
      https: true,
      url: true,
      buffer: true,
      stream: true,
      crypto: true,
      
      // Additional required modules
      string_decoder: true,
      assert: true,
      zlib: true,
      util: true,
      events: true,
      
      // Common dependencies
      os: true,
      path: true,
      fs: true,
      vm: true,
    },
  },
  
  serverModuleFormat: "esm",
  serverPlatform: "node",
  serverMinify: false,

  // Bundle CommonJS modules
  serverDependenciesToBundle: [
    "@phosphor-icons/react",
    "@icons-pack/react-simple-icons",
    "@remixicon/react",
  ],
}
