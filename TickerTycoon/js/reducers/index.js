
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import session from './user';
import list from './list';
import stockDetail from './stock';

export default combineReducers({

  drawer,
  session,
  list,
  cardNavigation,
  stockDetail,

});
