import React, {Component} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
} from 'react-native'
import AuthService from '../services/AuthService';
import FormTextInput from './FormTextInput';
import Button from './Button';
import strings from '../config/strings';
import colors from '../config/colors';
import LoginScreen from '../screens/LoginScreen';


interface State {
  username: string
  password: string
  error?: string
}

interface Props {
  navigation: any
}

export default class LoginForm extends Component<Props, State> {
  authService: AuthService = new AuthService
  readonly state: State = {
    username: "",
    password: ""
  };

  handleUsernameChange = (username: string) => {
    this.setState({ username: username });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
  };

  handleLoginPress = () => {
    console.log("Login button pressed")
    this.authService.login(this.state.username, this.state.password)
    .then( (_token: string) => this.props.navigation.navigate('App') )
    .catch( (_error: string) => {
      console.log(_error)
      this.setState({error: "Username and Password don't match. Please try again."})
    })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        { this.state.error !== null && <Text> {this.state.error} </Text> }
        <View style={styles.form}>
          <FormTextInput
            value={this.state.username}
            onChangeText={this.handleUsernameChange}
            placeholder={strings.EMAIL_PLACEHOLDER}
            keyboardType="email-address"
          />
          <FormTextInput
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            textContentType="password"
          />
          <Button label={strings.LOGIN} onPress={this.handleLoginPress} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
})
