import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ToastAndroid, ActivityIndicator, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../Firebaseconfig';
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

export default function Addpostscreen() {

  const db = getFirestore(app);
  const storage = getStorage()
  const {user} = useUser()
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null)
  const [loading, setloading] = useState(false)
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

const onSubmitMethod = async (values) => {
  setloading(true)
  const resp = await fetch(image)
  const blob = await resp.blob()
  const storageRef = ref(storage, 'communityPost/'+Date.now()+'.jpg')

  uploadBytes(storageRef, blob).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  }).then((resp)=>{
    getDownloadURL(storageRef).then(async(downloadurl)=>{
      console.log(downloadurl)
      values.image = downloadurl
      values.userName = user.fullName,
      values.userEmail = user.primaryEmailAddress.emailAddress,
      values.userImage = user.imageUrl
      const docRef = await addDoc(collection(db, "UserPost"), values);
      if(docRef.id){
        setloading(false)
        console.log("Post Added")
        Alert.alert("Success","Post Added Successfully")
      }     
    })
  })
} 
  return (
    <KeyboardAvoidingView>
    <ScrollView className="p-10">
      <Text className="text-[25px] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-slate-500 mb-4">Create New Post And Start Selling</Text>
      <Formik initialValues={{title:'', desc:'', category:'', address:'', price:'', image:'', 
        userName:'', userEmail:'', userImage:'', createdAt:Date.now()
      }}
      onSubmit={values => onSubmitMethod(values)}
      validate={(values)=>{
        const errors = {};
        if(!values.title)
          {
            ToastAndroid.show("Please Enter Title", ToastAndroid.SHORT)
            errors.name = "Please Enter Title"
          }
         return errors
      }}
      >
        {({values, handleChange, handleBlur, handleSubmit, setFieldValue, errors}) => (
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
          <TouchableOpacity 
          style={{backgroundColor: loading ? '#ccc' : '#007bff'}}
          disabled={loading}
          className="bg-blue-500 p-4 rounded-full mt-4" onPress={handleSubmit}>
            {loading ? <ActivityIndicator color='#fff'/> :  
            <Text className="text-white text-center text-[16px] font-bold">Submit</Text>
            }
          </TouchableOpacity>
      </View>
        )}

      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
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