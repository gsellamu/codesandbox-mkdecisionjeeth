import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./styles.css";
export default function App() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");

  class JeethForm extends React.Component {
    Name = "";
    Email = "";
    Message = "";

    constructor(props) {
      super(props);
      this.state = { Name: "", Email: "", Message: "" };
      this.textUpdate = this.textUpdate.bind(this);
      this.sendTheForm = this.sendTheForm.bind(this);
    }

    textUpdate(e) {
      //e.preventDefault();
      //console.log(e.target.name, e.target.value);

      this.setState({ [e.target.name]: e.target.value });
      var name = e.target.name;
      //console.log(name);
      if (name === "Name") {
        setName(e.target.value);
      }
      if (name === "Email") {
        setEmail(e.target.value);
      }
      if (name === "Message") {
        setMessage(e.target.value);
      }

      // console.log(Name, Email, Message);
    }

    async sendTheForm(e) {
      console.log(e);

      /* call AWS lamda fucntion */

      console.log(Name, Email, Message);
      try {
        const response = await axios.post(
          "https://2p3p8agh3k.execute-api.us-west-1.amazonaws.com/JeethStage/JeethSendEmailFaaS",
          {
            UserName: Name,
            Email: Email,
            Message: Message
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        var data = response.data;
        console.log("post response =" + data);
      } catch (err) {
        console.log("post error = " + err.data);
      }
    }

    render() {
      return (
        <form
          name="emailForm"
          className={document.root}
          autoComplete="off"
          onSubmit={this.sendTheForm}
        >
          <h1> Welcome to MK Decision's Email Service</h1>

          <div position="relative" margin="auto">
            <TextField
              required
              name="Name"
              onChange={this.textUpdate}
              id="outlined-required"
              label="Full Name"
              type="text"
              variant="outlined"
              fullWidth
            />
          </div>

          <div>
            <TextField
              required
              email="true"
              name="Email"
              onChange={this.textUpdate}
              id="outlined-required-password-input"
              label="Email Address"
              type="email"
              autoComplete="current-email"
              variant="outlined"
              fullWidth
            />
          </div>

          <div>
            <TextField
              required
              message="true"
              name="Message"
              onChange={this.textUpdate}
              id="outlined-required-password-input"
              label="Enter your message"
              type="message"
              variant="outlined"
              autoComplete="current-message"
              fullWidth
            />
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              label="Submit"
              defaultValue="Submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </form>
      );
    }
  }
  var jeethForm = new JeethForm();

  return jeethForm.render();
}
