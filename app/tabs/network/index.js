import { StyleSheet, Text, View, ScrollView, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import UserProfile from '../../../components/UserProfile';
import ConnectionRequests from '../../../components/ConnectionRequests';
import { useRouter } from 'expo-router';
const index = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])
  const router = useRouter();
  const [connectionRequests, setConnectionRequests] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      const userId = await AsyncStorage.getItem("userId");
      setUserId(userId);
    }
    fetchUser();
  }, [])
  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }

  }, [])
useEffect(()=>{
  if (userId) {
    fetchFriendRequests();
  }
}
)
  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(`/user/connection-request/${userId}`);
      if (res.status=== 200){
        const connectionRequestsData = response.data ?.map((requests)=>({
          _id: requests._id,
          name: requests.name,
          email: requests.email,
          image: requests.profileImage
        } )
        )

        setConnectionRequests(connectionRequestsData)
      }
      
    } catch (error) {
      console.log("error fetching users data", error)
    }

  }
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/user/profile/${userId}`);
      const userData = response.data.user;
      setUser(userData)
    } catch (error) {
      console.log("error fetching users data", error)
    }

  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/user/users/${userId}`);
        setUsers(res.data)

      } catch (error) {
        console.log("error fetching user", error)
      }
    }
    userId && fetchUsers();
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}  >

      <Pressable style={{ marginTop: 10, marginHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

        <Text style={{fontSize:16, fontWeight: "600"}} onPress={()=> router.push("/tabs/network/connections")}>Manage My network</Text>

        <AntDesign name="arrowright" size={22} color="black" />
      </Pressable>
      <View style={{borderColor: "#E0E0E0", borderWidth: 2, marginVertical:10}}/>
      <View style={{ marginTop: 10, marginHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{fontSize:16, fontWeight: "600", }}>
          Invitations [0]
        </Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </View>
      <View style={{borderColor: "#E0E0E0", borderWidth: 2, marginVertical:10}}/>

      <View>
        {connectionRequests?.map((item, index)=> (
          <ConnectionRequests item = {item} key={index} connectionRequests={connectionRequests} setConnectionRequests ={setConnectionRequests} userId= {userId}/>
        ))}
      </View>
      <View style={{marginHorizontal:15}}>
        <View style={{flexDirection:'row', alignItems:"center", justifyContent:"space-between"}}>
          <Text>
            Grow your network faster
          </Text>
          <Entypo name="cross" size={24} color="black" />
        </View>
        <Text>Find and contact tht right people. Plus see who's viewed your profile</Text>
        <View style={{backgroundColor: "#FFC72C", width:140,paddingHorizontal:10, paddingVertical:5, borderRadius: 25, marginTop:8}}>
          <Text style={{textAlign:"center", color:"white", fontWeight:"600"}}>
            Try Premium
          </Text>
        </View>
      </View>
      <FlatList keyExtractor={(item)=> item._id} columnWrapperStyle={{justifyContent: "space-between"}} numColumns={2} data={users} renderItem={({item, key})=><UserProfile userId={userId} item={item} key={index}/>}/>
    </ScrollView>

  )
}

export default index

const styles = StyleSheet.create({})