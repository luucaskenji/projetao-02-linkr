import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

import { MainPageInput, Form, FormButton } from '../styles/MainPageElements';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const history = useHistory();

    const verifyInput = e => {
        e.preventDefault();

        if (!email || !password || !username || !pictureUrl) {
            alert('Preencha todos os campos');
            return;
        }

        createAccount();
    }

    const createAccount = () => {
        const toServer = {email, password, username, pictureUrl};

        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_up', toServer)
        .then(() => history.push('/timeline'))
        .catch(() => alert('Email inserido já cadastrado'));
    }

    return (
        <Form onSubmit={verifyInput}>
            <MainPageInput placeholder='e-mail' onChange={e => setEmail(e.target.value)} value={email} />
            <MainPageInput placeholder='password' onChange={e => setPassword(e.target.value)} value={password} />
            <MainPageInput placeholder='username' onChange={e => setUsername(e.target.value)} value={username} />
            <MainPageInput placeholder='picture url' onChange={e => setPictureUrl(e.target.value)} value={pictureUrl} />

            <FormButton type='submit'>Sign Up</FormButton>
        </Form>
    );
}