import { createContext, useState } from "react"

export const GlobalContext = createContext();

const CreateProvider = ({ children }) => {

    const [data, setData] = useState([]);

    return(
        <GlobalContext.Provider value={{data, setData}}>
            {children}
        </GlobalContext.Provider>
    )

}

export default CreateProvider;