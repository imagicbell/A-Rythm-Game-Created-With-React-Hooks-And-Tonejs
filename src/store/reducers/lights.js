import { ACTIVE_LIGHT, DEACTIVE_LIGHT, SET_LIGHT_COLOR } from '../actionTypes';
import { LIGHT_NUM, LIGHT_COLORS } from '../../global/settings';

const initState = {
	activeStates: Array(LIGHT_NUM).fill(0),
	colors: LIGHT_COLORS[0]
}

export default function lights(state=initState, action) {
	switch(action.type) {
		case ACTIVE_LIGHT:
			return {
				...state,
				activeStates: state.activeStates.map((active, index) => index === action.lightIndex ? 1 : active),
			};
		case DEACTIVE_LIGHT:
			return {
				...state,
				activeStates: state.activeStates.map((active, index) => index === action.lightIndex ? 0 : active),
			};
		case SET_LIGHT_COLOR:
			return {
				...state,
				colors: action.colors
			};
		default:
			return state;
	}
}