import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ReactHashtag from 'react-hashtag';
import Modal from 'react-modal';
import { FaTrash } from 'react-icons/fa';
import { TiPencil } from 'react-icons/ti';

import Likes from '../components/Likes';

import { PagesContext } from '../contexts/PagesContext';
import { UserDataContext } from '../contexts/UserData';

export default function Post({ post }) {
    const { setSelectedUser, setSelectedHashtag, reloadTL, setReloadTL } = useContext(PagesContext);
    const { userData } = useContext(UserDataContext);    

    const [edit, setEdit] = useState(false);    
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState(post.text);
    const [showingModal, setShowingModal] = useState(false);

    const history = useHistory();
    const txtEdit = useRef();

    Modal.setAppElement('#root');

    const test = e => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}`, { text }, userData.config)
            .then(() => {
                setLoading(false);
                setEdit(!edit);
            })
            .catch(() => {
                alert('Erro ao editar');
                setLoading(false);
            })
    }
    useEffect(() => {
        if(edit){
            txtEdit.current.value = "";
            txtEdit.current.focus();
            txtEdit.current.value = text;
        }
    }, [edit]);

        
    const goToHashtag = hashtagValue => {
        setSelectedHashtag(hashtagValue.split('#')[1]);
        history.push(`/hashtag/${hashtagValue.split('#')[1]}`);
    }


    const deletePost = () => {
        if (loading) return;
        setLoading(true);

        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}`, userData.config)
            .then(() => {
                setLoading(false);
                setReloadTL(!reloadTL);
            })
            .catch(() => {
                setLoading(false);
                alert('Não foi possível excluir o post');
            })
    }
    
    return (
        <Container>
            <div>
                <Link to={`/user/${post.user.id}`}>
                    <img onClick={() => setSelectedUser(post.user)} src={post.user.avatar} />
                </Link>                
                <Likes post={post} />                            
            </div>

            <MessageContainer>
                <div>
                    <div>
                        <Link to={`/user/${post.user.id}`}>
                            <p className='username' onClick={() => setSelectedUser(post.user)}>{post.user.username}</p>
                        </Link>
                        <div>
                            {userData.username === post.user.username && <TiPencil size='15px' color='white' onClick={() => setEdit(!edit)} />}
                            {
                                userData.username === post.user.username && 
                                    <FaTrash 
                                        size='15px'
                                        color='white'
                                        onClick={() => setShowingModal(true)}
                                    />
                            }
                        </div>
                    </div>

                    {edit
                        ? <form onSubmit={test}><input defaultValue={text} ref={txtEdit} disabled={loading} onChange={e => setText(e.target.value)} /></form> 
                        : <p className="lightgray-font big"><ReactHashtag onHashtagClick={goToHashtag}>{text}</ReactHashtag></p>
                    } 
                                        
                    <Modal style={ModalStyle} isOpen={showingModal}>
                        <ModalContainer>
                            {loading ? <div><img src='/images/loading.svg' /></div> : <span>Tem certeza que deseja excluir a publicação?</span>}
                            <ModalButtons loading={loading}>
                                <button onClick={() => setShowingModal(false)}>
                                    Não, voltar
                                </button>

                                <button onClick={deletePost}>
                                    Sim, excluir
                                </button>
                            </ModalButtons>
                        </ModalContainer>
                    </Modal>

                    <p className="lightgray-font big">
                        <ReactHashtag onHashtagClick={goToHashtag}>{post.text}</ReactHashtag>
                    </p>

                </div>

                <LinkContainer onClick={() => window.open(`${post.link}`, '_blank')}>
                    <div>
                        <p className='lightgray-font big'>{post.linkTitle}</p>
                        <p className='gray-font small'>{post.linkDescription}</p>
                        <p className='lightgray-font small'>{post.link}</p>
                    </div>

                    <img src={post.linkImage} />
                </LinkContainer>
            </MessageContainer>
        </Container>
    );
}



const Container = styled.li`
    padding: 15px;
    border-radius: 16px;
    background-color: #171717;
    display: flex;
    word-break: break-all;
    font-family: 'Lato', sans-serif;

    @media (max-width: 800px) { border-radius: 0; }

    & > div:first-child {
        margin-right: 10px;
        text-align: center;

        img {
            width: 50px;
            border-radius: 50%;
        }

        p{
            color: #FFF;
        }
    }
`;

const MessageContainer = styled.div`
    width: 100%;

    span { color: white; font-weight: bold; cursor: pointer; }

    & > div:first-child {
        div {
            display: flex;
            justify-content: space-between;
        }

        p { margin-bottom: 14px; }
    }

    .username {
        font-size: 19px;
        color: white;
    }
    
    .lightgray-font { color: #B7B7B7; }
    .gray-font { color: #9B9595; } 
    .big { font-size: 16px; }
    .small { font-size: 12px; }

    input {
        background-color: #EFEFEF;
        padding: 8px;
        width: 100%;
        border-radius: 5px;
        outline: none;
        border: none;
        font-size: 15px;
        margin-bottom: 12px;
        font-family: 'Lato', sans-serif;
        resize: none;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    border: 1px solid #4D4D4D;
    border-radius: 16px;
    width: 100%;
    height: 155px;
    cursor: pointer;
    
    p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        margin-bottom: 4px;              
    }

    img {
        width: 50%;
        object-fit: cover;
        margin-left: 6px;
        border-radius: 0 16px 16px 0;
    }
    
    div {
        width: 50%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

const ModalContainer = styled.div`
    background-color: #333333;
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 597px;
    height: 262px;
    font-family: 'Lato', 'sans-serif';
    border-radius: 50px;

    div {
        margin: 0 auto;

        img { width: 35px; }
    }

    span {
        font-size: 30px;
        color: white;
        margin-bottom: 18px;
        text-align: center;
    }
`;

const ModalButtons = styled.div`
    display: flex;
    justify-content: center;

    button:first-child {
        background-color: ${({ loading }) => loading ? 'lightgray' : 'white'};
        color: ${({ loading }) => loading ? 'white' : '#1877F2'};
        padding: 8px 12px;
        margin-right: 20px;
        font-size: 17px;
        border-radius: 5px;
    }

    button:last-child {
        background-color: ${({ loading }) => loading ? 'lightgray' : '#1877F2'};
        color: white;
        padding: 5px 10px;
        margin-left: 20px;
        font-size: 17px;
        border-radius: 5px;
    }
`;

const ModalStyle = {
    overlay: {
        'width': '100vw',
        'height': '100vh',
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center'
    },
    content: {
        'background': 'none',
        'border': 'none',
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center'
    }
}