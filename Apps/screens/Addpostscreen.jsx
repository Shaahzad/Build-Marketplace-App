import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../Firebaseconfig';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

export default function Addpostscreen() {

  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(()=>{
   getCategoryList()
  },[])

const getCategoryList = async () => {
 const querySnapshot = await getDocs(collection(db, "Category"));
  querySnapshot.forEach((doc) => {
   console.log("DOCS:", doc.data())
   setCategoryList([...categoryList, doc.data()])
 })
  }
  return (
    <View className="p-10">
      <Formik initialValues={{title:'', desc:'', category:'', address:'', price:'', image:''}}
      onSubmit={values => console.log(values)}
      >
        {({values, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
          <View>
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
          {/* category drop down */}
          <Picker selectedValue={values.category} onValueChange={handleChange('category')}>
           <Picker.Item label='DropDown' value={'DropDown'}/>
           <Picker.Item label='DropDown' value={'DropDown'}/>
          </Picker>
          <Button title='Submit' onPress={handleSubmit} className="mt-7"/>
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
    marginTop: 10, marginBottom: 10,
    padding: 10,
    paddingHorizontal: 17,

  }
})