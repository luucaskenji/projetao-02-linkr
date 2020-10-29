import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { UserDataContext } from '../contexts/UserData';
import { PagesContext } from '../contexts/PagesContext';


export default function Header () {
    const { userData, setUserData } = useContext(UserDataContext);
    const [isVisible, setIsVisible] = useState(false);
    const { goToMyPosts } = useContext(PagesContext);

    return (
        <HeaderStyle>
            <span>linkr</span>
            <div>
                <IconContainer isVisible={isVisible} onClick={() => setIsVisible(!isVisible)}>
                    <IoIosArrowDown size='25px' />
                </IconContainer>

                <Menu isVisible={isVisible}>
                    <li onClick={goToMyPosts}>
                        <Link to='/my-posts'>
                            My posts
                        </Link>
                    </li>
                    <li>My likes</li>
                    <li onClick={() => setUserData({})}>
                        <Link to='/'>Logout</Link>
                    </li>
                </Menu>

                <img onClick={() => setIsVisible(!isVisible)} src={userData.avatar} />
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

    & > div { 
        height: 100%; 
        display: flex;
        align-items: center;

        img {
            height: 100%;
            width: auto;
            border-radius: 50%;
            margin-left: 15px;
            cursor: pointer;
        }
    }
`;

const IconContainer = styled.div`
    transition: all 150ms linear;
    transform: ${props => props.isVisible ? `rotate(180deg)` : `rotate(0)`};
    cursor: pointer;
`;

const Menu = styled.ul`
    width: 120px;
    height: ${props => props.isVisible ? '90px' : '0'};
    padding: ${props => props.isVisible ? '10px 15px' : '0'};
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 72px;
    background: #171717;
    font-size: 18px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    transition: all 150ms linear;
    font-family: 'Lato', sans-serif;
    border-bottom-left-radius: 20px;
`;