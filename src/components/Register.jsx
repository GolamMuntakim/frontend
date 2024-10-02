import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { imageUpload } from '../api/utilities';
import useAuth from '../hooks/useAuth';

const Register = () => {
    const navigate = useNavigate()
    const {createUser, signInWithGoogle, updateUserProfile, loading, setLoading} = useAuth()
    const handleSubmit = async e =>{
      e.preventDefault()
      const form = e.target
      const name = form.name.value
      const email = form.email.value
      const password = form.password.value 
      const image = form.image.files[0] 
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=])(?=.*[A-Z]).{6,}$/;
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return;
      }
      if (!passwordRegex.test(password)) {
        toast.error("Password must contain at least one digit, one special character, and one uppercase letter.");
        return;
      }
      try{
        setLoading(true)
        const image_url = await imageUpload(image)
        console.log(image_url)
        const result = await createUser(email, password)
        await updateUserProfile(name, image_url)
        navigate('/')
        toast.success("signup succesfully")
      }catch(err){
        console.log(err)
      toast.error(err.message)
    }
    }
  
    const handleGoogleSignIn = async()=>{
      try{
        await signInWithGoogle()
        navigate('/')
        toast.success("signup succesfully")
      }
      catch(err){console.log(err)}
    }
    return (
        <div>
             <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        
        modules={[Autoplay,  ]}
        className="mySwiper w-full relative h-screen top-0"
      >
        <SwiperSlide>
            <img src="image/swithzerland.avif" className='h-screen w-full object-cover' alt=""  />
        </SwiperSlide>
        <SwiperSlide>
            <img src="image/2.avif" className='h-screen w-full object-cover' alt=""  />
        </SwiperSlide>
        <SwiperSlide>
            <img src="image/3.avif" className='h-screen w-full object-cover' alt=""  />
        </SwiperSlide>
        <SwiperSlide>
            <img src="image/4.avif" className='h-screen w-full object-cover' alt=""  />
        </SwiperSlide>
      </Swiper>
      <div className="hero    absolute top-0 z-10 ">
  <div className="hero-content ">
    <div className="card bg-base-100 w-full max-w-sm shrink-0 hover:shadow-4xl shadow-2xl  shadow-black">
    <div className='text-center'>
        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-success text-center mt-2"><FcGoogle />
        Continue With Google</button>
        </div>
      <form className="card-body" onSubmit={handleSubmit}>
    <div>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text"  name='name'id='name' placeholder="Name" className="input input-bordered" required />
        </div>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input type="file" id='image' name='image' className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
        </div>
    </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email"  name='email' id='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password"  name='password' autoComplete='new-password' id='password' placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-2">
          <button className="btn btn-primary">Register</button>
          <small className='mt-2 text-center'>All ready have an account ? <span className='text-pretty text-gray-700 font-bold'><Link to="/login">Log in</Link></span> </small>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;