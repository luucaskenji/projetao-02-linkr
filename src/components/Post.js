import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ReactHashtag from 'react-hashtag';

import { PagesContext } from '../contexts/PagesContext';

export default function Post({ post }) {
    const { setSelectedUser, setSelectedHashtag } = useContext(PagesContext);
    const history = useHistory();

    const goToHashtag = hashtagValue => {
        setSelectedHashtag(hashtagValue.split('#')[1]);
        history.push(`/hashtag/${hashtagValue.split('#')[1]}`)
    }

    return (
        <Container>
            <div>
                <Link to={`/user/${post.user.id}`}>
                    <img onClick={() => setSelectedUser(post.user)} src={post.user.avatar} />
                </Link>
            </div>

            <MessageContainer>
                <div>
                    <Link to={`/user/${post.user.id}`}>
                        <p className='username' onClick={() => setSelectedUser(post.user)}>{post.user.username}</p>
                    </Link>
                    <p className="lightgray-font big">
                        <ReactHashtag onHashtagClick={goToHashtag}>{post.text}</ReactHashtag>
                    </p>
                </div>

                <LinkContainer onClick={() => window.open(`${post.link}`, '_blank')}>
                    <div>
                        <p className='lightgray-font big'>{post.linkTitle}</p>
                        <p className='gray-font small'>{post.linkDescription}</p>
                        <p className='lightgray-font small'>{post.link}</p>
                    </div>

                    <img src={post.linkImage} />
                </LinkContainer>
            </MessageContainer>
        </Container>
    );
}

const Container = styled.li`
    padding: 10px;
    border-radius: 16px;
    background-color: #171717;
    display: flex;
    word-break: break-all;
    font-family: 'Lato', sans-serif;

    @media (max-width: 800px) { border-radius: 0; }

    & > div:first-child {
        margin-right: 10px;

        img {
            width: 50px;
            border-radius: 50%;
        }
    }
`;

const MessageContainer = styled.div`
    width: 100%;

    span { color: white; font-weight: bold; cursor: pointer; }

    & > div:first-child p {
        margin-bottom: 14px;
    }

    .username {
        font-size: 19px;
        color: white;
    }
    
    .lightgray-font { color: #B7B7B7; }
    .gray-font { color: #9B9595; } 
    .big { font-size: 16px; }
    .small { font-size: 12px; }
`;

const LinkContainer = styled.div`
    display: flex;
    border: 1px solid #4D4D4D;
    border-radius: 16px;
    width: 100%;
    height: 155px;
    cursor: pointer;
    
    p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        margin-bottom: 4px;              
    }

    img {
        width: 50%;
        object-fit: cover;
        margin-left: 6px;
        border-radius: 0 16px 16px 0;
    }
    
    div {
        width: 50%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;