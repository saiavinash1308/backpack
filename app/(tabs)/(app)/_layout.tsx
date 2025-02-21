import { SocketProvider } from '@/components/providers/SocketProvider';
import { useSession } from '@/hooks/useSession'
import { Redirect, Slot } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native';

export default function layout() {
  const {loading, session} = useSession();
  if(loading) return <View className="min-h-screen items-center justify-center"><Text>Loading...</Text></View>; 
  if(!session){
    return <Redirect href={'/login'} />
  }
  return (
    <SocketProvider>
      <Slot/>
    </SocketProvider>
  )
}