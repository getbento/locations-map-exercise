import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './detail.css';

class Detail extends Component {
  renderImages() {
    const images = this.props.info.images;

    return images.length <= 0
      ? null
      : (<div key={images[0].url} className={styles.imageContainer}>
        <img height="300" width="300" src={images[0].url} alt=""/>
      </div>);
    // return images.map((image, index) => {
    //   return (
    //     <div key={image.url} className={styles.imageContainer}>
    //       <img height="300" width="300" src={image.url} alt=""/>
    //     </div>);
    // });
  }

  createMarkup(htmlString) {
    return {__html: htmlString};
  }

  render() {
    const location = this.props.info;
    return (
      <div id="detailContainer" className={styles.detailContainer}>
        <div className={styles.locationName}>{location.name}</div>
        {this.renderImages()}
        <div className={styles.locationAddress}>{location.address}</div>
        {/* <div>{location.hours}</div> */}
        <div dangerouslySetInnerHTML={this.createMarkup(location.hours)}></div>
      </div>
    );
  }
}

Detail.propTypes = {
  info: PropTypes.object.isRequired
};

export default Detail;
