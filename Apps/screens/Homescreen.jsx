import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Slider from '../Components/Slider'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../../Firebaseconfig'
import Categories from '../Components/Categories'

export default function Homescreen() {
  const db = getFirestore(app)
  const [slider, setSlider] = useState([])
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getSlider();
    getCategoryList();
  },[])
  const getSlider = async () => {
    setSlider([])
    const querySnapshot = await getDocs(collection(db, "Slider"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setSlider(slider => [...slider, doc.data()])
    });
  }


  const getCategoryList = async () => {
    setCategoryList([])
   const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
     console.log("DOCS:", doc.data())
     setCategoryList(categoryList=>[...categoryList, doc.data()])
   })
  }
  
  return (
    <View className='py-8 px-6 bg-white flex-1'>
      <Header/>
      {/* slider */}
      <Slider slider={slider}/>
      {/* category  list */}
      <Categories categoryList={categoryList}/>
    </View>
  )
}