import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      //big navbar class
      <nav class="navbar navbar-expand-lg">
        {/* fluid container for collapsing? */}
        <div className="container-fluid">
          {/* START paw & bobcat tracks  */}
          <a class="navbar-brand" href="#">
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

          {/* Links & Icons of Nav Bar  */}

          <div className="collapse navbar-collapse" id="bobcatNavbar">
            <div class="navbar-nav  w-100 mr-auto">
              <a class="nav-link" href="#">
                <img src="https://placehold.co/70" className="nav-icon" />
                <p className="m1">Link1</p>
              </a>

              <a class="nav-link" href="#">
                <img src="https://placehold.co/70" className="nav-icon" />
                <p className="m1">Link2</p>
              </a>

              <a class="nav-link" href="#">
                <img src="https://placehold.co/70" className="nav-icon" />
                <p className="m1">Link3</p>
              </a>

              <a class="nav-link" href="#">
                <img src="https://placehold.co/70" className="nav-icon" />
                <p className="m1">Link4</p>
              </a>

              {/* this should be where the flexible gap is */}

              <p className="b2 dummy mr-auto align-right">Hello NAME</p>

              <a class="nav-link" href="#">
                <img src="https://placehold.co/70" className="nav-icon" />

                <p className="m1">Profile</p>
              </a>
              <a class="nav-link" href="#">
                <img src="https://placehold.co/70" className="nav-icon" />
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
