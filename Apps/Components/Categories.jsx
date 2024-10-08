import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categories({categoryList}) {
  const navigate = useNavigation()
  return (
    <View className="mt-3">
      <Text className="text-[20px] font-bold">Categories</Text>
      <FlatList data={categoryList} numColumns={4} renderItem={({item,index})=>(
        <TouchableOpacity onPress={()=>navigate.navigate('item-list',{
          category:item.name
        })} className="flex-1 items-center justify-center p-2 border-[1px] border-blue-200
        m-1 h-[80px] rounded-lg bg-blue-50
        ">
          <Image source={{uri:item.Icon}}
          className="w-[40px] h-[40px]"
          />
          <Text className="text-[12px] mt-1">{item.name}</Text>
        </TouchableOpacity>
      )}/>
    </View>
  )
}