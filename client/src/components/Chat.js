import React, { Component } from "react";

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.messagesContainer = React.createRef();
    this.state = {
      message: "",
      messages: [],
      name: ""
    };

    // eslint-disable-next-line
    String.prototype.isNullOrWhiteSpace = function() {
      return !this || this.length === 0 || /^\s*$/.test(this);
    };
  }

  // Once it receive props from App component,
  // put them to the component state.
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        messages: nextProps.messages,
        name: nextProps.name
      });

      // Auto scroll when there's a new message
      setTimeout(() => {
        this.messagesContainer.current.scrollTop = this.messagesContainer.current.scrollHeight;
      }, 100);
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.message.isNullOrWhiteSpace()) {
      return this.setState({
        message: ""
      });
    }

    const data = {
      author: this.state.name || "anonymous",
      message: this.state.message,
      date: Date.now()
    };

    this.props.onSubmit(data);

    this.setState({
      message: ""
    });
  };

  formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  }

  render() {
    return (
      <div className="chat container">
        <div className="row">
          <div className="col m10 s12 offset-m1">
            <div className="scrollable-messages" ref={this.messagesContainer}>
              <div className="messages row">
                {this.state.messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        "comment-box col s7 " +
                        (this.state.name === message.author ? "my-message" : "")
                      }
                    >
                      <span className="comment-user">{message.author}</span>

                      <p className="comment-message">{message.message}</p>
                      <small className="comment-time">
                        {this.formatDate(new Date(message.date))}
                      </small>
                    </div>
                    // <div key={index} className="message my-message">
                    //   <span className="bold">{message.author}</span>
                    //   {message.message}, {message.date}
                    // </div>
                  );
                })}
              </div>
            </div>
            <form onSubmit={this.onSubmit} className="row col s12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg col m10 s9"
                  placeholder="Write here"
                  name="message"
                  autoComplete="off"
                  value={this.state.message}
                  onChange={this.onChange}
                />
              </div>

              {/* <input type="submit" className="btn btn-info btn-block mt-4" /> */}
              <button className="btn col m1 s2 offset-m1 offset-s1">
                <i className="material-icons">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
