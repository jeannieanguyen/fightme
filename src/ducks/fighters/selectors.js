import { groupBy } from 'lodash';
import { createSelector } from 'reselect';

export const getFighters = state => state.fighters.fighters;
export const getChampions = state => state.fighters.champions;

export const getWeightClasses = createSelector([getChampions], champions =>
  champions.map(champion => champion.weight_class),
);
export const getFightersByWeightClass = createSelector(
  [getFighters],
  fighters => groupBy(fighters, 'weight_class'),
);
