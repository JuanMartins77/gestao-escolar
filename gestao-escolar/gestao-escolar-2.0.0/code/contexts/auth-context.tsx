'use client'

import React, { createContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'professional'
  department?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<User>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string): Promise<User> => {
    // Demo de autenticação - em produção usar backend real
    const demoUsers: Record<string, User> = {
      'admin@escola.com': {
        id: '1',
        name: 'Administrador',
        email: 'admin@escola.com',
        role: 'admin',
      },
      'professor@escola.com': {
        id: '2',
        name: 'João Professor',
        email: 'professor@escola.com',
        role: 'professional',
        department: 'Matemática',
      },
    }

    const foundUser = demoUsers[email]
    if (foundUser && password === '123456') {
      setUser(foundUser)
      return foundUser
    }

    throw new Error('Email ou senha inválidos')
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
