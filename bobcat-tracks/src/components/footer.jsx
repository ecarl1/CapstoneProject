import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <h1 className="footer-txt">Bobcat Tracks</h1>
        <p className="b2 footer-txt">Version 6.0 published on 4.29.25</p>
        <img src="/images/paw.png" className="footer-paw paw1" />
        <img src="/images/paw.png" className="footer-paw paw2" />
        <img src="/images/paw.png" className="footer-paw paw3" />
        <img src="/images/paw.png" className="footer-paw paw4" />
        <img src="/images/paw.png" className="footer-paw paw5" />
        <img src="/images/paw.png" className="footer-paw paw6" />
      </div>
    );
  }
}

export default Footer;
