import { Image, StyleSheet, Text, View , Pressable} from 'react-native'
import React , {useState, useEffect}from 'react'
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import moment from "moment";
const connections = () => {
  const [userId, setUserId] = useState('');
  
  const router = useRouter();
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      
      const userId = await AsyncStorage.getItem("userId");
      setUserId(userId);
    }
    fetchUser();
  }, [])

  useEffect(()=>{
    if (userId){
      fetchConnections();
    }
  }
  )
  const fetchConnections = async()=> {
try{
  const response = await axios.get(`/user/connections/${userId}`)
  setConnections(response.data.connections);
}catch(error){
    console.log(error);
}
} 
 
  return (
    <View style ={{ flex:1 , backgroundColor: "white"}}>
      <View style={{flexDirection:"row", alignItems: "center", gap:10, justifyContent:"space-between",marginHorizontal:12, marginTop:10}}>
      <Text style={{fontWeight:"500"}}>{connections.length}Connections</Text>  
      <View style={{flexDirection:"row", alignItems:"center", gap:10}}>
      <AntDesign name="search1" size={22} color="black" />
      <Entypo name="dots-three-vertical" size={22} color="black" />
      </View> 
      </View>
      <View style={{height:2, borderColor: "#E0E0E0", borderWidth:2, marginTop:12}}/>
      <View style={{marginHorizontal:10, marginTop:10}}>
        {connections?.map((item, index)=> (
          <View key={index} style={{flexDirection:"row" , alignItems:"center", gap:10, marginVertical:10,}}>
            <Image style={{width:48, height:48, borderRadius:24}} source={{uri:item?.profileImage}}/>
          <View style={{flexDirection:"column", gap:2, flex:1}}>
            <Text style={{fontSize:15, fontWeight:"500", }}>{item.name}</Text>
            <Text style={{color:"gray"}}>B.Engineering | Environmental Engineering</Text>
            <Text>conneted on {moment(item?.createdAt).format("MMMM Do YYYY")}</Text>
          </View>
          <View style={{flexDirection:"row" , alignItems:"center", gap:8}}>
<Entypo name="dots-three-vertical" size={20} color="black" />
<Feather name="send" size={20} color="black" />
          </View>
          </View>
        ))}

      </View>
    </View>
  )
}

export default connections

const styles = StyleSheet.create({})