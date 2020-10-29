import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { PagesContext } from '../contexts/PagesContext';

export default function TrendingItem(props) {
    const { goToHashtag } = useContext(PagesContext);
    const history = useHistory();    

    const hashtagUrl = `/hashtag/${props.name}`;
    return (
        <Items>
            
            <span onClick={() => goToHashtag(`#${props.name}`, history)}># {props.name}</span>
           
        </Items>
    );
}

const Items = styled.li`
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 15px;
`;