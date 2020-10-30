import React, { createContext, useState } from 'react';

export const PagesContext = createContext();

export default function PagesProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [selectedHashtag, setSelectedHashtag] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [reloadTL, setReloadTL] = useState(false);
    const pagesData = {
        posts, 
        setPosts,
        selectedHashtag, 
        setSelectedHashtag, 
        selectedUser, 
        setSelectedUser,
        reloadTL,
        setReloadTL
    }

    return (
        <PagesContext.Provider value ={pagesData}>
            {children}
        </PagesContext.Provider>
    );
}
