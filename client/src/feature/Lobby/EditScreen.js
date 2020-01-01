import React from 'react';
import { Link } from 'react-router-dom';
import { setCardDetail } from '@kings-cup/shared/actions';
import { moveToNextField } from '../../util/dom';
import { useGameState, useMessageHandler } from './../../@library/GameConnector';
import { getCardImage } from './../../util/image';

const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['Heart', 'Diamond', 'Spade', 'Club'];

const getStatus = ({ initialValue, value }) => {
	switch (true) {
		case initialValue === value && value !== '':
			return 'green';
		case initialValue !== value:
			return 'red';
		case value === '':
			return 'orange';
		default:
			return '';
	}
};

const EditableFace = ({ face, initialValue = '' }) => {
	const [value, setValue] = React.useState(initialValue);
	const send = useMessageHandler();
	React.useEffect(() => {
		setValue(initialValue);
		if (initialValue !== '') {
			moveToNextField();
		}
	}, [initialValue]);

	return (
		<li className="PlayerRow">
			<img
				src={getCardImage({ suit: 'ALL', value: face })}
				className="AvatarContainer AvatarContainer--card"
			/>
			<div className="name">
				<form
					action="#"
					onSubmit={e => {
						e.preventDefault();
						send(setCardDetail(face, value));
					}}
				>
					<div className={`StatusDot ${getStatus({ initialValue, value })}`} />
					<input type="text" value={value} onChange={e => setValue(e.currentTarget.value)} />
				</form>
			</div>
		</li>
	);
};

export const EditScreen = () => {
	const { state } = useGameState();

	return (
		<div style={{ paddingBottom: '120px' }}>
			<ul className="notList">
				{faces.map(face => (
					<EditableFace
						face={face}
						suits={suits}
						key={face}
						initialValue={state?.rules[`${face}_ALL`]?.rule ?? ''}
					/>
				))}
			</ul>
			<Link to="/game/lobby">
				<div
					className="Fixed Fixed--bottom Fixed--stylish"
					style={{ fontWeight: 'bold', padding: '20px', display: 'block' }}
				>
					Done!
				</div>
			</Link>
		</div>
	);
};

export default EditScreen;
