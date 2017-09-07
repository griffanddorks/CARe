import React, { Component } from "react";
import {
  Button,
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Well
} from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import FieldGroup from "./FieldGroup.jsx";

class ShopDashboardSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createCal: false,
      firstName: "",
      lastName: "",
      shopName: "",
      shopEmail: "",
      shopPassword: "",
      shopTimeZone: ""
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleShopNameChange = this.handleShopNameChange.bind(this);
  }

  handleShopNameChange(e) {
    e.preventDefault();
    this.setState({ shopName: e.target.value });
  }

  handleFirstNameChange(e) {
    e.preventDefault();
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    e.preventDefault();
    this.setState({ lastName: e.target.value });
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({ shopEmail: e.target.value });
  }

  handleUpdatePassword(e) {
    e.preventDefault();
    this.setState({ shopPassword: e.target.value });
  }

  render() {
    return (
      <Well>
        <Form>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Shop Name"
            placeholder="Shop Name"
            value={this.state.shopName}
            onChange={this.handleShopNameChange}
          >
            {this.state.value}
          </FieldGroup>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="First Name"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleFirstNameChange}
          >
            {this.state.value}
          </FieldGroup>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleLastNameChange}
          >
            {this.state.value}
          </FieldGroup>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Shop Name"
            placeholder="Shop Name"
          />

          <Button onClick={this.props.handleBuildCalendar}>Submit</Button>
        </Form>
      </Well>
    );
  }
}

export default ShopDashboardSettings;
