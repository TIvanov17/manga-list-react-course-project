import { getUsers } from "./user-http-utils";

export function getCurrentLoggedUser(){
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    
    return user;
}

// async function with await keyword in it
// promise-returning function
// behave as though they're synchronous 
// by suspending execution until the 
// returned promise is fulfilled or rejected.

export async function login( loginCreds ){
    const usersCollection = (await getUsers()).data; // wait for the proccess then go to next code line

    const foundUser = usersCollection
                    .find( currentUser => currentUser.email === loginCreds.email && 
                                          currentUser.password === loginCreds.password
                         );
    
    if(!foundUser){
        throw new Error("Invalid email/password !");
    }

    localStorage.setItem("loggedUser", JSON.stringify(foundUser));
    
    return foundUser;
}

//asynchronous operation with new Promise
//instead of immediately returning the
//final value, the asynchronous method 
//returns a promise to supply the value at some point in the future.

export function logout(){
    return new Promise( (resolve) => {
        localStorage.removeItem('loggedUser');
        resolve();
    })
}