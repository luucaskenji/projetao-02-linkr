import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PagesContext } from '../contexts/PagesContext';

export default function TrendingItem(props) {
    const { goToHashtag } = useContext(PagesContext);
    

    const hashtagUrl = `/hashtag/${props.name}`;
    return (
        <Items>
            <Link to={hashtagUrl}>
                <span onClick={() => goToHashtag(props.name)}># {props.name}</span>
            </Link>
        </Items>
    );
}

const Items = styled.li`
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 15px;
`;