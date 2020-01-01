import React from 'react';

const preventDefault = e => e.preventDefault();

export const useScrollLock = () => {
	React.useEffect(() => {
		document.addEventListener('touchmove', preventDefault, { passive: false });
		return () => {
			document.removeEventListener('touchmove', preventDefault);
		};
	});
};
let startPosition = { x: null, y: null };
let touches = [];
let lastTouch = {
	x: null,
	y: null
};

const serializeTouch = touch => ({
	touch: { clientX: touch.clientX, clientY: touch.clientY },
	t: +new Date()
});

export const useDraggableValue = ({ x: initX, y: initY } = {}) => {
	const [x, setX] = React.useState(initX || 0);
	const [y, setY] = React.useState(initY || 0);
	const [duration, setDuration] = React.useState(0);

	const onTouchStart = e => {
		startPosition = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		};
		lastTouch = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		};
		touches.unshift(serializeTouch(e.touches[0]));
		setDuration(0);
	};
	const onTouchMove = e => {
		touches.unshift(serializeTouch(e.touches[0]));
		setX(x + (lastTouch.x - e.touches[0].clientX));
		setY(y + (lastTouch.y - e.touches[0].clientY));
		lastTouch = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		};
		if (touches.length > 8) {
			touches.length = 8;
		}
	};
	const onTouchEnd = () => {
		try {
			const A = touches[0];
			const B = touches[touches.length - 1];
			const timeDiff = Math.max(0, (1000 - (+new Date() - B.t)) / 20);
			setDuration(timeDiff / 100);
			setX(x + (B.touch.clientX - A.touch.clientX) * (timeDiff / 30));
			setY(y + (B.touch.clientY - A.touch.clientY) * (timeDiff / 30));
			touches = [];
		} catch (e) {
			// NO-OP. This just happens sometimes, eh
		}
	};

	return {
		containerProps: {
			onTouchStart,
			onTouchEnd,
			onTouchMove
		},
		transformValue: { x, y, duration }
	};
};
