export default function () {
  return {
    name: "fallback-plugin",
    errorLoadRemote(args) {
      if (args.lifecycle === "onLoad") {
        const fallback = "fallback";
        return fallback;
      } else if (args.lifecycle === "beforeRequest") {
        return args;
      }
    },
  };
}
