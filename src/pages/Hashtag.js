import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from '../styles/PostsElements';
import Header from '../components/Header';
import PostsTrendings from '../components/PostsTrendings';
import { UserDataContext } from '../contexts/UserData';
import { PagesContext } from '../contexts/PagesContext';

export default function Hashtag(){
    const { selectedHashtag, setPosts, setReloadTL } = useContext(PagesContext);
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserDataContext);

    useEffect(() => {
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/${selectedHashtag}/posts?offset=0&limit=5`, userData.config)
            .then(r => {      
                setLoading(false);
                setPosts(r.data.posts);                
            })
            .catch(() => {
                alert('Houve uma falha ao obter os posts, por favor atualize a página')
            });
    }, [selectedHashtag, setReloadTL]);
        
    return (
        <>
            <Header />
    
            <Container>
                <main>
                    <div>
                        <h2># {selectedHashtag}</h2>
                    </div>

                    <PostsTrendings loading={loading} />
                    
                </main>
            </Container>
        </>
    );

}