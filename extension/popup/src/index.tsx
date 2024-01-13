import { Bridge } from '@shikivost/bridge';
import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const bridge = useRef(new Bridge())

  return <div>

    <button onClick={() => {
      bridge.current.send("log")
    }}>log</button>
  </div>;
}

const element = document.createElement("div")
document.body.appendChild(element)

const root = createRoot(element);

root.render(<App />);
