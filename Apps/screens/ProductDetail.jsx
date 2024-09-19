import { View, Text, Image, TouchableOpacity, Linking, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function ProductDetail({navigation}) {
    const {params} = useRoute()
    const [product,setProduct] = useState([])

    useEffect(()=>{
     params&&setProduct(params.product)
     ShareButton()
    },[params,navigation])

    const ShareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => shareProduct()}>
          <Ionicons name="share-social" size={24} color="white" style={{marginRight: 15}}/>
        </TouchableOpacity>
      ),
    });
    }

    const shareProduct = async () => {
      const content = {
        message: product?.title+"\n"+product?.desc,
      }
      Share.share(content).then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error)
      })
    }
    const sendEmailmessage = () => {
      const subject = `Regarding: ${product.title}`
      const body = `${product.userName} I am interested in your product`
      Linking.openURL(`mailto:${product.userEmail}?subject=${subject}&body=${body}`)
    }
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
        <TouchableOpacity className='z-40 bg-blue-500 rounded-full p-3 m-2' 
        onPress={()=>sendEmailmessage()}
        >
          <Text className='text-center text-white'>Send Message</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}