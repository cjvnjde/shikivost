import { createRoot } from "react-dom/client";

type Options = {
  className?: string;
  position?: "after" | "before";
};

export function createRootNode(
  selector: string,
  { className = "", position = "after" }: Options = {
    className: "",
    position: "after",
  },
) {
  const containerNode = document.querySelector(selector);
  const rootNode = document.createElement("div");

  rootNode.className = `extension ${className}`;

  if (position === "after") {
    containerNode?.parentNode?.appendChild(rootNode);
  } else {
    containerNode?.parentNode?.insertBefore(rootNode, containerNode);
  }

  return createRoot(rootNode);
}
