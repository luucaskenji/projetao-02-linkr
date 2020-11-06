import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { Container } from '../styles/PostsElements';
import Header from '../components/Header';
import PostsTrendings from '../components/PostsTrendings';
import Search from '../components/Search';
import { UserDataContext } from '../contexts/UserData';
import { PagesContext } from '../contexts/PagesContext';

export default function MyLikes(){
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserDataContext);
    const { setPosts } = useContext(PagesContext);

    useEffect(() => {
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/liked`, userData.config)
            .then(r => {      
                setLoading(false);
                setPosts(r.data.posts);                
            })
            .catch(() => {
                alert('Houve uma falha ao obter os posts, por favor atualize a página')
            });
    }, []);
        
    return (
        <>
            <Header />
    
            <Container>
                <main>
                    <Search />
                    <div>
                        <h2>my likes</h2>
                    </div>

                    <PostsTrendings loading={loading} />
                    
                </main>
            </Container>
        </>
    );
}