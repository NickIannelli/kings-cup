import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollLock } from '../../util/hooks';

export const HomeScreen = () => {
	useScrollLock();

	return (
		<div className="column-layout" style={{ paddingTop: '100px' }}>
			<img src="/images/logo.png" alt="Kings Cup!" width="80%" />
			<Link to="/game" className="CTA">
				Play!
			</Link>
		</div>
	);
};

export default HomeScreen;
