const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const { shareAll } = require("@angular-architects/module-federation/webpack");
const path = require('path');

module.exports = (config, options, targetOptions) => {
  config.devServer = {
    port: 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  };
  config.output = {
    uniqueName: "wirebreak_viewer_app",
    // publicPath: "http://localhost:3001/",
    publicPath: "auto",
    path: path.resolve(__dirname, 'dist/wirebreak-viewer-app'),
  };
  config.optimization = {
    runtimeChunk: false,
  };
  config.plugins.push(
    new ModuleFederationPlugin({
      name: "wirebreak_viewer_app",
      filename: "remoteEntry.js",
      exposes: {
        "./WirebreakListComponent": "./src/app/app.component.ts",
      },
      // shared: shareAll({
      //   singleton: true,
      //   strictVersion: true,
      //   requiredVersion: "auto",
      // }),
      shared: {
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
        "@angular/animations": { singleton: true, strictVersion: true, requiredVersion: '>= 18.0.0' },
      }
    })
  );

  return config;
};
