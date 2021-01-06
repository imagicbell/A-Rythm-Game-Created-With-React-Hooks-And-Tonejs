import { Component } from "react";
import { SCORE_PERFECT, SCORE_GOOD, SCORE_MISS } from "../global/settings";

export default class Score extends Component {
	constructor(props) {
		super(props);
		this.state = {
			combo: 0,
		}
	}

	checkResult(result) {
		// // switch (result) {
		// // 	case SCORE_PERFECT:
		// // 		this.setState({
		// // 			...this.state,
		// // 			combo: this.state.combo+1
		// // 		});
		// // 		break;

		// // 	case SCORE_GOOD:
		// // 		this.setState({
		// // 			...this.state,
		// // 			combo: this.state.combo+1
		// // 		});
		// // 		break;
			
		// // 	case SCORE_MISS:
		// // 		this.setState({
		// // 			...this.state,
		// // 			combo: 0
		// // 		});
		// // 		break;
		
		// 	default:
		// 		break;
		// }

		console.log("combo", this.state.combo);
	}

	render() {
		return (
			<div>
				<p>{this.state.combo}</p>
			</div>
		)
	}
}