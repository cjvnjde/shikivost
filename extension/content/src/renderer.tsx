import { h, render } from 'preact';
import { signal } from '@preact/signals';
import { css } from '../styled-system/css';
import './main.css';

const count = signal(0);

function App2() {
  const value = count.value;
  const increment = () => {
    count.value++;
  };

  return (
    <button className={css({ bg: 'red.400' })} onClick={increment}>
      test2 {value}
    </button>
  );
}

export function renderContent() {
  render(<App2 />, document.querySelector('#moduleLeft-1'));
}
