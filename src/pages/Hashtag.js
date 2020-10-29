import React, { useContext, useEffect } from 'react';
import { Container } from '../styles/PostsElements';

import Header from '../components/Header';
import PostsTrendings from '../components/PostsTrendings';

import { PagesContext } from '../contexts/PagesContext';

export default function Hashtag(){
    const { url, selectedHashtag } = useContext(PagesContext);

    if(url.length === 0){
        return <img src='/images/loading.svg' />;
    }
        
    return (
        <>
            <Header />
    
            <Container>
                <main>
                    <div>
                        <h2># {selectedHashtag}</h2>
                    </div>

                    <PostsTrendings />
                    
                </main>
            </Container>
        </>
    );

}