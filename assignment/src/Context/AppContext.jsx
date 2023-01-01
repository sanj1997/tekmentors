import React, { useState } from "react"

export const AppContext=React.createContext()

function AppContextProvider({children}){
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)
    const [output,setOutput]=useState(0)
    return <AppContext.Provider
    value={{data,setData,loading,setLoading,error,setError,output,setOutput}}
    >{children}</AppContext.Provider>
}

export default AppContextProvider