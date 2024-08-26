export default function () {
  return {
    name: "angular-offline-plugin",

    // if remote is offline
    async errorLoadRemote({ id, error, from, origin }) {
      // console.error(id, "offline");

      // const MapViewComponent = await loadMapViewComponent();
      // const module = createModule(MapViewComponent, from);

      // return module;
    },
  };
}

async function loadMapViewComponent() {
  const module = await import("map_viewer_app/MapViewComponent");
  return module.default;
}

function createModule(component, from) {
  if (from === "build") {
    return () => ({
      __esModule: true,
      default: component,
    });
  } else {
    return {
      default: component,
    };
  }
}
