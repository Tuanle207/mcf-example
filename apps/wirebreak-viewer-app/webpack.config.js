const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const { shareAll } = require("@angular-architects/module-federation/webpack");
const path = require('path');

module.exports = (config, options, targetOptions) => {
  config.devServer = {
    port: 3001,
  };
  config.output = {
    uniqueName: "wirebreak_viewer_app",
    publicPath: "http://localhost:3001/",
    path: path.resolve(__dirname, 'dist/wirebreak-viewer-app'),
  };
  config.optimization = {
    runtimeChunk: false,
  };
  config.plugins.push(
    new ModuleFederationPlugin({
      name: "wirebreak_viewer_app",
      filename: "remoteEntry.js",
      dts: false, // note: issue from the original plugin
      exposes: {
        "./WirebreakListComponent": "./src/app/app.component.ts",
      },
      shared: shareAll({
        singleton: true,
        strictVersion: true,
        requiredVersion: "auto",
      }),
    })
  );

  return config;
};
