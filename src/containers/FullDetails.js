import React from 'react';
import PropTypes from 'prop-types';

class FullDetails extends React.Component {
  render() {
    console.log('FullDetail props:', this.props);
    const { name, address, hours, images } = this.props.locationData;
    const { url, alt_text } = images.length
      ? images[0]
      : { url: 'https://img.taste.com.au/zKg2EAgI/w720-h480-cfill-q80/taste/2017/12/avocado-and-sesame-rice-ball-bento-box-133662-1.jpg', alt_text: 'default bento' };
    const scrubbedHoursHTML = DOMPurify.sanitize(hours);
    return (
      <div style={{ flex: 1 }}>
        <img style={{ height: '50vh', width: '50vw', objectFit: 'cover' }} src={url} alt={alt_text} />
        <div style={{ padding: '10px' }}>
          <h1>{name}</h1>
          <h3>{address}</h3>
          <div dangerouslySetInnerHTML={{ __html: scrubbedHoursHTML }} />
        </div>
      </div>
    );
  }
}

FullDetails.propTypes = {
  locationData: PropTypes.object.isRequired
};

export default FullDetails;
