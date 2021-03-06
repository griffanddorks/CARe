import React from "react";
import { Modal } from "react-bootstrap";
import Dropzone from "react-dropzone";
import request from "superagent";
import axios from "axios";
import { Link } from "react-router-dom";
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

const CLOUDINARY_UPLOAD_PRESET = "griffPreset";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/mikegriff3/image/upload";

export default class ProfileHead extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      uploadedFileCloudinaryUrl: "",
      name: "Your name here",
      email: "",
      phone: "",
      profilePic: ""
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/userProfile/getProfile/${this.props.user.currentUser.id}`)
      .then(response => {
        this.setState({
          name: response.data.name,
          phone: response.data.phone,
          profilePic: response.data.profilePic
        });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    axios
      .get(`/api/userProfile/getProfile/${nextProps.user.currentUser.id}`)
      .then(response => {
        this.setState({
          name: response.data.name,
          phone: response.data.phone,
          profilePic: response.data.profilePic
        });
      })
      .catch(err => console.log(err));
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  onImageDrop(files) {
    this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
          profilePic: response.body.secure_url
        });
      }
    });
  }

  handleOnChange(event) {
    let temp = event.target.name;
    this.setState({ [temp]: event.target.value });
  }

  handleSubmit() {
    this.close();
    axios
      .put(
        `/api/userProfile/updateProfile/${this.props.user.currentUser.id}`,
        this.state
      )
      .then(({ data }) => {
        this.setState({ name: data[1][0].name });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="UserPic">
          <img
            src={this.state.profilePic}
            className="img-responsive"
            id="user-pic"
          />
          <div className="profile-info">
            <div>{this.state.name}</div>
            <div>
              <Link to="/user-reviews">
                <a href="#" className="reviews-link">
                  Reviews
                </a>
              </Link>
            </div>
            <div>
              <Link to="/user-favorites">
                <a href="#" className="favorites-link">
                  Favorites
                </a>
              </Link>
            </div>
            <Button
              bsStyle="primary"
              id="edit-profile-button"
              onClick={this.open}
            >
              Edit Profile
            </Button>
          </div>
          <Modal style={{}} show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Well>
                <label>Name</label>
                <Form>
                  <input
                    name="name"
                    onChange={this.handleOnChange}
                    className="edit-profile-input"
                    type="text"
                    placeholder="Enter your name"
                  />
                </Form>
                <label>Phone</label>
                <Form>
                  <input
                    name="phone"
                    onChange={this.handleOnChange}
                    className="edit-profile-input"
                    type="text"
                    placeholder="E.g. 5553214578"
                  />
                </Form>
                <hr />
                <label>Profile Picture</label>
                <Dropzone
                  multiple={false}
                  accept="image/*"
                  onDrop={this.onImageDrop.bind(this)}
                >
                  <p>Drop an image or click to select a file to upload.</p>
                </Dropzone>
                <div className="FileUpload">...</div>

                <div>
                  {this.state.uploadedFileCloudinaryUrl === "" ? null : (
                    <div>
                      <p>{this.state.uploadedFile.name}</p>
                      <img src={this.state.uploadedFileCloudinaryUrl} />
                    </div>
                  )}
                </div>
              </Well>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Cancel</Button>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
