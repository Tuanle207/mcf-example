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
      dts: true,
      remotes: {
        map_viewer_app:"map_viewer_app@http://localhost:3000/remoteEntry.js",
        wirebreak_viewer_app:"wirebreak_viewer_app@http://localhost:3001/remoteEntry.js",
        // wirebreak_viewer_app:"wirebreak_viewer_app@http://localhost:3001/mf-manifest.json",
      },
      runtimePlugins: [
        require.resolve('./offline-remote.js'),
        require.resolve('./custom-runtime-plugin.js'),
        require.resolve('./fallback.js'),
        require.resolve('./shared-strategy.js')
      ],
      shared: {
        ...shareAll({
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        }),
      },
    }),
  ],
};
