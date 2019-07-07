import * as React from "react";
import { StyleSheet, Animated, Text, Image, View } from "react-native"
import MapboxGL from '@mapbox/react-native-mapbox-gl'

interface Props {
  bookInstance: BookInstance
  map: MapboxGL.MapView
}

interface State {
  showDetails: boolean
  selectedInstanceId: string | null
}

class BookMarker extends React.Component<Props, State> {
  _scaleIn: null;
  _scaleOut: null;
  constructor(props: Props) {
    super(props);
    this.state = { showDetails: false, selectedInstanceId: null }
    this._scaleIn = null;
    this._scaleOut = null;
  }

  onAnnotationSelected(_feature, bookInstance: BookInstance) {
    const {map} = this.props
    this.setState({selectedInstanceId: bookInstance.id})
    this._scaleIn = new Animated.Value(0.6);
    Animated.timing(this._scaleIn, {toValue: 1.0, duration: 200}).start();
    map.moveTo([bookInstance.location.lng, bookInstance.location.lat], 500);
  }

  render() {
    const { bookInstance } = this.props
    return (
      <MapboxGL.PointAnnotation
        key={bookInstance.id}
        id={bookInstance.id}
        title={bookInstance.book.title}
        selected={ bookInstance.id === this.state.selectedInstanceId }
        coordinate={[bookInstance.location.lng, bookInstance.location.lat]}
        onSelected={(feature: any) => this.onAnnotationSelected(feature, bookInstance)}>
        <Image source={require('../assets/marker.png')} style={styles.stretch}/>
        <MapboxGL.Callout>
          <View style={styles.annotationContainer}>
            <Image source={{uri: bookInstance.book.smallCoverUrl }} style={styles.bookCover}/>
            <Text>{bookInstance.book.title}</Text>
          </View>
        </MapboxGL.Callout>
      </MapboxGL.PointAnnotation>
    );
  }
}

const ANNOTATION_SIZE = 100;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  stretch: {
    width: 30,
    height: 45,
    flex: 1,
    resizeMode: 'contain',
  },
  bookCover: {
    width: 45,
    height: 45
  },
  annotationContainer: {
    width: 200,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.45)',
  },
  annotationFill: {
    width: ANNOTATION_SIZE - 3,
    height: ANNOTATION_SIZE - 3,
    borderRadius: (ANNOTATION_SIZE - 3) / 2,
    backgroundColor: 'orange',
    transform: [{scale: 0.6}],
  },
})

export default BookMarker


