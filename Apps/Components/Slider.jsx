import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function Slider({slider}) {
  return (
    <View className="mt-5">
        <FlatList data={slider} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={({item, index}) =>(
            <View>
                <Image source={{uri:item.Image}}
                className="w-[300px] h-[200px] object-contain mr-3 rounded-lg"
                />
                </View>
        )}/>
    </View>
  )
}