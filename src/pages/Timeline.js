import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from '../components/Header';
import Post from '../components/Post';
import Trending from '../components/Trending';


import { UserDataContext } from '../contexts/UserData';
import { PostsContext } from '../contexts/PostsContext';

export default function Timeline() {
    const { userData } = useContext(UserDataContext);
    const { setPosts, posts } = useContext(PostsContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=10', userData.config)
            .then(r => {
                setPosts(r.data.posts);
                setLoading(false);
            })
            .catch(() => {
                alert('Houve uma falha ao obter os posts, por favor atualize a página')
            });
    }, []);

    const checkLoading = () => {
        if (loading) {
            return <img src='/images/loading.svg' />
        }
        else if (posts.length === 0 ){
            return 'Nenhum post encontrado';
        }
        else {
            return posts.map(p => <Post key={p.id} post={p} />)
        }
    }

    return (
        <>
            <Header />
    
            <Container>
                <main>
                    <div>
                        <h2>timeline</h2>
                    </div>

                    <div>
                        <PostContainer>
                            <ul>
                                {checkLoading()}
                            </ul>
                        </PostContainer>
    
                        <TrendingTopics>
                            <Trending />
                        </TrendingTopics>
                    </div>
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

    main { 
        width: 75vw; 

        & > div:last-child {
            display: flex;
            justify-content:space-between;
        }
    }

    h2 {
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        color: white;
        font-weight: 700;
        letter-spacing: 2px;
        margin-bottom: 25px;
    }
`;

const PostContainer = styled.div `
    width: 65%;

    ul li { margin-bottom: 25px; }

    ul > img {
        width: 50px;
        height: auto;
    }    
`;

const TrendingTopics = styled.aside`
    width: 30%;
    background-color: #171717;
    color: white;
    border-radius: 16px;
    height: 430px;

    h3{
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 27px;
        padding: 20px 15px;
        border-bottom: 1px solid #484848;
    }
`;