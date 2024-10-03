import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Navbar = () => {
    const {user ,logOut} = useAuth()
    return (
        <div>
            <div className="navbar  top-0 z-10 fixed bg-black w-full lg:w-full">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       <li><a><Link to="/">Home</Link></a></li>
      <li><a><Link to="/all-post">All Post</Link></a></li>
      <li><a><Link to="/create-post">Create Post</Link></a></li>
      </ul>
    </div>
    <Link to="/" className="btn btn-ghost text-xl">SSL<span className="text-red-800">Blog</span></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a> <NavLink to='/' style={({isActive})=>(isActive?{background:"white",padding:"7px",borderRadius:"30px",  color:"black", }:{color:"white"})}>Home</NavLink></a></li>
      <li><a><NavLink to="/all-post" style={({isActive})=>(isActive?{background:"white",padding:"7px",borderRadius:"30px",  color:"black", }:{color:"white"})}>All Post</NavLink></a></li>
      <li><a><NavLink to="/create-post" style={({isActive})=>(isActive?{background:"white",padding:"7px",borderRadius:"30px",  color:"black", }:{color:"white"})}>Create Post</NavLink></a></li>
    </ul>
  </div>
 <div className="navbar-end">
 <details className="dropdown dropdown-end">
  <summary className="btn  w-2 rounded-full mr-2">
    <div className=" avatar">
  <div className="w-14 rounded-full">
    <img
    src={user && user.photoURL ? user.photoURL : "image/avatar.webp"}
    
     />
  </div>
</div>
</summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 lg:w-52 p-2 shadow ">
  {user ? (
                        <>
                        <div
                        
                        className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                      >
                       {user?.displayName}
                      </div>
  
                          <Link
                            to='/dashboard'
                            className='block  px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Dashboard
                          </Link>
  
  
  
                          <div
                            onClick={logOut}
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                             to='/login'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Login
                          </Link>
                          <Link
                            to='/register'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                           Register
                          </Link>
                        </>
                      )}
  
  </ul>
</details>
 </div>
  
</div>
        </div>
    );
};

export default Navbar;