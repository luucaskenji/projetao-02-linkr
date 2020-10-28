import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';


import { UserDataContext } from '../contexts/UserData';
import TrendingItem from '../components/TrendingItem';

TrendingItem

export default function Trending() {
    const { userData } = useContext(UserDataContext);
    const  [hashtags, setHashtags] = useState([]);

    useEffect(() => {
        axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending', userData.config)
            .then(r => {
                setHashtags(r.data.hashtags);
            })
            .catch(() => {
                alert('Houve uma falha ao obter os trendings, por favor atualize a página')
            });
    }, []);

    if (hashtags){
        if(hashtags.length === 0){
            return(
                <h1>Loading...</h1>
            ); 
        }
        
    } else{
        return(
        <h1>Loading...</h1>
        );        
    }

    return(
        <>
            <h3>trending</h3>
            <ol>
                {hashtags.map(h => <TrendingItem key={h.id} name={h.name} />)}
            </ol>
        </>
    );
}

