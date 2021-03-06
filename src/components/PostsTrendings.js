import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Post from '../components/Post';
import Trending from '../components/Trending';
import ToPost from '../components/ToPost';

import { UserDataContext } from '../contexts/UserData';
import { PagesContext } from '../contexts/PagesContext';

export default function PostsTrendings({ loading }) {
    const { userData, following } = useContext(UserDataContext);
    const { posts } = useContext(PagesContext);
    const currentRoute = useLocation();

    const checkLoading = () => {
        if (loading) {
            return (
                <LoadingContainer>
                    <img src='/images/loading.svg' />
                </LoadingContainer>
            );
        }
        else if (posts.length === 0 ){
            return (
                <LoadingContainer>
                    <h3>Nenhum post encontrado</h3>
                </LoadingContainer>
            );
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
                        {
                            currentRoute.pathname === '/timeline' && following.length === 0
                                ? 'Parece que você não segue ninguém ainda. Procure por perfis na busca!'
                                : checkLoading()
                        }
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

const LoadingContainer = styled.div`
    text-align: center;
    color: white;
    font-size: 20px;
    font-family: 'Lato', sans-serif;
    padding-top: 20px;

    img { width: 50px; }
`;

const TrendingTopics = styled.aside`
    width: 30%;
    background-color: #171717;
    color: white;
    border-radius: 16px;
    height: 430px;

    h3{
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        padding: 20px 15px;
        border-bottom: 1px solid #484848;
    }

    @media (max-width: 800px) {
        display: none;
    }
`;