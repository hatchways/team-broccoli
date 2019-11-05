import React, { createContext, useReducer } from "react";
import io from "socket.io-client";

export const CTX = createContext();

/* Sample Data Format
    msg {
        from: 'user',
        msg: 'hi,
        conversation: 'general'
    }

    state {
        general: [
            {msg}, {msg}, {msg}
        ]
        user2: [
            {msg}, {msg}, {msg}
        ]
    }
*/

const initState = {
  general: [
    { from: "aaron", msg: "hello" },
    { from: "arnold", msg: "hello" },
    { from: "archer", msg: "hello" }
  ],
  user2: [
    { from: "mike", msg: "hello" },
    { from: "luke", msg: "hello" },
    { from: "hashi", msg: "hello" }
  ]
};

function reducer(state, action) {
  const { from, msg, conversation } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [conversation]: [
          ...state[conversation],
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
}

let socket;

//client emit function
function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  const [allChats, dispatch] = useReducer(reducer, initState);

  if (!socket) {
    socket = io("http://127.0.0.1:5000");
    socket.on("chat message", function(msg) {
      console.log({ msg });
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const user = "aslamm" + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
