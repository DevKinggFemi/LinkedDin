import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
const register = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [image,setImage]=useState("");


 
  const handleRegister = ()=>{
    const user ={
      name: name,
      email: email,
      password: password,
      profileImage:image,
    }
console.log(user)
    axios.post("/userAuth/register", user).then((response)=> {
      console.log(response);
      Alert.alert("Registeration Successful")
      setEmail("");
      setImage("");
      setName("");
      setPassword("");
    }).catch((error) => {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error response data:', error.response.data);
        console.log('Status code:', error.response.status);
        console.log('Headers:', error.response.headers);
        
        const errorMessage = error.response.data.message; // Assuming your backend sends an error message with the key "message"
        
        Alert.alert('Registration failed', errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response was received:', error.request);
      } else {
        // Something happened in setting up the request
        console.log('Error setting up the request:', error.message);
      }
      console.log('Error:', error.config);
    });
  }

  const router= useRouter();
  return (
    <SafeAreaView style ={{flex: 1, backgroundColor: "white",  alignItems: "center"}}>
    <View  >
<Image style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png",
          }}/>
    </View>
    <KeyboardAvoidingView>
        <View style={{alignItems:"center"}}>
            <Text style={{fontSize: 20,  fontWeight: "bold", marginTop: 20, color:"#041E42" }}>Register your account</Text>
        </View>
        
        <View style={{marginTop:10}}>
        <View style={{flexDirection:"row", alignItems:"center", backgroundColor:"#E0E0E0", paddingVertical:5, borderRadius:5, marginTop: 30}}>
        <AntDesign style={{marginLeft:8, }} name="user" size={24} color="gray" />
        <TextInput  value={name} onChangeText={(text) => setName(text)} style={{color:"gray",paddingLeft:5, marginVertical:10, width:300, fontSize: name? 18:18}} placeholder= "Enter your Username " />
        </View>
        <View style={{flexDirection:"row", marginTop:10, alignItems:"center", backgroundColor:"#E0E0E0", paddingVertical:5, borderRadius:5, marginTop: 30}}>
        <MaterialIcons style={{marginLeft:8, }}name="email" size={24} color="gray" />
        <TextInput  value = {email} onChangeText={(text) => setEmail(text)} style={{color:"gray",paddingLeft:5, marginVertical:10, width:300, fontSize: email? 18:18}} placeholder= "Enter your Email " />
        </View>
        <View style={{marginTop:10}}>
          <View style={{flexDirection:"row", alignItems:"center", backgroundColor:"#E0E0E0", paddingVertical:5, borderRadius:5, marginTop: 20}}>
        <AntDesign style={{marginLeft:8, }} name="lock1" size={24} color="gray" />
        <TextInput  value={password} onChangeText={(text)=> setPassword(text)} secureTextEntry={true}  style={{color:"gray", marginVertical:10, width:300, paddingLeft:5, fontSize: password? 18:18}} placeholder= "Enter your Password " />
        </View>
        <View style={{flexDirection:"row", marginTop:10, alignItems:"center", backgroundColor:"#E0E0E0", paddingVertical:5, borderRadius:5, marginTop: 30}}>
      
        <Entypo style={{marginLeft:8, }} name="image" size={24} color="black" />
        <TextInput  value = {image} onChangeText={(text) => setImage(text)}style={{color:"gray",paddingLeft:5, marginVertical:10, width:300, fontSize: image? 18:18}} placeholder= "Upload your image " />
        </View>
        </View>
        
    <View style={{marginTop:8, flexDirection:'row', alignItems:'center',justifyContent:"space-between"}}>
     <Text>Keep me Logged in</Text> 
     <Text style={{color: "#007FFF", fontWeight: "500"}}>Forgot Password</Text> 
    </View>
    <View style={{marginTop:40}}>
      <Pressable  onPress={handleRegister} style={{width:200,backgroundColor:"#0072b1", borderRadius:6, marginLeft:"auto" ,marginRight:"auto", padding:15}}>
        <Text style={{textAlign:"center", color:"white", fontSize:16, fontWeight:"bold"}}>Register</Text>
      </Pressable>
    </View>
    
      <Pressable onPress={()=> router.replace("/authentication/login")} style={{marginTop:20, alignItems:"center"}}>
<Text>Already Have an account? Sign in</Text>
      </Pressable>
    
        </View>
    </KeyboardAvoidingView>
   </SafeAreaView>
  )
}

export default register

const styles = StyleSheet.create({})