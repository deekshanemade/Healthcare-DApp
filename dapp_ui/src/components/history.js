import React, { useEffect } from 'react'
import './history.css';
import doc from '../assets/doc-icon.svg'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import NewObservation from './newObservation';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;
import Record from "./records"



let showHistory = true;

// function history({ drizzle, drizzleState }) {    
//     const medicalHistory=[{Reason:"a",Description:"a"},{Reason:"b",Description:"b"},{Reason:"c",Description:"c"}]
//     const history = useHistory();
//     let sender = drizzle.web3.eth.accounts.givenProvider.selectedAddress;
//     drizzle.contracts.Healthcare.methods.showRecord(1).call().then(res=>{
//             console.log(res);
//         })
//     const handleEvent = () => history.push('/medical-details');

// let showHistory = true;

// function History({ drizzle, drizzleState }) {   
class History extends React.Component{ 
        drizzle = this.props.drizzle;
        drizzleState = this.props.drizzleState;
        state = {medicalHistory:[]}
        // history = useHistory();
        componentDidMount() {
                const { drizzle, drizzleState } = this.props;
                const medicalHis=[]
                // const his = useHistory();
                // console.log('his: ', this.history);
    
    drizzle.contracts.Healthcare.methods.showPersonalInfo("0xAEBf3cc6bA53059082a75D538d08C5A8a80A67CF").call().then(res=>{
        
        console.log(res.TotalRecords)
        for(let i=1;i<=res.TotalRecords;i++){
                drizzle.contracts.Healthcare.methods.showRecord(i.toString()).call().then(record=>{
                        let temp = {
                                Reason:record.Reason,
                                Description:record.Description,
                                docs:record.MedicalDocs,
                                bills:record.Bills
                        }
            console.log(temp);
            medicalHis.push(temp)
            this.setState({ medicalHistory:medicalHis });
                })
        }

        
        })

        }
        render(){
                const medicalHistory = this.state.medicalHistory;
                const drizzle = this.drizzle;
                // const drizzleState = this.state.drizzleState;
                // const isLoaded = this.state.isDataLoaded;
        // if(isLoaded){
        return (
                <>
                <div className="history-wrapper">
                
                        {medicalHistory.map((value,index)=>{
                            return  <div key={index} className="history">
                                    <Record val={value}></Record>
                                    {/* <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showRecord" methodArgs={[index]} /> */}
                                {/* <img src={doc} className="document-image" alt=""/>
                                <div class="medical-data-container">
                        <p class="data-heading">Reason: <p className="medical-data">{value.Reason}</p> </p>
                        <p>Description: <p className="medical-data">{value.Description}</p> </p>
                        </div> */}
                                </div>
                        })}
                    
                </div>
                        <NewObservation drizzle={drizzle} ></NewObservation>
                        </>
            )   
                // } 
                }
}


ReactDOM.render(History, document.getElementById('root'));

export default History
