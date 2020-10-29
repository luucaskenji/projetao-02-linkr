import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { UserDataContext } from '../contexts/UserData';
import TrendingItem from '../components/TrendingItem';

export default function Trending() {
    const { userData } = useContext(UserDataContext);
    const [trendingTopics, setTrendingTopics] = useState([]);

    useEffect(() => {
        axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending', userData.config)
            .then(r => {
                console.log(r);
                setTrendingTopics(r.data.hashtags);
            })
            .catch(() => {
                alert('Houve uma falha ao obter os trendings, por favor atualize a página')
            });
    }, []);

    if (trendingTopics.length === 0){
        return(
            <h1>Loading...</h1>
        ); 
    }
    return(
        <>
            <h3>trending</h3>
            <Container>
                {trendingTopics.map(h => <TrendingItem key={h.id} name={h.name} />)}
            </Container>
        </>
    );
}

const Container = styled.ol`
    margin: 20px 15px;
`;