import React, { createContext, useContext, useState } from 'react';

import { UserDataContext } from './UserData';

export const PagesContext = createContext();

export default function PagesProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [selectedHashtag, setSelectedHashtag] = useState([]);
    const [url, setUrl] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]); 
    const { userData } = useContext(UserDataContext);

    const reloadTimeline = () => {
        setUrl();
        setUrl('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=5');
    }

    const goToUser = (iduser, nameuser) => {
        setUrl(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${iduser}/posts?offset=0&limit=5`);
        setSelectedUser(nameuser);
    }

    const goToHashtag = (namehashtag, history) => {
        const splitedHashtag = namehashtag.split('#');
        setUrl(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/${splitedHashtag[1]}/posts?offset=0&limit=5`);
        setSelectedHashtag(splitedHashtag[1]);        
        history.push(`/hashtag/${splitedHashtag[1]}`);
    }

    const goToMyPosts = () => {
        setUrl(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userData.myId}/posts?offset=0&limit=5`);
    }

    const pagesData = {posts, setPosts,selectedHashtag, setSelectedHashtag, url, setUrl, selectedUser, setSelectedUser, goToUser, goToHashtag, goToMyPosts, reloadTimeline}

    return (
        <PagesContext.Provider value ={pagesData}>
            {children}
        </PagesContext.Provider>
    );
}
