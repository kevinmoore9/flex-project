
// import type { Action } from '../actions/types';
// import { SET_USER } from '../actions/user';
import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER,
         LOGOUT,
         RECEIVE_ERRORS } from '../actions/session_actions';

// export type State = {
//     name: string
// }

const _nullUser = {
  currentUser: null,
  errors: [],
};

// export default function (state:State = _nullUser, action:Action): State {
//   if (action.type === SET_USER) {
//     return {
//       ...state,
//       name: action.payload,
//     };
//   }
//   return state;
// }

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, _nullUser, {
        currentUser,
      });
    case LOGOUT:
      return merge({}, _nullUser);
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, _nullUser, {
        errors,
      });
    default:
      return state;
  }
};

export default SessionReducer;
