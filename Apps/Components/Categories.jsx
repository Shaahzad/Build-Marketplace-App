import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function Categories({categoryList}) {
  return (
    <View className="mt-3">
      <Text className="text-[20px] font-bold">Categories</Text>
      <FlatList data={categoryList} numColumns={4} renderItem={({item,index})=>(
        <View className="flex-1 items-center justify-center">
          <Image source={{uri:item.Icon}}
          className="w-[40px] h-[40px]"
          />
        </View>
      )}/>
    </View>
  )
}