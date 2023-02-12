import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

import { logout, getCurrentLoggedUser } from '../../utils/services/auth-http-utils';

export function Header(){
    
    const navigate = useNavigate();
    
    const onLogout = () => {
        logout().then( () => {
            navigate('/login');
        })
    }

    const onProfileClicked = () => {
        const loggedUser = getCurrentLoggedUser();  
        navigate(`/profile/${loggedUser.id}`);
    }

    const renderLoggedUsername = () => {
        const loggedUser = getCurrentLoggedUser();
        return <span style = {{fontSize : '1.2em', fontWeight: 'bold'}}>{ loggedUser.username }</span>        
    }

    const renderCreateUserManga = () => {
        const loggedUser = getCurrentLoggedUser();
        
        if(loggedUser.isAdmin){
            return <>
                <Nav.Link href="/users/create">Create User</Nav.Link>
                <Nav.Link href="/manga/add">Add Manga</Nav.Link>
            </>
        }
    }
    
    return(
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Navbar.Brand href="/users">Users</Navbar.Brand>
                        <Navbar.Brand href="/manga">Manga</Navbar.Brand>
                        { renderCreateUserManga() }

                    </Nav>
                    <Nav className="profile-section">
                        <Nav.Link className="nav-link" onClick={onProfileClicked}>{renderLoggedUsername()}</Nav.Link>
                    </Nav>
                        <Link className="nav-link" onClick={onLogout}>Logout</Link>
                    </Navbar.Collapse>
                </Container>
             </Navbar>
        </div>
    )
}