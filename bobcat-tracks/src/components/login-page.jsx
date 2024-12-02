import React, { Component } from "react";
import LoginForm from "./login-input";
import NavBar from "./navBar";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <NavBar />

        {/* boomer banner */}
        <div className="big-banner">
          <img
            className="over-image"
            // i was able to work around it but for the life of me I couldn't get this to be from either of the files in /src/images
            src="/images/boomer.png"
            alt="boomer the bobcat"
          />
          <h1 className="banner-text">Bobcat Tracks</h1>
        </div>
        {/* end boomer banner */}

        <div className="login-window">
          <LoginForm />
        </div>

        <h1>FOOTER</h1>
      </div>
      // end container
    );
  }
}

export default LoginPage;
