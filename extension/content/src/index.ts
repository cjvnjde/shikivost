import { Bridge } from "@shikivost/bridge";
import { Api } from "./api";
import { checkIsRendered } from "./utils/checkIsRendered";
import { renderContent } from "./renderers";
import { defaultStore, setIsAuthorized, Settings, settingsAtom } from "./state";
import { tokenChecker } from "./tokenChecker";
import "../../assets/index.css";

const bridge = Bridge.create();
const api = Api.create();

async function init() {
  await tokenChecker();
  let isRendered = false;

  bridge.on("content.set.refresh_token", (value) => {
    setIsAuthorized(Boolean(value));
    api.refreshToken = String(value ?? "");
  });

  bridge.on("content.set.settings", (value) => {
    if (typeof value === "object" && value !== null) {
      defaultStore.set(settingsAtom, {
        autotrackingType:
          (value as Settings).autotrackingType ?? "watchedProgress",
        progressValue: (value as Settings)?.progressValue ?? 60,
      });
    }
  });

  bridge.on("content.set.access_token", (value) => {
    api.accessToken = String(value ?? "");

    if (!isRendered && !checkIsRendered()) {
      renderContent();
      isRendered = true;
    }
  });

  bridge.on("content.reload", () => {
    window.location.reload();
  });

  await Promise.all([
    bridge.send("background.get.access_token"),
    bridge.send("background.get.refresh_token"),
    bridge.send("background.get.settings"),
  ]);
}

init();
