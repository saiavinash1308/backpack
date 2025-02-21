import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import TopBar from '../common/TopBar'
import BottomBar from '../common/BottomBar'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import api from '@/api/api'
import { useWallet } from '@/hooks/useWallet'

export default function WalletPage({slotId}: {slotId: string}) {

  const {loading, amount, error} = useWallet()
  
  function handlePay(paymentType: "Wallet" | "Razorpay"){
    router.push(`/pay?slotId=${slotId}&paymentType=${paymentType}`);
  }

  return (
    <View className='min-h-screen flex-1 bg-[#191919]'>
        <TopBar />
        <View className='flex-1 '>
            <View className='w-full bg-white flex flex-row justify-between px-4 py-4 items-center'>
            <Ionicons name="arrow-back-outline" onPress={(e) => { e.preventDefault(); router.back() }} className='' size={24} color="black" />
            <View className='flex flex-row items-center gap-3'>
            <View className='bg-gray-300 h-16 w-16 items-center justify-center rounded-full'>
               <Text className='text-2xl font-geistBold'>₹</Text>
            </View>
            <View>
                <Text className='font-geistBold text-lg'>₹200.0</Text>
                <Text className='font-geistMedium text-lg'>Balance</Text>
            </View>
            </View>
            </View>

            <View className='flex-1  pt-10 px-4'>
                <View className='flex flex-row flex-wrap gap-[2%]' style={{rowGap:10}}>
                    <TouchableOpacity className='bg-gray-400 py-4 w-[48%] rounded-3xl items-center'>
                        <Image source={require("@/assets/images/deposit.png")}/>
                        <Text className='text-white font-geistBold text-2xl'>Deposit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-gray-400 py-4 w-[48%] rounded-3xl items-center'>
                        <Image source={require("@/assets/images/withdraw.png")}/>
                        <Text className='text-white font-geistBold text-2xl'>Deposit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-gray-400 py-4 w-[48%] rounded-3xl items-center'>
                        <Image source={require("@/assets/images/transactions.png")}/>
                        <Text className='text-white font-geistBold text-2xl'>Deposit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-gray-400 py-4 w-[48%] rounded-3xl items-center'>
                        <Image source={require("@/assets/images/investments.png")}/>
                        <Text className='text-white font-geistBold text-2xl'>Deposit</Text>
                    </TouchableOpacity>
                </View>
                <View className='mt-10 flex-1'>
                    <TouchableOpacity onPress={(e) => {e.preventDefault(); handlePay("Wallet")}} className='bg-emerald-500 py-4 rounded-full'>
                        <Text className='text-center text-white font-geistBold text-xl'>Pay with Wallet</Text>
                    </TouchableOpacity>
                    <View className='mt-4 flex flex-row items-center justify-center gap-3'>
                        <Text className='h-[1px] w-[30%] bg-[#ffffffb4] rounded-full'/>
                        <Text className='text-center text-white font-geistMedium text-lg'>OR</Text>
                        <Text className='h-[1px] w-[30%] bg-[#ffffffb4] rounded-full'/>
                    </View>
                    <TouchableOpacity onPress={(e) => {e.preventDefault(); handlePay("Razorpay")}} className='bg-white py-4 rounded-full mt-4'>
                        <Text className='text-center font-geistBold text-xl'>Pay with UPI</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <BottomBar/>
    </View>
  )
}
