import { ADD_DROP, REMOVE_DROP, UPDATE_DROP } from '../actionTypes';

const initialState = {
	drops: [],
	nextId: 0,
}

export default function drops(state=initialState, action) {
	switch(action.type) {
		case ADD_DROP:
			return {
				...state,
				drops: [...state.drops, {
					id: action.id,
					x: action.x,
					y: action.y,
					color: action.color,
				}],
				nextId: state.nextId + 1,
			};
		case REMOVE_DROP:
			return {
				...state,
				drops: state.drops.filter(drop => drop.id !== action.id)
			};
		case UPDATE_DROP:
			return {
				...state,
				drops: state.drops.map(drop => drop.id !== action.id ? drop : {
					...drop,
					y: action.y
				})
			};
		default: 
			return state;
	}
}