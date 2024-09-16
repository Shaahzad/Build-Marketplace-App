import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Explorescreen from '../screens/Explorescreen';
import Addpostscreen from '../screens/Addpostscreen';
import Profilescreen from '../screens/Profilescreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeStackNavigation from './HomeStackNavigation';
const Tab = createBottomTabNavigator();

export default function Tabnavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
    <Tab.Screen name='home' component={HomeStackNavigation} 
    options={{
      tabBarLabel:({color})=>(
        <Text style={{color:color,fontSize:12, marginBottom:3}}>Home</Text>
      ),
      tabBarIcon:({color,size})=>(
        <FontAwesome name="home" size={size} color={color} />
      )
    }}
    />
    <Tab.Screen name='explore' component={Explorescreen}
    options={{
      tabBarLabel:({color})=>(
        <Text style={{color:color,fontSize:12, marginBottom:3}}>Explore</Text>
      ),
      tabBarIcon:({color,size})=>(
      <FontAwesome name="search" size={24} color="black" />      )
    }}
    />
    <Tab.Screen name='addpost' component={Addpostscreen}
    options={{
      tabBarLabel:({color})=>(
        <Text style={{color:color,fontSize:12, marginBottom:3}}>Add Post</Text>
      ),
      tabBarIcon:({color,size})=>(
        <FontAwesome name="camera" size={size} color={color} />
      )
    }}
    />
    <Tab.Screen name='profile' component={Profilescreen}
    options={{
      tabBarLabel:({color})=>(
        <Text style={{color:color,fontSize:12, marginBottom:3}}>Profile</Text>
      ),
      tabBarIcon:({color,size})=>(
        <FontAwesome name="user" size={size} color={color} />
      )
    }}
    />
    </Tab.Navigator>
  )
}