import { supabase } from "../../lib/supabase"

export const bookmarkService = {
    async getCurrentUser() {
        const { data: { session } } = await supabase.auth.getSession()
        return session?.user || null
    },

    async getBookmarks(userId) {
        const { data, error } = await supabase
            .from("bookmarks")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })

        if (error) throw error
        return data || []
    },

    async addBookmark(bookmark, userId) {
        const { data, error } = await supabase
            .from("bookmarks")
            .insert([{ ...bookmark, user_id: userId }])
            .select()

        if (error) throw error
        return data[0]
    },

    async deleteBookmark(id) {
        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", id)

        if (error) throw error
        return true
    }
}
