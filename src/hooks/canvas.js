import { useEffect, useRef } from "react";

export default function useCanvas(draw) {
	const canvasRef = useRef(null);
	const loopId = useRef();
	const previousTime = useRef();

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');

		const loop = time => {
			if (previousTime.current) {
				context.clearRect(0, 0, canvas.width, canvas.height);
				draw(context, 0.001 * (time - previousTime.current));
			}
			previousTime.current = time;
			loopId.current = requestAnimationFrame(loop);
		}

		loopId.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(loopId.current);
	}, [draw]);

	return canvasRef;
}