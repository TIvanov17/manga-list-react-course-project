import { useEffect, useState }  from "react";
import { deleteUser, getUsers } from "../../../utils/services/user-http-utils";
import { UserCard }             from "../user-card/UserCard";

export function UserList(){
    // collection of all users
    const [usersCollection, setUsersCollection]  = useState([]);
    
    useEffect( () => {
        getUsers().then( (response) => {
            setUsersCollection( response.data );
        });
    }, []);


    const onDeleteProcess = ( id ) => {
        deleteUser( id )
            .then( () => {
                setUsersCollection( ( prevUsersCollection ) => {
                    return prevUsersCollection.filter( user => user.id !== id );
                })
            })
    }

    return (
        <div className="users-list" style={{ display: 'flex' }}>
            { usersCollection.map( currentUser => 
                <UserCard key = {currentUser.id} user = {currentUser} onDelete = {onDeleteProcess}/>) }
        </div>
    );
}