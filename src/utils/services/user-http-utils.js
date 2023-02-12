import axios                    from "axios";
import { getCurrentLoggedUser } from "./auth-http-utils";

const apiUrl = 'http://localhost:3005/users';

// Axios is a promise based HTTP client 
// for the browser and Node.js. Axios makes it
// easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations. 

export function getUsers(){
    return axios.get(apiUrl);
}

export function getUserById( currentUserId ){
   return axios.get(`${apiUrl}/${currentUserId}`);
}

export async function saveUser( currentUser ){

    if(!currentUser.photo){
        currentUser.photo = `https://picsum.photos/200/300?random=${Math.random()}`;
    }
    
    // if user exist -> update the user
    return currentUser.id ?  updateUserProcess( currentUser ) :
                             axios.post(apiUrl, currentUser);
}

function updateUserProcess( userToUpdate ){

    const loggedUser    = getCurrentLoggedUser();
    const promiseUpdate = axios.put(`${apiUrl}/${userToUpdate.id}`, userToUpdate);

    if(userToUpdate.id === loggedUser.id){
        return promiseUpdate.then( () => {
                localStorage.setItem('loggedUser', JSON.stringify(userToUpdate));
            });
    }

    return promiseUpdate;
}   

export function deleteUser( userToDeleteId ){
    return axios.delete(`${apiUrl}/${userToDeleteId}`);
}