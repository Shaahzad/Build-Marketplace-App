import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Login from '../../assets/Login_.png'
import product from '../../assets/product.png'
import search from '../../assets/search.png'

export default function Profilescreen() {
  const {user} = useUser()
  const menuList = [
    {
      id:1,
      name:'My Product',
      icon: product
    },
    {
      id:2,
      name:'Explore',
      icon: search
    },
    {
      id:3,
      name:'Logout',
      icon: Login
    }
  ]
  return (
    <View className='p-5'>
    <View className='items-center mt-14'>
      <Image source={{uri:user.imageUrl}}
      className='w-[100px] h-[100px] rounded-full'
      />
  <Text className='text-[25px] font-bold mt-5'>{user.fullName}</Text>
  <Text className='text-[14px] mt-2 text-gray-500'>{user.primaryEmailAddress.emailAddress}</Text>
    </View>
    <FlatList
    data={menuList}
    numColumns={3}
    renderItem={({item,index})=>(
<TouchableOpacity className='flex-1 p-5 border-[1px] items-center m-4 border-blue-500 bg-blue-50 rounded-lg
'>
  {item.icon && <Image source={item?.icon} className='w-[100px] h-[100px]'/>}
</TouchableOpacity>
    )}
    />
    </View>
  )
}