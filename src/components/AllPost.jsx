import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { axiosCommon } from "../hooks/useAxiosCommon";
import LoadingSpinner from "./LoadingSpinner";
import { Helmet } from "react-helmet-async";

const AllPost = () => {
    const [search, setSearch] = useState('')
    const [queryKey, setQueryKey] = useState(['all-post', {search :''}])
  

    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async ({queryKey}) => {
            const {search} = queryKey[1]
            const { data } = await axiosCommon.get(`/all-post?search=${search}`)
            console.log(data)
            return data
        },
        enabled: true
    })
    console.log(posts)
    const handleSearch = e => {
        e.preventDefault()
        const text = e.target.search.value
        setSearch(text)
        setQueryKey(['all-post', {search: text,}])
    }
    useEffect(() => {
        if (queryKey[1] !== '') {
            refetch()
        }
    }, [queryKey, refetch])
   
    console.log(search)
    if (isLoading) return <LoadingSpinner />
    return (
        <div className="bg-black">
             <Helmet>
            <title>
              All Post
            </title>
          </Helmet>
            <div className="pt-24 flex flex-col gap-4 max-auto mx-4 lg:flex-row  lg:justify-around  ">
                <div className="w-full">
                    <form onSubmit={handleSearch}>
                        <div className='flex gap-2 justify-center items-center place-items-center'>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" name="search" className="grow" placeholder="Search" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </label>
                            <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                </div>
            </div>
            <div className='pt-12 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-8 p-10 '>
                {posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
           
        </div>
    );
};

export default AllPost;