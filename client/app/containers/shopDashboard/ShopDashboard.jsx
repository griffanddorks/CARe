import React, { Component } from "react";
import AppointmentCalendar from "../../components/shopDashboard/AppointmentCalendar.jsx";
import NavigationBar from "../../containers/navBar/NavigationBar";
import ShopDashboardSettings from "../../components/shopDashboard/ShopDashboardSettings.jsx";
import axios from "axios";
import {
  Jumbotron,
  Grid,
  Row,
  Col,
  Modal,
  Button,
  Tab,
  Tabs
} from "react-bootstrap";
import MaintenanceJobs from "./MaintenanceJobs.jsx";

class ShopDashboard extends Component {
  /*
 * should have a button to configure a booking calendar
 *   should have the ability to set hours, and days that the shop is open
 *   should have a button that creates the calendar
 * when the calendar is created, should render a full-calendar that displays all the bookings
 */

  constructor(props) {
    super(props);
    this.state = {
      showCalModal: false,
      createCal: false,
      calendar: false,
      userId: 1,
      shopId: -1,
      calId: ""
    };
    this.handleBuildCalendar = this.handleBuildCalendar.bind(this);
  }

  componentDidMount() {
    console.log("dash has been mounted, requesting shopId");
    axios
      .get(`api/shopdashboard/getShopId`, {
        params: { userId: this.state.userId }
      })
      .then(res => {
        this.setState({ shopId: res.data.shopId }, () =>
          console.log(
            "shopId has been set, calendar has been created: ",
            !!this.props.calendar
          )
        );
      })
      .catch(err => console.log("could not get shopId", err));
  }

  handleBuildCalendar() {
    console.log("user requests to create calendar");
    axios
      .post(`api/shopdashboard/createCalendar`, {
        id: this.state.shopId
      })
      //You can create a new calendar for the current user by calling this endpoint.
      // If the user/resource has a connected Google account, then we will save the new calendar to Google.
      // To get the calendar synced you need to use the [PUT] /calendars/:id endpoint to set the provider_sync flag to true.
      .then(cal => {
        this.setState(
          {
            calendar: true,
            showCalModal: false,
            calId: cal.data.calId
          },
          () => console.log("received calId from back-end, and updated state")
        );
      })
      .then(res => {
        console.log(
          "received response from axios createCalendar, stored id in database and created timekit calendar"
        );
      })
      .catch(err => console.log("could not create cal", err));
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
          <Tabs defaultActiveKey={1} id="shop-dashboard-tab">
            <Tab eventKey={1} title="Calander">
              <Row>
                <Modal
                  show={this.state.showCalModal}
                  onHide={() =>
                    this.setState({
                      showCalModal: false
                    })}
                >
                  <Modal.Header closeButton>
                    <h2>Settings</h2>
                  </Modal.Header>
                  <Modal.Body>
                    <ShopDashboardSettings
                      handleCalCreation={this.handleCalCreation}
                      handleBuildCalendar={this.handleBuildCalendar}
                    />
                  </Modal.Body>
                </Modal>
              </Row>

              <Row>
                <Col>
                  {!!this.state.calendar ? (
                    <AppointmentCalendar {...this.props} {...this.state} />
                  ) : (
                    <Button
                      onClick={() => this.setState({ showCalModal: true })}
                    >
                      Create Booking Calendar
                    </Button>
                  )}
                </Col>
              </Row>
            </Tab>
            <Tab eventKey={2} title="Maintenance Jobs">
              <MaintenanceJobs />
            </Tab>
          </Tabs>
        </Grid>
      </div>
    );
  }
}

export default ShopDashboard;
