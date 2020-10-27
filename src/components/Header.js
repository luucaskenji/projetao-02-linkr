import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserDataContext } from '../contexts/UserData';

export default function Header () {
    const { userData } = useContext(UserDataContext);

    return (
        <HeaderStyle>
            <span>linkr</span>
            <div>
                <img src={userData.avatar} />
            </div>
        </HeaderStyle>
    );
}

const HeaderStyle = styled.header`
    width: 100%;
    height: 72px;
    background-color: #151515;
    position: fixed;
    left: 0;
    top: 0;
    font-size: 49px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-family: 'Passion One', cursive;

    div { 
        height: 100%; 

        img {
            height: 100%;
            width: auto;
            border-radius: 50%;
        }
    }
`;
