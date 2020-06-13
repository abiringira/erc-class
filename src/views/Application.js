import React,{Component} from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import PageTitle from "../components/common/PageTitle";




class  Notifications extends Component {

  state = {
    notifications: []
  }


  componentDidMount() {
    fetch('http://localhost:7778/v1/application',{ 
      method: 'GET',
      headers: {  
      'Authorization': 'Bearer f0e739a8-5a7d-4d5b-8775-4dc20db592f3',
      //  IKOFI KEY : '76c274f6-948b-4b7a-b263-60114b227df4'
      // IB KEY : '1168367d-473c-46b3-b975-e3685ce40a34'
      //IGURIZE KEY: 'f0e739a8-5a7d-4d5b-8775-4dc20db592f3'
    }})
    .then(res => res.json())
    .then((data) => {
      this.setState({ notifications:  this.getNotificationData(data) })
      console.log(this.state.notifications);
     
    }) 
  
  }
   
  

  getNotificationData = (data) => 
  ( data ||[]).map((list) => ({ 
    id: list._id, 
    app: list.name,
    senderId: list.senderId,
    registrationTime: list.createdAt,
     
  }))
   


  render() {

  return(

 

  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="All Applications" subtitle="SMS SERVICE" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Applications</h6>
          </CardHeader>
          
          <CardBody className="p-0 pb-3">
 
           
          <BootstrapTable  data={this.state.notifications} key={this.state.notifications._id} isKey={true} pagination options ={{sizePerPage: 5}}>
      <TableHeaderColumn isKey dataField='id' hidden={true} >Application ID</TableHeaderColumn>
      <TableHeaderColumn dataField='app'>App</TableHeaderColumn>
      <TableHeaderColumn dataField='senderId' >Sender id</TableHeaderColumn>
      <TableHeaderColumn dataField='registrationTime'>Registration Time</TableHeaderColumn>

  
  </BootstrapTable>,
     
          
          </CardBody>
          
             
          
        </Card>
        
  


      </Col>
    </Row>
  

  </Container>
 )
}
 } ;

export default Notifications;
