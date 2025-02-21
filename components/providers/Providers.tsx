import React, { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { SocketProvider } from './SocketProvider'

export default function Providers({children}: PropsWithChildren) {
  return (
    <RecoilRoot>
        {children}
    </RecoilRoot>
  )
}
