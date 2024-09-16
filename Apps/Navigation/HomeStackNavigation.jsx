import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from '../screens/Homescreen';
import Itemlist from '../screens/Itemlist';


const Stack = createStackNavigator();

export default function HomeStackNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='home-nav' component={Homescreen} options={{headerShown:false}}/>
        <Stack.Screen name= 'item-list' component={Itemlist}
          options={({route}) => ({title: route.params.category})}/>
    </Stack.Navigator>
  )
}