import * as APIUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';

export const receiveStock = (stock) => {
  return {
    type: RECEIVE_STOCK,
    stock,
  };
};

export const updateStock = ticker => (dispatch) => {
  return (
    APIUtil.getStock(ticker)
      .then(stock => dispatch(receiveStock(stock)))
  );
};
