"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { bookmarkService } from "../services/bookmarkService"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentUser = await bookmarkService.getCurrentUser()
                setUser(currentUser)
            } catch (error) {
                console.error("Auth initialization failed", error)
            } finally {
                setLoading(false)
            }
        }

        initAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
