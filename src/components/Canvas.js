import useCanvas from "../hooks/canvas"

export default function Canvas(props) {
	const { draw, ...restProps } = props;
	const canvasRef = useCanvas(draw);

	return (
		<canvas ref={canvasRef} {...restProps} />
	)
}