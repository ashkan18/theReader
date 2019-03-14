import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken("pk.eyJ1IjoiYXNoa2FuMTgiLCJhIjoiY2pzdnk5eGRpMGMxcTN5bzRsOHRjdDR2cCJ9.qaLMKiKsDDLnMPLJ-s4rIQ");

interface State {
  viewport: {}
}

export default class MainScreen extends Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      viewport: {
        centerCoordinate: [-74.00, 40.7229971],
        zoom: 13,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      },
    };
  }

  render () {
    return (
      <MapboxGL.MapView
          { ...this.state.viewport }
          showUserLocation={true}
          style={styles.container}
          mapStyle="mapbox://styles/ashkan18/cjswesy7d0gqp1fqmkzbtuudr"
          mapboxApiAccessToken="pk.eyJ1IjoiYXNoa2FuMTgiLCJhIjoiY2pzdnk5eGRpMGMxcTN5bzRsOHRjdDR2cCJ9.qaLMKiKsDDLnMPLJ-s4rIQ">
      </MapboxGL.MapView>
      );
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    alignSelf: 'stretch'
	},
	map: {
		height: 400,
		marginTop: 80
	},
	annotationContainer: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 15
	},
	annotationFill: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'blue',
		transform: [{ scale: 0.6 }]
	}
});