import { Component } from 'react';
import musicController from "../services/musicController";
import { connect } from 'react-redux';
import { activeLight, deactiveLight } from '../store/actions/lights';

class MusicPlay extends Component {
	componentDidMount() {
		this.musicController = new musicController();
		this.musicController.loadMusic("Fur_Elise");
		this.musicController.onNoteBegin = noteInfo => this.props.activeLight(noteInfo.lightId);
		this.musicController.onNoteEnd = noteInfo => this.props.deactiveLight(noteInfo.lightId);
		this.musicController.onNotePreview = noteInfo => {};
	}

	render() {
		return (
			<div>
				<button onClick={() => this.musicController.startMusic()}>Play</button>
				<button onClick={() => this.musicController.pauseMusic()}>Pause</button>
				<button onClick={() => this.musicController.resumeMusic()}>Resume</button>
			</div>
		)
	}
}

export default connect(null, { activeLight, deactiveLight })(MusicPlay);