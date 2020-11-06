import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactHashtag from 'react-hashtag';
import Modal from 'react-modal';
import { FaTrash } from 'react-icons/fa';
import { TiPencil } from 'react-icons/ti';

import Likes from '../components/Likes';

import { PagesContext } from '../contexts/PagesContext';
import { UserDataContext } from '../contexts/UserData';
import { HeaderPost, Container, MessageContainer, LinkContainer, ModalContainer, ModalButtons, ModalStyle } from '../styles/PostStyle';

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

    const editPost = e => {
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
                setShowingModal(false);
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
                    <HeaderPost>
                        <Link to={`/user/${post.user.id}`}>
                            <p className='username' onClick={() => setSelectedUser(post.user)}>{post.user.username}</p>
                        </Link>
                        <div>
                            {userData.username === post.user.username && <TiPencil size='18px' color='white' onClick={() => setEdit(!edit)} />}
                            {
                                userData.username === post.user.username && 
                                    <FaTrash 
                                        size='15px'
                                        color='white'
                                        onClick={() => setShowingModal(true)}
                                    />
                            }
                        </div>
                    </HeaderPost>

                    {edit
                        ? <form onSubmit={editPost}><input type="textarea" value={text} ref={txtEdit} disabled={loading} onChange={e => setText(e.target.value)} /></form> 
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

