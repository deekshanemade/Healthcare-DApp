import React from 'react';
import './newObservation.css';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;

function NewObservation({ drizzle, drizzleState }) {
    const acc = drizzle.web3.eth.accounts.givenProvider.selectedAddress;
    
        return(
            <div className="new-observation">
                <p className="heading">Add New Observation</p>
                <ContractForm drizzle={drizzle} contract="Healthcare" method="addRecord" sendArgs={{ from: acc, gas: 600000 }}/>
            </div>
        )
}

export default NewObservation;