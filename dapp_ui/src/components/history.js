import React, { useEffect } from 'react'
import './history.css';
import doc from '../assets/doc-icon.svg'
import ReactDOM from 'react-dom';
import { Button, Row, Col } from 'react-bootstrap'
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
        state = { medicalHistory:[], recs:0, isPatient:true, pid:null , reason:"", desc:"", showData:false,name:"",gender:"",age:"", did:null, permissionGivenTo:"" };

        
        // history = useHistory();
        componentDidMount() {
                const { drizzle, drizzleState } = this.props;
                const medicalHis=[]
                const acc = drizzle.web3.eth.accounts.givenProvider.selectedAddress;
        drizzle.contracts.Healthcare.methods.showAccInfo(acc).call().then(res=>{ 
                // console.log(res[2])
                if(res[2] == "Doctor") {
                this.setState({ isPatient:false,did:acc });
                }
                if(res[2] !== "Doctor"){
                        this.setState({ pid:acc });
                        drizzle.contracts.Healthcare.methods.checkAccess(acc).call().then(res=>{
                                {this.setState({ permissionGivenTo:res.toLowerCase() });}
                        })
                drizzle.contracts.Healthcare.methods.showPersonalInfo(acc).call().then(res=>{
        
                        console.log(res.TotalRecords)
                        const rec = res.TotalRecords;
                        this.setState({ recs:rec });
                        for(let i=1;i<=res.TotalRecords;i++){
                                drizzle.contracts.Healthcare.methods.showRecord(acc+"_"+i.toString()).call().then(record=>{
                                        let temp = {
                                                Reason:record.Reason,
                                                Description:record.Description,
                                                docs:record.MedicalDocs,
                                                bills:record.Bills,
                                                key:acc+"_"+i.toString()
                                        }
                            console.log(temp);
                            medicalHis.unshift(temp)
                            this.setState({ medicalHistory:medicalHis });
                                })
                        }
                
                        
                        })
                }
        })    

                // const his = useHistory();
                // console.log('his: ', this.history);
//     this.pid = "0x92C0750C30d829DE29Af2c63e88B3649d74ce44A";
    

        }

        render() {
                return (
                    <div className="wrapper">
                        {this.PatientUI()}
                        {this.DoctorUI()}
                    </div>
                )
        }

        showData = () => {
                const medicalHistory = this.state.medicalHistory;
                if(this.state.showData && this.state.permissionGivenTo == this.state.did){
                        if(this.state.recs==0){
                                return(
                                        <>
                                        <div className="personal-data">
                                                <p className="data">Name: {this.state.name}</p>
                                                <p className="data">Gender: {this.state.gender}</p>
                                                <p className="data">Age: {this.state.age}</p>
                                        </div>
                                        <div className="new-observation">
                                        <p className="heading">Add New Observation</p>
                                        {/* <ContractForm drizzle={drizzle} contract="Healthcare" method="addRecord" sendArgs={{ from: acc, gas: 600000 }}/> */}
                                        <form>
                                            <label>Reason: </label>
                                            <input type="text" onChange={event => this.setState({reason:event.target.value})} />
                                            <br></br>
                                            <label>Description: </label>
                                            <input type="text" onChange={event => this.setState({desc:event.target.value})} />
                                            <Button variant="primary" onClick={this.handleAdd}>Add Record</Button>
                                        </form>
                                    </div>
                                        <div>
                                                <p>No Records Present</p>
                                        </div>
                                        
                                    </>
                                )
                        }
                        else{
                return (
                
                <>
                <div className="personal-data">
                                                <p className="data">Name: {this.state.name}</p>
                                                <p className="data">Gender: {this.state.gender}</p>
                                                <p className="data">Age: {this.state.age}</p>
                                        </div>
                                        <div className="new-observation">
                                        <p className="heading">Add New Observation</p>
                                        {/* <ContractForm drizzle={drizzle} contract="Healthcare" method="addRecord" sendArgs={{ from: acc, gas: 600000 }}/> */}
                                        <form>
                                            <label>Reason: </label>
                                            <input type="text" onChange={event => this.setState({reason:event.target.value})} />
                                            <br></br>
                                            <label>Description: </label>
                                            <input type="text" onChange={event => this.setState({desc:event.target.value})} />
                                            <Button variant="primary" onClick={this.handleAdd}>Add Record</Button>
                                        </form>
                                    </div>
                <div className="history-wrapper">
                
                        {medicalHistory.map((value,index)=>{
                            return  <div key={index} className="history">
                                    <Record val={value} isPatient={this.state.isPatient}></Record>
                                </div>
                        })}
                    
                </div>
                </>
                )
                        }
                }else if(this.state.showData && this.state.permissionGivenTo !== this.state.did){
                        return(
                                <div>
                                        <p>You dont have permission to access data.</p>
                                </div>
                        )
                }
        }
        handleAdd = ()=>{
                const key = this.state.pid.toLowerCase()+"_"+(parseInt(this.state.recs)+1).toString();
                const pid = this.state.pid.toLowerCase();
                const medicalHis=this.state.medicalHistory;
                let temp = {
                        Reason:this.state.reason,
                        Description:this.state.desc,
                        docs:[],
                        bills:[],
                        key:pid+"_"+(parseInt(this.state.recs)+1).toString()
                }
    console.log(temp);
    medicalHis.unshift(temp)
    this.setState({ medicalHistory:medicalHis });
                this.drizzle.contracts.Healthcare.methods.addRecord(key,this.state.pid,this.state.reason,this.state.desc).send();
        }

        fetchData = () =>{
                const pid = this.state.pid.toLowerCase();
                const medicalHis=[];
                this.setState({showData:true})
                this.drizzle.contracts.Healthcare.methods.checkAccess(pid).call().then(res=>{
                        this.setState({ permissionGivenTo:res.toLowerCase() });
                })
                this.drizzle.contracts.Healthcare.methods.showPersonalInfo(pid).call().then(res=>{
                        this.setState({recs:res.TotalRecords,name:res.FirstName+" "+res.LastName,gender:res.Gender,age:res.Age})
                for(let i=1;i<=res.TotalRecords;i++){
                        this.drizzle.contracts.Healthcare.methods.showRecord(pid+"_"+i.toString()).call().then(record=>{
                                let temp = {
                                        Reason:record.Reason,
                                        Description:record.Description,
                                        docs:record.MedicalDocs,
                                        bills:record.Bills,
                                        key:pid+"_"+i.toString()
                                }
                    console.log(temp);
                    medicalHis.unshift(temp)
                    this.setState({ medicalHistory:medicalHis });
                        })
                }
        })
        }

        onSubmit = (event)=>{
                event.preventDefault();

                this.fetchData();
        }

        DoctorUI = () => {
                if(!this.state.isPatient){
                return (
                <div>
                    <Row>
                        <Col>
                            <form className="Form" onSubmit={this.onSubmit}>
                                <h6>Enter patient's account address:</h6>
                                <input type="text" onChange={event => this.setState({ pid: event.target.value })} />
                                <br /><br />
                                <Button size="sm" type="submit">Submit</Button>
                            </form>
                        </Col>
                    </Row>

                    <hr></hr>
                    {this.showData()}
                </div>
            )
                }
        }

        giveAccess = () => {
                this.drizzle.contracts.Healthcare.methods.giveAccess(this.state.did,this.state.pid).send().then(()=>{
                        this.setState({ permissionGivenTo:this.state.did })
                });
        }
        
        retriveAccess = () => {
                this.drizzle.contracts.Healthcare.methods.retrieveAccess(this.state.pid).send().then(()=>{
                        this.setState({ permissionGivenTo:"" })
                });
        }

        PatientUI = () => {
                const medicalHistory = this.state.medicalHistory;
                const drizzle = this.drizzle;
                const rec = this.state.totalRecs;
                const pid = this.state.pid;
                // const drizzleState = this.state.drizzleState;
                // const isLoaded = this.state.isDataLoaded;
        // if(isLoaded){
        if(this.state.isPatient){
                if(this.state.recs==0){
                        return(
                                <div>
                                        <div className="give-retrive-access">
                                                <div className="access-block">
                                                        <p>Enter Doctor id to give access</p>
                                                        <input type="text" onChange={event => this.setState({ did: event.target.value })} />
                                                        <Button size="sm" type="submit" className="give-access-button" onClick={this.giveAccess}>Give Access</Button>
                                                </div>
                                                <div className="access-block">
                                                        <p>Permission given to: {this.state.permissionGivenTo}</p>
                                                        <Button size="sm" type="submit" onClick={this.retriveAccess}>Retrive Access</Button>
                                                </div>
                                        </div>
                
                                        <p className="give-retrive-access">No Records Present</p>
                                </div>
                        )
                }
                else{
        return (
                
                <>
                <div className="give-retrive-access">
                        <div className="access-block">
                                <p>Enter Doctor id to give access</p>
                                <input type="text" onChange={event => this.setState({ did: event.target.value })} />
                                <Button size="sm" type="submit" className="give-access-button" onClick={this.giveAccess}>Give Access</Button>
                        </div>
                        <div className="access-block">
                                <p>Permission given to: {this.state.permissionGivenTo}</p>
                                <Button size="sm" type="submit" onClick={this.retriveAccess}>Retrive Access</Button>
                        </div>
                </div>
                <div className="history-wrapper">
                
                        {medicalHistory.map((value,index)=>{
                            return  <div key={index} className="history">
                                    <Record val={value} isPatient={this.state.isPatient}></Record>
                                    {/* <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showRecord" methodArgs={[index]} /> */}
                                {/* <img src={doc} className="document-image" alt=""/>
                                <div class="medical-data-container">
                        <p class="data-heading">Reason: <p className="medical-data">{value.Reason}</p> </p>
                        <p>Description: <p className="medical-data">{value.Description}</p> </p>
                        </div> */}
                                </div>
                        })}
                    
                </div>
                        {/* <NewObservation drizzle={drizzle} totalRec={rec} pid={pid}></NewObservation> */}
                        </>
            )   
                } 
                }
        }
}


ReactDOM.render(History, document.getElementById('root'));

export default History
