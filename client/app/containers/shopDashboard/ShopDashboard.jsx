import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarTab from "../../components/shopDashboard/CalendarTab";
import SettingsTab from "../../components/shopDashboard/SettingsTab";
import NavigationBar from "../../containers/navBar/NavigationBar";
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
import MaintenanceJobs from "../../components/shopDashboard/MaintenanceJobs.jsx";

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.currentUser
  };
}

class ShopDashboard extends Component {
  /*
 * should have a button to configure a booking calendar
 * should have the ability to set hours, and days that the shop is open
 * should have a button that creates the calendar
 * when the calendar is created, should render a full-calendar that displays all the bookings
 */

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      showCalModal: false,
      createCal: false,
      hasCalendar: false,
      userId: 1,
      shopId: -1,
      calId: "",
      shopName: "",
      shopEmail: "",
      shopDescription: "",
      week: ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"],
      daysOfService: [],
      currentAppointments: []
    };

    this.handleHoursOfOpChange = this.handleHoursOfOpChange.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleDaysOfServiceChange = this.handleDaysOfServiceChange.bind(this);
    this.handleSetHours = this.handleSetHours.bind(this);
    this.handleBuildCalendar = this.handleBuildCalendar.bind(this);
    this.handleGetCarInfo = this.handleGetCarInfo.bind(this);
    this.grabCalendarInfo = this.grabCalendarInfo.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.currentUser.id) {
      this.setState(
        {
          shopEmail: nextprops.currentUser.email,
          shopId: nextprops.currentUser.shopId
        },
        () => this.grabCalendarInfo(nextprops)
      );
    }
  }
  componentDidMount() {
    if (this.props.currentUser.id) {
      this.setState(
        {
          shopEmail: this.props.currentUser.email,
          shopId: this.props.currentUser.shopId
        },
        () => this.grabCalendarInfo(this.props)
      );
    }
  }

  /**
   * check if the shop-client has already built a calendar
   * @param {* shopEmail, shopId } props
   */
  grabCalendarInfo(props) {
    //being passed the shop's ID, pass the shop ID to the server
    //the server checks the database for calendar ID
    axios
      .get(`api/shopdashboard/getCalId`, {
        params: { shopId: props.currentUser.shopId }
      })
      .then(res => {
        //calID will be set to null if the calendar hasn't been built
        this.setState({ calId: res.data.calId });
      })
      .then(() => {
        //flag to render the calendar if the calendar has been built
        if (!!this.state.calId) {
          this.setState({ hasCalendar: true });
        }
      })
      .catch(err => console.log("could not get shopId"));
  }

  handleGetCarInfo(appointments) {
    this.setState({ currentAppointments: appointments });
  }

  /**
   * handler for shopDashboard settings component
   * @param {*} day
   * @param {*} start // the client's desired start time for that day
   * @param {*} end  // the client's desired end time for that day
   */
  handleHoursOfOpChange(day, start, end) {
    let { daysOfService } = this.state;

    for (let i = 0; i < daysOfService.length; i++) {
      if (day === daysOfService[i].value) {
        daysOfService[i].start = start;
        daysOfService[i].end = end;
      }
    }

    this.setState({ daysOfService: daysOfService });
  }

  /**
   * handler for shopDashboard settings component
   * sends a put request to the server to update our database
   */
  handleSetHours() {
    axios
      .put("api/shopdashboard/updateHours", {
        id: this.props.currentUser.shopId,
        daysOfService: this.state.daysOfService
      })
      .then(() => alert("hours have been set"))
      .catch(err => alert("could not set hours"));
  }

  handleAttributeChange(e, attribute) {
    e.preventDefault();
    this.setState({ [attribute]: e.target.value });
  }

  /**
   * handler for shopDashboard settings component
   * @param {*} e  //event
   */
  handleDaysOfServiceChange(e) {
    const day = { start: 32400, end: 64800 }; //9 to 6 work day in UTC
    day.value = e.target.value;
    let dOS = this.state.daysOfService;

    //if the day of service has already been specified,
    // user intends to remove day
    if (dOS.some((x, i) => day.value === x)) {
      dOS.splice(dOS.indexOf(day), 1);
    } else {
      // user intends to add day of service
      let { week } = this.state;
      let idx = week.indexOf(day);

      //insert the day in its proper order in the week
      for (let i = 0; i < dOS.length; i++) {
        let curr = dOS[i];
        if (week.indexOf(curr) > idx) {
          dOS.splice(i, 0, day);
          this.setState({ daysOfService: dOS });
          return;
        }
      }
      dOS.push(day);
    }
    this.setState({ daysOfService: dOS });
  }

  /**
   * populate the shop-clients dashboard with a calendar
   * if the client their configures their days of service
   * and hours with this handler
   */
  handleBuildCalendar() {
    let {
      firstName,
      lastName,
      shopId,
      shopName,
      shopDescription,
      calId
    } = this.state;

    //request to post to our database and timekit
    axios
      .post(`api/shopdashboard/createCalendar`, {
        id: shopId,
        firstName: firstName,
        lastName: lastName,
        shopName: shopName,
        shopDescription: shopDescription,
        shopEmail: this.props.currentUser.email,
        calId: calId
      })
      .then(res => {
        this.setState({
          hasCalendar: true,
          showCalModal: false,
          calId: res.data.calId
        });
      })
      .then(() => console.log("created tk calendar & stored id in db"))
      .catch(err => console.log("could not create cal", err.data.errors));
  }

  render() {
    return (
      <div className="container">
        <NavigationBar />
        <Grid fluid={true} className="bump">
          <Row>
            <Col>
              <h1>I am the shopdashboard</h1>
            </Col>
          </Row>
          <Tabs defaultActiveKey={1} id="shop-dashboard-tab">
            <Tab eventKey={1} title="Calander">
              <CalendarTab
                {...this.props}
                {...this.state}
                handleGetCarInfo={this.handleGetCarInfo}
              />
            </Tab>

            <Tab eventKey={2} title="Maintenance Jobs">
              <MaintenanceJobs
                shopId={this.props.currentUser.shopId}
                currentAppointments={this.state.currentAppointments}
              />
            </Tab>
            <Tab eventKey={3} title="Settings">
              <SettingsTab
                {...this.props}
                {...this.state}
                handleDaysOfServiceChange={this.handleDaysOfServiceChange}
                handleAttributeChange={this.handleAttributeChange}
                handleBuildCalendar={this.handleBuildCalendar}
                handleHoursOfOpChange={this.handleHoursOfOpChange}
                handleSetHours={this.handleSetHours}
              />
            </Tab>
          </Tabs>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ShopDashboard);
