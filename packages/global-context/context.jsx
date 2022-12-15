import * as React from "react"
import reducer  from "./reducer";
const {
    createContext,
    useContext,
    useReducer
} = React;

const GlobalContext = createContext();
const { Provider } = GlobalContext;

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, {
        message: "You've got state"
    });
    return <Provider value={[state, dispatch]} {...props} />
}