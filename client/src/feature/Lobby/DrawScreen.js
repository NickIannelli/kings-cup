import React from 'react';
import { useHistory } from 'react-router-dom';
import { saveAvatar } from '@kings-cup/shared/actions';
import DrawableCanvas from 'react-drawable-canvas';
import { useMessageHandler, useGameState } from '../../@library/GameConnector';
import { useScrollLock } from '../../util/hooks';
import './draw.css';

const colors = [
	'#272727',
	'#fff',
	'#9d0b0b', // red
	'#ff7315', // orange
	'#a35638', // brown
	'#50d890', // green
	'#333366', // indigo
	'#f67280', // pink
	'#ad62aa' // purple
];

export const DrawScreen = () => {
	const send = useMessageHandler();
	const { getSelf } = useGameState();
	const history = useHistory();
	const [previewData, setPreviewData] = React.useState(null);
	const [brushColor, setBrushColor] = React.useState('#272727');
	const [isCleared, setClear] = React.useState(false);
	const { avatar } = getSelf();

	const clear = () => {
		setClear(true);
	};

	React.useEffect(() => {
		if (isCleared) {
			setClear(false);
			setPreviewData(null);
		}
	}, [isCleared]);

	React.useEffect(() => {
		const img = new Image();
		img.src = avatar;
		document
			.querySelector('canvas')
			.getContext('2d')
			.drawImage(img, 0, 0);
	}, [avatar]);
	useScrollLock();

	const save = () => {
		send(saveAvatar(document.querySelector('canvas').toDataURL()));
		history.push('/game/lobby');
	};

	return (
		<div className="column-layout">
			<h1 style={{ marginBottom: 0 }}>Draw your avatar</h1>
			<ul className="ColorPicker">
				{colors.map(hex => (
					<li key={hex} style={{ backgroundColor: hex }} onClick={() => setBrushColor(hex)} />
				))}
			</ul>
			<div className="AvatarContainer AvatarContainer--edit">
				<DrawableCanvas brushColor={brushColor} lineWidth={8} clear={isCleared} />
			</div>
			<div className="Fixed Fixed--bottom Fixed--stylish">
				<button type="button" onClick={clear}>
					Clear
				</button>
				<button
					type="button"
					onClick={() => setPreviewData(document.querySelector('canvas').toDataURL())}
				>
					Preview
				</button>
				<button onClick={save}>Save!</button>
				{previewData && (
					<img
						src={previewData}
						className="AvatarContainer"
						alt=""
						style={{ position: 'absolute', top: '-40px', left: 'calc(50% - 25px)' }}
					/>
				)}
			</div>
		</div>
	);
};

export default DrawScreen;
