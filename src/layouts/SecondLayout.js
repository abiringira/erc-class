import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import MainSidebarUser from "../components/layout/MainSidebar/MainSidebarUser"
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainFooter from "../components/layout/MainFooter";

const SecondLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
     <MainSidebarUser/>
      <Col
        className="main-content p-0"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        {!noNavbar && <MainNavbar />}
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>
);

SecondLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

SecondLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default SecondLayout;
