import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Container } from '../styles/PostsElements';
import Header from '../components/Header';
import PostsTrendings from '../components/PostsTrendings';
import { UserDataContext } from '../contexts/UserData';
import { PagesContext } from '../contexts/PagesContext';

export default function User(){
    const { selectedUser, setPosts } = useContext(PagesContext);
    const { userData, following, setFollowing } = useContext(UserDataContext);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingFollow, setLoadingFollow] = useState(false);
    
    const userIsFollowing = following.includes(selectedUser.username);

    useEffect(() => {
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${selectedUser.id}/posts?offset=0&limit=5`, userData.config)
            .then(r => {      
                setLoadingPosts(false);
                setPosts(r.data.posts);                
            })
            .catch(() => {
                alert('Houve uma falha ao obter os posts, por favor atualize a página')
            });
    }, []);

    const followUnfollow = () => {
        if (loadingFollow) return;
        setLoadingFollow(true);

        if (userIsFollowing) {
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${selectedUser.id}/unfollow`, null, userData.config)
                .then(() => {
                    const newFollowingUsers = following.filter(username => username !== selectedUser.username);
                    setFollowing(newFollowingUsers);
                    setLoadingFollow(false);
                });
        }
        else {
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${selectedUser.id}/follow`, null, userData.config)
                .then(() => {
                    setFollowing([...following, selectedUser.username]);
                    setLoadingFollow(false);
                });
        }
    }
        
    return (
        <>
            <Header />
    
            <Container>
                <main>
                    <div>
                        <h2>{selectedUser.username}'s posts</h2>
                        {userData.username !== selectedUser.username && (
                            <FollowButton userIsFollowing={userIsFollowing} onClick={followUnfollow} >
                                { userIsFollowing ? "Following" : "Follow" }
                            </FollowButton>
                        )}
                    </div>

                    <PostsTrendings loading={loadingPosts} />
                    
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