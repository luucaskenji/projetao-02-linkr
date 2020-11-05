import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserDataContext = createContext();

export default function UserDataProvider({ children }) {
    const [userData, setUserData] = useState({});
    const [following, setFollowing] = useState([]);

    const getUserData = data => {
        const config = {
            headers: {
                'user-token': data.token
            }
        };

        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows`, config)
            .then(r => {
                const usernames = [];

                r.data.users.forEach(u => usernames.push(u.username));

                setFollowing([...usernames]);
            })
            .catch(() => alert('Não foi possível coletar usuários que você segue'));

        setUserData(
            { 
                config, 
                avatar: data.user.avatar, 
                username: data.user.username, 
                myId: data.user.id
            }
        );
    }
    
    return (
        <UserDataContext.Provider value={{userData, getUserData, setUserData, following, setFollowing}}>
            {children}
        </UserDataContext.Provider>
    );
}