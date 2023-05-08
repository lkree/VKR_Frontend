import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import cn from 'classnames';

import { useActions } from '@shared/lib/hooks';
import type { noop } from '@shared/lib/ts';

import { actions, selectAppValue } from '../model';

export function App() {
  const state = useSelector(selectAppValue);
  const { increment } = useActions(actions);

  return (
    <div className={cn('asd', 'App', { test: true })}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Button>123</Button>
      <div className="card">
        <button onClick={increment as noop}>count is {state}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR{' '}
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more </p>
    </div>
  );
}
