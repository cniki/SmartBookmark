import { Trash2 } from "lucide-react"
import { bookmarkService } from "../services/bookmarkService"
import toast from "react-hot-toast"


import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function BookmarkCard({ bookmark }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id) => bookmarkService.deleteBookmark(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookmarks'])
      toast.success("Bookmark deleted")
    },
    onError: (error) => {
      console.error("Delete bookmark failed", error)
      toast.error("Failed to delete bookmark")
    }
  })

  const handleDelete = () => {
    mutation.mutate(bookmark.id)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative">
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={handleDelete}
          disabled={mutation.isPending}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition disabled:opacity-50"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <h3 className="font-semibold text-lg mb-2 text-white">
        {bookmark.title}
      </h3>

      <p className="text-gray-400 mb-4 break-words">
        {bookmark.url}
      </p>

      <p className="text-sm text-gray-500 text-right">
        {new Date(bookmark.created_at).toLocaleString()}
      </p>
    </div>
  )
}
