import R from 'ramda';

export const getSimpleValue = R.converge(
  R.sum,
  [
    R.pathOr(0, ['form', 'data', 'value']),
    R.pathOr(0, ['datastore', 'response', 'value']),
  ]
);
