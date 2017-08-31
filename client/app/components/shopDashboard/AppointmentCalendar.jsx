import React, { Component } from "react";
import $ from "jquery";
import fullCalendar from "fullcalendar";
import timekit from "timekit-sdk";
import { timekitEmail, timekitPassword } from "../../../../env/config";

class AppointmentCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: []
    };
  }

  componentDidMount() {
    let today = new Date(2017, 7, 31).getTime();
    // console.log("today is: ", today, "and it is a ", typeof today);
    let tmrw = new Date(2017, 8, 30).getTime();

    timekit.configure({
      app: "hack-reactor-124",
      inputTimestampFormat: "U",
      outputTimestampFormat: "U"
    });

    timekit
      .auth({ email: timekitEmail, password: timekitPassword })
      .then(() => timekit.include("attributes").getBookings())
      // .then(() =>
      //   timekit.getEvents({
      //     start: today,
      //     end: tmrw
      //   })
      // )
      // .then(
      //   timekit.findTime({
      //     calendar_ids: ["9aefc3b5-f55b-4f41-afd2-ccb2829fdfc8"],
      //   })
      // )
      .then(res => {
        let bookings = [];
        res.data.forEach(booking => {
          if (!booking.completed && booking.state === "confirmed") {
            console.log(booking.attributes);
            bookings.push(booking.attributes);
          }
        });
        this.setState({ bookings }, () =>
          console.log("this is the state after getting bookings", this.state)
        );
      })
      .catch(err => console.log("could not get calendars", err));

    $("#calendar").fullCalendar({
      defaultView: "listWeek"
    });
  }
  render() {
    return (
      <div>
        <h1>I am the appointment Calendar</h1>
        <div id="calendar" />
      </div>
    );
  }
}

export default AppointmentCalendar;
