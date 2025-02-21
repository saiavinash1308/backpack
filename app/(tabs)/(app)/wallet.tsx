import WalletPage from '@/components/wallet/WalletPage'
import React from 'react'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'


export default function wallet() {
    const {slotId}: {slotId: string} = useLocalSearchParams()
  return (
    <WalletPage slotId = {slotId} />
  )
}
