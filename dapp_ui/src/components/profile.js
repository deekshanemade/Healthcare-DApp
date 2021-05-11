import React from 'react';
import { Row, Col } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
import './profile.css';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;

function profile(props) {
    const { drizzle, drizzleState } = props;
    let sender = drizzle.web3.eth.accounts.givenProvider.selectedAddress; //gives the connected Metamask account
    // const data = drizzle.contracts.Healthcare.methods["showAccInfo()"].call();
    // console.log(data);

    return (
        <div className="form-css">
            <h2>Account Information</h2>
            <Row>
                <Col>
                    <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showAccInfo" methodArgs={[sender, { from: sender }]} />
                </Col>
            </Row>
            <h2>Personal Information</h2>
            <Row>
                <Col>
                    <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showPersonalInfo" methodArgs={[sender, { from: sender }]} />
                </Col>
                <Col className="form">
                    <ContractForm drizzle={drizzle} contract="Healthcare" method="updateUserInfo" sendArgs={{ from: sender, gas: 600000 }} />
                </Col>
            </Row>

            {/* <Form>
                <Form.Label column="lg">Account Info</Form.Label>
                <Form.Group as={Row}>
                    <Form.Label column lg={2}>User Id</Form.Label>
                    <Col lg={4}>
                        <Form.Control disabled type="text" placeholder="P123456" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column lg={2}>User Type</Form.Label>
                    <Col lg={4}>
                        <Form.Control disabled type="text" defaultValue="Patient" />
                    </Col>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" />
                    </Form.Group>
                </Form.Row>

                <Form.Label column="lg">Personal Info</Form.Label>
                <Form.Row>
                    <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationCustom02">
                        <Form.Label>Middle name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Middle name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationCustom03">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Gender </Form.Label>
                        <Form.Row>
                            <Form.Check custom inline type="radio" label="Female" id="custom-radio-1" />
                            <Form.Check custom inline type="radio" label="Male" id="custom-radio-2" />
                        </Form.Row>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Age </Form.Label>
                        <Form.Control type="number" placeholder="Enter age" maxLength="2" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPin">
                        <Form.Label>Pin code</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Save</Button>
            </Form> */}
        </div>
    )
}

export default profile
