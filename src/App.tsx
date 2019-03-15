/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MainScreen from './screens/MainScreen';

import { createSwitchNavigator, createStackNavigator } from 'react-navigation'

import LoginScreen from './screens/LoginScreen';

const AppStack = createStackNavigator(
  {
    Main:  MainScreen,
  },
  {
    initialRouteName: "Main"
  }
)

const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);