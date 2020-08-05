import React,{Component} from "react";
import { Redirect } from 'react-router-dom';

import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


import PageTitle from "../components/common/PageTitle";
import Editor from "../components/send-new-notification/Editor";
import Api from "../Api";


class SendNewNotification extends Component   {

  
  state = {
    users: [],
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

  async componentDidMount() {
    try {
      const data = await Api.users();
      console.log(data)
      this.setState({users : this.getNotificationData(data)})
      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  

  getNotificationData = data =>
    (data.content || []).map(list => ({
     
      code: list.code,
      email: list.email,
      mobile: list.mobile,
      name: list.name
    }));
   

  
 




  render() {

    return(

  

  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="All users" subtitle="BCC CLASS" className="text-sm-left" />
    </Row>
    <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">All users</h6>
              </CardHeader>

              <CardBody className="p-0 pb-3">
                <BootstrapTable
                  data={this.state.users}
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
