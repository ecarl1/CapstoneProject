import React, { Component } from "react";
import LoginForm from "./login-input";
import NavBar from "./navBar";
import Footer from "./footer";
import LoginNavBar from "./loginNavBar";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginNavBar />

        <div className="login-page">
          {/* paw decorations */}
          <img src="/images/paw.png" className="login-paw Lpaw1" />
          <img src="/images/paw.png" className="login-paw Lpaw2" />
          <img src="/images/paw.png" className="login-paw Lpaw3" />
          <img src="/images/paw.png" className="login-paw Lpaw4" />
          <img src="/images/paw.png" className="login-paw Lpaw5" />
          <img src="/images/paw.png" className="login-paw Lpaw6" />
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
        </div>
        <Footer />
      </div>
      // end container
    );
  }
}

export default LoginPage;
