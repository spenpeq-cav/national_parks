import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)

function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const localUserData = localStorage.getItem("user");
        return localUserData !== null ? JSON.parse(localUserData) : null
    })

    useEffect(() => {
        if(user){
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.clear()
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
