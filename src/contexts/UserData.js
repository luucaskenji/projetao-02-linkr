import React, { createContext, useState } from 'react';

export const UserDataContext = createContext();

export default function UserDataProvider({ children }) {
    const [userData, setUserData] = useState({});

    const getUserData = data => {
        setUserData({ token: data.token, avatar: data.user.avatar, username: data.user.username });
    }

    return (
        <UserDataContext.Provider value={{userData, getUserData}}>
            {children}
        </UserDataContext.Provider>
    );
}