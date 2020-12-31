import { connect } from 'react-redux';
import { useRef } from 'react';
import { useFrameLoop } from '../services/frameLoop';
import Drop from "../components/Drop";
import { DROP_SIZE, NOTE_PREVIEW_TIME, PLAYBOARD_HEIGHT } from '../global/settings';
import { removeDrop, updateDrop } from '../store/actions/drops';

function DropField({ drops, removeDrop, updateDrop }) {
	const refDrops = useRef();
	refDrops.current = drops;

	useFrameLoop(deltaTime => {
		const dropSpeed = (PLAYBOARD_HEIGHT-DROP_SIZE/3.5) / NOTE_PREVIEW_TIME;
		let tempDrops = [...refDrops.current];
		tempDrops.forEach(drop => {
			const newY = drop.y + deltaTime * dropSpeed;
			if (newY >= PLAYBOARD_HEIGHT-DROP_SIZE/3.5) {
				removeDrop(drop.id);
			} else {
				updateDrop({ id: drop.id, y: newY });
			}
		});
	});

	return (
		<g id="drop-field">
			{
				drops.map(drop => (
					<Drop key={drop.id} x={drop.x} y={drop.y} radius={DROP_SIZE} color={drop.color} />
				))
			}
		</g>
	)
}

export default connect(state => ({
	drops: state.drops.drops
}), { removeDrop, updateDrop })(DropField);
