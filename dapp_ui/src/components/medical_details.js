import React from 'react'
import ReactDOM from 'react-dom';
import doc from '../assets/doc-icon.svg'

// function medicalDetails() {
const currentRecord = {
    reason:"Diabeties",
    description:"adbkbuiwdergve"
}
 const medical_details = () =>   
    (
        <div class="medical-details-wrapper">
            <div className="history">
                        <img src={doc} className="document-image" alt=""/>
                        
                <div class="medical-data-container">
                <p class="data-heading">Reason: <p className="medical-data">{currentRecord.reason}</p> </p>
                <p>Description: <p className="medical-data">{currentRecord.description}</p> </p>
                </div>
            </div>
            <div class="reports">
                
            </div>
        </div>
    );
// }

// ReactDOM.render(medicalDetails, document.getElementById('root'));

export default medical_details;