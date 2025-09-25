import {create} from 'zustand';
const useStore=create((set)=>({
    posts:[],
    filteredPosts:[],
    suggestions:["first","second"],
    searchKeyword:"",
    setSearchKeyword:(str)=>set(()=>({
        searchKeyword:str
    })),
    setSuggestions:(bufferSuggestions)=>set(()=>({
        suggestions:bufferSuggestions
    })),
    setPosts:(bufferPosts)=>set(()=>({
            posts:bufferPosts,
            filteredPosts:bufferPosts
    })),
    setFilterPosts:(bufferPosts)=>set(()=>
        ({
            filteredPosts:bufferPosts
        }))
}));

export default useStore;