import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Explorescreen from '../screens/Explorescreen'
import ProductDetail from '../screens/ProductDetail'

const stack = createStackNavigator()
export default function ExplorescreenNavigation() {
  return (
    <stack.Navigator>
        <stack.Screen name='explorescreen' component={Explorescreen} options={{headerShown:false}}/>
        <stack.Screen name='product-detail' component={ProductDetail} options={{
            headerStyle:{
                backgroundColor: '#3b82f6'
            },
            headerTintColor: '#fff',
            headerTitle: 'Product Detail'
        }}/>
    </stack.Navigator>
  )
}