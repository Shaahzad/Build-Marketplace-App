import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import LatestItem from '../Components/LatestItem'
import { app } from '../../Firebaseconfig'

export default function Itemlist() {
  const {params} = useRoute()
  const db = getFirestore(app)
  const [itemlist, setItemlist] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
   params&&getItemlistByCategory()
  },[params])

  const getItemlistByCategory = async ()=>{
    setItemlist([])
    setLoading(true)
    const q = query(collection(db, "UserPost"), where("category", "==", params.category));
    const querySnapshot = await getDocs(q);
    setLoading(false)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setItemlist(itemlist => [...itemlist, doc.data()])
      setLoading(false)
    });
  }
  return (
    <View className='p-2'>
      {
        loading ? <ActivityIndicator className='mt-24' color={'#3b82f6'}/>
        :
        itemlist?.length > 0 ? <LatestItem latestItem={itemlist}
        heading={''}
        />
  : <Text className='p-5 mt-2 text-[20px] font-bold text-center text-gray-500 justify-center items-center'>No item found</Text>  
      }
      
    </View>
  )
}