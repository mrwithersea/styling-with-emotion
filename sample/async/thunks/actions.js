export const SIMPLE_ACTION = 'SIMPLE_ACTION';

const simpleAction = value => ({
  type: SIMPLE_ACTION,
  value
});

export const delayedSimpleAction = value => dispatch => {
  setTimeout(() => {
    dispatch(simpleAction(value))
  }, 10000);
};
