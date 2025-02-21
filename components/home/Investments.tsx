import { useSlots } from '@/hooks/useSlots'
import React, { useContext, useEffect } from 'react'
import { GestureResponderEvent, Image, Text, TouchableOpacity, View } from 'react-native'
import SlotSkeleton from '../skeletons/SlotSkeleton';
import { SocketContext } from '../providers/SocketProvider';
import { hold_slot, slot_collected } from '@/constants/message';
import { router } from 'expo-router';
import { z } from 'zod';

export default function Investments({cardId}: {cardId: string}) {
  const {loading, cards, error} = useSlots(cardId);
  const socket = useContext(SocketContext)

  const onPress = (e: GestureResponderEvent, slotId: string) => {
    e.preventDefault();
    router.push(`/wallet?slotId=${slotId}`)
  }
  return (
    <View>
      {loading ?
        <View className='mt-10'><SlotSkeleton main={true} /></View> : <>{
        (!error && cards && cards.slots.length > 0) && 
        <TouchableOpacity onPress={(e) => onPress(e, cards.slots[0].slotId)} className='bg-black h-20 mt-10 rounded-xl  items-center justify-between flex-row px-4'>  
            <View className='flex-row gap-5'>
            <Image source={require("@/assets/images/bitcoin.png")} className="w-12 h-12  rounded-full"  />
               <View>
                 <Text className="text-white text-lg font-geistMedium max-w-24" numberOfLines={1} >{cards.cardName}</Text>
                 <Text className="text-[#787878] text-sm font-geistBold">{cards.slots[0].total - cards.slots[0]._count.purchases}/{cards.slots[0].total}</Text>
               </View>
            </View>
            <View className='flex-row gap-2 items-center'>
                <Text className='bg-emerald-500 h-3 w-6 rounded-full'/>
                <Text className='text-emerald-500 text-xl font-geistBold'>Live</Text>
            </View>
            <View>
             <Text className='text-white text-md font-geistMedium'>{cards.slots[0].start}:00 - {cards.slots[0].end}:00</Text>
            </View>
          </TouchableOpacity>
        }</>
      }
      
      <View className='mt-6'>
        <Text className='text-white text-xl font-geistBold'>Slots</Text>
        <View className='flex-col gap-2 mt-4'>
         {loading && <>
           {Array(4).fill(0).map((_, index) => <SlotSkeleton key={index} />)}
         </>}
        {(!loading && !error && cards) && cards.slots.slice(1).map((slot, index) => (
            <View key={index} className='bg-[#575757] h-20 rounded-xl flex-row items-center justify-between px-4'>
            <View className='flex-row gap-2'>
                <Image source={require("@/assets/images/bitcoin.png")} className="w-12 h-12  rounded-full"  />
                <View>
                  <Text className="text-white text-lg font-geistMedium max-w-20" numberOfLines={1}>{cards.cardName}</Text>
                  <Text className="text-[#787878] text-sm font-geistBold">{slot.total - slot._count.purchases}/{slot.total}</Text>
                </View>
                </View>
                <View className='w-32 h-10 rounded-full border bg-black items-center justify-center' style = {{borderColor: "#FF9800"}}>
                    <Text className='text-white text-md font-geistMedium'>{slot.start}:00 - {slot.end}:00</Text>
                </View>
                <TouchableOpacity className='bg-emerald-500 opacity-65 py-4 rounded-full' style= {{boxShadow: "0px 2px 4px rgba(0,0,0,0.5)", paddingHorizontal: 20}} disabled >
                    <Text className='text-md text-white font-geistBold '>Invest</Text>
                </TouchableOpacity>
            </View>
        ))}
        </View>
      </View>
    </View>
  )
}
