import { createContext, useContext, useEffect, useReducer } from "react";

// Definiția stării inițiale, gestionarea situației în care componenta este renderizată pe server unde `window` nu este disponibil
const initialState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  role: typeof window !== "undefined" ? localStorage.getItem('role') : null,
  token: typeof window !== "undefined" ? localStorage.getItem('token') : null,
};

// Crearea contextului de autentificare
export const authContext = createContext(initialState);

// Reducer pentru gestionarea autentificării
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        role: null,
        token: null,
      };
    default:
      return state;
  }
};

// Provider pentru contextul de autentificare
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Debugging pentru a verifica valorile din localStorage
    // Debugging pentru a verifica starea curentă a rolului
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('token', state.token);
    localStorage.setItem('role', state.role);
  }, [state.user, state.token, state.role]);

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
