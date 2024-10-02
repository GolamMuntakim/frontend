import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { FaCamera } from "react-icons/fa";


const CreatePost = () => {
    const [imageText, setImageText] = useState('')
    const { user } = useAuth()
    console.log(user)
    const handleImage = image => {
        setImageText(image.name)
    }
    return (
        <div>
            <div className='w-full  flex flex-col justify-center items-center text-gray-800 rounded-xl '>
            <div className=" sm:p-12  text-black">
	<div className="flex flex-col items-center space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
		<img src={user?.photoURL} alt="" className="self-center flex-shrink-0 w-20 h-20 border rounded-full md:justify-self-start bg-gray-500 border-gray-700" />
		<div className="flex flex-col">
			<h4 className="text-lg font-semibold text-center md:text-left">{user?.displayName}</h4>
		</div>
	</div>
</div>
                <form
                //    onSubmit={handleSubmit}
                >
                    <div className=''>
                        <div className=' flex items-center justify-center gap-2'>
                            <div className=' text-sm'>
                                <label htmlFor='title' className=' text-gray-600'>
                                    Place Title
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-500 rounded-md '
                                    name='title'
                                    id='title'
                                    type='text'
                                    placeholder='Title'
                                    required
                                />
                            </div>
                            <div className=' text-sm'>
                                <label htmlFor='location' className=' text-gray-600'>
                                    Place Location
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-500 rounded-md '
                                    name='location'
                                    id='location'
                                    type='text'
                                    placeholder='Location'
                                    required
                                />
                            </div>
                            <div className=' p-4   m-auto rounded-lg'>
                                    <div className='file_upload px-5 py-3 relative  rounded-lg'>
                                        <div className='flex flex-col  mx-auto text-center'>
                                            <label>

                                                <input
                                                    className='text-sm cursor-pointer  hidden'
                                                    type='file'
                                                    name='image'
                                                    onChange={e => handleImage(e.target.files[0])}
                                                    id='image'
                                                    accept='image/*'
                                                    hidden
                                                />
                                                <div className='  font-semibold cursor-pointer p-1 px-3 '>
                                                    {imageText.length > 20 ? imageText.split('.')[0].slice(0, 15) + '....' + imageText.split('.')[1] : < FaCamera className="text-blue-800 text-4xl"/>
                                                    }
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className=' w-full'>
                            <div className='w-full text-sm'>
                                <label htmlFor='title' className='block text-gray-600'>
                                    Place Description
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-500 focus:outline-blue-500 rounded-md input-lg  '
                                    name='description'
                                    id='description'
                                    type='text'
                                    placeholder='description'
                                    required
                                />
                            </div>

                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500'
                    >
                        Post Your Blog

                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;