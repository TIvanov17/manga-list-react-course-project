import { Navigate }             from "react-router-dom";
import { getCurrentLoggedUser } from "../services/auth-http-utils";

export function AuthenticatedRoute( {children} ){

    const user = getCurrentLoggedUser();
    
    if(!user){
        return <Navigate to = "/login" />
    }
    
    return children;
}