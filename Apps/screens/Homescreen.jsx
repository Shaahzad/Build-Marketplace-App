import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Slider from '../Components/Slider'
import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore'
import { app } from '../../Firebaseconfig'
import Categories from '../Components/Categories'
import LatestItem from '../Components/LatestItem'

export default function Homescreen() {
  const db = getFirestore(app)
  const [slider, setSlider] = useState([])
  const [categoryList, setCategoryList] = useState([]);
  const [latestItem, setLatestItem] = useState([]);
  useEffect(() => {
    getSlider();
    getCategoryList();
    getLatestItem();
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

  const getLatestItem = async () => {
    setLatestItem([])
    const querySnapshot = await getDocs(collection(db, "UserPost"),orderBy("createdAt","desc"));
    querySnapshot.forEach((doc) => {
     console.log("DOCS:", doc.data())
     setLatestItem(latestItem=>[...latestItem, doc.data()])
   })
  }
  
  return (
    <ScrollView className='py-8 px-6 bg-white flex-1'>
      <Header/>
      {/* slider */}
      <Slider slider={slider}/>
      {/* category  list */}
      <Categories categoryList={categoryList}/>
      {/* latest item */}
      <LatestItem latestItem={latestItem} heading={'Latest Item'}/>
    </ScrollView>
  )
}