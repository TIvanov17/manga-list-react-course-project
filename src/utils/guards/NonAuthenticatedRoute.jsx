import { getCurrentLoggedUser } from "../services/auth-http-utils";
import { Navigate }             from "react-router";

export function NonAuthenticatedRoute( {children} ){

    const user = getCurrentLoggedUser();

    if(user){
        return <Navigate to = '/users'/>;
    }

    return children;
}