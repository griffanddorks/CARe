import React, { Component } from "react";
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
  Button,
  Well,
  Row
} from "react-bootstrap";
import axios from "axios";

export default class InputMaintenanceHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/shopdashboard/getCar/${this.props.bookingId}`)
      .then(({ data }) => {
        console.log("appointment info here", data);
        this.setState({ carId: data[0].carId });
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    axios
      .post("/api/shopProfile/postHistoryEntry", {
        date: this.state.formDate,
        description: this.state.formServiceDescription,
        mileage: this.state.formCarMileage,
        notes: this.state.formAdditionalNotes,
        service: this.state.formServiceName,
        carId: this.state.carId,
        shopId: this.props.shopId
      })
      .then(() => {
        console.log("Successfully posted maintenance history!");
        axios
          .put(`/api/userProfile/updateMileage/${this.state.carId}`, {
            mileage: this.state.formCarMileage
          })
          .then(res => console.log(res))
          .catch(err => console.log(`Error updating mileage! ${err}`));
      })
      .then(() => {
        axios
          .delete("/api/shopdashboard/removeAppointment", {
            data: { bookingId: this.props.bookingId }
          })
          .then(() => console.log("Successfully deleted appointment!"))
          .catch(err => console.log(`Error deleting appointment! ${err}`));
      })
      .then(alert("Successfully posted maintenance history!"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Well>
        <Row>
          <Form>
            <Col lg={6} lgOffset={1}>
              <FormGroup>
                <ControlLabel>Service</ControlLabel>
                <FormControl
                  required
                  name="formServiceName"
                  type="text"
                  placeholder="Enter name of service"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>

            <Col lg={3} lgOffset={1} sm={12}>
              <FormGroup>
                <ControlLabel>Date of completion</ControlLabel>
                <FormControl
                  name="formDate"
                  type="date"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col lg={6} lgOffset={1} sm={12}>
              <FormGroup>
                <ControlLabel>Service Description</ControlLabel>
                <FormControl
                  name="formServiceDescription"
                  type="text"
                  placeholder="Enter description of service"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col lg={3} lgOffset={1} sm={12}>
              <FormGroup>
                <ControlLabel>Car Mileage</ControlLabel>
                <FormControl
                  name="formCarMileage"
                  type="text"
                  placeholder="Car Mileage"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col lg={10} lgOffset={1} sm={12}>
              <FormGroup>
                <ControlLabel>Additional Notes</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  name="formAdditionalNotes"
                  type="text"
                  placeholder="Enter any additional notes here"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col lg={10} lgOffset={1} sm={12}>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Col>
          </Form>
        </Row>
      </Well>
    );
  }
}
