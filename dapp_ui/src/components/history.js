import React from 'react'
import './history.css';
import doc from '../assets/doc-icon.svg'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import NewObservation from './newObservation';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;



let showHistory = true;

function history({ drizzle, drizzleState }) {    
    const medicalHistory=[{Reason:"a",Description:"a"},{Reason:"b",Description:"b"},{Reason:"c",Description:"c"}]
    const history = useHistory();
    let sender = drizzle.web3.eth.accounts.givenProvider.selectedAddress;
    drizzle.contracts.Healthcare.methods.showRecord(1).call().then(res=>{
            console.log(res);
        })
    const handleEvent = () => history.push('/medical-details');
    if(showHistory){
    return (
        <>
        <div className="history-wrapper">
        {/* <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showRecord" methodArgs={[1, { from: sender }]} /> */}
                {medicalHistory.map((value,index)=>{
                    return  <div key={index} className="history" onClick={handleEvent}>
                        <img src={doc} className="document-image" alt=""/>
                        
                        <div class="medical-data-container">
                <p class="data-heading">Reason: <p className="medical-data">{value.Reason}</p> </p>
                <p>Description: <p className="medical-data">{value.Description}</p> </p>
                </div>
                        </div>
                })}
            
        </div>
                <NewObservation drizzle={drizzle} drizzleState={drizzleState}></NewObservation>
                </>
    )
            }
}


ReactDOM.render(history, document.getElementById('root'));

export default history
