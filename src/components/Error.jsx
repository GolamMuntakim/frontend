import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className='h-screen flex gap-4 flex-col justify-center items-center text-4xl'>
         <div>
          404 Page Not Found
          </div>
          <div className="flex items-center gap-4  justify-center">Back to 
            <span className="text-red-800">
            <Link to='/'>Home</Link></span> 
         </div>
        </div>
    );
};

export default Error;