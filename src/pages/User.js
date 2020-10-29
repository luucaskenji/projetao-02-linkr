import React, { useContext, useEffect } from 'react';

import { Container } from '../styles/PostsElements';

import Header from '../components/Header';
import PostsTrendings from '../components/PostsTrendings';

import { PagesContext } from '../contexts/PagesContext';

export default function User(){
    const { url, setUrl } = useContext(PagesContext);
    const {selectedUser} = useContext(PagesContext);


    useEffect(() => {
        setUrl(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${selectedUser}/posts?offset=0&limit=5`);
    }, [selectedUser]);

    if(url.length === 0){
        return <img src='/images/loading.svg' />;
    }
        
    return (
        <>
            <Header />
    
            <Container>
                <main>
                    <div>
                        <h2>{selectedUser}'s posts</h2>
                    </div>

                    <PostsTrendings />
                    
                </main>
            </Container>
        </>
    );
}