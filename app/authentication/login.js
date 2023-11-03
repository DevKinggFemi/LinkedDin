import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
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
            <Text style={{fontSize: 20,  fontWeight: "bold", marginTop: 70, color:"#041E42" }}>Log in to your account</Text>
        </View>
        <View style={{marginTop:20}}>
        <View style={{flexDirection:"row", alignItems:"center", backgroundColor:"#E0E0E0", paddingVertical:5, borderRadius:5, marginTop: 30}}>
        <MaterialIcons style={{marginLeft:8, }}name="email" size={24} color="gray" />
        <TextInput value = {email} onChangeText={(text) => setEmail(text)}style={{color:"gray",paddingLeft:5, marginVertical:10, width:300, fontSize: email? 18:18}} placeholder= "Enter your Email " />
        </View>
        <View style={{marginTop:10}}>
          <View style={{flexDirection:"row", alignItems:"center", backgroundColor:"#E0E0E0", paddingVertical:5, borderRadius:5, marginTop: 30}}>
       
        <AntDesign style={{marginLeft:8, }} name="lock1" size={24} color="gray" />
        <TextInput value={password} onChangeText={(text)=> setPassword(text)} secureTextEntry={true}  style={{color:"gray", marginVertical:10, width:300, paddingLeft:5, fontSize: password? 18:18}} placeholder= "Enter your Password " />
        </View>
        </View>
    <View style={{marginTop:12, flexDirection:'row', alignItems:'center',justifyContent:"space-between"}}>
     <Text>Keep me Logged in</Text> 
     <Text style={{color: "#007FFF", fontWeight: "500"}}>Forgot Password</Text> 
    </View>
    <View style={{marginTop:80}}>
      <Pressable style={{width:200,backgroundColor:"#0072b1", borderRadius:6, marginLeft:"auto" ,marginRight:"auto", padding:15}}>
        <Text style={{textAlign:"center", color:"white", fontSize:16, fontWeight:"bold"}}>Login</Text>
      </Pressable>
    </View>
    
      <Pressable onPress={()=> router.replace("/authentication/register")} style={{marginTop:20, alignItems:"center"}}>
<Text>Don't have an account? Sign Up</Text>
      </Pressable>
    
        </View>
    </KeyboardAvoidingView>
   </SafeAreaView>
   
  )
}

export default login
