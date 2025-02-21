import { ItemState } from '@/atoms/ItemState'
import { useCards } from '@/hooks/useCards';
import React from 'react'
import { TouchableOpacity, Text, Image, View } from 'react-native'
import { useSetRecoilState } from 'recoil'
import CardSkeleton from '../skeletons/CardSkeleton';

export default function Main() {
  const setItem = useSetRecoilState(ItemState);
  const {loading, cards, error} = useCards()
  return (
    <>
        <View className='bg-[#57575766] flex-1 rounded-2xl flex-wrap flex-row  py-2 pb-2 mt-10 justify-between' style= {{ rowGap: 10, paddingHorizontal: 10}} >
        {loading ? <>
            {Array(6).fill(0).map((_, index) => <CardSkeleton key={index} />)}
        </> : <>
        {!error && cards.map((card, index) => (
            <View key={index} className="bg-[#575757c0] h-40 w-[49%] p-4 rounded-xl">
              <View className="flex flex-row justify-around gap-2">
                <Image source={require("@/assets/images/bitcoin.png")} className="w-12 h-12 rounded-full" />
                <View className='flex flex-1'>
                  <Text className="text-white text-lg font-geistBold max-w-28" numberOfLines={1}>{card.cardName}</Text>
                  {card.slots[0] && <Text className="text-[#787878] text-sm font-geistBold">{card.slots[0].total - card.slots[0]._count.purchases}/{card.slots[0].total}</Text>}
                </View>
              </View>
              <TouchableOpacity onPress={(e) => {e.preventDefault(); setItem(card.cardId)}} className="border-[#FF9800] border-2 flex items-center justify-center rounded-full mt-8 py-3"  >
                <Text className="text-white font-geistBold text-lg">Invest</Text>
              </TouchableOpacity>
            </View>
        ))}
        
        </>}
        
        </View>
    </>
  )
}
