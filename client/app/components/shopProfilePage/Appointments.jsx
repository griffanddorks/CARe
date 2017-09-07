import React, { Component } from "react";
import { Button, Collapse } from "react-bootstrap";
import AppointmentInput from "./AppointmentInput";
import AppointmentsList from "./AppointmentsList";
import timekit from "timekit-sdk";
import {
  timekitApp,
  timekitEmail,
  timekitPassword,
  timekitApiToken
} from "../../../../env/config";
import TimekitBooking from "timekit-booking";

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      service: "",
      date: new Date().toISOString(),
      times: [],
      time: 0,
      shopCalendar: "9aefc3b5-f55b-4f41-afd2-ccb2829fdfc8",
      shopLocation: "",
      openList: false
    };

    this.handleServiceChange = this.handleServiceChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleFindApptClick = this.handleFindApptClick.bind(this);
  }

  componentDidMount() {
    timekit.configure({
      app: timekitApp
    });

    timekit
      .auth({ email: timekitEmail, password: timekitPassword })
      .then(() =>
        timekit.findTime({
          calendar_ids: [this.state.shopCalendar],
          future: "12 hours",
          // filters: {
          //   and: [{ specific_time: { start: 9, end: 24 } }]
          // },
          length: "30 minutes"
        })
      )
      .then(res => {
        let times = res.data.map(time => {
          return time.start.split("T")[1].split("-")[0];
        });

        let { time, dates, date, services, service } = this.state;

        this.setState({
          time,
          times,
          dates,
          date,
          services: ["Oil Change", "Detailing"],
          service
        });
      });
  }

  handleServiceChange(e) {
    e.preventDefault();
    this.setState({ service: e.target.value });
  }

  handleTimeChange(e) {
    this.setState({ time: e });
  }

  handleDateChange(date, formattedDate) {
    this.setState({ date });
  }

  handleFindApptClick(e) {
    e.preventDefault();
    let widget = new TimekitBooking();
    let { time, date } = this.state;
    const ReqDate = new Date(date);
    const ReqBooking = new Date(
      ReqDate.getFullYear(),
      ReqDate.getMonth(),
      ReqDate.getDate(),
      0,
      0,
      time
    );
    widget.init({
      app: timekitApp,
      email: timekitEmail,
      apiToken: timekitApiToken,
      name: "Appt",
      calendar: "9aefc3b5-f55b-4f41-afd2-ccb2829fdfc8",
      availabilityView: "listing",
      timekitFindTime: {
        start: ReqBooking,
        future: "2 hours",
        length: "1 hour"
      }
    });

    //send a request to timekit to find time within 3 hours of time,
    //render 5 within 30 minutes of each other

    this.setState({ openList: true });
  }

  render() {
    return (
      <div>
        <AppointmentInput
          {...this.state}
          handleServiceChange={this.handleServiceChange}
          handleDateChange={this.handleDateChange}
          handleTimeChange={this.handleTimeChange}
          handleFindApptClick={this.handleFindApptClick}
        />
        <Collapse in={this.state.openList}>
          {/* <Button onClick={() => this.setState({ openList: false })}>x</Button> */}
          <AppointmentsList findingAppt={this.state.openList} />
        </Collapse>
      </div>
    );
  }
}

export default Appointments;
