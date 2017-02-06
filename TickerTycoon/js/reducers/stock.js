
// import type { Action } from '../actions/types';
// import { SET_USER } from '../actions/user';
import merge from 'lodash/merge';
import { RECEIVE_STOCK } from '../actions/stock';


const StockReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_STOCK:
      const stock = action.stock;
      const newState = {
        symbol: stock.symbol,
        ask: stock.Ask,
        change: stock.Change,
        percentChange: stock.ChangeinPercent,
      };
      return merge({}, newState);
    default:
      return state;
  }
};

export default StockReducer;
