import React from "react"
import { createRoot } from 'react-dom/client';

function App() {
  return <div>Hello World</div>;
}

const element = document.createElement("div")
document.body.appendChild(element)

const root = createRoot(element);

root.render(<App />);
