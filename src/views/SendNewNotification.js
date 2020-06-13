import React,{Component} from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/send-new-notification/Editor";


class SendNewNotification extends Component   {

  

  // constructor(props) {
  //   super(props)
    
  // }

  
 




  render() {

    return(

  

  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Send New Sms" subtitle="SMS SERVICE" className="text-sm-left" />
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="9" md="12">
        <Editor />
      </Col>

     
    </Row>
  </Container>
    )
}

};

export default SendNewNotification;
