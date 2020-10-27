import React from 'react';

import { MainPageInput, Form, FormButton } from '../styles/MainPageElements';

export default function SignUp() {
    const verifyInput = e => {
        e.preventDefault();

        for (let i = 0; i <= 3; i++) {
            if (!e.target[i].value) {
                alert('Preencha todos os campos');
                return;
            }
        }
    }

    return (
        <Form onSubmit={verifyInput}>
            <MainPageInput placeholder='e-mail' />
            <MainPageInput placeholder='password' />
            <MainPageInput placeholder='username' />
            <MainPageInput placeholder='picture url' />

            <FormButton type='submit'>Sign Up</FormButton>
        </Form>
    );
}