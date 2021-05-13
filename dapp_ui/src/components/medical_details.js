import React from 'react'
import ReactDOM from 'react-dom';
import doc from '../assets/doc-icon.svg'
import NewObsv from './newObservation';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData } = newContextComponents;
const currentRecord = {
    reason: "Diabeties",
    description: "adbkbuiwdergve"
}
const medical_details = (props) => {
    const {drizzle,drizzleState}=props;
    return (
        <>
            <NewObsv drizzle={props.drizzle} drizzleState={props.drizzleState}></NewObsv>
            <div className="medical-details-wrapper">
                <div className="history">
                    <img src={doc} className="document-image" alt="" />

                    <div className="medical-data-container">
                        <p className="data-heading">Reason: <p className="medical-data">{currentRecord.reason}</p> </p>
                        <p>Description: <p className="medical-data">{currentRecord.description}</p> </p>
                    </div>
                </div>
                <div className="reports">
                <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showRecord" methodArgs={["id"]} />
                </div>
            </div>
        </>
    );
}
// }

// ReactDOM.render(medicalDetails, document.getElementById('root'));

export default medical_details;