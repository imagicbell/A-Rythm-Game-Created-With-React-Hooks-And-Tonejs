import { ACTIVE_LIGHT, DEACTIVE_LIGHT } from '../actionTypes';
import { LIGHT_NUM } from '../../global/constants';

const initState = {
	activeStates: Array(LIGHT_NUM).fill(0),
}

export default function lights(state=initState, action) {
	switch(action.type) {
		case ACTIVE_LIGHT:
			return {
				activeStates: state.activeStates.map((active, index) => index === action.lightIndex ? 1 : active),
			}
		case DEACTIVE_LIGHT:
			return {
				activeStates: state.activeStates.map((active, index) => index === action.lightIndex ? 0 : active),
			}
		default:
			return state;
	}
}