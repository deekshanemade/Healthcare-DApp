import React from 'react'
import './history.css';
import doc from '../assets/doc-icon.svg'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import medical_details from './medical_details';

let showHistory = true;

function history() {    
    const medicalHistory=[{Reason:"a",Description:"a"},{Reason:"b",Description:"b"},{Reason:"c",Description:"c"}]
    const history = useHistory();
    const handleEvent = () => history.push('/medical-details');
    if(showHistory){
    return (
        <>
        <div className="history-wrapper">
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
                </>
    )
            }
}


ReactDOM.render(history, document.getElementById('root'));

export default history
