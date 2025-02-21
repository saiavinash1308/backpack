import React, { useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSetRecoilState } from 'recoil';
import { ItemState } from '@/atoms/ItemState';


export default function BottomBar() {

  type ActiveElement = "home" | "fire" | "plus" | "trend" | "user"

  const [active, setActive] = useState<ActiveElement>("home")
  const setItem = useSetRecoilState(ItemState)

  const handleActive = (activeElement: ActiveElement) =>{
    if(activeElement === "home") setItem(null)
    if(active === activeElement) return;
    setActive(activeElement)
  }
  
  return (
    <View className="h-24 w-full items-center justify-around flex-row"
     style={{boxShadow: "0px 4px 16px black"}} >
      <Pressable onPress={() => handleActive("home")}  className='flex flex-col items-center'>
        <MaterialCommunityIcons name="home" size={24} color={active === "home" ? "white" : "#787878"}  />
        <Text className = {`${active === "home" ? "text-white" : "text-[#787878]"} text-sm font-geistBold`}>Home</Text>
      </Pressable>
      <Pressable onPress={() => handleActive("fire")} className='flex flex-col items-center'>
      <MaterialCommunityIcons name="fire" size={24} color={active === "fire" ? "white" : "#787878"}  />
        <Text className={`${active === "fire" ? "text-white" : "text-[#787878]"} text-sm font-geistBold`}>Trending</Text>
      </Pressable>
      <Pressable onPress={() => handleActive("plus")} className='flex flex-col items-center'>
      <MaterialCommunityIcons name="plus" size={24} color={active === "plus" ? "white" : "#787878"}/>
        <Text className={`${active === "plus" ? "text-white" : "text-[#787878]"} text-sm font-geistBold`}>Add</Text>
      </Pressable>
      <Pressable onPress={() => handleActive("trend")} className='flex flex-col items-center'>
      <MaterialCommunityIcons name="trending-up" size={24} color={active === "trend" ? "white" : "#787878"}  />
        <Text className={`${active === "trend" ? "text-white" : "text-[#787878]"} text-sm font-geistBold`}>Watchlist</Text>
      </Pressable>
      <Pressable onPress={() => handleActive("user")} className='flex flex-col items-center'>
      <MaterialCommunityIcons name="account" size={24} color={active === "user" ? "white" : "#787878"} />
        <Text className={`${active === "user" ? "text-white" : "text-[#787878]"} text-sm font-geistBold`}>Profile</Text>
      </Pressable>
    </View>

  )
}
