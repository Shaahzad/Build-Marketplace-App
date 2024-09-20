import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profilescreen from '../screens/Profilescreen'
import MyProduct from '../screens/MyProduct'
import ProductDetail from '../screens/ProductDetail'

const stack = createStackNavigator()
export default function ProfilestackScreen() {
  return (
   <stack.Navigator>
    <stack.Screen name='profile-tab' component={Profilescreen} options={{headerShown:false}}/>
    <stack.Screen name='my-product' component={MyProduct}
    options={{
        headerStyle:{
            backgroundColor: '#3b82f6'
        },
        headerTintColor: '#fff',
        headerTitle: 'My Product'
    }}
    />
    <stack.Screen name='product-detail' component={ProductDetail} options={{
            headerStyle:{
                backgroundColor: '#3b82f6'
            },
            headerTintColor: '#fff',
            headerTitle: 'Detail'
        }}/>
   </stack.Navigator>
  )
}