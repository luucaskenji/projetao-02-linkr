import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { VscLocation } from 'react-icons/vsc';

import { PagesContext } from '../contexts/PagesContext';

export default function ToPost({ userData }) {
    const { reloadTL, setReloadTL } = useContext(PagesContext);
    const [link, setLink] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [location, setLocation] = useState(false);    

    const geolocation = {
        latitude ,
        longitude
    };
    
    
    const postOnServer = e => {
        e.preventDefault();

        if (loading) return;

        if (!link) {
            alert('Campo de link obrigatório');
            return;
        }
        setLoading(true);
        
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts', { link, text, geolocation }, userData.config)
            .then(() => {
                setLink('');
                setText('');
                setLoading(false);
                setReloadTL(!reloadTL);
            })
            .catch(() => {
                alert('Erro ao publicar');
                setLoading(false);
            })
    }
    const getLocation = () => {
        if( !('geolocation' in navigator) ) {
            alert("Navegador não tem suporte API Geolocation");
        } else {
            setLocation(!location);
            navigator.geolocation.getCurrentPosition(i => {
                setLatitude(i.coords.latitude)
                setLongitude(i.coords.longitude)
            })
        }
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
                    <textarea 
                        placeholder='Muito irado esse link falando de #javascript' 
                        onChange={e => setText(e.target.value)}
                        value={text} 
                        disabled={loading}
                    />
                    <ButtonsContainer location={location}>                        
                        <div onClick={() => getLocation()}>
                            <VscLocation size='18px' />
                            <span>{location ? 'Localização ativada' : 'Localização desativada'}</span>
                        </div>
                        <button type='submit'>{loading ? 'Publicando...' : 'Publicar'}</button>
                    </ButtonsContainer>
                </form>
            </div>
            
        </Container>
    );
}

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    div{
        display: flex;
        align-items: center;
        color: ${props => props.location ? `green` : `black`};
    }
`;

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

        input,textarea {
            background-color: #EFEFEF;
            padding: 8px;
            width: 100%;
            border-radius: 5px;
            outline: none;
            border: none;
            font-size: 15px;
            margin-bottom: 12px;
            height: 86px;
            font-family: 'Lato', sans-serif;
            resize: none;
        }

        input { height: 30px; }
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

