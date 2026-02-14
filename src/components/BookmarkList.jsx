import BookmarkCard from "./BookmarkCard"

export default function BookmarkList({ bookmarks }) {

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-6 text-white">
        All Bookmarks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
          />
        ))}
      </div>
    </div>
  )
}
