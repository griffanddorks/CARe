import React, { Component } from 'react';
import TimekitBooking from 'timekit-booking';

class AppointmentsList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let widget = new TimekitBooking();
    widget.init({
      app: 'hack-reactor-124',
      email: 'EthanEFung@gmail.com',
      apiToken: '1NFvUV1RLMYfFIKTmwOUeNBaRWMfoj01',
      calendar: '9aefc3b5-f55b-4f41-afd2-ccb2829fdfc8',
      availabilityView: 'listing',
      timekitFindTime: {
        future: '5 hours',
        length: '1 hour',
      }
    })
  }

  render() {
    return (
      <div id="bookingjs">

      </div>
    );
  }
}

export default AppointmentsList;