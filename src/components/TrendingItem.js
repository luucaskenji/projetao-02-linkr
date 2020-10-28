import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function TrendingItem(props) {
    const url = `/hashtag/${props.name}`;
    return (
        <Items>
            <Link to={url}>
                <span># {props.name}</span>
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