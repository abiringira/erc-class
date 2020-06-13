import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput, Button } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipient: '',
      message: ''
    }

  }

  handleChange = (event) => {

    this.setState({ recipient: event.target.value });

  }

  handleReactQuil = (message) => {
    this.setState({ message });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.postMessage();
    alert('Notification sent to the recipient No: ' + this.state.recipient + this.state.message);

  }




  postMessage = () => {
    fetch('http://localhost:7778/v1/notification', {
        method : 'POST',
        body: JSON.stringify({
        message: this.state.message.replace(/[<p> </p>]/g,' '),
        type: 'SMS',
        recipients: [this.state.recipient]
    }), 
      headers: {
        'Content-Type': 'application/json',
      'Authorization': 'Bearer 76c274f6-948b-4b7a-b263-60114b227df4'
    }
  }
    )
  }





  render() {

    return (


      <Card small className="mb-3">
        <CardBody>
          <Form onSubmit={this.handleSubmit} className="send-new-notification">
            <label htmlFor="feEmailAddress">Recipient Number :</label>
            <FormInput name="recipient" value={this.state.recipient} onChange={this.handleChange} size="lg" className="mb-3" placeholder="250782647985" />
            <label htmlFor="feEmailAddress">Message :</label>
            <ReactQuill value={this.state.message} className="send-new-notification__editor mb-1" onChange={this.handleReactQuil} />
            <Button type="submit" >Send Notification</Button>
          </Form>
        </CardBody>

      </Card>

    )
  }
}

export default Editor;
