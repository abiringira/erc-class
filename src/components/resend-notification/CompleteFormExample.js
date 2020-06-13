import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,

  Button
} from "shards-react";

import Error from "../topup-message/Error";
import Success from "../topup-message/Success";


class CompleteFormExample extends Component {


  constructor(props) {
    super(props);
    this.state = {
      notifId: '',
      code: null,

    }
  }

  handleChange = (event) => {
    this.setState({ notifId: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.putMessage(this.state.notifId);

  }

  onClose = (code) => {
    this.setState({ ['is' + code]: false })
  }

  putMessage = (notifId) => {
    fetch('http://localhost:7778/v1/notification/' + notifId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 76c274f6-948b-4b7a-b263-60114b227df4'
      }

    }).then((response) => {

      console.log('Success:', response.status);
      if (response.status === 401)
        this.setState({ is401: true, code: 401 })
      else if (response.status === 200)
        this.setState({ is200: true, code: 200 })
      else if (response.status === 400)
        this.setState({ is400: true, code: 400 })
      else if (response.status === 404)
        this.setState({ is404: true, code: 404 })
    }
    )
  }

  render() {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">

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
              title={this.state.is401 ? 'Forbidden' :
                this.state.is400 ? 'Not Found' :
                this.state.is404 ? 'Notification ID is Required' :
                  'Internal Server Error'}
              message={this.state.is401 ? 'You can not resend a sent message' :
                this.state.is400 ? 'Notification Id not Found' :
                this.state.is404 ? 'Please enter a Notification Id' :
                  'An Internal Server Error Occured'}
              onClose={this.onClose} />
          }
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <label htmlFor="feInputAddress">Notification_Id :</label>
                  <FormInput value={this.state.notifId} id="feInputAddress" placeholder="34285239523" onChange={this.handleChange} />
                </FormGroup>

                <Button type="submit">Resend Notification</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

export default CompleteFormExample;
