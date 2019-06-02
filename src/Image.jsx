import React, { useState, useEffect, useCallback } from 'react';
import { BYPASS_CORS } from './constants';
import PulseLoader from 'react-spinners/PulseLoader';

export default function Image({ src, className }) {
	const [urlLoaded, setUrlLoaded] = useState(null);
	const [error, setError] = useState(false);

	const fetchImage = useCallback(async () => {
		try {
			const image = await fetch(BYPASS_CORS + src);
			if (image.ok) {
				const imageBlob = await image.blob();
				const objectURL = URL.createObjectURL(imageBlob);
				setUrlLoaded(objectURL);
			} else {
				throw new Error();
			}
		} catch (error) {
			setError(true);
		}
	}, [src]);

	useEffect(() => {
		fetchImage();
	}, [fetchImage]);

	console.log('image render');

	return urlLoaded ? (
		<img className='weather-info__icon' src={urlLoaded} alt='weather-icon' />
	) : error ? (
		'Error loading image'
	) : (
		<div className={className}>
			<PulseLoader size={10} />
		</div>
	);
}
