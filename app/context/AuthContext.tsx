"use client"
import { createContext, useContext, useEffect, useReducer } from "react";

// const initialState = {
//   user: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null,
//   role: localStorage.getItem('role') || null,
//   token: localStorage.getItem('token') || null,
// };

const initialState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  role: typeof window !== "undefined" ? localStorage.getItem('role') : null,
  token: typeof window !== "undefined" ? localStorage.getItem('token') : null,
};


// const initialState = {
//   access: typeof window !== "undefined" ? window.localStorage.getItem('access') : false,
//   refresh: typeof window !== "undefined" ?  window.localStorage.getItem('refresh') : false,
//   isAuthenticated: null,
//   user: null
// };

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
    localStorage.setItem('token', state.token)
    localStorage.setItem('role', state.role)
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
