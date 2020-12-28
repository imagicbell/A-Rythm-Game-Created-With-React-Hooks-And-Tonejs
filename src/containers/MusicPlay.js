import { Component } from 'react';
import musicController from "../services/musicController";
import { connect } from 'react-redux';
import { activeLight, deactiveLight } from '../store/actions/lights';

class MusicPlay extends Component {
	componentDidMount() {
		this.musicController = new musicController();
		this.musicController.loadMusic("Fur_Elise");
		this.musicController.activeLight = this.props.activeLight;
		this.musicController.deactiveLight = this.props.deactiveLight;
	}

	render() {
		return (
			<div>
				<button onClick={() => this.musicController.startMusic()}>Play</button>
				<button onClick={() => this.musicController.pauseMusic()}>Pause</button>
			</div>
		)
	}
}

export default connect(null, { activeLight, deactiveLight })(MusicPlay);