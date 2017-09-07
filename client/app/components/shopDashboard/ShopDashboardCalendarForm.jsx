import React, { Component } from "react";
import {
  Button,
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Well
} from "react-bootstrap";
import FieldGroup from "./FieldGroup.jsx";

class ShopDashboardCalendarForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  componentDidMount() {
    console.log("this is the props of the shop cal form", this.props);
  }

  handleSubmitForm() {}

  render() {
    return (
      <Well>
        <Form>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="this is the the field group"
            placeholder="First Name"
            onChange={this.props.handleUpdateEmail}
          />
          <Button onClick={this.handleSubmitForm}>Submit</Button>
        </Form>
      </Well>
    );
  }
}

export default ShopDashboardCalendarForm;
