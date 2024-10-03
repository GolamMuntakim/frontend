// import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import Swal from "sweetalert2";
import LoadingSpinner from '../components/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';


const ManageUser = () => {
     
   
    const axiosSecure = useAxiosSecure()
    // fetch users data
    const {data: users=[], isLoading, refetch} = useQuery({
        queryKey : ['users'],
        queryFn : async()=>{
          const {data} = await axiosSecure(`/users`)
          return data
        }
      })
      console.log(users)


      const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${user.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
   
      const handleBlock = user => {
        axiosSecure.patch(`/users/block/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${user.name} is Mark As Fraud`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

     // delete
     const handleDelete = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
      if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        {/* <Helmet>
          <title>Manage Users</title>
        </Helmet> */}
        <div className='py-8'>
            <h1>Total User : {users?.length}</h1>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                  <th
                      scope='col'
                      className='px-5 py-3 bg-green-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Make Admin
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Block User
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-green-900  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                    Delete User
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                    users.map(user=>  <tr key={user._id}>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{user?.name || user?.displaName}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                       <button
                       disabled={user.role === 'blocked'}
                        onClick={()=>handleMakeAdmin(user)} className="btn bg-blue-900 text-white ">
                            {/* {user.role === 'blocked' ? 'Blocked' : ''} */}
                            {user.role === 'admin'  ? 'Admin' : 'Make Admin'}
                            </button>
                       
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     <button onClick={()=>handleBlock(user)} className="btn bg-black text-white ">  
                        {user.role === 'blocked' ? 'Blocked' : 'Block user'}
                     </button>
                      
                     </td>
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     <button onClick={()=>handleDelete(user)} className="btn bg-red-900 text-white ">Delete</button>
                      
                     </td>
               
                     <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     </td>
                   </tr>)
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

export default ManageUser