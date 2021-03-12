import React from 'react'
import './history.css';
import doc from '../assets/doc-icon.svg'

function history() {    
    const medicalHistory=[{Reason:"a",Description:"a"},{Reason:"b",Description:"b"},{Reason:"c",Description:"c"}]
    return (
        <div className="history-wrapper">
                {medicalHistory.map((value,index)=>{
                    return  <div key={index} className="history">
                        <img src={doc} className="document-image"/>
                        
                        <div class="medical-data-container">
                <p class="data-heading">Reason: <p className="medical-data">{value.Reason}</p> </p>
                <p>Description: <p className="medical-data">{value.Description}</p> </p>
                </div>
                        </div>
                })}
                
            
        </div>
    )
}

export default history
