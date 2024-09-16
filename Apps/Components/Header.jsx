import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
    const {user} = useUser()
  return (
    <View>
     {/* user info */}
    <View className="flex flex-row items-center gap-2">
        <Image source={{uri:user.imageUrl}}
        className="rounded-full w-12 h-12"
        />
        <View>
            <Text className="text-[16px]">Welcome</Text>
            <Text className="text-[20px] font-bold">{user.fullName}</Text>
        </View>
    </View>
    {/* search */}
    <View className="p-3 px-5 flex flex-row items-center mt-5 bg-white rounded-full border-[2px] border-blue-200">
    <Ionicons name="search" size={24} color="gray" />
        <TextInput placeholder='Search' className="ml-2 text-[16px]"
        onChangeText={(text)=>console.log(text)}
        />
    </View>
    </View>
  )
}