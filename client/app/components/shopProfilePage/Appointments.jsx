import React, { Component } from "react";
import { Button, Grid, Collapse, Well } from "react-bootstrap";
import AppointmentInput from "./AppointmentInput";
import AppointmentsList from "./AppointmentsList";
import timekit from "timekit-sdk";
import { timekitEmail, timekitPassword } from "../../../../env/config";
import TimekitBooking from "timekit-booking";

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      service: "",
      date: new Date().toISOString(),
      times: [],
      time: new Date().toISOString(),
      shopCalendar: "9aefc3b5-f55b-4f41-afd2-ccb2829fdfc8",
      openList: false
    };
    this.handleServiceChange = this.handleServiceChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleFindApptClick = this.handleFindApptClick.bind(this);
  }

  componentDidMount() {
    timekit.configure({
      app: "hack-reactor-124"
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

    let service = e.target.value;
    let { services, dates, date, times, time } = this.state;

    this.setState({ services, service, dates, date, times, time });
  }

  handleTimeChange(e) {
    e.preventDefault();

    let time = e.target.value;
    let { services, service, dates, date, times } = this.state;

    this.setState({ time }, () =>
      console.log("this is the state after handletime", this.state)
    );
  }

  handleDateChange(date, formattedDate) {
    this.setState({ date });
  }

  handleFindApptClick(e) {
    e.preventDefault();
    let { time, date } = this.state;
    let widget = new TimekitBooking();
    widget.init({
      app: "hack-reactor-124",
      email: "EthanEFung@gmail.com",
      apiToken: "1NFvUV1RLMYfFIKTmwOUeNBaRWMfoj01",
      calendar: "9aefc3b5-f55b-4f41-afd2-ccb2829fdfc8",
      availabilityView: "listing",
      timekitFindTime: {
        start: date,
        future: "5 hours",
        length: "30 minutes"
      }
    });
    //find the calendar id of the shop
    //find the date that the customer wants
    //find the time approx that the customer wants
    // console.log(
    //   "APPTS: this is the date that is being processed for appt click",
    //   // date,
    //   time
    // );

    //send a request to timekit to find time within 3 hours of time, render 5 within 30 minutes of each other

    this.setState({ openList: true }, () =>
      console.log(
        "this is the state once the handleFindAppt is clicked",
        this.state
      )
    );
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
