export const SIMPLE_ACTION = 'SIMPLE_ACTION';
export const DELAYED_SIMPLE_ACTION = 'DELAYED_SIMPLE_ACTION';

const simpleAction = value => ({
  type: SIMPLE_ACTION,
  value
});

const simpleAction = value => ({
  type: DELAYED_SIMPLE_ACTION,
  value
});
