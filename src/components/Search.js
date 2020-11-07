import React, { useContext, useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';

import { UserDataContext } from '../contexts/UserData';
import { PagesContext } from '../contexts/PagesContext';
import UsersSearched from './UsersSearched';

export default function Search(){
    const { userData } = useContext(UserDataContext);
    const { searchText, setSearchText, searchBox, setSearchBox} = useContext(PagesContext);
    const [followingList, setFollowingList] = useState([]);
    const [unfollowingList, setUnfollowingList] = useState([]);

    useEffect(() => {
        const following = [];
        const unfollowing = [];

        searchText && axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${searchText}`, userData.config)
            .then(r => {
                r.data.users.map(u => {
                    if(u.isFollowingLoggedUser){
                        following.push(u)
                    } else {
                        unfollowing.push(u)
                    }
                })
                setFollowingList(following)
                setUnfollowingList(unfollowing)
            })
            .catch(() => {
                alert('Houve uma falha ao pesquisar usuarios')
            });
    }, [searchText]);

    return(
        <SearchContainer>
            <div>
                <DebounceInput 
                    minLength={3} 
                    debounceTimeout={300} 
                    forceNotifyOnBlur={false} 
                    onChange={e => setSearchText(e.target.value)} 
                    value={searchText} 
                    placeholder='Search for people and friends' 
                    onFocus={() => setSearchBox(true)}
                />
                <AiOutlineSearch size='25px'/>
            </div>
            { searchBox && searchText && <ul>{followingList.map(u => <UsersSearched key={u.id} user={u}/>)}</ul> }
            { searchBox && searchText && unfollowingList.length > 0 && <ul>{unfollowingList.map(u => <UsersSearched key={u.id} user={u}/>)}</ul> }
        </SearchContainer>
    );
}

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Lato', sans-serif;
    flex-direction: column;
    width: 30vw;
    background: #E7E7E7;
    border-radius: 8px;
    font-size: 19px;
    height: 100%;
    color: #515151;

    div{
        display: flex;
        align-items: center;
        background: #FFF;
        width: 100%;
        border-radius: 8px;
        height: 100%;
        padding-right: 5px;
    }
    input{
        height: 100%;
        border-radius: 8px;
        padding: 5px;
        font-family: 'Lato', sans-serif;
        font-size: 19px;
        outline: none;
        border: none;
        flex-grow: 1;
    }
    ul{
        background: #E7E7E7;
        width: 100%;
    }
    ul:last-child{
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    @media (max-width: 800px) {
        display: none;
        width: 100%;
        position: relative;
        height: 45px;
        margin-bottom: 15px;

        * {
            font-size: 17px;
        }
        ul{
            position: absolute;
            top: 40px;
        }
    }
`;