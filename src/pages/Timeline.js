import React, { useContext, useEffect } from 'react';

import { Container } from '../styles/PostsElements';

import Header from '../components/Header';

import { PagesContext } from '../contexts/PagesContext';
import PostsContext from '../contexts/PostsContext';

export default function Timeline() {
    
    const { url, setUrl } = useContext(PagesContext);
    
    useEffect(() => {
        setUrl('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=5');
    }, []);

    if(url.length === 0){
        return <img src='/images/loading.svg' />;
    }

    return (
        <>
            <Header />
    
            <Container>
                <main>
                    <div>
                        <h2>timeline</h2>
                    </div>
                    
                    <PostsContext />
                    
                </main>
            </Container>
        </>
    );
}