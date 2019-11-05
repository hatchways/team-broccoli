import React from "react";
import { Button } from "@material-ui/core";
import io from 'socket.io-client';
import NavBar from "./NavBar";
import MessagePane from "./MessagePane";

// TODO -- don't hardcode the server URL like this.
// Probably we should define a path that can be passed through to the Node `proxy`.
var socket = io('http://127.0.0.1:5000');

class ChatBar extends React.Component {

    constructor(props) {
        super(props);
        this.fire_message = this.fire_message.bind(this);
        this.state = {
          conversation: {
            messages: [

            ]
          },
        }
    }

    fire_message(event) {
        event.preventDefault();
        var chat_input = event.target.children[0]
        console.log('Somebody tried to submit! ' + chat_input.value);
        socket.emit('user_message', chat_input.value);
        chat_input.value = '';
        return false;
    }

    componentDidMount() {
      const url = process.env.REACT_APP_SERVER_URL
      const { id }= this.props.match.params ? this.props.match.params : 0
      this.setState({recipientId: id})
      var token = localStorage.getItem("access_token")
      fetch(url + `/conversation/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        }
      })
        .then(res => res.json())
        .then(conversation => {
          this.setState({
            conversation
          })
        })
    }

    render() {
        return (
          <div>
          <NavBar />
          <MessagePane />
          <ul>
            {this.state.conversation.messages.map(message => {
              return (
                <li>{message}</li>
              );
            })}
          </ul>
          <form action="" onSubmit={this.fire_message}>
            <input id="chat_input" autoComplete="off" />
            <Button variant="contained">Send</Button>
          </form>
          </div>
        );
    }
}

export default ChatBar;
