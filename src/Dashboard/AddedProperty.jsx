
// import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

// import LoadingSpinner from '../LoadingSpinner'
import useAuth from '../hooks/useAuth'

import useAxiosSecure from '../hooks/useAxiosSecure'
import PropertyRow from './PropertyRow'
import LoadingSpinner from '../components/LoadingSpinner'


const AddedProperty = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    // fetch room data
    const {data: posts=[], isLoading, refetch} = useQuery({
        queryKey : ['my-added', user?.email],
        queryFn : async()=>{
          const {data} = await axiosSecure.get(`/my-added/${user?.email}`)
          console.log(data)
          return data
        }
      })
      console.log(posts)
      const filteredPosts = posts.filter(post => post.email === user.email);

      //delete 
      const {mutateAsync} = useMutation({
        mutationFn : async id =>{
            const {data} = await axiosSecure.delete(`/post/${id}`)
            return data
        },
        onSuccess:data =>{
            console.log(data)
            refetch()
            toast.success('successfully deleted')
        }
      })

      //handle delete
      const handleDelete = async id =>{
        console.log(id)
        try{
            await mutateAsync(id)
        }catch(err){
            console.log(err)
        }
      }
      if (isLoading) return <LoadingSpinner />
  
  return (
    <>
      {/* <Helmet>
        <title>My Added property</title>
      </Helmet> */}

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
            <h1>My Total post: {filteredPosts.length}</h1>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead className=''>
                  <tr className=''>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                      Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-blue-900 text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {/* Room row data */}
                    {
                        filteredPosts.map(post=>
                            
                            <PropertyRow key={post._id} id={post._id} post={post} refetch={refetch} handleDelete={handleDelete}/>
                         )
                    }
                    </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddedProperty