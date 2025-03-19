import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const user = useSelector(state => state.user.currentUser);

    if(!user||user?.role=="user")
        return <Navigate to="/home"/>
    return children;
}
 
export default ProtectedRoute;
