import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  name: "",
  email: "",
  password: "",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setName = (name) => dispatch({ type: "SET_NAME", payload: name });
  const setEmail = (email) => dispatch({ type: "SET_EMAIL", payload: email });
  const setPassword = (password) =>
    dispatch({ type: "SET_PASSWORD", payload: password });

  return (
    <UserContext.Provider value={{ state, setName, setEmail, setPassword }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
