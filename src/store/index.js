import { createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export function configureStore() {
	return createStore(
		rootReducer,
		compose(
			applyMiddleware(thunk),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);
}