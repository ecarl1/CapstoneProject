import React, { Component } from "react";
import LoginForm from "../components/login-input";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <h1>NAV BAR (disabled)</h1>

        <div className="big-banner">
          <img
            className="over-image"
            // i was able to work around it but for the life of me I couldn't get this to be from either of the files in /src/images
            src="https://upload.wikimedia.org/wikipedia/en/2/2c/Quinnipiac_Bobcats_logo.svg"
            alt="boomer the bobcat"
          />
          <h1 className="banner-text">Bobcat Tracks</h1>
        </div>

        <div className="login-window">
          <LoginForm />
        </div>

        <h1>FOOTER</h1>
      </div>
    );
  }
}

export default LoginPage;
