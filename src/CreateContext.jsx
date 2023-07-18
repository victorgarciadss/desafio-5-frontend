import { createContext, useState } from "react"

export const GlobalContext = createContext();

const CreateProvider = ({ children }) => {

    const [data, setData] = useState([]);
    const [balancePerTime, setBalancePerTime] = useState([]);
    const [post, setPost] = useState(false)

    return(
        <GlobalContext.Provider value={{data, setData, balancePerTime, setBalancePerTime, post, setPost}}>
            {children}
        </GlobalContext.Provider>
    )

}

export default CreateProvider;