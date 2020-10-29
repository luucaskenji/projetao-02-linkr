import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Post from './Post';
import Trending from './Trending';
import ToPost from './ToPost';

import { UserDataContext } from '../contexts/UserData';
import { PagesContext } from '../contexts/PagesContext';

export default function PostsTrendings() {
    const { userData } = useContext(UserDataContext);
    const { url, setPosts, posts } = useContext(PagesContext);

    const currentRoute = useLocation()
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPosts();        
        axios.get(url, userData.config)
            .then(r => {                
                setLoading(false);
                setPosts(r.data.posts);                
            })
            .catch(() => {
                alert('Houve uma falha ao obter os posts, por favor atualize a página')
            });
    }, [url]);

    const checkLoading = () => {
        if (loading || !posts) {
            return <img src='/images/loading.svg' />
        }
        else if (posts.length === 0 ){
            return 'Nenhum post encontrado';
        }
        else {
            return posts.map(p => <Post key={p.id} post={p} />)
        }
    }

    return(
        <div>
            <div>
                {currentRoute.pathname === '/timeline' && <ToPost userData={userData}/>}
                <PostContainer>
                    <ul>
                        {checkLoading()}
                    </ul>
                </PostContainer>
            </div>

            <TrendingTopics>
                <Trending />
            </TrendingTopics>
        </div>
    );

}

const PostContainer = styled.div `
    width: 100%;

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