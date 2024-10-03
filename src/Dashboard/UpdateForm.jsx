



const UpdateForm = ({handleSubmit, handleImage, setPostData, postData,imageText}) => {
    
    return (
     <>
     {/* <input type="file" name="" id="" /> */}
      <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-white rounded-xl '>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-5'>
          <div className=' p-4  w-full  m-auto rounded-lg'>
              <div className='file_upload px-5 py-3 relative '>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      onChange={e =>handleImage(e.target.files[0])}
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-black text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-slate-800'>
                    {imageText.length>20? imageText.split('.')[0].slice(0,15)+'....'+imageText.split('.')[1] : imageText}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          
            <div className=' text-sm'>
              <label htmlFor='title' className='block text-white'>
                Title
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='title'
                id='title'
                type='text'
                value={postData?.title}
                onChange={(e)=>setPostData({...postData, title: e.target.value})}
                placeholder='Title'
                required
              />
            </div>
  
           
            {/* <input type="file" /> */}
            <div className=' text-sm'>
              <label htmlFor='location' className='block text-white'>
                Location
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='location'
                id='location'
                type='text'
                value={postData?.location}
                onChange={(e)=>setPostData({...postData, location: e.target.value})}
                placeholder='Location'
                required
              />
            </div>
        
  
          
          </div>
  
          <button
            type='submit'
            className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-black'
          >
            Update
          </button>
        </form>
      </div>
     </>
    )
  }
  
  export default UpdateForm