import type { FC } from 'react';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '~/shared/lib/hooks';

import { selectCities, actions } from '../../model';
import { AddItemButton } from '../AddItemButton';
import { CitiesList } from '../CitiesList';

export const Layout: FC = () => {
  const storeCities = useSelector(selectCities);
  const { downloadCities } = useActions(actions);

  useLayoutEffect(() => {
    void downloadCities();
  }, []);

  if (!storeCities) return null;

  return (
    <div className="d-flex flex-column gap-4 flex-d">
      <CitiesList />

      <div className="d-flex justify-content-end">
        <AddItemButton />
      </div>
    </div>
  );
};
