import { useSelector } from 'react-redux';

import { useInitDownloadData } from 'lkree-react-utils';

import { Table } from '~/entities/LeftoversTable/ui/Table/Table';

import { useActions } from '~/shared/lib/hooks';

import { selectLeftoversList, actions } from '../../model';

export const Layout = () => {
  const leftoversList = useSelector(selectLeftoversList);
  const { getLeftoversList } = useActions(actions);

  useInitDownloadData({ data: leftoversList, downloadFn: getLeftoversList });

  return <Table />;
};
