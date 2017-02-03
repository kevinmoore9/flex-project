
// import type { Action } from '../actions/types';
// import { SET_USER } from '../actions/user';
import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER,
         LOGOUT,
         RECEIVE_ERRORS } from '../actions/session_actions';
import { AsyncStorage } from 'react-native';

const _nullUser = {
  currentUser: null,
  errors: [],
};


const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      if (currentUser) {
        try {
          AsyncStorage.setItem('SESSION_TOKEN', currentUser.session_token);
          console.log('saved token');
        } catch (error) {
          console.log('error saving token');
        }
      }
      let newState;
      if (Array.isArray(currentUser)) {
        newState = merge({}, _nullUser);
        newState.errors = currentUser;
      } else {
        newState = merge({}, _nullUser, {
          currentUser,
        });
      }
      return newState;
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
