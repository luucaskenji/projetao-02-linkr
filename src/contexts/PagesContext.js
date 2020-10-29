import React, { createContext, useState } from 'react';

export const PagesContext = createContext();

export default function PagesProvider({ children }) {
    

    const [posts, setPosts] = useState([]);

    const [selectedHashtag, setSelectedHashtag] = useState([]);

    const [url, setUrl] = useState([]);

    const [selectedUser, setSelectedUser] = useState([]);
   

    const pagesData = {posts, setPosts,selectedHashtag, setSelectedHashtag, url, setUrl, selectedUser, setSelectedUser}

    return (
        <PagesContext.Provider value ={pagesData}>
            {children}
        </PagesContext.Provider>
    );
}
