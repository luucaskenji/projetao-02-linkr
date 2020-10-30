import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { PagesContext } from '../contexts/PagesContext';

export default function ToPost({ userData }) {
    const { setPosts, posts } = useContext(PagesContext);
    const [link, setLink] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const postOnServer = e => {
        e.preventDefault();

        if (loading) return;

        if (!link) {
            alert('Campo de link obrigatório');
            return;
        }
        setLoading(true);
        
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts', { link, text }, userData.config)
            .then(() => {
                setLink('');
                setText('');
                setLoading(false);
                setPosts([...posts]);
            })
            .catch(() => {
                alert('Erro ao publicar');
                setLoading(false);
            })
    }
    return (
        <Container>
            <div><img src={userData.avatar} /></div>
            <div>
                <p>O que você tem para favoritar hoje?</p>
                <form onSubmit={postOnServer} >
                    <input 
                        placeholder='http://...' 
                        onChange={e => setLink(e.target.value)} 
                        value={link}
                        disabled={loading}
                    />
                    <input 
                        placeholder='Muito irado esse link falando de #javascript' 
                        onChange={e => setText(e.target.value)}
                        value={text} 
                        disabled={loading}
                    />
                    <button type='submit'>{loading ? 'Publicando...' : 'Publicar'}</button>
                </form>
            </div>
        </Container>
    );
}
const Container = styled.div`
    width: 100%;
    background-color: white;
    padding: 15px;
    font-family: 'Lato', sans-serif;
    display: flex;
    border-radius: 16px;
    margin-bottom: 25px;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.6);

    @media (max-width: 800px) { border-radius: 0; }    

    div:last-child { 
        flex-grow: 1;

        @media (max-width: 800px) { 
            text-align: center; 
            line-height: 25px;
        }
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;

        input {
            background-color: #EFEFEF;
            padding-left: 8px;
            width: 100%;
            border-radius: 5px;
            outline: none;
            border: none;
            font-size: 15px;
            margin-bottom: 12px;
            height: 86px;
            font-family: 'Lato', sans-serif;
        }

        input:first-child { height: 30px; }
    }

    p { 
        font-size: 17px; 
        margin-bottom: 12px;
    }

    img {
        width: 50px;
        border-radius: 50%;
        margin-right: 10px;

        @media (max-width: 800px) { display: none; }
    }

    button {
        font-family: 'Lato', 'sans-serif';
        background: #1877F2;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 30px;
        color: white;
        border-radius: 5px;
        align-self: flex-end;

        @media (max-width: 800px) { align-self: center; }
    }
`;