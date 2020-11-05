import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { PagesContext } from '../contexts/PagesContext';

export default function UsersSearched({user}){
    const { setSelectedUser } = useContext(PagesContext);
    
    return(
        <Item>
            <Link to={`/user/${user.id}`}>
                <img onClick={() => setSelectedUser(user)} src={user.avatar} />
            </Link>

            <Link to={`/user/${user.id}`}>
                <p onClick={() => setSelectedUser(user)}>{user.username}</p>
            </Link>
            
            {user.isFollowingLoggedUser && <span>• following</span>}
        </Item>
    ); 
}

const Item = styled.li`
    display: flex;
    align-items: center;
    padding: 5px;
    
    & *{
        margin-right: 10px;
    }
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    span{
        color: #C5C5C5;
    }
`;