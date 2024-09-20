import { View, Text } from 'react-native'
import React from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../Firebaseconfig'
import { useUser } from '@clerk/clerk-expo'
import {useState,useEffect} from 'react'
import LatestItem from '../Components/LatestItem'


export default function MyProduct() {
    const [productlist,setProductlist] = useState([])
    const db = getFirestore(app)
    const user = useUser();

useEffect(()=>{
   user && getUserPost()
},[user])

    const getUserPost = async ()=>{
     const q = query(collection(db,'UserPost'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress))
     const snapshot = await getDocs(q)
     snapshot.forEach((doc)=>{
       setProductlist(productlist=>[...productlist,doc.data()])
     })
    }
  return (
    <View>
        <LatestItem productlist={productlist}/>
    </View>
  )
}