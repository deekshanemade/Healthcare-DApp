import React from 'react'

function history() {
    const medicalHistory=[{Reason:"a",Description:"a"},{Reason:"b",Description:"b"},{Reason:"c",Description:"c"}]
    return (
        <div className="history-wrapper">
            
                {medicalHistory.map((value,index)=>{
                    return  <div key={index} className="history">
                <p>Reason:{value.Reason}</p> 
                <p>Description:{value.Description}</p>
                        </div>
                })}
                
            
        </div>
    )
}

export default history
