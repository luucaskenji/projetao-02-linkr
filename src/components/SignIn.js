import React, { useState } from 'react';

import { MainPageInput, Form, FormButton } from '../styles/MainPageElements';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const verifyInput = e => {
        e.preventDefault();

        (!email || !password) && alert('Preencha todos os campos')
        
        return;
    }
    
    return (
        <Form onSubmit={verifyInput}>
            <MainPageInput placeholder='e-mail' onChange={e => setEmail(e.target.value)} value={email} />
            <MainPageInput placeholder='password' onChange={e => setPassword(e.target.value)} value={password} />
            <FormButton type='submit'>Log In</FormButton>
        </Form>
    );
}