
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import session from './user';
import list from './list';

export default combineReducers({

  drawer,
  session,
  list,
  cardNavigation,

});
