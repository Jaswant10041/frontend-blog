import { create } from 'zustand';
const useStore = create((set) => ({
    user:null,
    posts: [],
    myposts:[],
    filteredPosts: [],
    suggestions: ["first", "second"],
    searchKeyword: "",
    page:1,
    setUser:(buffer)=>set({
        user:buffer
    }),
    setSearchKeyword: (str) => set({ searchKeyword: str }),
    setSuggestions: (bufferSuggestions) => set({
        suggestions: bufferSuggestions
    }),
    setPosts: (bufferPosts) => set({
        posts: bufferPosts,
        filteredPosts: bufferPosts
    }),
    setMyPosts: (bufferPosts)=> set({
        myposts:bufferPosts
    }),
    setFilterPosts: (bufferPosts) => set({
        filteredPosts: bufferPosts
    }),
    setPage: (page)=>set({page:page}),
    resetPosts: () => set({ posts: [] }),
}));

export default useStore;