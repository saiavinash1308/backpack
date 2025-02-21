import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useRecoilValue } from 'recoil';
import { ScrollState } from '@/atoms/ScrollState';
import { logout } from '@/actions/auth/auth';

export default function TopBar() {
  const scroll = useRecoilValue(ScrollState)
  return (
    <View className="h-20 w-full  px-4 flex flex-row items-center justify-between" style={ scroll > 0 && {boxShadow: "0px 2px 4px black"}}>
        <Ionicons name="menu-outline" size={30} color="white" />
        <Text className='text-lg font-geistBold text-white'>Fivlog</Text>
        <Ionicons onPress={logout} name="settings-outline" size={24} color="white" />
    </View>
  )
}
