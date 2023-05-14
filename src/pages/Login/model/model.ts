import { createEffect, createEvent, createStore, sample } from 'effector';
import { attach } from 'effector/compat';
import { and } from 'patronum';

import { login } from '~/shared/api';
import { sessionRequestFx } from '~/shared/models/session';

const loginFx = attach({ effect: createEffect(login) });

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const isSubmitting = createEvent();

export const $email = createStore('');
export const $password = createStore('');
export const $error = createStore('');

$email.on(emailChanged, (_, payload) => payload);
$password.on(passwordChanged, (_, payload) => payload);
$error.on(loginFx.failData, (_, error) => error.message);

sample({
  clock: isSubmitting,
  source: { email: $email, password: $password },
  filter: and($email, $password),
  target: loginFx,
});

sample({
  clock: loginFx.done,
  target: sessionRequestFx,
});
