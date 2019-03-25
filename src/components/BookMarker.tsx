import * as React from "react";
import { StyleSheet, Animated, TouchableOpacity, Image, View } from "react-native"
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import colors from "../config/colors";

interface Props {
  bookInstance: BookInstance
  map: MapboxGL.MapView
}

interface State {
  showDetails: boolean
  selected: boolean
}

class BookMarker extends React.Component<Props, State> {
  _scaleIn: null;
  _scaleOut: null;
  constructor(props: Props) {
    super(props);
    this.state = { showDetails: false, selected: false}
    this._scaleIn = null;
    this._scaleOut = null;
  }

  onAnnotationSelected() {
    const {map, bookInstance} = this.props
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
        subtitle={"Ashkan NAsseri"}
        selected={this.state.selected}
        coordinate={[bookInstance.location.lng, bookInstance.location.lat]}
        onSelected={(_feature: any) => this.onAnnotationSelected()}>
        <Image source={require('../assets/marker.png')} style={styles.stretch}/>
      </MapboxGL.PointAnnotation>
    );
  }
}

const ANNOTATION_SIZE = 45;

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
  annotationContainer: {
    width: ANNOTATION_SIZE,
    height: ANNOTATION_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: ANNOTATION_SIZE / 2,
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