import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import BookService from '../services/BookService'
import Button from '../components/Button';

interface Props {
  navigation: any
}

interface State {
  book: any
  external: any
  reading: boolean
  loaning: boolean
  takeIt: boolean
  location: any
  error?: string
}

export default class SubmitBook extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = { book: this.props.navigation.getParam('book'), external: this.props.navigation.getParam('external'), reading: false, loaning: false, takeIt: false, location:  null}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Condition</Text>
        <Text>Offer</Text>
        {/* <Text title='Read 🧡' checked={this.state.reading} onIconPress={ () => this.setState({reading: true}) }/>
        <Text title='Loan' checked={this.state.loaning} onIconPress={ () => this.setState({loaning: true}) }/>
        <Text title='Take It' checked={this.state.takeIt} onIconPress={ () => this.setState({takeIt: true}) }/> */}
        <Button onPress={this.submit} label="Lets do this!"/>
      </View>
    )
  }

  private submit() {
    navigator.geolocation.getCurrentPosition(
      ((location: Position) => {
        let bookService = new BookService
        bookService.postBook(location.coords, this.state.book.id)
        .then( _response => {
          this.props.navigation.navigate('Map')
        })
        .catch( error => {
          console.log(error)
          this.setState({error})
        })
      }),
      ((error: PositionError) => this.setState({error: error.message}))
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    width: 200,
    height: 200
  }
})
