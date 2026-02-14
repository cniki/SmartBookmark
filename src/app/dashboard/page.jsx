"use client"

import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import AddBookmark from "../../components/AddBookMark"
import BookmarkList from "../../components/BookmarkList"
import { useAuth } from "../../context/AuthContext"
import { bookmarkService } from "../../services/bookmarkService"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const { data: bookmarks = [], isLoading: bookmarksLoading, error } = useQuery({
    queryKey: ['bookmarks', user?.id],
    queryFn: () => bookmarkService.getBookmarks(user.id),
    enabled: !!user,
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  if (authLoading || bookmarksLoading) return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Error loading bookmarks</div>
  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <AddBookmark />
        <BookmarkList bookmarks={bookmarks} />
      </main>
    </div>
  )
}
