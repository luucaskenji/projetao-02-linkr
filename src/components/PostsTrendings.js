import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Post from '../components/Post';
import Trending from '../components/Trending';
import ToPost from '../components/ToPost';

import { UserDataContext } from '../contexts/UserData';
import { PagesContext } from '../contexts/PagesContext';

export default function PostsTrendings({ loading }) {
    const { userData } = useContext(UserDataContext);
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

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;

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
        font-weight: 700;
        font-size: 27px;
        padding: 20px 15px;
        border-bottom: 1px solid #484848;
    }
`;