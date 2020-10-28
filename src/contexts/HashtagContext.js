import React, { createContext, useState } from 'react';

export const HashtagContext = createContext();

export default function HashtagProvider({ children }) {
    const [selectedHashtag, setSelectedHashtag] = useState([]);

    return (
        <HashtagContext.Provider value ={{selectedHashtag, setSelectedHashtag}}>
            {children}
        </HashtagContext.Provider>
    );
}