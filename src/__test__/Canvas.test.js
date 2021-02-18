import Canvas from '../components/Canvas';
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from 'react-dom';

describe("Custom Canvas component", () => {

	let container = null;
	beforeEach(() => {
		// setup a DOM element as a render target
		container = document.createElement("div");
		document.body.appendChild(container);

		jest.useFakeTimers();

		let count = 0;
		jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => setTimeout(() => cb(100*(++count)), 100));
	});
	
	afterEach(() => {
		// cleanup on exiting
		unmountComponentAtNode(container);
		container.remove();
		container = null;

		window.requestAnimationFrame.mockRestore();
		jest.clearAllTimers();
	});

	it("Canvas", () => {
		const draw = jest.fn();
		act(() => {
			render(<Canvas 
				id="playCanvas" 
				width="500"
				height="500"
				draw={draw}
			/>, container);
		});

		let canvas = document.querySelector("canvas");
		expect(canvas.getAttribute("width")).not.toBeNull();
		expect(canvas.getAttribute("height")).not.toBeNull();
		expect(canvas.getAttribute("draw")).toBeNull();

		act(() => {
			jest.advanceTimersByTime(200);
		});
		expect(draw).toBeCalledTimes(1);
		expect(draw.mock.calls[0][1]).toBe(0.1);

		act(() => {
			jest.advanceTimersByTime(100);
		});
		expect(draw).toBeCalledTimes(2);
		expect(draw.mock.calls[1][1]).toBe(0.1);
	});
});