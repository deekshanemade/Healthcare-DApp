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
function medical_details(props){
    const location = useLocation();
    console.log(location.state.obj)
    const currentRecord = location.state.obj;
    const {drizzle,drizzleState}=props;
    const docProps = {
        drizzle:drizzle,key:currentRecord.key
    }

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
                        <p>Key: <p className="medical-data">{currentRecord.key}</p> </p>
                    </div>
                </div>
                <div className="reports">
                    <div className = "left-part">
                        <p>Reports and Prescription</p>
                        {currentRecord.docs.map((value, index) => {
                                        const url = "https://ipfs.infura.io/ipfs/" + value;
                                        return <><a href={url} target="_blank">Document {index + 1}</a><br /></>
                        })}
                    </div>
                    <div className = "right-part">
                        <p>Bills</p>
                        {currentRecord.bills.map((value, index) => {
                                        const url = "https://ipfs.infura.io/ipfs/" + value;
                                        return <><a href={url} target="_blank">Bill {index + 1}</a><br /></>
                        })}
                    </div>
                </div>
                <br />
                {!currentRecord.isPatient && <UploadDoc data={docProps} ></UploadDoc>}
            </div>
        </>
    );
}
// }

// ReactDOM.render(medicalDetails, document.getElementById('root'));

export default medical_details;