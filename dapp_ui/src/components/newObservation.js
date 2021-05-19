import React from 'react';
import './newObservation.css';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;
import Button from 'react-bootstrap/Button';

function NewObservation( d ) {
    console.log('d: ', d);
    var reason = null;
    var desc = null;
    const pid = d.pid;
    const recs = d.totalRec;
    const drizzle = d.drizzle;
    const handleChange = (event)=>{
        reason = event.target.value;
    }
    const handleDesc = (event)=>{
        desc = event.target.value;
    }

    const handleAdd = ()=>{
        const key = pid+"_"+(recs+1).toString();
        drizzle.contracts.Healthcare.methods.addRecord(key,pid,reason,desc).send();
    }
    console.log('drizzle: ', drizzle);
    const acc = drizzle.web3.eth.accounts.givenProvider.selectedAddress;    
        return(
            <div className="new-observation">
                <p className="heading">Add New Observation</p>
                {/* <ContractForm drizzle={drizzle} contract="Healthcare" method="addRecord" sendArgs={{ from: acc, gas: 600000 }}/> */}
                <form>
                    <label>Reason: </label>
                    <input type="text" value={reason} onChange={handleChange} />
                    <br></br>
                    <label>Description: </label>
                    <input type="text" value={desc} onChange={handleDesc} />
                    <Button variant="primary" onClick={handleAdd}>Add Record</Button>
                </form>
            </div>
        )
}

export default NewObservation;