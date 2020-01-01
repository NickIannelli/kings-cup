import React from 'react';
import { memoize } from 'lodash';
import { drawCard } from '@kings-cup/shared/actions';
import { useGameState, useMessageHandler } from './../../@library/GameConnector';
import Cup from '../../components/Cup';
import { useDraggableValue } from '../../util/hooks';
import { getCardImage } from './../../util/image';
import './gameboard.css';

const baseTransform = 'rotate3d(1, 0, 0, 66deg) translate3d(5px, -100px, 0)';

const edges = ['top', 'bottom', 'left', 'right'];

const getTranslationForIndex = memoize(
	(idx, length, preselected, selected) => {
		const i = Math.PI * 1.95 * (idx / length);
		const xDisp = Math.sin(i);
		const yDisp = Math.cos(i);
		const rad = 180 / Math.PI;
		switch (true) {
			case selected === idx:
				return '';
			case preselected === idx:
				return `translate3d(${xDisp * 220}px, ${yDisp * 220}px, 1px)
			rotate3d(0, 0, 1, ${Math.atan2(yDisp, xDisp) * rad + 90}deg)`;
			default:
				return `translate3d(${xDisp * 130}px, ${yDisp * 130}px, 1px)
			rotate3d(0, 0, 1, ${Math.atan2(yDisp, xDisp) * rad + 90}deg)`;
		}
	},
	(...args) => args.join('|')
);

export const Gameboard = ({ canDraw }) => {
	const [preselected, setPreselected] = React.useState(null);
	const [selected, setSelected] = React.useState(null);
	const { state = {} } = useGameState();
	const send = useMessageHandler();
	const { containerProps, transformValue } = useDraggableValue({ x: 0, y: 0 });
	const { height: compHeight } = document.body.getBoundingClientRect();
	const height = compHeight - 135;
	const handleClick = index => {
		if (!selected) {
			if (index === preselected) {
				send(drawCard(index));
				setSelected({ ...state.deck[index] });
			} else {
				setPreselected(index);
			}
		}
	};
	const cardStates = state.deck?.map(({ isDrawn }) => isDrawn).join('|');
	React.useEffect(() => {
		setPreselected(null);
	}, [cardStates]);

	return (
		<>
			{selected && (
				<div className="draw-container">
					<div className="card-rule-container">
						<img src={getCardImage(selected)} alt="" />
						<div>
							<span>{state.rules[`${selected.value}_ALL`]?.rule}</span>
						</div>
					</div>
					<button onClick={() => setSelected(null)}>✖</button>
				</div>
			)}
			<div className="container" {...containerProps} style={{ height, perspective: height }}>
				<div
					className="stage"
					style={{
						transform: `${baseTransform} rotate3d(0, 0, 1, ${transformValue.x}deg)`,
						transition: `transform ${transformValue.duration}s ease-out`
					}}
				>
					{state.deck?.map((card, idx) =>
						card.isDrawn ? null : (
							<img
								key={getCardImage(card)}
								src="/images/cards/BACK.svg"
								{...(canDraw ? { onClick: () => handleClick(idx) } : {})}
								className="PlayingCard"
								style={{
									transform: getTranslationForIndex(idx, state.deck.length, preselected, selected)
								}}
							/>
						)
					)}
					{edges.map(edge => (
						<div className={`edge ${edge}`} key={edge} />
					))}
					<Cup />
				</div>
			</div>
		</>
	);
};

export default Gameboard;
