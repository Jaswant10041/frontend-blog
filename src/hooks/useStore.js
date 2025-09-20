import {create} from 'zustand';
const useStore=create((set)=>({
    posts:[],
    filteredPosts:[],
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