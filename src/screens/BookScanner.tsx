
import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import BookService from '../services/BookService';
import { RNCamera } from 'react-native-camera';

interface Props {
  navigation: any
}
interface State {
  scannedBarcode: string | null,
  error?: string
  camera: any
}

export default class BookScanner extends React.Component<Props, State> {
  bookService: BookService = new BookService
  camera: RNCamera | null;

  constructor(props: Props) {
    super(props)
    this.camera = null
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true
      },
      scannedBarcode: null
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.camera.flashMode}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone to scan books barcode.'}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Cancel </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onBarCodeRead = (scanResult:any) => {
    if (this.state.scannedBarcode === null && scanResult.data !== null) {
      this.setState({scannedBarcode: scanResult.data})
      this.bookService.findBook(scanResult.data)
      .then( response => this.props.navigation.navigate('SubmitBook', { book: response.book }))
      .catch( error => this.setState({error}))
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});