import { combineReducers } from 'redux';
import lights from './lights';
import drops from './drops';

const rootReducer = combineReducers({
	lights,
	drops
});

export default rootReducer;
