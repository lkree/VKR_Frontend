import type { RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { chainRoute } from 'atomic-router';
import { attach, createEvent, createStore, Effect, sample, Event } from 'effector';
import { createEffect } from 'effector/compat';

import { loadSession, SessionResponse } from '~/shared/api';
import type { Nullable } from '~/shared/lib/ts';

import { AuthStatus } from './const';

export const sessionRequestFx = attach({ effect: createEffect(loadSession) });

export const $sessionData = createStore<Nullable<SessionResponse>>(null);
const $authenticationStatus = createStore(AuthStatus.Initial);

$sessionData.on(sessionRequestFx.doneData, (_, d) => d);

$authenticationStatus
  .on(sessionRequestFx, status => (status === AuthStatus.Initial ? AuthStatus.Pending : status))
  .on(sessionRequestFx.doneData, () => AuthStatus.Authenticated)
  .on(sessionRequestFx.fail, () => AuthStatus.Anonymous);

interface ChainParams {
  flow: 'authorized' | 'anonymous';
  otherwise?: Event<void> | Effect<void, any, any>;
}

export const chainAuthenticate = (route: RouteInstance<RouteParams>, { flow, otherwise }: ChainParams) => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<RouteParams>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });

  if (flow === 'authorized') {
    const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<RouteParams>>();

    sample({
      clock: [alreadyAnonymous, sessionRequestFx.fail],
      source: { params: route.$params, query: route.$query },
      filter: route.$isOpened,
      target: sessionReceivedAnonymous,
    });

    if (otherwise) {
      sample({
        clock: sessionReceivedAnonymous,
        target: otherwise as Event<void>,
      });
    }

    return chainRoute({
      route,
      beforeOpen: sessionCheckStarted,
      openOn: [alreadyAuthenticated, sessionRequestFx.done],
      cancelOn: sessionReceivedAnonymous,
    });
  } else {
    const sessionReceivedAuthenticated = createEvent<RouteParamsAndQuery<RouteParams>>();

    sample({
      clock: [alreadyAuthenticated, sessionRequestFx.done],
      source: { params: route.$params, query: route.$query },
      filter: route.$isOpened,
      target: sessionReceivedAuthenticated,
    });

    if (otherwise) {
      sample({
        clock: sessionReceivedAuthenticated,
        target: otherwise as Event<void>,
      });
    }

    return chainRoute({
      route,
      beforeOpen: sessionCheckStarted,
      openOn: [alreadyAnonymous, sessionRequestFx.fail],
      cancelOn: sessionReceivedAuthenticated,
    });
  }
};
