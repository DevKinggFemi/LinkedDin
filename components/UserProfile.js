import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'

const UserProfile = (item, userId) => {

  const [connectionSent, setConnectionSent]= useState(false);
  const sendConnectionRequest = async (currentUserId, selectedUserId)=> {
    try{
const response = await  fetch("/user/connection-request", {currentUserId,selectedUserId})
if (response.ok){
  setConnectionSent (true);
}
    }catch(error)  {
console.log ("error",error)
    }

  }
  return (
    <View style={{flex:1, borderRadius:9, marginHorizontal:16, borderColor:"#E0E0E0",borderWidth:1,marginVertical:10,height:Dimensions.get("window").height/4, width:(Dimensions.get("window").width-80)/2, justifyContent:"center"}}>
      <View style={{justifyContent:"content",alignItems:'center'}}>
        <Image source ={{uri: item?.profileImage}} style= {{width: 90, height:90, borderRadius:45,resizeMode:"cover"}} />
      </View>
      <View style={{marginTop:10}}>
        <Text style={{ textAlign:"center", fontSize:16, fontWeight:"600"}}>
{item?.name}
        </Text>
        <Text style={{textAlign:"center", marginLeft:1, marginTop:2}}>Engineer Graduate</Text>
      </View>
      <Pressable style={{marginLeft:"auto", marginRight:"auto", borderColor:connectionSent || item?.connectionRequests?.include(userId)? "gray" : "#0072b1", borderWidth:1, borderRadius:5 , marginTop:7 , paddingHorizontal: 15, paddingVertical:4}}>
        <Text onPress={()=> sendConnectionRequest(userId, item._id)} style={{fontWeight:"600" ,color:connectionSent || item?.connectionRequests?.include(userId)? "gray" : "#0072b1",}}>
        {connectionSent || item?.connectionRequests?.include(userId)? "Pending" : "Connect"}
          </Text>
      </Pressable>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({})