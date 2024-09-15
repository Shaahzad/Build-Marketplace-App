import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../Firebaseconfig';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function Addpostscreen() {

  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null)
  useEffect(()=>{
   getCategoryList()
  },[])
const getCategoryList = async () => {
  setCategoryList([])
 const querySnapshot = await getDocs(collection(db, "Category"));
  querySnapshot.forEach((doc) => {
   console.log("DOCS:", doc.data())
   setCategoryList(categoryList=>[...categoryList, doc.data()])
 })
}



const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });
  
  console.log(result);

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

 
  return (
    <View className="p-10">
      <Text className="text-[25px] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-slate-500 mb-4">Create New Post And Start Selling</Text>
      <Formik initialValues={{title:'', desc:'', category:'', address:'', price:'', image:''}}
      onSubmit={values => console.log(values)}
      >
        {({values, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image ? <Image source={{uri:image}} style={{width:100,height:100, marginBottom:2, borderRadius:15}}/> : 
              <Image source={require('./../../assets/placeholder.jpg')}
              style={{width:100,height:100, marginBottom:2, borderRadius:15}}/>              
              }
            </TouchableOpacity>
          <TextInput
          style={styles.input}
          placeholder="Title"
          value={values.title}
          onChangeText={handleChange('title')}
          />  
          <TextInput
          style={styles.input}
          placeholder="Description"
          value={values.desc}
          numberOfLines={5}
          onChangeText={handleChange('desc')}
          />  
          <TextInput
          style={styles.input}
          placeholder="price"
          value={values.price}
          keyboardType='number-pad'
          onChangeText={handleChange('price')}
          />
          <TextInput
          style={styles.input}
          placeholder="address"
          value={values.address}
          onChangeText={handleChange('address')}
          />  
          {/* category drop down */}
           <View className="border rounded-2xl mt-2">
          <Picker selectedValue={values.category} className="" onValueChange={itemvalue=>setFieldValue('category', itemvalue)}>
            {categoryList.map((item, index) => (
           <Picker.Item label={item.name} value={item.name} key={index}/>
            ))}
          </Picker>
           </View>
          <TouchableOpacity className="bg-blue-500 p-4 rounded-full mt-4" onPress={handleSubmit}>
            <Text className="text-white text-center text-[16px] font-bold">Submit</Text>
          </TouchableOpacity>
      </View>
        )}

      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5, marginBottom: 5,
    padding: 15,
    textAlignVertical: 'top',
    paddingHorizontal: 17,

  }
})