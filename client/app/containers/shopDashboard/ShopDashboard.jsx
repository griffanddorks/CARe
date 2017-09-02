import React, { Component } from "react";
import AppointmentCalendar from "../../components/shopDashboard/AppointmentCalendar.jsx";
import NavigationBar from "../../containers/navBar/NavigationBar";
import ShopDashboardSettings from "../../components/shopDashboard/ShopDashboardSettings.jsx";
import { Jumbotron, Grid, Row, Col, Modal, Button } from "react-bootstrap";

class ShopDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleOpenModal() {
    this.setState({ show: true });
  }

  handleCloseModal() {
    this.setState({ show: false });
  }
  render() {
    return (
      <div className="container">
        <NavigationBar />
        <Grid fluid={true}>
          <Row>
            <h1 />{" "}
          </Row>
          <Row>
            <h1 />{" "}
          </Row>
          <Row>
            <h1 />{" "}
          </Row>
          <Row>
            <Col>
              <h1>I am the shopdashboard</h1>
            </Col>
          </Row>
          <Row>
            <Button onClick={() => this.setState({ show: true })}>Click</Button>
          </Row>
          <Row>
            <Modal
              show={this.state.show}
              onHide={() => this.setState({ show: false })}
            >
              <Modal.Header closeButton>
                <h2>Settings</h2>
              </Modal.Header>
              <Modal.Body>
                <ShopDashboardSettings />
              </Modal.Body>
              <Modal.Footer>
                <Button disabled>Click</Button>
              </Modal.Footer>
            </Modal>
          </Row>

          <Row>
            <Col>
              {"   "}
              <AppointmentCalendar />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ShopDashboard;
