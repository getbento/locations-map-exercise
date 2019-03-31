import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

class FullDetails extends React.Component {
  render() {
    const { name, address, hours, images } = this.props.locationData;
    const { url, alt_text: altText } = images.length
      ? images[0]
      : { url: 'https://img.taste.com.au/zKg2EAgI/w720-h480-cfill-q80/taste/2017/12/avocado-and-sesame-rice-ball-bento-box-133662-1.jpg', alt_text: 'default bento' };
    const scrubbedHoursHTML = DOMPurify.sanitize(hours);
    return (
      <div style={{ flex: 1, backgroundColor: 'rgb(243, 232, 227)' }}>
        <div style={{ position: 'absolute', zIndex: 100, padding: '10px' }}>
          <button
            style={{ height: '30px', width: '30px', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
            onClick={this.props.closeDetails}>
            <p style={{ margin: '0' }}>X</p>
          </button>
        </div>
        <img style={{ height: '50vh', width: '50vw', objectFit: 'cover' }} src={url} alt={altText} />
        <div style={{ height: '50vh', padding: '0px 10px', overflowY: 'auto' }}>
          <h1 style={{ margin: '0px', paddingTop: '10px' }}>{name}</h1>
          <h3>{address}</h3>
          <div dangerouslySetInnerHTML={{ __html: scrubbedHoursHTML }} />
        </div>
      </div>
    );
  }
}

FullDetails.propTypes = {
  locationData: PropTypes.object.isRequired,
  closeDetails: PropTypes.func.isRequired
};

export default FullDetails;
