import { connect } from 'react-redux';
import { useEffect } from 'react';
import { LIGHT_COLORS, LIGHT_POS, LIGHT_SIZE, PLAYBOARD_HEIGHT } from '../global/settings';
import Light from '../components/Light';
import { setLightColor } from '../store/actions/lights';

function LightList({ lightStates, lightColors, setLightColor }) {

	useEffect(() => {
		setLightColor(LIGHT_COLORS[Math.floor(Math.random() * LIGHT_COLORS.length)]);
	}, []);

	return (
		<g id="lightlist">
			{
				lightColors.map((color, index) => (
					<Light key={index} x={LIGHT_POS[index]} y={PLAYBOARD_HEIGHT} radius={LIGHT_SIZE} color={color} state={lightStates[index] ? "active" : "normal"} />
				))
			}
		</g>
	)
}

export default connect(state => ({
	lightStates: state.lights.activeStates,
	lightColors: state.lights.colors
}), { setLightColor })(LightList);