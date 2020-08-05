import React, { Component } from "react";
import ReactQuill from "react-quill";
import {
  Card,
  CardBody,
  Form,
  FormInput,
  Button,
  FormTextarea
} from "shards-react";
import Success from "../topup-message/Success";
import Error from "../topup-message/Error";
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      code: null
    };
    
    this.quillRef = null;
    this.quillEditor = null;
  }

  // componentDidMount() {
  //   this.bindQuillRef();

  // }

  // componentDidUpdate() {
  //   this.bindQuillRef();
  // }

  onClose = code => {
    this.setState({ ["is" + code]: false });
  };

  // bindQuillRef = () => {
  //   if (this.quillEditor && typeof this.quillEditor.getEditor !== 'function')
  //     return null;
  //   this.quillRef = this.quillEditor.getEditor();
  // }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  textAreaHandleChange = event => {
    this.setState({ description: event.target.value });
  };

  // handleReactQuil = (message) => {
  //   this.setState({ message });
  // }

  handleSubmit = event => {
    event.preventDefault();
    this.postMessage();
  };

  postMessage = () => {
    console.log(this.state.name.length);
    fetch("https://www.smart-investment.club/ercapi/api/courses", {
      method: "POST",
      headers: {
        "Application-key": "a6cb5c9ce88b59ee360587f0459bcb37fe8895c9",
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNTkyNzQ2ODc4LCJleHAiOjE1OTI4MzMyNzh9.gWn90VVPV_tz_v0QQRPAVeNwZf1cB9xoPZrttyBOJH7n6tSW0Ik5S9_rlVYoEqemgcAiyF6qEaJVFgqHdJYPJA"
      },

      body: JSON.stringify({
        description: this.state.description,

        name: [this.state.name]
      })
    }).then(response => {
      console.log("Success:", response.status);
      if (response.status === 400) this.setState({ is400: true, code: 400 });
      else if (response.status === 200)
        this.setState({ is200: true, code: 200 });
    });
  };

  render() {
    return (
      <Card small className="mb-3">
        <CardBody>
          {this.state["is" + this.state.code] && this.state.code === 200 ? (
            <Success
              code={this.state.code}
              open={this.state["is" + this.state.code]}
              title="Success"
              message="Notification Successfully Sent"
              onClose={this.onClose}
            />
          ) : (
            <Error
              code={this.state.code}
              open={this.state["is" + this.state.code]}
              title={
                this.state.is400
                  ? "Form input is Required"
                  : "Internal Server Error"
              }
              message={
                this.state.is400
                  ? "Please enter a text message or a well phone number format: 2507XXXXXXXX"
                  : "An Internal Server Error Occured"
              }
              onClose={this.onClose}
            />
          )}
          <Form onSubmit={this.handleSubmit} className="send-new-notification">
            <label htmlFor="feEmailAddress">Course Name :</label>
            <FormInput
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              size="lg"
              className="mb-3"
              placeholder="class 4"
            />
            <label htmlFor="feEmailAddress">Description :</label>
            {/* <ReactQuill ref={(el) => {
              this.quillEditor = el
            }} className="send-new-notification__editor mb-1" /> */}
            <FormTextarea
              className="send-new-notification__editor mb-1"
              value={this.state.description}
              onChange={this.textAreaHandleChange}
            ></FormTextarea>
            <Button type="submit">Add Course</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default Editor;
