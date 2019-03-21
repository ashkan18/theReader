import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import colors from "../config/colors";

interface Props {
  bookInstance: BookInstance
}

interface State {
  showDetails: boolean
}

class BookMarker extends React.Component<Props> {
  render() {
    const { bookInstance } = this.props
    return (
      <MapboxGL.PointAnnotation
        key={bookInstance.id}
        id={bookInstance.id}
        title={bookInstance.book.title}
        coordinate={[bookInstance.location.lng, bookInstance.location.lat]}>
        <TouchableOpacity style={styles.container} onPress={() => this.setState({showDetails: true})}>
          <Image source={require('../assets/marker.png')} style={styles.stretch}/>
        </TouchableOpacity>
      </MapboxGL.PointAnnotation>
    );
  }
}

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
  }
})

export default BookMarker