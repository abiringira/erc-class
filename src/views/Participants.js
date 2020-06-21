import React,{Component} from "react";
import { Redirect } from 'react-router-dom';

import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


import PageTitle from "../components/common/PageTitle";
import Editor from "../components/send-new-notification/Editor";


class SendNewNotification extends Component   {

  
  state = {
    participants: [],
    redirect : false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  getNewCourse = () => {
    console.log("dfghsdjkghsg")
    if (this.state.redirect) {
      return <Redirect to='/new-course' />
    }
 
    }

  componentDidMount() {
    fetch("https://www.smart-investment.club/ercapi/api/courses/"+ 4  +"/participants", {
      method: "GET",
      headers: {
        "Application-key": "a6cb5c9ce88b59ee360587f0459bcb37fe8895c9",
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNTkyNzQ2ODc4LCJleHAiOjE1OTI4MzMyNzh9.gWn90VVPV_tz_v0QQRPAVeNwZf1cB9xoPZrttyBOJH7n6tSW0Ik5S9_rlVYoEqemgcAiyF6qEaJVFgqHdJYPJA"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ participants: this.getNotificationData(data) });
        console.log(this.state.participants);
      });
  }

  

  getNotificationData = data =>
    (data.content || []).map(list => ({
     
      code: list.code,
      email: list.email,
      mobile: list.mobile,
      name: list.name,
      role: list.role,
      activated : list.activated
    }));
   

  
 




  render() {

    return(

  

  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="All Participants" subtitle="BCC CLASS" className="text-sm-left" />
    </Row>
    <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">All Participants</h6>
              </CardHeader>

              <CardBody className="p-0 pb-3">
                <BootstrapTable
                  data={this.state.participants}
                  pagination
                  options={{ sizePerPage: 5 }}
                >
                  <TableHeaderColumn
                    isKey
                    dataField="code"
                    // hidden={true}
                  >
                    Code
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="email" width="13%">
                    Email
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="mobile">Mobile</TableHeaderColumn>
                  <TableHeaderColumn dataField="name">name</TableHeaderColumn>
                  <TableHeaderColumn dataField="role">
                    Role
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="activated">
                    Activated
                  </TableHeaderColumn>
                </BootstrapTable>
                ,
              </CardBody>
            </Card>
          </Col>
        </Row>
  </Container>
    )
}

};

export default SendNewNotification;
