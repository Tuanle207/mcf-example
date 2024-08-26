const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const { shareAll } = require("@angular-architects/module-federation/webpack");

module.exports = {
  devServer: {
    port: 4000,
  },
  output: {
    uniqueName: "shell",
  },
  optimization: {
    runtimeChunk: false, // This is also needed, but was added in the original question as well
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        map_viewer_app:"map_viewer_app@http://localhost:3000/mf-manifest.json",
        wirebreak_viewer_app:"wirebreak_viewer_app@http://localhost:3001/mf-manifest.json",
      },
      runtimePlugins: [
        require.resolve('./offline-remote.js'),
        require.resolve('./custom-runtime-plugin.js'),
        require.resolve('./fallback.js'),
      ],
      // shared: {
      //   ...shareAll({
      //     singleton: true,
      //     strictVersion: true,
      //     requiredVersion: "auto",
      //   }),
      // },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/animations": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        // "@angular/cdk": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        // "@angular/material": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
      }
    }),
  ],
};
