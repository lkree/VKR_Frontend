import { call as baseCall } from 'lkree-common-utils/api';

import { isErrorResponse } from '~/shared/api/common/typeGuards';
import { getStore } from '~/shared/lib/global';
import { actions } from '~/shared/models/commonStores';

type Props = Parameters<typeof baseCall>[0];

export const call = <T>(props: Props) =>
  baseCall<T>(props).then(d => {
    if (isErrorResponse(d)) {
      getStore().dispatch(actions.setErrorsMessage(d.message));

      return Promise.reject(d.message);
    }

    return d;
  });
