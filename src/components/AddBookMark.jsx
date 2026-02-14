import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { bookmarkService } from "../services/bookmarkService"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function AddBookmark() {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newBookmark) => bookmarkService.addBookmark(newBookmark, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookmarks'])
      toast.success("Bookmark added successfully")
      setTitle("")
      setUrl("")
    },
    onError: (error) => {
      console.error("Add bookmark failed", error)
      toast.error("Failed to add bookmark")
    }
  })

  const handleAddBookmark = () => {
    if (!title || !url) return
    mutation.mutate({ title, url })
  }


  return (
    <div className="bg-gray-900 p-6 rounded-xl">

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-3 bg-gray-800 rounded"
      />

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full mb-4 p-3 bg-gray-800 rounded"
      />

      <button
        onClick={handleAddBookmark}
        disabled={mutation.isPending}
        className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg disabled:opacity-50"
      >
        {mutation.isPending ? "Adding..." : "Add Bookmark"}
      </button>

    </div>
  )
}
