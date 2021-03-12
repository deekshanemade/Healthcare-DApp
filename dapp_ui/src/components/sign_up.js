import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './sign_up.css';
function sign_up() {
    return (
        <div>
            <Form className="form-wrapper">
                <h2 className="heading">Login</h2>
                <Form.Group controlId="formBasicEmail">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control type="text" className="input-box" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control type="password" className="input-box" placeholder="Password" />
                </Form.Group>
                <div className="login-button">
                    <Button variant="primary" type="submit">
                        Login
                </Button>
                </div>
            </Form>
        </div>
    )
}

export default sign_up
