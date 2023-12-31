import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
axios.defaults.baseURL = "http://192.168.217.246:5000/api/";
token = AsyncStorage.getItem("authToken")

axios.interceptors.request.use(function (config){
   if (token){
   config.headers.token = `Bearer ${token}`;
   return config;}
})
//const BASE_URL = "https://e-bookstore-api.vercel.app/api/";
//https://e-bookstore-api.vercel.app
// http://localhost:5000
//export const publicRequest = axios.create ({
 //   baseURL:BASE_URL,
//})
//export const userRequest = axios.create ({
 //   baseURL:BASE_URL,
//})
