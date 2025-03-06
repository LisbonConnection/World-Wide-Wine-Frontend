import { createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider(props){


    return (

        <>
        <ThemeContext.Provider value={{theme: "dark"}}>
           {props.children}
        </ThemeContext.Provider>
        
        </>
       
    );
}

export default ThemeProvider
export { ThemeContext };