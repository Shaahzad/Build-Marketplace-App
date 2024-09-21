import { ActivityIndicator, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Slider from '../Components/Slider'
import { collection, getDocs, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore'
import { app } from '../../Firebaseconfig'
import Categories from '../Components/Categories'
import LatestItem from '../Components/LatestItem'

export default function Homescreen() {
  const db = getFirestore(app)
  const [slider, setSlider] = useState([])
  const [categoryList, setCategoryList] = useState([]);
  const [latestItem, setLatestItem] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getSlider();
    getCategoryList();
    const unsubscribe = getLatestItem();
    return () => {
      unsubscribe(); // Cleanup the listener on unmount
  }},[])
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
    setLoading(true)
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setCategoryList(categoryList => [...categoryList, doc.data()])
    });
    setLoading(false)
  };
  
  
  const getLatestItem = () => {
    setLoading(true);
    const q = query(collection(db, "UserPost"), orderBy("createdAt", "desc"));
  
    // Real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setLatestItem(items); // Set the latest items
      setLoading(false); // Set loading to false after fetching
    }, (error) => {
      console.error("Error fetching documents: ", error);
      setLoading(false); // Set loading to false in case of error
    });
  
    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  };
    
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