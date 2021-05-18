import React from 'react'
import ReactDOM from 'react-dom';
import doc from '../assets/doc-icon.svg'
import NewObsv from './newObservation';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData } = newContextComponents;
import { useLocation } from "react-router-dom";
import UploadDoc from "./uploadDoc"
import './medical_detail.css'
// const currentRecord = {
//     reason: "Diabeties",
//     description: "adbkbuiwdergve"
// }
function medical_details(){
    const location = useLocation();
    console.log(location.state.obj)
    const currentRecord = location.state.obj;
    // const {drizzle,drizzleState}=props;

    // const { currentRecord } = props
    return (
        <>
            {/* <NewObsv drizzle={props.drizzle} drizzleState={props.drizzleState}></NewObsv> */}
            <div className="medical-details-wrapper">
                <div className="history">
                    <img src={doc} className="document-image" alt="" />

                    <div className="medical-data-container">
                        <p className="data-heading">Reason: <p className="medical-data">{currentRecord.Reason}</p> </p>
                        <p>Description: <p className="medical-data">{currentRecord.Description}</p> </p>
                    </div>
                </div>
                <div className="reports">
                    <div className = "left-part">
                        <p>Reports and Prescription</p>
                    </div>
                    <div className = "right-part">
                        <p>Bills</p>
                    </div>
                </div>
                <UploadDoc></UploadDoc>
            </div>
        </>
    );
}
// }

// ReactDOM.render(medicalDetails, document.getElementById('root'));

export default medical_details;