import React from "react";
import { Button } from "@material-ui/core";

class ChatBar extends React.Component {

    constructor(props) {
        super(props);
        this.fire_message = this.fire_message.bind(this);
    }

    fire_message(event) {
        event.preventDefault();
        var chat_input = event.target.children[0]
        console.log('Somebody tried to submit! ' + chat_input.value);
        chat_input.value = '';
        return false;
    }

    render() {
        return (
          <form action="" onSubmit={this.fire_message}>
            <input id="chat_input" autoComplete="off" />
            <Button variant="contained">Send</Button>
          </form>
        );
    }
}

export default ChatBar;
