import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
 
  
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

import Editor from "../components/send-new-notification/Editor";



const CreateNewCourse = () => (
 
   
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Add  Course"
          subtitle="Overview"
          className="text-sm-left"
        />
      </Row>

     

      <Row>
        <Col lg="8" className="mb-4">
         

          {/* Complete Form Example */}
          <Card small>
            <CardHeader className="border-bottom">
             
            </CardHeader>
            <Editor />
          </Card>
        </Col>

      
      </Row>
    </Container>
 
);

export default CreateNewCourse;
