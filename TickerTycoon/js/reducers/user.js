
// import type { Action } from '../actions/types';
// import { SET_USER } from '../actions/user';
import merge from 'lodash/merge';
import { AsyncStorage } from 'react-native';
import { RECEIVE_CURRENT_USER,
         LOGOUT,
         RECEIVE_ERRORS } from '../actions/session_actions';

const _nullUser = {
  currentUser: null,
  errors: [],
};


const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      if (currentUser) {
        try {
          AsyncStorage.setItem('CURRENT_USER', JSON.stringify(currentUser));
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
