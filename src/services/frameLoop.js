import { useEffect, useRef } from "react";

export function useFrameLoop(callback) {
	const loopId = useRef();
	const previousTime = useRef();

	const loop = time => {
		if (previousTime.current) {
			callback(0.001 * (time - previousTime.current));	
		}

		previousTime.current = time;
		loopId.current = requestAnimationFrame(loop);
	}

	useEffect(() => {
		loopId.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(loopId.current);
	}, []);
}