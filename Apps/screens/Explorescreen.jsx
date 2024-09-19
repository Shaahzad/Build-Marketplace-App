import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { app } from '../../Firebaseconfig'
import LatestItem from '../Components/LatestItem'

export default function Explorescreen() {
  const [productlist, setProductlist] = useState([])
  useEffect(() => {
    GetAllProduct()
  }, [])
  const db = getFirestore(app)
  const GetAllProduct = async () => {
    setProductlist([])
    const q = query(collection(db, "UserPost"),orderBy("createdAt","desc"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc)=>{
      setProductlist(productlist => [...productlist, doc.data()])
    })
  }
  return (
    <ScrollView className='p-5 py-8'>
      <Text className='text-[30px] font-bold'>Explorescreen</Text>
      <LatestItem latestItem={productlist}/>
    </ScrollView>
  )
}