import React, { createContext, useState } from 'react';

export const UserDataContext = createContext();

export default function UserDataProvider({ children }) {
    const [userData, setUserData] = useState({});

    const getUserData = data => {
        const config = {
            headers: {
                'user-token': data.token
            }
        };
        setUserData({ config, avatar: data.user.avatar, username: data.user.username, myId: data.user.id });
    }
    
    return (
        <UserDataContext.Provider value={{userData, getUserData, setUserData}}>
            {children}
        </UserDataContext.Provider>
    );
}