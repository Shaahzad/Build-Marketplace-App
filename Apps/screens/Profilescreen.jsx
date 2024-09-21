import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import Login from '../../assets/Login_.png'
import product from '../../assets/product.png'
import { useNavigation } from '@react-navigation/native'

export default function Profilescreen() {
  const {user} = useUser()
  const navigation = useNavigation()
  const [loading , setloading] = useState(false)
  const {isloaded, signOut} = useAuth()
  const menuList = [
    {
      id:1,
      name:'My Product',
      icon: product,
      path: 'my-product'
    },
    {
      id:2,
      name:'Logout',
      icon: Login
    }
  ]
  const onMenuPress = (item) => {
    if(item.name=='Logout'){
      setloading(true)
      signOut()
      return
    }
    item.path?navigation.navigate(item.path):null
  }
  return (
    <View className='p-5 bg-white flex-1'>
    <View className='items-center mt-14'>
      <Image source={{uri:user.imageUrl}}
      className='w-[100px] h-[100px] rounded-full'
      />
  <Text className='text-[25px] font-bold mt-5'>{user.fullName}</Text>
  <Text className='text-[14px] mt-2 text-gray-500'>{user.primaryEmailAddress.emailAddress}</Text>
    </View>
    <FlatList
    style={{marginTop:20}}
    data={menuList}
    numColumns={3}
    renderItem={({item,index})=>(
 <TouchableOpacity onPress={()=>onMenuPress(item)} className='flex-1 p-3 border-[1px] items-center mx-2 mt-4 border-blue-500 bg-blue-50 rounded-lg'>
  {item.icon && <Image source={item?.icon} className='w-[100px] h-[100px]'/>}
  <Text className='text-[12px] text-blue-700 mt-2'>{item.name}</Text>
 </TouchableOpacity>
    )}
    />
    </View>
  )
}