import React from 'react'
import doc from '../assets/doc-icon.svg'
import { useHistory } from 'react-router-dom';

function Records(v) {
    const value = v.val;
    console.log(v)
    value["isPatient"] = v.isPatient;
    const history = useHistory();
    const handleEvent = (val) => {
        history.push({pathname:'/dashboard/medical-details',state:{obj:val}})
};
if(value){
  return (
      <div  onClick={()=>handleEvent(value)}>
  <img src={doc} className="document-image" alt=""/>
                                
  <div class="medical-data-container">
<p class="data-heading">Reason: <p className="medical-data">{value.Reason}</p> </p>
<p>Description: <p className="medical-data">{value.Description}</p> </p>
<p>Key: <p className="medical-data">{value.key}</p> </p>
</div>
</div>
)
  }
}

export default Records