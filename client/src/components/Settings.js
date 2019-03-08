import React, { Component } from "react";

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dark: false,
      messages: 0
    };
    // eslint-disable-next-line
    String.prototype.isNullOrWhiteSpace = function() {
      return !this || this.length === 0 || /^\s*$/.test(this);
    };
  }

  // Sets the state when the component mounts
  // Props come from App component
  componentDidMount() {
    this.setState({
      name: this.props.name,
      dark: this.props.dark,
      messages: this.props.messages.length
    });
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.name.isNullOrWhiteSpace()) {
      alert("Choose a valid name");
      return this.setState({
        name: ""
      });
    }
    this.props.onClick(this.state.name, this.state.dark);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  themeChanged = e => {
    if (e.currentTarget.value === "Light") {
      return this.setState({
        dark: false
      });
    }
    this.setState({
      dark: true
    });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} className="row settings">
          <div className="form-group col m4">
            <label htmlFor="name">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Choose your nickname"
                name="name"
                autoComplete="off"
                value={this.state.name}
                onChange={this.onChange}
              />
              nickname
            </label>
          </div>
          <div className="row col s12">
            <label className="col s5 m2">
              <input
                value="Light"
                name="group1"
                type="radio"
                className="with-gap"
                onChange={this.themeChanged}
                checked={!this.state.dark}
              />
              <span>Light theme</span>
            </label>
            <label className="col s5 m2">
              <input
                value="Dark"
                name="group1"
                type="radio"
                className="with-gap"
                onChange={this.themeChanged}
                checked={this.state.dark}
              />
              <span>Dark theme</span>
            </label>
          </div>
          <button className="btn col m2 s10 offset-s1">set</button>
        </form>
      </div>
    );
  }
}

export default Settings;
