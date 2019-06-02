import React, { useState, useEffect } from 'react';
import { MOSCOW, BYPASS_CORS } from './constants';
import ForecastRow from './ForecastRow';
import PulseLoader from 'react-spinners/PulseLoader';

export default function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`${BYPASS_CORS}https://www.metaweather.com/api/location/${MOSCOW}/`)
			.then(resp => resp.json())
			.then(resp => {
				console.log(resp);
				setData(resp);
			});
	}, []);

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
