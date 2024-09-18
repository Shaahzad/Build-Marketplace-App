import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'

export default function ProductDetail() {
    const {params} = useRoute()
    const [product,setProduct] = useState([])

    useEffect(()=>{
     params&&setProduct(params.product)
    },[params])
  return (
    <ScrollView className='bg-white'>
        <Image source={{uri:product.image}}
        className='h-[320px] w-full'
        />
        <View className='p-3'>
          <Text className='text-[24px] font-bold'>{product.title}</Text>
          <View className='items-baseline'>
            <Text className='font-bold text-blue-500 bg-blue-200 p-1 px-2 mt-2 rounded-full
            '>{product.category}</Text>
          </View>
          <Text className='text-[20px] font-bold mt-3'>Description</Text>
          <Text className='text-[17px] text-gray-500'>{product.desc}</Text>
        </View>
        {/* user info */}
        <View className='p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-300'>
          <Image source={{uri:product.userImage}}
          className="w-12 h-12 rounded-full"
          />
        <View>
          <Text className='text-[20px] font-bold'>{product.userName}</Text>
          <Text className='text-gray-500'>{product.userEmail}</Text>
        </View>
        </View>
    </ScrollView>
  )
}