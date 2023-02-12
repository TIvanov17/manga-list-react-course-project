import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../../../utils/services/auth-http-utils";
import { useState} from "react";
import { useNavigate } from "react-router";

import "./Login.scss";

export function Login(){
    
    const [loginCreds, setLoginCreds]   = useState({});
    const [error, setError]             = useState('');

    const navigate = useNavigate();

    const onFormControlChange = ( event ) => {
        setLoginCreds( (prevState) => {
            return {
                ...prevState,
                [event.target.name] : event.target.value
            }
        })
    }

    const onFormSubmit = ( event ) =>{
        event.preventDefault();
        login(loginCreds)
            .then( () => { // if login creds are exist / user is register
                navigate('/users');
            })
            .catch( (err) => { // if login creds are not found -> wrong email/password
                setError(err.message);
            })
    }

    return(
        <div className="login-form">
            <Form onSubmit={onFormSubmit}>
                <span className="text-danger">
                    {error}
                </span>
                <Form.Group>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control type="email" name="email" onChange={onFormControlChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" name="password" onChange={onFormControlChange} required />
                </Form.Group>
                <Button className = "buttons" type="submit">Login</Button>

                <div>
                    <Link className = "buttons" to="/register">Register an account</Link>
                </div>
            </Form>
        </div>
    )
}