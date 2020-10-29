import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { PagesContext } from '../contexts/PagesContext';

export default function TrendingItem(props) {
    const { setSelectedHashtag } = useContext(PagesContext);
    const history = useHistory();

    const goToHashtag = hashtagValue => {
        setSelectedHashtag(hashtagValue.split('#')[1]);
        history.push(`/hashtag/${hashtagValue.split('#')[1]}`)
    }

    return (
        <Items> 
            <span onClick={() => goToHashtag(`#${props.name}`)}># {props.name}</span>           
        </Items>
    );
}

const Items = styled.li`
    font-family: 'Lato', 'sans-serif';
    font-size: 19px;
    font-weight: bold;
    margin-bottom: 15px;
    cursor: pointer;
`;