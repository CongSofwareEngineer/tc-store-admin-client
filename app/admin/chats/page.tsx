import { NextPage } from 'next'
import React, { Suspense } from 'react'
import ChatsAdminScreen from './view'

const ChatsAdmin: NextPage = () => {
  return (
    <Suspense>
      <ChatsAdminScreen />
    </Suspense>
  )
}

export default ChatsAdmin
