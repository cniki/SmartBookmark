"use client"

import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { user } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between">
      <h1 className="text-white font-semibold">SmartBookmark</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-500 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
