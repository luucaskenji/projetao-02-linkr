import React, { createContext, useState } from 'react';

export const PostsContext = createContext();

export default function PostsProvider({ children }) {
    const [posts, setPosts] = useState([]);

    return (
        <PostsContext.Provider value ={{posts, setPosts}}>
            {children}
        </PostsContext.Provider>
    );
}