import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { CTX } from "./Store";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  userWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  chatBox: {
    width: "85%"
  },
  button: {
    width: "15%"
  }
}));

export default function Message() {
  const classes = useStyles();

  // Store Replacements
  //const allChats = {
  //  1: [
  //    {from: "A", msg:"Hello"},
  //    {from: "b", msg:"Hi!"},
  //  ],
  //  2: [
  //    {from: "B", msg: "Hi2!"},
  //    {from: "C", msg: "He22o!",}
  //  ]
  //}

  //CTX Store
  const { allChats, sendChatAction, user } = useContext(CTX);
  //const sendChatAction = (a) => console.log(a);
  //const user = "yo"
  const conversations = Object.keys(allChats);
  const token = localStorage.getItem("access_token")

  //local state
  const [activeConversation, changeActiveConversation] = useState(
    conversations[0]
  );

  const [textValue, changeTextValue] = useState("");

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Messaging
        </Typography>
        <Typography variant="h5" component="h5">
          Inbox Messages
        </Typography>
        <Typography variant="h5" component="h5">
          {activeConversation}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.userWindow}>
            <List>
              {conversations.map(conversation => (
                <ListItem
                  onClick={e => changeActiveConversation(conversation)}
                  key={conversation}
                  button
                >
                  <ListItemText primary={conversation} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeConversation].map((chat, i) => (
              <div className={classes.flex} key={i}>
                <Chip label={chat.from} className={classes.chip} />
                <Typography variant="body1" gutterBottom>
                  {chat.msg}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            placeholder="Send a Reply"
            className={classes.chatBox}
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              sendChatAction({
                from: user,
                body: textValue,
                conversation_id: 1,
                token: token,
              });
              changeTextValue("");
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
}
