import { View, Text, Image, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query } from 'firebase/firestore';
import { app } from '../../Firebaseconfig';
export default function ProductDetail({navigation}) {
    const {params} = useRoute()
    const [product,setProduct] = useState([])
    const {user} = useUser()
    const db = getFirestore(app)
    const nav = useNavigation()

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

    const deleteuserPost = () => {
      Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
        {
          text: 'Yes',
          onPress:()=>deleteFromFirestore(),
        },
         {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
         }
      ])
    }

    const deleteFromFirestore = async () => {
      const q = query(collection(db, 'UserPost'), where('title', '==', product.title))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref).then(resp => {
          console.log(resp)
          nav.goBack()
        })
      }) 
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
        {user.primaryEmailAddress.emailAddress === product.userEmail ? 
                 <TouchableOpacity className='z-40 bg-red-500 rounded-full p-3 m-2' onPress={()=>deleteuserPost()} >
                 <Text className='text-center text-white'>Delete Post</Text>
                 </TouchableOpacity>
:
<TouchableOpacity className='z-40 bg-blue-500 rounded-full p-3 m-2' onPress={()=>sendEmailmessage()} >
<Text className='text-center text-white'>Send Message</Text>
</TouchableOpacity>

      }
    </ScrollView>
  )
}