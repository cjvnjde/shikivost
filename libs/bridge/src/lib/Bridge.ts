import { BackgroundBridgeStrategy } from "./BackgroundBridgeStrategy";
import { ContentBridgeStrategy } from "./ContentBridgeStrategy";
import { isBackgroundScript } from "./isBackgroundScript";

export class Bridge {
  static create() {
    if (isBackgroundScript()) {
      return new BackgroundBridgeStrategy();
    }

    return new ContentBridgeStrategy();
  }
}
