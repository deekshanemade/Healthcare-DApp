import React from 'react'
import './history.css';

function history() {
    const medicalHistory=[{Reason:"a",Description:"a"},{Reason:"b",Description:"b"},{Reason:"c",Description:"c"}]
    return (
        <div className="history-wrapper">
                {medicalHistory.map((value,index)=>{
                    return  <div key={index} className="history">
                        <img src="../assets/doc-icon.svg" className="document-image"></img>
                <p>Reason: <p className="medical-data">{value.Reason}</p> </p>
                <p>Description: <p className="medical-data">{value.Description}</p> </p>
                        </div>
                })}
                
            
        </div>
    )
}

export default history
