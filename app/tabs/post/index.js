import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'expo-router';
import { firebase } from "../../../firebase";
import { db } from "../../../firebase";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState('');
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodeToken = jwtDecode(token);
      const userId = decodeToken.userId;
      setUserId(userId);
    }
    fetchUser();
  }, [])
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      all: true,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.canceled) {
      setImage(result.assets[0], uri);
    }
  }

  const createPost = async () => {
    try {
      const uploadedUrl = await uploadFile();
      const postData = {
        description: description,
        imageUrl: uploadedUrl,
        userId: userId,
      };

      const response = await axios.post("/create", postData);

      console.log("post created", response.data);
      if (response.status === 201) {
        router.replace("/authentication/tabs/home");
      }
    } catch (error) {
      console.log("error creating post")
    }
  }
  const uploadFile = async () => {
    try {
      // Ensure that 'image' contains a valid file URI
      console.log("Image URI:", image);

      const { uri } = await FileSystem.getInfoAsync(image);

      if (!uri) {
        throw new Error("Invalid file URI");
      }

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf("/") + 1);

      const ref = db.storage().ref().child(filename);
      await ref.put(blob);

      const downloadURL = await ref.getDownloadURL();
      // setUrl(downloadURL);
      return downloadURL;
      // Alert.alert("Photo uploaded");
    } catch (error) {
      console.log("Error:", error);
      // Handle the error or display a user-friendly message
    }
  };
  return (
    <ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginVertical: 12 }}>
        <View>
          <Entypo name="circle-with-cross" size={24} color="black" />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
          <Image style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{ uri: "https://i.ibb.co/DY6Wgr9/bookcover5.jpg" }}

          />
          <Text style={{ fontWeight: "500" }}> Anyone</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 7, marginRight: 8, gap: 10 }}>
          <Entypo name="back-in-time" size={24} color="black" />
          <View>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 240, marginVertical: 20 }}
              />
            )}
          </View>
          <Pressable style={{ padding: 10, backgroundColor: "#0072b1", }}>
            <Text onPress={createPost} style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>Post</Text>
          </Pressable>
        </View>
      </View>
      <TextInput value={description} onChangeText={(text) => setDescription(text)} placeholder='What do you want to talk about?' placeholderTextColor={"black"}
        style={{ marginHorizontal: 10, fontSize: 15, fontWeight: "500", marginTop: 10, }} multiline={true} numberOfLines={10} textAlignVertical={"top"} />
      <Pressable style={{ flexDirection: "coloumn", marginTop: "auto", marginRight: "auto", marginLeft: "auto" }}>
        <Pressable onPress={pickImage} style={{ width: 40, height: 40, marginTop: 15, backgroundColor: "#E0E0E0", borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
          <MaterialIcons name="perm-media" size={24} color="black" />
        </Pressable>
      </Pressable>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})