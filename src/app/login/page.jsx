"use client"

import { supabase } from "../../../lib/supabase"

export default function Login() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-900 border border-gray-800 p-10 rounded-2xl w-96 text-center">
        <h1 className="text-2xl font-bold mb-6">SmartBookmark</h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-emerald-500 py-3 rounded-xl hover:bg-emerald-600 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}
