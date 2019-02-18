import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Google maps wrapper that makes it easy to overlay components on top of google map.
import GoogleMapReact from 'google-map-react';

// Styled components.
import styled from 'styled-components';

import { fetchLocations } from '../helpers/api';

// Testing.
const MarcusTestingComponent = ({ text }) => <div>{text}</div>;

class App extends React.Component {
  componentDidMount() {
    //fetchLocations()
      //.then(response => console.log(response))
      //.catch(error => console.log(error));
  }
  renderMarkers(map, maps) {
    fetchLocations()
      .then(response => {

        // Instantiate a geocoder that can provide (lat, lng) tuples for the
        // addresses in the locations array.
        var geocoder = new google.maps.Geocoder();

        ////////////////////////////////////////////////////////////////////////
        //
        // We loop through each of the eventual pins in the locations array,
        // and we get the (lat, lng) tuple for this address in order to add
        // the address to our google maps object.
        //
        ////////////////////////////////////////////////////////////////////////

        console.log(response)

        for (let i = 0; i < response.length; i++) {
          geocoder.geocode( { 'address': response[i].address }, function(results, status) {
            // Checks to see whether we get a (lat, lng) tuple.
            if (status == google.maps.GeocoderStatus.OK) {
              let contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">' + response[i].slug + '</h1>'+
                '<div id="bodyContent">'+
                '<p> Address ' + response[i].address + '</p>' +
                '<button value=\'' + i + '\' onclick={display_details_component()}>View Details.</button>' +
                '</div>'+
                '</div>';
              // Taken from: https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
              let infowindow = new google.maps.InfoWindow({
                content: contentString
              });
              // Add a marker to our map using our geocoded address!
              let marker = new maps.Marker({
                position: {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng()
                },
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                },
                map
              });
              // Taken from: https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
              marker.addListener('click', function() {
                infowindow.open(map, marker);
              });
            }

          });
        }

      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <span>
        <h1>Locations Map Exercise!</h1>
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={{
              lat: 59.95,
              lng: 30.33
            }}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
            defaultZoom={11}>
            <MarcusTestingComponent
              lat={59.955413}
              lng={30.337844}
              text={'Kreyser Avrora'}
            />
          </GoogleMapReact>
        </div>
      </span>
    );
  }
}

export default App;
