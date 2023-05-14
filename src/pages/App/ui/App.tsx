import { Button } from 'react-bootstrap';

import { Link } from 'atomic-router-react';
import cn from 'classnames';
import { useUnit } from 'effector-react';

import type { noop } from '~/shared/lib/ts';
import { routes } from '~/shared/models/router';

import { $value, increment, onLogout } from '../model';

export function App() {
  const state = useUnit($value);

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
      <Button onClick={() => onLogout()}>logout</Button>
      <Link to={routes.admin}>admin</Link>
    </div>
  );
}
