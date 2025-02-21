import { signIn, signUp } from "@/actions/auth/auth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as SecureStorage from 'expo-secure-store';

export default function Auth({type}: {type: "Login" | "Signup"}) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const handlePhoneChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setPhone(numericText);
  };
  const onPress = async() => {
    setLoading(true);
    if(type === "Login"){
      const {success, message} = await signIn(phone);
      if(success){
        await SecureStorage.setItemAsync("mobile", phone);
        router.push("/otp")
      }
      else{
        console.log(message);
      }
    }
    else{
      const {success, message} = await signUp(username, phone);
      if(success){
        await SecureStorage.setItemAsync("mobile", phone);
        router.push("/otp")
      }
      else{
        console.log(message);
      }
    }
    setLoading(false)
  };

  const handleUserName = (text: string) => {
    const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
  
    // Convert to lowercase and then capitalize the first letter
    const formattedText = filteredText
      .toLowerCase()
      .replace(/^\w/, (char) => char.toUpperCase());
    
    setUserName(formattedText);
  }

  const isDisabled = phone.length !== 10 || loading || (type === "Signup" && username.length < 3);
  return (
    <View className="flex justify-center py-10 px-4 min-h-screen gap-10">
      <View className="flex flex-col gap-4">
       {type === "Signup" && (
        <TextInput
        className={`bg-white border-[#d1d5db] border rounded-xl text-lg px-4 py-2 font-geist focus:border-[#979a9e] ${
          loading && "opacity-80"
        }`}
        style = {
          styles.shadow
        }
        placeholder="Enter your name"
        placeholderTextColor="#6b7280"
        cursorColor="#323333"
        autoFocus={true}
        value={username}
        onChangeText={handleUserName}
        editable={!loading}
      />
       )}

      <TextInput
        className={`bg-white border-[#d1d5db] border rounded-xl text-lg px-4 py-2 font-geist focus:border-[#5a5c5d] ${
          loading && "opacity-80"
        }`}
        style = {
          styles.shadow
        }
        placeholder="Enter your mobile"
        placeholderTextColor="#6b7280"
        cursorColor="#323333"
        autoFocus={type === "Login"}
        value={phone}
        onChangeText={handlePhoneChange}
        maxLength={10}
        keyboardType="numeric"
        editable={!loading}
      />
      </View>
      
      <View>
      <TouchableOpacity
        onPress={async(e) => {
          e.preventDefault();
          await onPress()
        }}
        disabled={isDisabled}
        style={{transitionProperty: "all", transitionDuration: "300ms", transitionTimingFunction: "ease-in-out"}}
        className={`
        px-4 py-2 w-full rounded-xl
        ${
          isDisabled
            ? "bg-[black] opacity-70"
            : "bg-black active:bg-[#222222]"
        }
      `}
      >
        <View className="flex flex-row items-center justify-center gap-4">
          {loading && <ActivityIndicator className="color-[#e0d9e6]" />}
          <Text
            className={`
          font-geist text-lg
          ${isDisabled ? "text-[#e0d9e6]" : "text-white"}
        `}
          >
            {loading ? <>{type === "Login" ? "Logging in..." : "Signing up..."}</> : <>{type}</>}
          </Text>
        </View>
      </TouchableOpacity>
      {
        !loading && <Text className="text-center mt-6 text-lg font-geist">{type === "Signup" ? "Already a user? " : "New User? "}
        <Link href={type === "Signup" ? "/login" : "/signup"} className="text-blue-600 text-lg underline font-geist">{type === "Signup" ? "Login" : "Signup"}</Link>
      </Text>
      }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  }
});