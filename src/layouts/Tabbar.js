import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import DetailScreen from '../screens/DetailScreen'


const HomeStack = createStackNavigator({
    Home : {
        screen : HomeScreen,
        headerMode:'none',
       
    },
    Add:  {
        screen : AddScreen,
        headerMode:'none',

    },
    Detail:  {
        screen : DetailScreen,
        headerMode:'none',

    }
  })
  

  export default HomeStack
