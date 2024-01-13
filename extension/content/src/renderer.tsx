import { h, render } from 'preact';
import { useState } from 'preact/hooks';

function App() {
  const [st, sotSt] = useState(1)
  return (
    <button onClick={() => sotSt(t => t+1)}>test {st}</button>
  )
}

const testElement = document.querySelector(".present")
render(<App />, testElement);
