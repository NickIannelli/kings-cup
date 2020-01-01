import React from 'react';
import './cup.css';

const length = 8;
const baseLength = 3;

export default () => (
	<div className="cup">
		{Array.from({ length }, (_, i) => i).map(idx => {
			const i = Math.PI * 2 * (idx / length);
			const xDisp = Math.sin(i);
			const yDisp = Math.cos(i);
			const rad = 180 / Math.PI;
			return (
				<div
					key={i}
					className="cup-face"
					style={{
						transform: `translate3d(${xDisp * 48}px, ${yDisp * 48}px, 80px)
						rotate3d(0, 0, 1, ${Math.atan2(yDisp, xDisp) * rad + 90}deg)
						rotate3d(1, 0, 0, 90deg)`
					}}
				/>
			);
		})}
		{Array.from({ length: baseLength }, (_, i) => i).map(idx => (
			<div
				className="cup-base"
				key={idx}
				style={{ transform: `translate3d(0, 0, ${idx * 3}px) scale(${1.15 - idx * 0.05})` }}
			/>
		))}
	</div>
);
