import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../services/auth'
import { accountsService } from '../services/accounts'

const AuthContext = createContext<any>(undefined)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    setLoading(true)
    try {
      const response = await authService.getCurrentSession()
      if (response.success && response.session && response.user) {
        const accountData = await accountsService.getAccount(response.user.id)
        setUser({ ...response.user, profile: accountData })
        setSession(response.session)
      }
    } catch (error) {
      console.error('Auth init error:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    const res = await authService.signIn(email, password)
    if (res.success) await initializeAuth()
    return res
  }

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}