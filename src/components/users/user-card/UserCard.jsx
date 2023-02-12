import Card         from 'react-bootstrap/Card';
import ListGroup    from 'react-bootstrap/ListGroup';
import { useNavigate }     from 'react-router';
import { getCurrentLoggedUser } from '../../../utils/services/auth-http-utils';


export function UserCard({ user, onDelete }){

    const navigate = useNavigate();

    const updateNavigator = () => {
        navigate(`/users/edit/${user.id}`);
    }

    const onDeleteUserClicked = () => {
        onDelete(user.id);
    }

    const renderActionButtons = () => {
        const loggedUser = getCurrentLoggedUser();

        // the user is admin and cant delete himself
        if(loggedUser.isAdmin && loggedUser.id !== user.id){
            return <>
                    <Card.Link onClick = { updateNavigator }>Update</Card.Link>
                    <Card.Link onClick = { onDeleteUserClicked }>Delete</Card.Link>
                </>
        }

        if(loggedUser.id === user.id){
            return <Card.Link onClick = { updateNavigator }>Update</Card.Link>;
        }
    }

    const renderRoleInfo = () => {
        const role = user.isAdmin ? "Admin" : "User";
        return <p><i>{role}</i></p>
    }

    return(
        <Card style={{ width: '12rem', margin: '30px', float:"left" }}>
                    
            <Card.Img variant="top" src = {user.photo} style={{ width: '100%'}}/>

            <Card.Body>
                <Card.Title>
                    {user.username}
                </Card.Title>
                    {renderRoleInfo()}
            </Card.Body>
            
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Member since: {user.date} </ListGroup.Item>
            </ListGroup>
            
            <Card.Body>
               { renderActionButtons() }
            </Card.Body>
        </Card>
    );
}