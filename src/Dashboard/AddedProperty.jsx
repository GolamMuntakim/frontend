
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth'
import useAxiosSecure from '../hooks/useAxiosSecure'
import PropertyRow from './PropertyRow'
import LoadingSpinner from '../components/LoadingSpinner'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'


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
      <Helmet>
        <title>My post</title>
      </Helmet>

      <div className='container glass mx-auto lg:px-4 sm:px-8 w-[400px] mt-10  lg:w-[700px] flex item-center justify-center ml-[5%] lg:ml-[50%] text-white  p-8 '>
        <div className='lg:py-8   w-full '>
           <div className='flex justify-between'>
           <Link to="/"><h1><FaArrowLeft /></h1></Link>
           <h1>My Total post: {filteredPosts.length}</h1>
           </div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 lg:py-4 overflow-x-auto flex item-center justify-center w-full'>
            <div className='inline-block w-full lg:w-full shadow rounded-lg overflow-hidden overflow-x-auto'>
              <table className='w-full lg:w-full leading-normal'>
                <thead className=''>
                  <tr className=''>
                    <th
                      scope='col'
                      className='px-5 py-3  text-white border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                      Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  text-white  border-b border-gray-200   text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  text-white  border-b border-gray-200  text-left text-sm uppercase font-normal'
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