import { ACTIVE_LIGHT, DEACTIVE_LIGHT, SET_LIGHT_COLOR } from '../actionTypes';

export function activeLight(lightIndex) {
	return {
		type: ACTIVE_LIGHT,
		lightIndex
	};
}

export function deactiveLight(lightIndex) {
	return {
		type: DEACTIVE_LIGHT,
		lightIndex
	};
}

export function setLightColor(colors) {
	return {
		type: SET_LIGHT_COLOR,
		colors
	};
}