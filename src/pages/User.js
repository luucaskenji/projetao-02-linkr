import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Container } from '../styles/PostsElements';
import Header from '../components/Header';
import PostsTrendings from '../components/PostsTrendings';
import { UserDataContext } from '../contexts/UserData';
import { PagesContext } from '../contexts/PagesContext';

export default function User(){
    const { selectedUser, setPosts, following, setFollowing } = useContext(PagesContext);
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserDataContext);
    let userIsFollowing;

    useEffect(() => {
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${selectedUser.id}/posts?offset=0&limit=5`, userData.config)
            .then(r => {      
                setLoading(false);
                setPosts(r.data.posts);                
            })
            .catch(() => {
                alert('Houve uma falha ao obter os posts, por favor atualize a página')
            });
        
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows`, userData.config)
            .then(r => {
                let usernames = [];

                r.data.users.forEach(u => {
                    usernames.push(u.username);
                });

                setFollowing({usernames, data: [...r.data.users]});
                
                userIsFollowing = following.usernames.includes(selectedUser.username);
            })
            .catch(() => alert('Não foi possível coletar usuários que você segue'));
    }, [selectedUser]);
        
    return (
        <>
            <Header />
    
            <Container>
                <main>
                    <div>
                        <h2>{selectedUser.username}'s posts</h2>
                        {userData.username !== selectedUser.username && (
                            <FollowButton userIsFollowing={userIsFollowing} >
                                {
                                    userIsFollowing
                                        ? "Seguindo"
                                        : "Seguir"
                                }
                            </FollowButton>
                        )}
                    </div>

                    <PostsTrendings loading={loading} />
                    
                </main>
            </Container>
        </>
    );
}

const FollowButton = styled.button`
    width: 80px;
    text-align: center;
    padding: 8px 0;
    color: ${({ userIsFollowing }) => userIsFollowing ? '#1877F2' : 'white'};
    background-color: ${({ userIsFollowing }) => userIsFollowing ? 'white' : '#1877F2'};
    border-radius: 5px;
`;