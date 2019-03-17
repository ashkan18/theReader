import React from 'react'
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import AuthService from '../services/AuthService';


interface Props {
  navigation: any
}

export default class StartScreen extends React.Component<Props,{}> {
  constructor(props: Props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
    const authService = new AuthService
    authService.getToken()
    .then((token) => this.props.navigation.navigate(token !== null && token !== "" ?  'App' : 'Auth'))
    .catch((_) => this.props.navigation.navigate('Auth'))
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
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
  input: {
    height: 60,
    width: 100
  },
  error:{
    height: 60,
    width: 100,
    color: 'red'
  }
})
