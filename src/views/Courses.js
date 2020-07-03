import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody ,Button } from "shards-react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from 'react-router-dom';
import PageTitle from "../components/common/PageTitle";
import NavbarSearch from "../components/layout/MainNavbar/NavbarSearch.js";

class courses extends Component {
  state = {
    courses: [],
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
    fetch("https://www.smart-investment.club/ercapi/api/courses", {
      method: "GET",
      headers: {
        "Application-key": "a6cb5c9ce88b59ee360587f0459bcb37fe8895c9",
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNTkyNzQ2ODc4LCJleHAiOjE1OTI4MzMyNzh9.gWn90VVPV_tz_v0QQRPAVeNwZf1cB9xoPZrttyBOJH7n6tSW0Ik5S9_rlVYoEqemgcAiyF6qEaJVFgqHdJYPJA"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ courses: this.getNotificationData(data) });
        console.log(this.state.courses);
      });
  }

  getNotificationData = data =>
    (data.content || []).map(list => ({
     
      creationDateTime: list.creationDateTime,
      description: list.description,
      id: list.id,
      name: list.name,
      numParticipants: list.numParticipants
    }));

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="All Courses"
            subtitle="BCC CLASS"
            className="text-sm-left"
          />
          <Col lg="4" md="6" sm="9" className="col-lg mb-4">
            <NavbarSearch />
            <div>
        {this.getNewCourse()}
            <Button onClick={this.setRedirect} > Add New Course</Button>
            </div>
          </Col>
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">All Courses</h6>
              </CardHeader>

              <CardBody className="p-0 pb-3">
                <BootstrapTable
                  data={this.state.courses}
                  pagination
                  options={{ sizePerPage: 5 }}
                >
                  <TableHeaderColumn
                    isKey
                    dataField="creationDateTime"
                    // hidden={true}
                  >
                    creationDateTime
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="description" width="13%">
                    description
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="id">id</TableHeaderColumn>
                  <TableHeaderColumn dataField="name">name</TableHeaderColumn>
                  <TableHeaderColumn dataField="numParticipants">
                    numParticipants
                  </TableHeaderColumn>
                </BootstrapTable>
                ,
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default courses;
