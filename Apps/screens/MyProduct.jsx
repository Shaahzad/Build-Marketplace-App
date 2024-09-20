import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../Firebaseconfig'
import { useUser } from '@clerk/clerk-expo'
import {useState,useEffect} from 'react'
import LatestItem from '../Components/LatestItem'
import { useNavigation } from '@react-navigation/native'


export default function MyProduct() {
    const [productlist,setProductlist] = useState([])
    const db = getFirestore(app)
    const {user} = useUser();
    const navigation = useNavigation();
    const [loading, setloading] = useState(false)

useEffect(()=>{
   user && getUserPost()
},[user])

useEffect(()=>{
  navigation.addListener('focus',(e)=>{
    getUserPost()
  })
},[navigation])

    const getUserPost = async ()=>{
      setProductlist([])
      setloading(true)
     const q = query(collection(db,'UserPost'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress))
     const snapshot = await getDocs(q)
     snapshot.forEach((doc)=>{
       setProductlist(productlist=>[...productlist,doc.data()])
     })
     setloading(false)
    }

  return (
    <View>
      {loading && <ActivityIndicator className='mt-5' size={'large'} color={'#3b82f6'}/>}
        <LatestItem latestItem={productlist}/>
    </View>
  )
}