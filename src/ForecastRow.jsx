import React from 'react';
import { WEEK_DAY_STRINGS, MONTH_STRINGS, WEATHER_COLORS } from './constants';
import Image from './Image';

const transformDate = dateStr => {
	const date = new Date(dateStr);
	const weekDay = WEEK_DAY_STRINGS[date.getDay()];
	const month = MONTH_STRINGS[date.getMonth()];
	const dayOfTheMonth = date.getDate();
	return { weekDay, month, dayOfTheMonth };
};

export default function ForecastRow({ data }) {
	const { weekDay, month, dayOfTheMonth } = transformDate(data.applicable_date);
	return (
		<div className={`forecast-row ${WEATHER_COLORS[data.weather_state_name]}`}>
			<div className='date'>
				<div className='date__weekday'>{weekDay}</div>
				<div className='date__day-and-month'>{`${dayOfTheMonth} ${month}`}</div>
			</div>
			<div className='weather-info'>
				<div className='weather-info__temp-range'>
					{parseInt(data.max_temp)}&deg; / {parseInt(data.min_temp)}&deg;
				</div>
				<Image
					className='weather-info__icon-loader'
					src={`https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`}
				/>
			</div>
		</div>
	);
}
