/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import MainScreen from './screens/MainScreen';

import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import LoginScreen from './screens/LoginScreen';
import StartScreen from './screens/StartScreen'
import BookScanner from './screens/BookScanner'
import SubmitBook from './screens/SubmitBook'

const AppStack = createStackNavigator(
  {
    Main:  MainScreen,
    BookScanner: BookScanner,
    SubmitBook: SubmitBook
  },
  {
    initialRouteName: "Main"
  }
)

const AuthStack = createStackNavigator({ Login: LoginScreen });

const RootStack = createSwitchNavigator(
  {
    Start: StartScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Start',
  }
)

const App = createAppContainer(RootStack);

export default App