import {
	ADD_DROP,
	REMOVE_DROP,
	UPDATE_DROP
} from '../actionTypes';

export function addDrop({id, x, y, color}) {
	return {
		type: ADD_DROP,
		id,
		x,
		y,
		color
	};
}

export function removeDrop(id) {
	return {
		type: REMOVE_DROP,
		id
	};
}

export function updateDrop({id, y}) {
	return {
		type: UPDATE_DROP,
		id,
		y
	}	
}