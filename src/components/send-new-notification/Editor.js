import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput, Button, FormTextarea } from "shards-react";
import Success from "../topup-message/Success";
import Error from "../topup-message/Error"
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipient: null,
      textMessage: null,
      code: null
    }

    this.quillRef = null;
    this.quillEditor = null;

  }


  // componentDidMount() {
  //   this.bindQuillRef();

  // }

  // componentDidUpdate() {
  //   this.bindQuillRef();
  // }

  onClose = (code) => {
    this.setState({ ['is' + code]: false })
  }

  // bindQuillRef = () => {
  //   if (this.quillEditor && typeof this.quillEditor.getEditor !== 'function')
  //     return null;
  //   this.quillRef = this.quillEditor.getEditor();
  // }

  handleChange = (event) => {

    this.setState({ recipient: event.target.value });

  }

  textAreaHandleChange = (event) => {

    this.setState({ textMessage: event.target.value });

  }

  // handleReactQuil = (message) => {
  //   this.setState({ message });
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    this.postMessage();
  }




  postMessage = () => {

    console.log(this.state.recipient.length)
    fetch('http://localhost:7778/v1/notification', {
      method: 'POST',
      body: JSON.stringify({
        message: this.state.textMessage === null ? null :
          this.state.recipient === null || this.state.recipient.length !== 12 ?
            null : this.state.textMessage ,
        type: 'SMS',
        recipients: [this.state.recipient]
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 76c274f6-948b-4b7a-b263-60114b227df4'
      }
    }
    ).then((response) => {

      console.log('Success:', response.status);
      if (response.status === 400)
        this.setState({ is400: true, code: 400 })
      else if (response.status === 200)
        this.setState({ is200: true, code: 200 })
    }
    )
  }



  render() {
    return (
      <Card small className="mb-3">
        <CardBody>
          {this.state['is' + this.state.code] && this.state.code === 200 ?
            <Success
              code={this.state.code}
              open={this.state['is' + this.state.code]}
              title='Success'
              message='Notification Successfully Sent'
              onClose={this.onClose} /> :
            <Error
              code={this.state.code}
              open={this.state['is' + this.state.code]}
              title={this.state.is400 ? 'Form input is Required' :
                'Internal Server Error'}
              message={this.state.is400 ? 'Please enter a text message or a well phone number format: 2507XXXXXXXX' :
                'An Internal Server Error Occured'}
              onClose={this.onClose} />
          }
          <Form onSubmit={this.handleSubmit} className="send-new-notification">
            <label htmlFor="feEmailAddress">Recipient Number :</label>
            <FormInput name="recipient" value={this.state.recipient} onChange={this.handleChange} size="lg" className="mb-3" placeholder="250782647985" />
            <label htmlFor="feEmailAddress">Message :</label>
            {/* <ReactQuill ref={(el) => {
              this.quillEditor = el
            }} className="send-new-notification__editor mb-1" /> */}
            <FormTextarea className="send-new-notification__editor mb-1" value={this.state.textMessage} onChange={this.textAreaHandleChange}></FormTextarea>
            <Button type="submit" >Send Notification</Button>
          </Form>
        </CardBody>

      </Card>

    )
  }
}

export default Editor;
