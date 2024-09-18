import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from '../screens/Homescreen';
import Itemlist from '../screens/Itemlist';
import ProductDetail from '../screens/ProductDetail';


const Stack = createStackNavigator();

export default function HomeStackNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='home-nav' component={Homescreen} options={{headerShown:false}}/>
        <Stack.Screen name= 'item-list' component={Itemlist}
          options={({route}) => ({title: route.params.category,
            headerStyle:{
              backgroundColor: '#3b82f6'
            },
            headerTintColor: '#fff'
          })}/>
          <Stack.Screen name= 'product-detail' component={ProductDetail}
          options={{
            headerStyle:{
              backgroundColor: '#3b82f6'
            },
            headerTintColor: '#fff',
            headerTitle: 'Product Detail'
          }}
          />
    </Stack.Navigator>
  )
}