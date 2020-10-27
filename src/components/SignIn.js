import React from 'react';

import { MainPageInput, Form, FormButton } from '../styles/MainPageElements';

export default function SignIn() {
    const verifyInput = e => {
        e.preventDefault();
        
        (!e.target[0].value || !e.target[1].value) && alert('Preencha todos os campos');
        
        return;
    }
    
    return (
        <Form onSubmit={verifyInput}>
            <MainPageInput placeholder='e-mail' />
            <MainPageInput placeholder='password' />
            <FormButton type='submit'>Log In</FormButton>
        </Form>
    );
}