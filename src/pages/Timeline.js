import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from '../styles/PostsElements';
import Header from '../components/Header';
import PostsTrendings from '../components/PostsTrendings';
import Search from '../components/Search';
import { PagesContext } from '../contexts/PagesContext';
import { UserDataContext } from '../contexts/UserData';

export default function Timeline() {
    const { userData } = useContext(UserDataContext);
    const { setPosts, reloadTL } = useContext(PagesContext);
    const [loading, setLoading] = useState(true);
<<<<<<< HEAD
    
    useEffect(() => {   
=======

    const refreshTimeline = () => {
>>>>>>> 9f355f1c8f65f679aea48272345a55f627e6319a
        axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/following/posts', userData.config)
            .then(r => {      
                setLoading(false);
                setPosts(r.data.posts);       
            })
            .catch(() => {
                alert('Houve uma falha ao obter os posts, por favor atualize a página')
            });
    }
    
    useEffect(() => {
        refreshTimeline();
            
        const requestsInterval = setInterval(() => refreshTimeline() , 15000);

        return () => clearInterval(requestsInterval);        
    }, [reloadTL]);

    return (
        <>
            <Header />
    
            <Container>
                <main>
                    <Search />
                    <div>
                        <h2>timeline</h2>
                    </div>
                    
                    <PostsTrendings loading={loading} />
                    
                </main>
            </Container>
        </>
    );
}