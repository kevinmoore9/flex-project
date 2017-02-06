import * as APIUtil from '../util/deposit_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

export const deposit = params => (dispatch) => {
  return (APIUtil.deposit(params)
    .then(user => dispatch(receiveCurrentUser(user)))
  );
};
