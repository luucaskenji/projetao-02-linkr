import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { MainPageInput, Form, FormButton } from '../styles/MainPageElements';
import { UserDataContext } from '../contexts/UserData';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { getUserData } = useContext(UserDataContext);
    const history = useHistory();

    const verifyInput = e => {
        e.preventDefault();

        if (!email || !password) {
            alert('Preencha todos os campos');
            return;
        }

        toTimeline();
    }

    const toTimeline = () => {
        if (loading) return;

        setLoading(true);

        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_in', {email, password})
            .then(r => {
                history.push('/timeline');
                getUserData(r.data);
            })
            .catch(() => {
                alert('E-mail ou senha incorretos. Verifique e tente novamente');
                setLoading(false);
            });
    }
    
    return (
        <Form onSubmit={verifyInput}>
            <MainPageInput placeholder='e-mail' onChange={e => setEmail(e.target.value)} value={email} />
            <MainPageInput type='password' placeholder='password' onChange={e => setPassword(e.target.value)} value={password} />
            <FormButton type='submit'>Log In</FormButton>
        </Form>
    );
}