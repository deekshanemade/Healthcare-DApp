import React, { Component } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { newContextComponents } from "@drizzle/react-components";
import './insurance.css'
const { ContractData, ContractForm } = newContextComponents;
export class Insurance extends Component {
    state = {
        addr: this.props.drizzle.web3.eth.accounts.givenProvider.selectedAddress,
        key: '',
        granted: '',
        sender: this.props.drizzle.web3.eth.accounts.givenProvider.selectedAddress,
        show: false,
        fName: 'First Name',
        mName: 'Middle Name',
        lName: 'Last Name',
        gender: 'Female',
        age: 0,
        reason: '',
        description: '',
        medicalDocs: [],
        bills: [],
        showPatient: false,
        showIA: false
    }
    componentDidMount() {
        if (this.props.role == "Patient") {
            this.setState({ showPatient: true });
        }
        if (this.props.role == "Insurance agent") {
            this.setState({ showIA: true });
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.drizzle.contracts.Healthcare.methods.showClaimRequest(this.state.addr).call().then(result => {
            this.setState({ key: result[0], granted: result[2] });
        })
        this.props.drizzle.contracts.Healthcare.methods.showPersonalInfo(this.state.addr).call().then(result => {
            this.setState({ fName: result[0], mName: result[1], lName: result[2], gender: result[3], age: result[4], show: true });
            this.props.drizzle.contracts.Healthcare.methods.showRecord(this.state.key).call().then(res => {
                // console.log(res)
                this.setState({ reason: res[0], description: res[1], medicalDocs: res[2], bills: res[3] });
                this.showData()
            })
        })
        console.log("Sender address:", this.state.addr, "Metamask address:", this.state.sender, "Key:", this.state.key)
    }
    onGrant = (event) => {
        event.preventDefault();
        this.props.drizzle.contracts.Healthcare.methods.grantClaimRequest(this.state.addr).send().then(res => {
            this.props.drizzle.contracts.Healthcare.methods.showClaimRequest(this.state.addr).call().then(result => {
                    this.setState({ granted: result[2] })
                    this.showData()              
            })
        })
    }
    onReject = (event) => {
        event.preventDefault();
        this.props.drizzle.contracts.Healthcare.methods.rejectClaimRequest(this.state.addr).send().then(res => {
            this.props.drizzle.contracts.Healthcare.methods.showClaimRequest(this.state.addr).call().then(result => {
                this.setState({ granted: result[2] })
                this.showData()      
            })
        })
    }
    showData = () => {
        if (this.state.show) {
            return (
                <div>
                    <Row>
                        <Col lg={4}>
                            <h4>Personal Data</h4>
                            <br />
                            <h6>First Name:</h6>
                            <p>{this.state.fName}</p>
                            <h6>Middle Name:</h6>
                            <p>{this.state.mName}</p>
                            <h6>Last Name:</h6>
                            <p>{this.state.lName}</p>
                            <h6>Gender:</h6>
                            <p>{this.state.gender}</p>
                            <h6>Age:</h6>
                            <p>{this.state.age}</p>
                        </Col>
                        <Col>
                            <h4>Insurance Claim Data</h4>
                            <br />
                            <h6>Key:</h6>
                            <p>{this.state.key}</p>
                            <h6>Insurance claim request status:</h6>
                            <p>{this.state.granted}</p>
                            <hr></hr>
                            <h4>Medical Data</h4>
                            <br />
                            <h6>Reason:</h6>
                            <p>{this.state.reason}</p>
                            <h6>Description:</h6>
                            <p>{this.state.description}</p>
                            <Row>
                                <Col>
                                    <h6>Medical Documents:</h6>
                                    {this.state.medicalDocs.map((value, index) => {
                                        const url = "https://ipfs.infura.io/ipfs/" + value;
                                        return <><a href={url} target="_blank">Document {index + 1}</a><br /></>
                                    })}
                                </Col>
                                <Col>
                                    <h6>Bills:</h6>
                                    {this.state.bills.map((value, index) => {
                                        const url = "https://ipfs.infura.io/ipfs/" + value;
                                        return <><a href={url} target="_blank">Bill {index + 1}</a><br /></>
                                    })}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
    showGrantOption = () => {
        if (this.state.show) {
            return (
                <>
                    <h5>Respond to patient's claim request:</h5>
                    <form className="Form" onSubmit={this.onGrant}>
                        <Button size="sm" type="submit" variant="success">Grant</Button>
                    </form>
                    <form className="Form" onSubmit={this.onReject}>
                        <Button size="sm" type="submit" variant="danger">Reject</Button>
                    </form>
                </>
            )
        }
    }
    PatientUI = () => {
        // console.log("Patient:", this.state.showPatient)
        if (this.state.showPatient) {
            return (
                <div >
                    <Row className="patientUI" >
                        <Col>
                            <h5>Generate Insurance Claim request:</h5>
                            <ContractForm drizzle={this.props.drizzle} contract="Healthcare" method="createClaimRequest" sendArgs={{ from: this.state.sender, gas: 600000 }} />
                        </Col>
                        <Col>
                            <h5>Delete Insurance Claim request:</h5>
                            <ContractForm drizzle={this.props.drizzle} contract="Healthcare" method="deleteClaimRequest" sendArgs={{ from: this.state.sender, gas: 600000 }} />
                        </Col>
                    </Row>
                    <hr />
                    <div className="patientUI">
                        <br />
                        <h5>Insurance Claim request:</h5>
                        <ContractData drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} contract="Healthcare" method="showClaimRequest" methodArgs={[this.state.sender]} />
                    </div>
                </div>
            )
        }
    }
    InsuranceUI = () => {
        // console.log("Insurance agent:", this.state.showIA)
        if (this.state.showIA) {
            return (
                <div>
                    <Row>
                        <Col>
                            <h5>To check patient's claim request:</h5>
                            <form className="Form" onSubmit={this.onSubmit}>
                                <h6>Enter patient's account address:</h6>
                                <input type="text" onChange={event => this.setState({ addr: event.target.value })} />
                                <br /><br />
                                <Button size="sm" type="submit" >Submit</Button>
                            </form>
                        </Col>
                        <Col>
                            {this.showGrantOption()}
                        </Col>
                    </Row>

                    <hr></hr>
                    {this.showData()}
                </div>
            )
        }
    }
    render() {
        return (
            <div className="wrapper">
                {this.PatientUI()}
                {this.InsuranceUI()}
            </div>
        )
    }
}

export default Insurance