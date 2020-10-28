import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from '../components/Header';

import { UserDataContext } from '../contexts/UserData';
import { HashtagContext } from '../contexts/HashtagContext';

export default function Hashtag(){
    const { userData } = useContext(UserDataContext);
    const {selectedHashtag} = useContext(HashtagContext);
    

    const selectedHashtagUrl = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/${selectedHashtag}/posts?offset=0&limit=2`

    useEffect(() => {
        axios.get(selectedHashtagUrl, userData.config)
            .then(r => {
                console.log(r.data.posts)
            })
            .catch(err => {
                console.log(err)
                alert('Houve uma falha ao obter os posts da hashtag, por favor atualize a página')
            });
    }, []);
        
    return(
        <>
            <Header />
            

        </>
    );
}