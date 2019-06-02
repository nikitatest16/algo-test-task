import React, { useState, useEffect, memo } from 'react';
import { BYPASS_CORS } from './constants';
import PulseLoader from 'react-spinners/PulseLoader';

function Image({ src, className }) {
	const [urlLoaded, setUrlLoaded] = useState(null);

	useEffect(() => {
		fetch(BYPASS_CORS + src)
			.then(resp => resp.blob())
			.then(myBlob => {
				const objectURL = URL.createObjectURL(myBlob);
				setUrlLoaded(objectURL);
			});
	}, [src]);

	return urlLoaded ? (
		<img className='weather-info__icon' src={urlLoaded} alt='weather-icon' />
	) : (
		<div className={className}>
			<PulseLoader size={10} />
		</div>
	);
}

export default memo(Image);
