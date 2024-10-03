import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useRole from "../hooks/useRole";


const UserRoute = ({children}) => {
    const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    if (role === 'user') return children
    return <Navigate to='/dashboard' />
};

export default UserRoute;