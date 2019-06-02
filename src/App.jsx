import React, { useState, useEffect, useCallback } from 'react';
import { MOSCOW, BYPASS_CORS } from './constants';
import ForecastRow from './ForecastRow';
import PulseLoader from 'react-spinners/PulseLoader';

export default function App() {
	const [data, setData] = useState(null);

	const fetchData = useCallback(async () => {
		try {
			const data = await fetch(`${BYPASS_CORS}https://www.metaweather.com/api/location/${MOSCOW}/`);
			if (data.ok) {
				const weatherData = await data.json();
				setData(weatherData);
			} else {
				throw new Error('Unable to get data. Please refresh.');
			}
		} catch (error) {
			alert(error.message);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<>
			<div className='tabs'>
				<button className='tabs__tab'>Today</button>
				<button className='tabs__tab tabs__tab--selected'>Week</button>
			</div>
			<section className={data ? 'content' : 'content content--loading'}>
				{data ? (
					data.consolidated_weather.map(item => <ForecastRow key={item.applicable_date} data={item} />)
				) : (
					<PulseLoader size={10} />
				)}
			</section>
		</>
	);
}
