import React, { Component } from "react";
import "./App.scss";
import io from "socket.io-client";
import { connect } from "react-redux";

import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import { postMessage } from "./store/actions/messagesActions";
import { Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name: "",
      dark: false,
      unread: 0
    };

    this.socket = io("http://localhost:5000");

    // When receiving a message from backend, call addMessage() function.
    // Only the messages from other people
    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    // Redux action
    const addMessage = data => {
      this.props.postMessage(data);
    };
  }

  // When the application starts it get the information from localstorage or set it to default
  componentDidMount = () => {
    const theme = localStorage.getItem("dark") === "true" ? true : false;
    this.setState({
      name: localStorage.getItem("name") || "",
      dark: theme || false
    });
  };

  // Checks if we are on the same component when update. If not, set the unread msgs to 0
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log("enters new component");
      this.setState({
        unread: 0
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messages !== nextProps.messages) {
      // Adds the message from redux to the local state
      this.setState({
        messages: nextProps.messages
      });
      if (this.props.location.pathname === "/settings") {
        // If receive a message while we are on settings, add one to the unread msgs
        this.setState(prevState => {
          return { unread: prevState.unread + 1 };
        });
      }
    }
  }

  // Emit the message to backend and add it to Redux
  submitMessage = data => {
    this.socket.emit("SEND_MESSAGE", data);
    this.props.postMessage(data);
  };

  setSettings = (name, dark) => {
    this.setState({
      name: name,
      dark: dark
    });

    localStorage.setItem("name", name);
    localStorage.setItem("dark", dark);
  };

  render() {
    return (
      // Dynamic class depending on the theme selected
      <div className={"App " + (this.state.dark ? "dark" : "")}>
        <Navbar unread={this.state.unread} />
        <Switch>
          <Route
            path="/settings"
            render={props => (
              <Settings
                {...props}
                onClick={this.setSettings}
                messages={this.state.messages}
                dark={this.state.dark}
                name={this.state.name}
              />
            )}
          />
          <Route
            path="/"
            render={props => (
              <Chat
                {...props}
                onSubmit={this.submitMessage}
                messages={this.state.messages}
                name={this.state.name}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.payload
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { postMessage }
  )(App)
);
