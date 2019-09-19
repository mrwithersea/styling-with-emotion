import { SIMPLE_ACTION } from 'actions';

const simpleAction = (state, { value }) => ({
  ...state,
  value,
});

const reducers = {
  [SIMPLE_ACTION]: simpleAction,
};

export default (state = {}, action = {}) =>
  (reducers[action.type] ? reducers[action.type](state, action) : state);