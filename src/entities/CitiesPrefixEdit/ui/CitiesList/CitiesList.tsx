import { useSelector } from 'react-redux';

import { useActions } from '~/shared/lib/hooks';

import { selectCities, actions } from '../../model';
import { CityBadge } from '../CityBadge';

export const CitiesList = () => {
  const cities = useSelector(selectCities);
  const { deleteCity } = useActions(actions);

  return (
    <div className="d-flex gap-3 flex-wrap">
      {cities!.map(([cityName, cityPrefix]) => (
        <CityBadge cityName={cityName} cityPrefix={cityPrefix} onClose={c => void deleteCity(c)} />
      ))}
    </div>
  );
};
