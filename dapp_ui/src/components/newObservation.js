import React from 'react';
import './newObservation.css';
import { Row, Col, Button } from 'react-bootstrap';

const { create } = require('ipfs-http-client')
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class NewObservation extends React.Component {
  state = {
    selectedFile: null,
    buffer: null,
    hash: '',
    url: '',
    fileUploaded:false
  }

  // On file select (from the pop up)
  onFileChange = event => {
    event.preventDefault()
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log(this.state.buffer)
    }

  };

  // On file upload (click the upload button)
  onFileUpload = (event) => {
    event.preventDefault()
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile, ipfs);

    const ipfsUpload = async () => {
      const result = await ipfs.add(this.state.buffer);
      this.setState({ hash: result.path });
      console.log(this.state.hash);
      this.setState({url: "https://ipfs.infura.io/ipfs/"+this.state.hash , fileUploaded: true})
    }
    ipfsUpload();

  }

  // File content to be displayed after
  // file upload is complete
  fileData = () => {

    if (this.state.selectedFile) {

      return (
        <div>
          <br />
          <h6>File Details:</h6>

          <p>File Name: {this.state.selectedFile.name}</p>


          <p>File Type: {this.state.selectedFile.type}</p>


          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <p>Choose before Pressing the Upload button</p>
        </div>
      );
    }
  }

  fileLink=()=>{
    if(this.state.fileUploaded){
      return(
        <a show={this.state.fileUploaded} href={this.state.url} target="_blank">Click to open file</a>
      )
    }
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            <h5>To upload Medical Documents:</h5>
            <div>
              <input type="file" onChange={this.onFileChange} />
              <Button size="sm" onClick={this.onFileUpload}>Upload</Button>
            </div>
          </Col>
          <Col>
            <h5>To upload Medical Bills:</h5>
            <div>
              <input type="file" onChange={this.onFileChange} />
              <Button size="sm" onClick={this.onFileUpload}>Upload</Button>
            </div>
          </Col>
        </Row>
        {this.fileData()} {/*optional to diplay info of file being uploaded*/}
        {this.fileLink()} {/*hashes can be converted to links which open files in new tab*/}
      </>
    );
  }
}

export default NewObservation;