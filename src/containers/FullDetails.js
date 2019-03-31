import React from 'react';
import PropTypes from 'prop-types';

class FullDetails extends React.Component {
  render() {
    console.log('FullDetail props:', this.props);
    const { name, address, hours, images } = this.props.locationData;
    const { url, alt_text } = images.length
      ? images[0]
      : { imageUrl: 'https://img.taste.com.au/zKg2EAgI/w720-h480-cfill-q80/taste/2017/12/avocado-and-sesame-rice-ball-bento-box-133662-1.jpg', altText: 'default bento' };
    console.log('imageUrl and alt_text:', url, alt_text);
    return (
      <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <img style={{ height: '50vh', width: '50vw', objectFit: 'cover' }} src={url} alt={alt_text} />
        <h1>{name}</h1>
        <h3>{address}</h3>
      </div>
    );
  }
}

FullDetails.propTypes = {
  locationData: PropTypes.object.isRequired
};

export default FullDetails;
