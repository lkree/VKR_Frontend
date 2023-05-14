import type { RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { chainRoute, RouteInstance } from 'atomic-router';
import { createEvent, createStore, Effect, Event, sample } from 'effector';
import { debug, or } from 'patronum';

import { AccessLevels } from '~/shared/const';
import { $sessionData, sessionRequestFx } from '~/shared/models/session';

export const $isAdmin = createStore<boolean>(false);

export const tryAdminRoute = ({
  route,
  otherwise,
}: {
  route: RouteInstance<RouteParams>;
  otherwise?: Event<void> | Effect<void, any, any>;
}) => {
  const adminCheckStarted = createEvent<RouteParamsAndQuery<RouteParams>>();
  const receivedNotAdmin = createEvent<RouteParamsAndQuery<RouteParams>>();
  const receivedAdmin = createEvent();

  const alreadyIsAdmin = sample({
    clock: adminCheckStarted,
    source: $isAdmin,
    filter: Boolean,
  });
  const alreadyIsNotAdmin = sample({
    clock: adminCheckStarted,
    source: [$isAdmin, $sessionData],
    filter: ([isAdmin, sessionData]) => Boolean(sessionData && !isAdmin),
  });

  sample({
    clock: adminCheckStarted,
    source: $sessionData,
    filter: d => !d,
    target: sessionRequestFx,
  });

  sample({
    clock: [sessionRequestFx.fail, sessionRequestFx.doneData],
    source: { params: route.$params, query: route.$query },
    filter: or(
      route.$isOpened,
      $isAdmin.map(d => !d)
    ),
    target: receivedNotAdmin,
  });

  sample({
    clock: sessionRequestFx.doneData,
    filter: d => d.accessLevel === AccessLevels.Admin,
    target: receivedAdmin,
  });

  if (otherwise) {
    sample({
      clock: [receivedNotAdmin, alreadyIsNotAdmin],
      target: otherwise as Event<void>,
    });
  }

  debug(alreadyIsAdmin);

  return chainRoute({
    route,
    beforeOpen: adminCheckStarted,
    openOn: [alreadyIsAdmin, receivedAdmin],
    cancelOn: [alreadyIsNotAdmin, receivedNotAdmin],
  });
};

$isAdmin.on(sessionRequestFx.done, (_, payload) => payload.result?.accessLevel === AccessLevels.Admin);
