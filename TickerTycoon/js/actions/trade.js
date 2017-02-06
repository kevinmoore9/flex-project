import * as APIUtil from '../util/trade_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

export const trade = params => (dispatch) => {
  return (APIUtil.trade(params)
    .then(user => dispatch(receiveCurrentUser(user)))
  );
};
