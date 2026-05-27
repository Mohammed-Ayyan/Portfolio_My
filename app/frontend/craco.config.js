// craco.config.js
const path = require("path");
require("dotenv").config();

// Check if we're in development/preview mode (not production build)
// Craco sets NODE_ENV=development for start, NODE_ENV=production for build
const isDevServer = process.env.NODE_ENV !== "production";

// Environment variable overrides
const config = {
  enableHealthCheck: process.env.ENABLE_HEALTH_CHECK === "true",
};

// Conditionally load health check modules only if enabled
let WebpackHealthPlugin;
let setupHealthEndpoints;
let healthPluginInstance;

if (config.enableHealthCheck) {
  WebpackHealthPlugin = require("./plugins/health-check/webpack-health-plugin");
  setupHealthEndpoints = require("./plugins/health-check/health-endpoints");
  healthPluginInstance = new WebpackHealthPlugin();
}

let webpackConfig = {
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      const excludeMissingSourceMap = (rules = []) => {
        rules.forEach((rule) => {
          if (rule.loader?.includes("source-map-loader")) {
            rule.exclude = [
              ...(Array.isArray(rule.exclude)
                ? rule.exclude
                : rule.exclude
                  ? [rule.exclude]
                  : []),
              /node_modules[\\/]@mediapipe[\\/]tasks-vision/,
            ];
          }
          if (rule.oneOf) excludeMissingSourceMap(rule.oneOf);
          if (rule.rules) excludeMissingSourceMap(rule.rules);
        });
      };
      excludeMissingSourceMap(webpackConfig.module?.rules);

      // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
        ],
      };

      // Add health check plugin to webpack if enabled
      if (config.enableHealthCheck && healthPluginInstance) {
        webpackConfig.plugins.push(healthPluginInstance);
      }
      return webpackConfig;
    },
  },
};

webpackConfig.devServer = (devServerConfig) => {
  const originalSetupMiddlewares = devServerConfig.setupMiddlewares;
  const onBeforeSetupMiddleware = devServerConfig.onBeforeSetupMiddleware;
  const onAfterSetupMiddleware = devServerConfig.onAfterSetupMiddleware;

  delete devServerConfig.onBeforeSetupMiddleware;
  delete devServerConfig.onAfterSetupMiddleware;

  devServerConfig.setupMiddlewares = (middlewares, devServer) => {
    if (onBeforeSetupMiddleware) {
      onBeforeSetupMiddleware(devServer);
    }

    let nextMiddlewares = middlewares;
    if (originalSetupMiddlewares) {
      nextMiddlewares = originalSetupMiddlewares(nextMiddlewares, devServer);
    }

    if (config.enableHealthCheck && setupHealthEndpoints && healthPluginInstance) {
      setupHealthEndpoints(devServer, healthPluginInstance);
    }

    if (onAfterSetupMiddleware) {
      onAfterSetupMiddleware(devServer);
    }

    return nextMiddlewares;
  };

  return devServerConfig;
};

// Wrap with visual edits (automatically adds babel plugin, dev server, and overlay in dev mode)
if (isDevServer) {
  try {
    const { withVisualEdits } = require("@emergentbase/visual-edits/craco");
    webpackConfig = withVisualEdits(webpackConfig);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND' && err.message.includes('@emergentbase/visual-edits/craco')) {
      console.warn(
        "[visual-edits] @emergentbase/visual-edits not installed — visual editing disabled."
      );
    } else {
      throw err;
    }
  }
}

module.exports = webpackConfig;

