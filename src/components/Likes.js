import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import styled from 'styled-components';

import { UserDataContext } from '../contexts/UserData';

export default function Likes({post}){
    const { userData } = useContext(UserDataContext);  
    const [isClicked, setIsClicked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes.length);
    const currentRoute = useLocation();
   
    const sendLikeToServe = id => {
        
        setIsClicked(!isClicked);

        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${id}/like`, null, userData.config)
        .then(r => {
            const likeData = r.data.post.likes;
            setLikesCount(likeData.length);
        })
        .catch(err => {
            alert('Houve uma falha ao postar like')
        });    
    }
    const sendDislikeToServe = id => {
        
        setIsClicked(!isClicked);

        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${id}/dislike`, null, userData.config)
        .then(r => {
            const likeData = r.data.post.likes;
            setLikesCount(likeData.length);
        })
        .catch(err => {
            alert('Houve uma falha ao postar like')
        });    
    }
    
    if(currentRoute.pathname === '/my-likes'){
        return (
            <IconContainer isClicked={!isClicked}>
                {!isClicked
                    ? <IoIosHeart  onClick={() => sendDislikeToServe(post.id)}/> 
                    : <IoIosHeartEmpty onClick={() => sendLikeToServe(post.id)}/>
                }
                <p>{likesCount}</p>   
            </IconContainer>            
        );
    };

    return (
        <IconContainer isClicked={isClicked}>
            {isClicked
                ? <IoIosHeart  onClick={() => sendDislikeToServe(post.id)}/> 
                : <IoIosHeartEmpty onClick={() => sendLikeToServe(post.id)}/>
            }
            <p>{likesCount}</p>
        </IconContainer>        
    );
}

const IconContainer = styled.div`
    margin-top: 15px; 
    transition: all 150ms linear;
    color: ${props => props.isClicked ? `red` : `white`};
    cursor: pointer;
    font-size: 30px;

    p{
        font-size: 15px;
    }
`;