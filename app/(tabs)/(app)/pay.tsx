import PaymentPage from '@/components/payment/PaymentPage'
import React from 'react'
import { Text, View } from 'react-native'

export default function pay() {
  const purchaseId = "hello"
  return (
    <PaymentPage purchaseId = {purchaseId} />
  )
}
