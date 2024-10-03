import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";



const PostCard = ({post}) => {
    
    return (
        <div className="">
             <div className="h-[380px]  lg:w-80 glass rounded-md text-white">
                <figure><img src={post.image} alt="car!" className="h-[200px] w-full"/></figure>
                <div className="card-body">
                    <h2 className="card-title">Title: {post.title}</h2>
                    <p>location: {post.location}</p>
                    <div className="flex w-full justify-end">
                      <Link 
                      to={`/postDetails/${post._id}`}
                      >  <button className="btn bg-white  text-black font-bold  border-none"><FaArrowRight /></button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;