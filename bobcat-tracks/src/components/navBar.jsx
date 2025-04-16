import React, { Component, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
class NavBar extends Component {
  //NavBar reactivity doesn't work once it abbreviates- neither does REACT demo
  //See Ruby after break for help

  state = {
    user: null,
    login: true,
  };

  componentDidMount() {
    const storedUser = localStorage.getItem("user");
    console.log("Retrieved from localStorage:", storedUser);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed User:", parsedUser);

        if (parsedUser.User && parsedUser.User.fname) {
          //for some reason pref name is not working
          this.setState({ user: parsedUser }, () => {
            console.log("Updated State:", this.state.user);
          });
        } else {
          console.warn(
            "User object exists, but pref_Name is missing:",
            parsedUser
          );
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.warn("No user data found in localStorage");
    }
  }

  render() {
    const { user } = this.state;

    return (
      //big navbar class
      <nav class="navbar navbar-expand-lg">
        {/* fluid container for collapsing? */}
        <div className="container-fluid">
          {/* START paw & bobcat tracks  */}
          <a class="navbar-brand" href="/">
            <img src="/images/paw.png" className="brand-icon" />
            <h2 className="brand-txt">Bobcat Tracks</h2>
          </a>
          {/* END paw & bobcat tracks  */}

          {/* START this is the button that displays when the menu collapses!  */}
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#bobcatNavbar"
            // aria-controls="navbarSdCt"
            // aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img src="/images/burgermenu.png" height="70px" />
          </button>

          {/* END this is the button that displays when the menu collapses!  */}

          {/* Links & Icons of Nav Bar, should ONLY show when logged in*/}

          <div className="collapse navbar-collapse" id="bobcatNavbar">
            <div class="navbar-nav  w-100 mr-auto">
              <a class="nav-link" href="/upload">
                <img src="/images/Upload Icon.png" className="nav-icon" />
                <p className="m1">Upload</p>
              </a>

              <a class="nav-link" href="/attendance">
                <img src="/images/attendanceMenu.png" className="nav-icon" />
                <p className="m1">Attendance</p>
              </a>

              <a class="nav-link" href="/multicheck">
                <img src="/images/skillsMenu.png" className="nav-icon" />
                <p className="m1">Skills</p>
              </a>

              <a class="nav-link" href="#">
                <img src="/images/CPT menu.png" className="nav-icon" />
                <p className="m1">Confidence</p>
              </a>

              {/* this should be where the flexible gap is */}

              <p className="b2 greeting">
                Hello {user ? user.User.fname : "Guest"}
              </p>

              <a class="nav-link" href="#">
                <img src="/images/profileIcon.png" className="nav-icon" />

                <p className="m1">Profile</p>
              </a>
              <a class="nav-link" href="/">
                <img src="/images/Logout.png" className="nav-icon" />
                <p className="m1">Logout</p>
              </a>
            </div>
          </div>
          {/* END Links & Icons of Nav Bar  */}
        </div>
        {/* END container for collapsing? */}
      </nav>
      /* END navigation */
    );
  }
}

export default NavBar;
