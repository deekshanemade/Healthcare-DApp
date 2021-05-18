import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './Navbar';
import History from './history';
import Profile from './profile';
import SignIn from './sign_in';
import { useHistory } from 'react-router-dom';
import Medical_details from './medical_details';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../components/dashboard.css';

function dashboard(props) {
    const { drizzle, drizzleState } = props;
    const history = useHistory();
    // const medicalHistory=[]
    // const handleEvent = () => history.push('/dashboard/medical-details');
    // drizzle.contracts.Healthcare.methods.showPersonalInfo("0xAEBf3cc6bA53059082a75D538d08C5A8a80A67CF").call().then(res=>{
        
    //     console.log(res.TotalRecords)
    //     for(let i=1;i<=res.TotalRecords;i++){
    //             drizzle.contracts.Healthcare.methods.showRecord(i.toString()).call().then(record=>{
    //                     let temp = {
    //                             Reason:record.Reason,
    //                             Description:record.Description
    //                     }
    //         console.log(temp);
    //         medicalHistory.push(temp)
    //     })
    //     }
    // },err=>{
    //     console.log(err)
    // })
    return (
        <>
            <Router>
                <Route exact path='/' render={() => <SignIn drizzle={drizzle} drizzleState={drizzleState} />}></Route>
                <Row>
                    <Col lg={3} className="sidenav">
                        <Navbar drizzle={drizzle} drizzleState={drizzleState}/>
                    </Col>
                    <Col>
                        <div className="dash">Dashboard</div>
                        <Switch>
                            <Route exact path='/dashboard' render={() => <Profile drizzle={drizzle} drizzleState={drizzleState} />} />
                            <Route path='/dashboard/history' render={() => <History drizzle={drizzle} drizzleState={drizzleState} />} />
                            <Route path='/dashboard/medical-details' render={() => <Medical_details />} />
                        </Switch>
                    </Col>
                </Row>

            </Router>
        </>
    )
}

export default dashboard
