import { Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import AddedProperty from "./AddedProperty";
import ManageUser from "./ManageUser";
import Block from "./Block";


const Dashboard = () => {
    const [role, isLoading] = useRole()
    return (
        <div className="relative min-h-screen w-full lg:p-10 md:flex flex justify-center items-center lg:w-full  bg-black ">
          <div>
            {role === 'user' && <AddedProperty></AddedProperty>} 
            {role === 'blocked' && <Block></Block>} 
            {role === 'admin' && <ManageUser></ManageUser>} 
          </div>
          <div className="flex-1 ">
          <div className="lg:p-5">
          <Outlet></Outlet>
          </div>
          </div>
        </div>
    );
};

export default Dashboard;