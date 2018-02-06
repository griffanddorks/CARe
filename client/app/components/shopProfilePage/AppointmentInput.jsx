import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  HelpBlock
} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";
import TimePicker from "react-bootstrap-time-picker";

class AppointmentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      start: "9:00", // default time
      end: "23:00" // default time
    };
  }

  // Once component mounts configure a rational estimation of service times.
  componentDidMount() {
    //check to see if shop-client has configured days of service times
    if (this.props.daysOfService && this.props.daysOfService.length > 0) {
      let days = this.props.daysOfService;

      //find the earliest startTime
      let startTime = days.reduce((startTime, day) => {
        return startTime > day.start ? day.start : startTime;
      }, days[0].start);

      //find the latest endTime
      let endTime = days.reduce((endTime, time) => {
        return endTime < time.end ? time.end : endTime;
      }, days[0].end);

      //convert startTime from utc to local time
      let startTimeHours = Math.floor(startTime / 3600);
      let startTimeMinutes = (startTime % 3600) / 60;
      if (startTimeMinutes < 10) {
        startTimeMinutes = "0" + startTimeMinutes;
      }
      startTime = `${startTimeHours}:${startTimeMinutes}`;

      //convert endTime from utc to local time
      let endTimeHours = Math.floor(endTime / 3600);
      let endTimeMinutes = (endTime % 3600) / 60;
      if (endTimeMinutes < 10) {
        endTimeMinutes = "0" + endTimeMinutes;
      }
      endTime = `${endTimeHours}:${endTimeMinutes}`;

      //set the state of the appointment input to configured start and endTimes
      this.setState({ start: startTime, end: endTime });
    }
  }

  render() {
    /**
     * render for the client:
     * (1) a list of the client's cars
     * (2) a list of the shop's services,
     * (3) the configured start and end times in componentDidMount
     * (4) a list of the shop's days of service
     * (5) a button to submit query the server given specifications
     */

    return (
      <Form inline>
        <FormGroup controlId="cars">
          {"  "}
          <FormControl
            componentClass="select"
            onChange={this.props.handleCarChange}
          >
            {this.props.currentUser.cars
              ? this.props.currentUser.cars.map((car, i) => (
                  <option value={car.id} key={i}>
                    {car.make + " " + car.model + " " + car.year}
                  </option>
                ))
              : null}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="service">
          {"  "}
          <FormControl
            componentClass="select"
            onChange={this.props.handleServiceChange}
          >
            {this.props.services && this.props.services.length > 0 ? (
              this.props.services.map((service, i) => (
                <option value={service} key={i}>
                  {service}
                </option>
              ))
            ) : (
              <option value="Not specified" key={0}>
                Not Specified
              </option>
            )}
          </FormControl>
        </FormGroup>

        <FormGroup controlId="time">
          {"  "}
          <TimePicker
            start={this.state.start}
            end={this.state.end}
            onChange={this.props.handleTimeChange}
            value={this.props.time}
          />
        </FormGroup>

        <FormGroup controlId="date">
          <DatePicker
            id="datepicker"
            value={this.props.date}
            onChange={this.props.handleDateChange}
          />
        </FormGroup>

        <Button type="submit" onClick={this.props.handleFindApptClick}>
          Find Appointments
        </Button>
      </Form>
    );
  }
}

export default AppointmentInput;
