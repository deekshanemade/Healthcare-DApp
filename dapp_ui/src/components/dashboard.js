import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
function dashboard() {
    return (
        <>
        <Router>
            <Row>
                <Col xs={3}>
                    <Navbar />
                </Col>
                <Col>
                    <Link to="/nav"> nav</Link>
                    <Switch>
                        <Route path='/' exact />
                        <Route path='/nav' exact component={Navbar} />
                    </Switch></Col>
            </Row>
        </Router>
        </>
    )
}

export default dashboard
