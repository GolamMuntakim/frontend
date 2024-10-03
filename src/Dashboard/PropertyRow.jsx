
import { useState } from 'react'
import UpdateModal from './UpdateModal'



const PropertyRow = ({ post, refetch,handleDelete ,id}) => {
    const [isEditModal, setIsEditModal] = useState(false)
    
  return (
    <tr>
      <td className='px-5 py-5   text-sm flex justify-center items-center w-full'>
        <div className='flex items-center w-full'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={post?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>
      <td>
      <div className='ml-3'>
            <p className='text-white whitespace-no-wrap'>{post?.title}</p>
          </div>
      </td>
      <td className='px-5 py-5  text-sm'>
        <p className='text-white whitespace-no-wrap'>{post?.location}</p>
      </td>
     
     
      <td className='px-5 py-5  text-sm'>
        <button 
    
        onClick={()=>{handleDelete(id)}}
         className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-white leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-black rounded-md  '
          ></span>
          <span  className='relative'>Delete</span>
        </button>
      </td>
      <td className='px-5 py-5  text-sm'>
        <button 
        onClick={()=> setIsEditModal(true)}
         className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-white leading-tight mr-4'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-900 rounded-md'
          ></span>
          <span className='relative'>Update</span>
        </button>
        {/* Update Modal */}
        <UpdateModal isOpen={isEditModal} 
        setIsEditModalOpen={setIsEditModal}
        post={post}
        refetch={refetch}
        ></UpdateModal>
      </td>
    </tr>
  )
}



export default PropertyRow