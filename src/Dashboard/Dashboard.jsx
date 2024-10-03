import { Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import AddedProperty from "./AddedProperty";
import ManageUser from "./ManageUser";
import Block from "./Block";
// import Sidebar from "../Component/Sidebar";


const Dashboard = () => {
    const [role, isLoading] = useRole()
    return (
        <div className="relative min-h-screen md:flex">
          <div>
            {role === 'user' && <AddedProperty></AddedProperty>} 
            {role === 'blocked' && <Block></Block>} 
            {role === 'admin' && <ManageUser></ManageUser>} 
          </div>
          {/* outlet */}
          <div className="flex-1 md:ml-64">
          <div className="p-5">
          <Outlet></Outlet>
          </div>
          </div>
        </div>
    );
};

export default Dashboard;