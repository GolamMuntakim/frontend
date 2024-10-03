import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import Swal from "sweetalert2";
import LoadingSpinner from '../components/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';


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
    <Helmet>
          <title>Manage Users</title>
        </Helmet>
      <div className='lg:container glass  lg:px-4 sm:px-8  w-[300px] md:w-[600px] mx-auto p-4 mt-10  lg:w-full flex item-center justify-center ml-[2%] md:ml-[5%]  lg:ml-[20%] text-white  lg:p-8  '>
        
        <div className='lg:py-8   w-full'>
            <div className='text-white flex justify-between'>
               <Link to="/"> <h1><FaArrowLeft /></h1></Link>
            <h1 >Total User : {users?.length}</h1>
            </div>
          <div className='lg:-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden overflow-x-auto'>
              <table className='min-w-full leading-normal '>
                <thead>
                  <tr>
                  <th
                      scope='col'
                      className='px-5 py-3   border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3   border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3   border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Make Admin
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                      Block User
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3   border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                    >
                    Delete User
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                    users.map(user=>  <tr key={user._id}>
                        <td className='px-5 py-5  text-sm'>
                       <p className='text-white whitespace-no-wrap'>{user?.name || user?.displaName}</p>
                     </td>
                     <td className='px-5 py-5  text-sm'>
                       <p className='text-white whitespace-no-wrap'>{user?.email}</p>
                     </td>
                     <td className='px-5 py-5  text-sm'>
                       <p className='text-white whitespace-no-wrap'>{user?.role}</p>
                     </td>
                     <td className='px-5 py-5  text-sm'>
                       <button
                       disabled={user.role === 'blocked'}
                        onClick={()=>handleMakeAdmin(user)} className="btn btn-outline btn-info text-white ">
                            {user.role === 'admin'  ? 'Admin' : 'Make Admin'}
                            </button>
                       
                     </td>
                     <td className='px-5 py-5  text-sm'>
                     <button onClick={()=>handleBlock(user)} className="btn  btn-outline btn-success text-white ">  
                        {user.role === 'blocked' ? 'Blocked' : 'Block user'}
                     </button>
                      
                     </td>
                     <td className='px-5 py-5  text-sm'>
                     <button onClick={()=>handleDelete(user)} className="btn btn-outline btn-error text-white ">Delete</button>
                      
                     </td>
               
                     <td className='px-5 py-5  text-sm'>
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