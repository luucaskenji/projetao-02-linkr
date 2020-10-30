import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from '../styles/PostsElements';
import Header from '../components/Header';
import PostsTrendings from '../components/PostsTrendings';
import { PagesContext } from '../contexts/PagesContext';
import { UserDataContext } from '../contexts/UserData';

export default function Timeline() {
    const { userData } = useContext(UserDataContext);
    const { setPosts, reloadTL } = useContext(PagesContext);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {    
        axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=5', userData.config)
            .then(r => {      
                setLoading(false);
                setPosts(r.data.posts);                
            })
            .catch(() => {
                alert('Houve uma falha ao obter os posts, por favor atualize a página')
            });
    }, [reloadTL]);

    return (
        <React.Fragment>
            <Header />
    
            <Container>
                <main>
                    <div>
                        <h2>timeline</h2>
                    </div>
                    
                    <PostsTrendings loading={loading} />
                    
                </main>
            </Container>
        </React.Fragment>
    );
}