import React from 'react';
import Web3 from "web3";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './components/sign_in';
import Dashboard from './components/dashboard';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import Healthcare from './artifacts/Healthcare.json';

const drizzleOptions = {
    web3: {
        // customProvider: new Web3("ws://localhost:7545"),
        fallback:{
            type: 'ws',
            url: "ws://localhost:7545"
        }
      },
    contracts: [Healthcare]
};
// const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions);

const App = () => {
    return (
        <DrizzleContext.Provider drizzle={drizzle}>
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const { drizzle, drizzleState, initialized } = drizzleContext;

                    if (!initialized) {
                        return "Loading..."
                    }

                    return (     
                        //Router used to show content of a component                  
                        <Router>
                            <Switch>
                                <Route exact path='/' render={()=><SignIn drizzle={drizzle} drizzleState={drizzleState} />}></Route>
                                {/* <Route exact path='/sign_in' component={SignIn} drizzle={drizzle} drizzleState={drizzleState}></Route> */}
                                <Route exact path='/dashboard' render={()=><Dashboard drizzle={drizzle} drizzleState={drizzleState}/>}></Route>
                            </Switch>
                        </Router>
                    )
                }}
                </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
    );
};

export default App;
