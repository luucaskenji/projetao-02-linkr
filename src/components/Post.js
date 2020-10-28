import React from 'react';
import styled from 'styled-components';

export default function Post({ post }) {
    return (
        <Container>
            <div>
                <img src={post.user.avatar} />
            </div>

            <MessageContainer>
                <div>
                    <p className='username'>{post.user.username}</p>
                    <p className='lightgray-font big'>{post.text}</p>
                </div>

                <div>
                    <div>
                        <p className='lightgray-font big'>{post.linkTitle}</p>
                        <p className='gray-font small'>{post.linkDescription}</p>
                        <p className='lightgray-font small'>{post.link}</p>
                    </div>

                    <img src={post.linkImage} />
                </div>
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

    & > div:first-child p {
        margin-bottom: 14px;
    }

    & > div:last-child {
        display: flex;
        border: 1px solid #4D4D4D;
        border-radius: 16px;
        width: 100%;
        height: 195px;
        
        p {
            line-clamp: 3;    
            margin-bottom: 4px;              
        }

        img { 
            height: 100%; 
            margin-left: 6px;
            border-radius: 0 16px 16px 0;
        }
        
        div {
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
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