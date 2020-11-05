import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';

import { UserDataContext } from '../contexts/UserData';
import { PagesContext } from '../contexts/PagesContext';

import UsersSearched from '../components/UsersSearched';

import { FaSearch } from 'react-icons/fa';

export default function Header () {
    const { userData, setUserData } = useContext(UserDataContext);
    const { goToMyPosts } = useContext(PagesContext);
    const [isVisible, setIsVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchBox, setSearchBox] = useState(false);
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {    
        searchText && axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${searchText}`, userData.config)
            .then(r => {
                console.log(r.data.users)
                setUsersList(r.data.users)                
            })
            .catch(() => {
                alert('Houve uma falha ao pesquisar usuarios')
            });
    }, [searchText]);
    
    console.log(searchText)
    return (
        <HeaderStyle>
            <span>linkr</span>
            <SearchContainer>
                <DebounceInput 
                    minLength={2} 
                    debounceTimeout={300} 
                    forceNotifyOnBlur={false} 
                    onChange={e => setSearchText(e.target.value)} 
                    value={searchText} 
                    placeholder='Search for people and friends' 
                    onFocus={() => setSearchBox(true)} 
                    onBlur={() => setSearchBox(false)} 
                />
                { searchText && <ul>{usersList.map(u => <UsersSearched key={u.id} user={u}/>)}</ul> }
            </SearchContainer>
            <div>
                <IconContainer isVisible={isVisible} onClick={() => setIsVisible(!isVisible)}>
                    <IoIosArrowDown size='25px' />
                </IconContainer>

                <Menu isVisible={isVisible}>
                    <li onClick={goToMyPosts} >
                        <Link to='/my-posts'>
                            My posts
                        </Link>
                    </li>
                    <li>
                        <Link to='/my-likes'>
                            My likes
                        </Link>
                    </li>
                    <li onClick={() => setUserData({})}>
                        <Link to='/'>Logout</Link>
                    </li>
                </Menu>

                <img onClick={() => setIsVisible(!isVisible)} src={userData.avatar} />
            </div>
        </HeaderStyle>
    );
}
const SearchContainer = styled.div`
    font-family: 'Lato', sans-serif;
    flex-direction: column;
    width: 30vw;
    background: #E7E7E7;
    border-radius: 8px;
    font-size: 19px;
    height: 45px;
    color: #515151;

    input{
        height: 45px;
        width: 100%;
        border-radius: 8px;
        padding: 5px 10px;
        font-family: 'Lato', sans-serif;
        font-size: 19px;
        outline: none;
        border: none;
    }
    ul, p{
        background: #E7E7E7;
        width: 100%;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
`;

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
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.8);

    & > div { 
        
        display: flex;
        align-items: center;
    }

    & > div:last-child { 
        height: 100%; 
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