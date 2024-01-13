import React  from 'react';
import { createRoot } from 'react-dom/client';

const url = 'https://shikimori.one/oauth/authorize?client_id=ZYV_3N5DBDQWDhJYbWUq1YMcatv9nUI-xG51xsaXGAA&redirect_uri=https%3A%2F%2Fanimevost.org%2F&response_type=code&scope=user_rates';

function App() {
  return <div>
    <a href={url} target="_blank">login</a>
  </div>;
}

const element = document.createElement('div');
document.body.appendChild(element);

const root = createRoot(element);

root.render(<App />);
