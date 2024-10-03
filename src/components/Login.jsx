import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state || '/'
    const { signInWithGoogle, signIn, loading, setLoading} = useAuth()
    const handleSubmit = async e =>{
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value 
        try{
          setLoading(true)
          await signIn( email, password)
          navigate(from)
          toast.success("Login succesfully")
        }
    
        catch(err){
          console.log(err)
          if(err.code === "auth/invalid-credential"){
            toast.error("Password doesn't match")
          }else{
            toast.error('Failed to log in.')
          }
          
        }finally{
          setLoading(false)
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
 <div className="hero    absolute top-28 z-10 ">
<div className="hero-content ">
<div className="card bg-base-100 w-full max-w-sm shrink-0 hover:shadow-4xl shadow-2xl  shadow-black">
<div className='text-center'>
   <button onClick={handleGoogleSignIn} className="btn btn-outline btn-success text-center mt-2"><FcGoogle />
   Continue With Google</button>
   </div>
 <form className="card-body" onSubmit={handleSubmit}>
<div>
    
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
     <button className="btn bg-black text-white">Login</button>
     <small className='mt-2 text-center'>Don't have any account ? <span className='text-pretty text-gray-700 font-bold'><Link to="/register">Register</Link></span> </small>
   </div>
 </form>
</div>
</div>
</div>
   </div>
    );
};

export default Login;