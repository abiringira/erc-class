import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "shards-react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import NavbarSearch from "../components/layout/MainNavbar/NavbarSearch.js";
import Api from "../Api"

class courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      redirect: false
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  getNewCourse = () => {
    console.log("dfghsdjkghsg");
    if (this.state.redirect) {
      return <Redirect to="/new-course" />;
    }
  };

 async componentDidMount() {
    

    try {
     const data = await Api.courses();
      this.setState({ courses: this.getNotificationData(data) });
      
    } catch (error) {
      console.log(error.message);
    }
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
              <Button onClick={this.setRedirect}> Add New Course</Button>
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
