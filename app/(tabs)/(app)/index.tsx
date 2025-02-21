import { ItemState } from '@/atoms/ItemState'
import { ScrollState } from '@/atoms/ScrollState'
import BottomBar from '@/components/common/BottomBar'
import TopBar from '@/components/common/TopBar'
import Investments from '@/components/home/Investments'
import Main from '@/components/home/Main'
import React, { useEffect, useState } from 'react'
import { Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { BlurView } from 'expo-blur'

export default function Index() {
  const setScrollPosition = useSetRecoilState(ScrollState)
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(contentOffsetY);
  };

  const [timeLeft, setTimeLeft] = useState(207) // 3 minutes and 27 seconds in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(207)
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const item = useRecoilValue(ItemState)
  return (
    <View className="flex-1 min-h-screen bg-[#191919]">
      {/* Topbar */}
      <TopBar/>
      
      {/* Scrollable Content */}
      <ScrollView onScroll={handleScroll} className="flex-1 px-4">
        <View className='bg-black mt-10 rounded-3xl py-4 flex-row justify-evenly items-center'>
          
          <Image source={require("@/assets/images/bitcoin.png")} className="w-32 h-32  rounded-full"/>
          {/* style={{boxShadow: "0px 4px 16px black"}} */}
          {/* style = {{boxShadow: "0px 3px 2px rgba(0, 0, 0, 0.35)"}} */}
          <View className='flex-col'>
            <Text className="text-white text-2xl font-geistBold">Bitcoin</Text>
            {/* <Text className="text-[#787878] text-sm font-geistBold">BTC</Text> */}
            <View className='mt-4 items-center'>
            <Text className="text-white text-xl font-geistMedium">$8600</Text>
            <Text className="text-[#5ECCA3] text-md font-geist">+50 (3.23%)</Text>
            </View>
          </View>
          {/* <View className='h-24 w-24 border-[#F80195] rounded-full items-center justify-center' style ={{borderWidth: 4}} >
            <Text className='text-white text-xl font-geistBold'>{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</Text>
          </View> */}
          <View style={{ position: "relative", alignItems: "center", justifyContent: "center" }}>
            <View style={{
              position: "absolute",
              width: 120, // Slightly larger than the main box
              height: 120,
              borderRadius: 60,
              backgroundColor: "#F80195", // Glow color
              opacity: 0.8, // Adjust brightness
              filter: "blur(20px)", // Works on Web, but not native
            }} />
          
            {/* Main Circle */}
            <View style={{
              height: 90,
              width: 90,
              borderRadius: 50,
              backgroundColor: "black",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#F80195",
              shadowOpacity: 1, // Only affects iOS
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 20,
              elevation: 10, // Required for Android
            }}>
              <Text className='text-white text-xl font-geistBold'>{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</Text>
            </View>

          </View>
        </View>
        {item ? <Investments cardId={item} /> : <Main/>}
      </ScrollView>
      {/* Bottom Bar */}
      <BottomBar/>
    </View>
  )
}





