import React, { Component } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { newContextComponents } from "@drizzle/react-components";
import './insurance.css'
const { ContractData, ContractForm } = newContextComponents;
export class Insurance extends Component {

    state = {
        addr: this.props.drizzle.web3.eth.accounts.givenProvider.selectedAddress,
        key: '',
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
        bills: []
    }
    onSubmit = (event) => {
        event.preventDefault();
        console.log("Sender address: ", this.state.addr,"Metamask address: ", this.state.sender, this.state.show)
        this.props.drizzle.contracts.Healthcare.methods.showPersonalInfo(this.state.addr).call().then(result => {
            this.setState({ fName: result[0], mName: result[1], lName: result[2], gender: result[3], age: result[4], show: true });
            this.showData()
        })
        this.props.drizzle.contracts.Healthcare.methods.showRecord(this.state.key).call().then(res => {
            this.setState({ reason: res[0], description: res[1], medicalDocs: res[2], bills: res[3] });
        })
    }
    showData = () => {
        console.log(this.state.show)
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

    render() {
        return (
            <div className="wrapper">
                <form className="Form" onSubmit={this.onSubmit}>
                    <h6>Enter patient's account address:</h6>
                    <input type="text" onChange={event => this.setState({ addr: event.target.value })} />
                    <br /><br />
                    <h6>Enter patient's given key for insurance claim:</h6>
                    <input type="text" onChange={event => this.setState({ key: event.target.value })} />
                    <br /><br />
                    <Button size="sm" type="submit" >Submit</Button>
                </form>
                <hr></hr>
                {this.showData()}
            </div>
        )
    }
}

export default Insurance