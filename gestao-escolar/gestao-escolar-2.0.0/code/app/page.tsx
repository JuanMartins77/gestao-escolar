'use client'

import { useState } from 'react'
import LoginForm from '@/components/login-form'
import { AuthProvider } from '@/contexts/auth-context'
import RootLayout from '@/components/root-layout'

export default function Page() {
  const [user, setUser] = useState(null)

  return (
    <AuthProvider>
      {user ? (
        <RootLayout user={user} setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </AuthProvider>
  )
}
