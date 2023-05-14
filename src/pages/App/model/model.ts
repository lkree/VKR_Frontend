import { attach, createEffect, createEvent, createStore, sample } from 'effector';

import { logout } from '~/shared/api';
import { sessionRequestFx } from '~/shared/models/session';

export const increment = createEvent();
export const decrement = createEvent();
export const set = createEvent<number>();

export const $value = createStore(0);

$value.on(increment, v => v + 1);
$value.on(decrement, v => v - 1);
$value.on(set, (_, v) => v);

const logoutFx = attach({ effect: createEffect(logout) });
export const onLogout = createEvent();

sample({
  clock: onLogout,
  target: logoutFx,
});

sample({
  clock: logoutFx.done,
  target: sessionRequestFx,
});
