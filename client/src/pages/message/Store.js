import React, { createContext, useReducer } from "react";

export const CTX = createContext();

/*
    msg {
        from: 'user',
        msg: 'hi,
        topic: 'general'
    }

    state {
        general: [
            {msg}, {msg}, {msg}
        ]
        topic2: [
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
  topic2: [
    { from: "aaron", msg: "hello" },
    { from: "aaron", msg: "hello" },
    { from: "aaron", msg: "hello" }
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

export default function Store(props) {
  const reducerHook = useReducer(reducer, initState);

  return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
}
