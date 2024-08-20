const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const { shareAll } = require("@angular-architects/module-federation/webpack");
const path = require('path');

module.exports = (config, options, targetOptions) => {
  config.devServer = {
    port: 3000,
  };
  config.output = {
    uniqueName: "map_viewer_app",
    publicPath: "http://localhost:3000/",
    path: path.resolve(__dirname, 'dist/map-viewer-app'),
  };
  config.optimization = {
    runtimeChunk: false,
  };
  config.plugins.push(
    new ModuleFederationPlugin({
      name: "map_viewer_app",
      filename: "remoteEntry.js",
      dts: true, // note: issue from the original plugin
      exposes: {
        "./MapViewComponent": "./src/app/app.component.ts",
      },
      shared: {
        ...shareAll({
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        }),
      },
    })
  );

  // config.resolve.alias = {
  //   '/assets': '/remote/assets'
  // };

  return config;
};
