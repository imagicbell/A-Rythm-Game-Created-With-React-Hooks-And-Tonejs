import { ACTIVE_LIGHT, DEACTIVE_LIGHT } from '../actionTypes';

export function activeLight(lightIndex) {
	return {
		type: ACTIVE_LIGHT,
		lightIndex
	}
}

export function deactiveLight(lightIndex) {
	return {
		type: DEACTIVE_LIGHT,
		lightIndex
	}
}
