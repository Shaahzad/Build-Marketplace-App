import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from '../screens/Homescreen';
import Explorescreen from '../screens/Explorescreen';
import Addpostscreen from '../screens/Addpostscreen';
import Profilescreen from '../screens/Profilescreen';

const Tab = createBottomTabNavigator();

export default function Tabnavigation() {
  return (
    <Tab.Navigator>
    <Tab.Screen name='home' component={Homescreen}/>
    <Tab.Screen name='explore' component={Explorescreen}/>
    <Tab.Screen name='addpost' component={Addpostscreen}/>
    <Tab.Screen name='profile' component={Profilescreen}/>
    </Tab.Navigator>
  )
}