
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';
import { RECEIVE_CURRENT_USER,
         LOGOUT,
         RECEIVE_ERRORS } from '../actions/session_actions';

export type State = {
    name: string
}

const _nullUser = {
  currentUser: null,
  errors: [],
};

export default function (state:State = _nullUser, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      name: action.payload,
    };
  }
  return state;
}
