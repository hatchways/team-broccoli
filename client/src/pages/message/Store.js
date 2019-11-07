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

// old initState
const old_initState = {
  1: [
    { sender_id: "aaron", body: "hello" },
    { sender_id: "arnold", body: "hello" },
    { sender_id: "archer", body: "hello" }
  ],
  user2: [
    { sender_id: "mike", body: "hello" },
    { sender_id: "luke", body: "hello" },
    { sender_id: "hashi", body: "hello" }
  ]
};

const prepInitState = [
  {
      "participants": [
          {
              "id": 1,
              "name": "testadmin",
              "email": "test@test.com"
          },
          {
              "id": 2,
              "name": "RA2",
              "email": "test2@test.com"
          }
      ],
      "id": 1,
      "messages": [
          {
              "conversation": 1,
              "sender": 1,
              "conversation_id": 1,
              "body": "test",
              "created_at": "2019-09-01T07:00:00+07:00",
              "sender_id": 1,
              "id": 1
          },
          {
              "conversation": 1,
              "sender": 1,
              "conversation_id": 1,
              "body": "test2",
              "created_at": "2019-09-01T08:00:00+07:00",
              "sender_id": 1,
              "id": 2
          },
          {
              "conversation": 1,
              "sender": 2,
              "conversation_id": 1,
              "body": "hi there!",
              "created_at": "2019-09-01T10:01:00+07:00",
              "sender_id": 2,
              "id": 4
          },
          {
              "conversation": 1,
              "sender": 2,
              "conversation_id": 1,
              "body": "What would you need from me?",
              "created_at": "2019-09-01T10:02:00+07:00",
              "sender_id": 2,
              "id": 5
          }
      ]
  },
  {
      "participants": [
          {
              "id": 1,
              "name": "testadmin",
              "email": "test@test.com"
          },
          {
              "id": 3,
              "name": "RA3",
              "email": "test3@test.com"
          }
      ],
      "id": 2,
      "messages": [
          {
              "conversation": 2,
              "sender": 1,
              "conversation_id": 2,
              "body": "sup",
              "created_at": "2019-09-01T08:01:00+07:00",
              "sender_id": 1,
              "id": 3
          }
      ]
  }
]

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const initState = convertArrayToObject(prepInitState, 'id')

function reducer(state, action) {
  const { sender_id, body, conversation_id } = action.payload;
  console.log(conversation_id)
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [conversation_id]: {
          ...state[conversation_id],
          messages: [
            ...state[conversation_id].messages,
            {
              sender_id,
              body
            }
          ]
        }
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

const token = localStorage.getItem("access_token")

export default function Store(props) {
  const [allChats, dispatch] = useReducer(reducer, initState);

  if (!socket) {
    socket = io("http://127.0.0.1:5000");
    console.log('creating socket..')
    socket.on("chat message", function(msg) {
      console.log({ msg });
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
    socket.emit('join_room',
      {token: token}
    )
  }

  const user = "aslamm" + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
