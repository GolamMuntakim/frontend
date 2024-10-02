import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Navbar = () => {
    const {user ,logOut} = useAuth()
    return (
        <div>
            <div className="navbar bg-base-100">
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
        <li><a>Home</a></li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a><Link to="/">Home</Link></a></li>
      <li><a>All Post</a></li>
      <li><a><Link to="/create-post">Create Post</Link></a></li>
    </ul>
  </div>
 <div className="navbar-end">
 <details className="dropdown dropdown-end">
  <summary className="btn w-4 rounded-full m-1">
    <div className="avatar">
  <div className="w-10 rounded-full">
    <img
    src={user && user.photoURL ? user.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
    
     />
  </div>
</div>
</summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow ">
  {user ? (
                        <>
                        <div
                        
                        className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                      >
                       {user?.displayName.split('@')[0].substring(0, 8)}
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