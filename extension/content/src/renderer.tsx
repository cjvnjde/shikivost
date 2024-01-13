import { h, render } from 'preact';
import { signal } from '@preact/signals';

const count = signal(0);

function App() {
  const value = count.value;
  const increment = () => {
    count.value++;
  };

  return <button onClick={increment}>test {value}</button>;
}

function App2() {
  const value = count.value;
  const increment = () => {
    count.value++;
  };

  return <button onClick={increment}>test2 {value}</button>;
}

render(<App />, document.querySelector('.present'));
render(<App2 />, document.querySelector('#moduleLeft-1'));
