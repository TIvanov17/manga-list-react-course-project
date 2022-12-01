import Form                                     from 'react-bootstrap/Form';
import Button                                   from 'react-bootstrap/Button';
import { useState, useEffect }                  from 'react';
import { useNavigate, useParams, Navigate }     from 'react-router';
import { getUserById, saveUser }                from '../../../utils/services/user-http-utils';
import { getCurrentLoggedUser }                 from '../../../utils/services/auth-http-utils';
import { onFormControl}                         from '../../../utils/services/utils';

import "./UserForm.scss";

export function UserForm(){
    const emptyUser = {
        username    : '',
        firstName   : '',
        lastName    : '',
        email       : '',
        password    : '',
        photo       : '',
        date        : new Date().toLocaleString() + '',
        isAdmin     : false
    };

    const [currentUser, setCurrentUser]     = useState(emptyUser);
    const [error, setCurrentError]          = useState('');
    const navigate                          = useNavigate();
    const params                            = useParams();

    useEffect(() => {
        if(params.id){
            getUserById(params.id)
                .then( ( response ) => {
                    setCurrentUser(response.data);
                })
        } else{
            setCurrentUser(emptyUser);
        }
    }, [params.id]);

    const onFormControlChange = ( event ) => {
        onFormControl(event, setCurrentUser);
    }

    const onCheckboxChange = ( event ) => {
        setCurrentUser( (prevState) => {
            return{
                ...prevState,
                isAdmin: event.target.checked
            }
        })
    }

    const onSubmit = ( event ) => {
        event.preventDefault();
        saveUser(currentUser).then(() => {
            navigate('/users');
        }).catch(error => {
            setCurrentError(error.message);
        });
    }

    const renderAdminFormCheck = () => {
        const loggedUser = getCurrentLoggedUser();
        if(loggedUser === null){
            return;
        }
        
        if(loggedUser.isAdmin && loggedUser.id !== currentUser.id){
            return <>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Is Admin</Form.Label>
                    <Form.Check name     = "isAdmin" 
                                onChange = { onCheckboxChange } 
                                checked  = { currentUser.isAdmin }/>
                </Form.Group>
            </>
        }
    }

     const navigateControllerNotAdmin = () => {
        
        const loggedUser = getCurrentLoggedUser();
        if(loggedUser === null){
            return;
        }

        const isNotAdminUserEditOther = currentUser.id && loggedUser.id !== currentUser.id;
        const isNotAdmin = !loggedUser.isAdmin;

        if (isNotAdminUserEditOther && isNotAdmin){
            return <Navigate to='/users' />
        }
    }

    return (
        <div className="user-form-wrapper">    
            
                { navigateControllerNotAdmin() }        

            <Form className="user-form" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control   type="text" name="username" placeholder="Enter username" 
                                    onChange={onFormControlChange} value={currentUser.username} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control   type="text" name="firstName" placeholder="Enter first name" 
                                    onChange={onFormControlChange} value = {currentUser.firstName} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control   type="text" name="lastName" placeholder="Enter last name" 
                                    onChange={onFormControlChange} value={currentUser.lastName} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control   type="email" name="email" placeholder="Enter Email" 
                                    onChange={onFormControlChange} value={currentUser.email} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control   type="password" name="password" placeholder="Password" 
                                    onChange={onFormControlChange} value={currentUser.password} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control   type="text" name="photo" placeholder="Enter photo" 
                                    onChange={onFormControlChange} value={currentUser.photo}/>
                </Form.Group>

                    {renderAdminFormCheck()}
                
                <Button variant="primary" type="submit"> Submit </Button>
            </Form>
        </div>
    );
}