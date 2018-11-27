import React from 'react';

const InfoWindowDisplay = (props) => {
	const { viewDetails, ...locationData } = props
	const { name, address } = locationData
	return (
		<div className="info-window">
			<div>{name}</div>
			<div>{address}</div>
			<button onClick={() => viewDetails(locationData)}>View Details</button>
		</div>
	)
}

export default InfoWindowDisplay;
