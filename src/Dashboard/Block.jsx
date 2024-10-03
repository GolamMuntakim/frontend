import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const Block = () => {
    return (
        <div className="h-screen w-full  flex items-center ml-[90%] text-center">
            <div className="flex text-center w-full"><h1 className="text-red-800   text-3xl font-bold ">You have been blocked by admin <Link to="/" className="flex items-center text-white gap-2 justify-center"><FaArrowLeft />Back</Link></h1></div>
        </div>
    );
};

export default Block;