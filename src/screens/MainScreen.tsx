import React, {Component} from 'react';
import {View, StyleSheet, GeolocationReturnType} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import FormTextInput from '../components/FormTextInput'

MapboxGL.setAccessToken("pk.eyJ1IjoiYXNoa2FuMTgiLCJhIjoiY2pzdnk5eGRpMGMxcTN5bzRsOHRjdDR2cCJ9.qaLMKiKsDDLnMPLJ-s4rIQ");

interface MapState {
  centerCoordinate: [number, number],
  zoom: number,
  bearing: number,
  pitch: number
}

interface State {
  map: MapState
  bookInstances: Array<any>
  currentLocation?: GeolocationReturnType
  error?: any
}

export default class MainScreen extends Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      bookInstances: [],
      map: {
        centerCoordinate: [-74.00, 40.7229971],
        zoom: 9,
        bearing: 0,
        pitch: 0,
      }
    }
    this.getCurrentLocation()
  }

  private getCurrentLocation () {
    navigator.geolocation.getCurrentPosition(
      (currentLocation: GeolocationReturnType) => this.setState({currentLocation, map: {...this.state.map, centerCoordinate: [currentLocation.coords.longitude, currentLocation.coords.latitude]}}),
      (error) => this.setState({error: error.message})
    )
  }

  public render () {
    return (
      <View style={styles.container}>
        <View>
          <FormTextInput placeholder="Search" style={styles.searchInput}/>
        </View>
        <MapboxGL.MapView
            { ...this.state.map }
            showUserLocation={true}
            style={styles.map}
            mapStyle="mapbox://styles/ashkan18/cjswesy7d0gqp1fqmkzbtuudr">
        </MapboxGL.MapView>
      </View>
      );
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: "column",
	},
	map: {
    flex: 1,
		alignSelf: 'stretch',
  },
  searchInput: {
    marginTop: 50
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