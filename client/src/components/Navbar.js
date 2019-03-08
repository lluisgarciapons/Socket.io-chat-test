import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  unreadMessages = () => {
    return <span className="unread">{this.props.unread}</span>;
  };

  render() {
    return (
      <div className="container navbar">
        <Link to="/" className="link">
          Chat
          {this.props.unread > 0 ? this.unreadMessages() : null}
        </Link>
        <Link to="/settings" className="link">
          Settings
        </Link>
      </div>
    );
  }
}

export default Navbar;
