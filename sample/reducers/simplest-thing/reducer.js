import { SIMPLE_ACTION } from 'actions';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SIMPLE_ACTION:
      return { ...state, value: action.value };
    default:
      return state;
  }
}
