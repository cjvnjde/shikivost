import { createRoot } from "react-dom/client";
import Providers from "../components/Providers";
import { ShikimoriLogin } from "../components/ShikimoriLogin";

export function renderHeader() {
  const searchNode = document.querySelector(".search");

  const topLineBottomBlock = document.createElement("div");
  topLineBottomBlock.className = "extension login-wrapper";

  searchNode?.parentNode?.insertBefore(topLineBottomBlock, searchNode);

  const root = createRoot(topLineBottomBlock);
  root.render(
    <Providers>
      <ShikimoriLogin />
    </Providers>,
  );
}
