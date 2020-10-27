import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from '../components/Header';
import { UserDataContext } from '../contexts/UserData';
import { PostsContext } from '../contexts/PostsContext';

export default function Timeline() {
    const { userData } = useContext(UserDataContext);
    const { setPosts, posts } = useContext(PostsContext);

    useEffect(() => {
        const config = {
            headers: {
                'user-token': userData.token
            }
        };

        axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=2', config)
            .then(r => setPosts(r.data.posts))
            .catch(() => {
                alert('Houve uma falha ao obter os posts, por favor atualize a página')
            });
    }, [])

    return (
        <>
            <Header />
    
            <Container>
                <main>
                    <div>
                        <h2>timeline</h2>
                    </div>

                    <ul>

                    </ul>
                </main>
            </Container>
        </>
    );
}

const Container = styled.div`
    width: 100%;
    padding-top: 125px;
    display: flex;
    justify-content: center;
    align-items: center;

    div { 
        width: 100%; 
        text-align: left;
    }

    h2 {
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        color: white;
        font-weight: 700;
        letter-spacing: 2px;
    }
`;