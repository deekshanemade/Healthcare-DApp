import React from 'react';
import './sign_in.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import sign_up from './sign_up';
import CRUD from '../artifacts/CRUD.json';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { LoadingContainer, AccountData, ContractData, ContractForm } from '@drizzle/react-components';
const drizzleOptions = {
    contracts: [CRUD]
}
function sign_in() {
    return (
        <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>


                <div className="form-wrapper">
                    <div>
                        {/* <AccountData accountIndex={0}></AccountData> */}
                        {/* <ContractData contract="CRUD" method="read_Userdata"></ContractData> */}
                    </div>
                    <Form>
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
                            <Link to='/dashboard' className="link">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Link>

                        </div>
                    </Form>
                    <p>Don't have an account? <Link to='/sign_up' className="link">Sign up</Link></p>
                    {/* <ContractForm contract="CRUD" method="create_User"/> */}

                </div>
            </LoadingContainer>
        </DrizzleProvider>

    )
}

export default sign_in
