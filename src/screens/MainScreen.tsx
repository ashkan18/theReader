import React, {Component} from 'react';
import {View, StyleSheet, GeolocationReturnType, Text} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import FormTextInput from '../components/FormTextInput'
import Header from '../components/Header';
import AuthService from '../services/AuthService';

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
  user?: User,
  error?: any
}

interface Props {
  navigation: any
}

export default class MainScreen extends Component<Props, State> {
  authService: AuthService = new AuthService

  constructor(props: Props) {
    super(props);
    this.state = {
      bookInstances: [],
      map: {
        centerCoordinate: [-74.00, 40.7229971],
        zoom: 15
      }
    }
    this.getCurrentLocation()
    this.currentUser()
  }

  private getCurrentLocation () {
    navigator.geolocation.getCurrentPosition(
      (currentLocation: GeolocationReturnType) => this.setState({currentLocation, map: {...this.state.map, centerCoordinate: [currentLocation.coords.longitude, currentLocation.coords.latitude]}}),
      (error) => this.setState({error: error.message})
    )
  }

  private currentUser(){
    this.authService.me()
    .then((user: User) => this.setState({user: user}))
    .catch((error) => this.setState({error: error.message}))
  }

  public render () {
    return (
      <View style={styles.container}>
        <Header title="ReadToMe" user={this.state.user} navigation={this.props.navigation}/>
        <View style={styles.searchContainer}>
          <FormTextInput placeholder="Search" style={styles.searchInput}/>
          <Text>📙</Text>
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
  searchContainer: {
    flexDirection: "row",
    height: 45,
    justifyContent: "center",
    padding: 5
  },
  searchInput: {
    flex: 1
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