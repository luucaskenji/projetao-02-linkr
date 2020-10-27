import React, { useState } from 'react';
import styled from 'styled-components';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Login() {
    const [haveAccount, setHaveAccount]= useState(true);

    return (
        <Container>
            <div>
                <h1>linkr</h1>
                <p>save, share and discover<br />the best links on the web</p>
            </div>
            
            <div>
                {haveAccount ? <SignIn /> : <SignUp />}

                <button onClick={() => setHaveAccount(!haveAccount)}>
                    {haveAccount ? 'First time? Create an account!' : 'Switch back to login'}
                </button>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    font-family: 'Oswald', sans-serif;

    div:first-child {
        background: #151515;
        height: 100vh;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: 'Passion One', cursive;
        color: white;
        font-size: 106px;
        padding-left: 80px;
        letter-spacing: 5px;

        p { 
            font-family: 'Oswald', sans-serif;
            font-size: 43px;
            letter-spacing: 2px;
            font-weight: 700;
            margin-top: 16px;
        }
    }

    div:last-child {
        background: #333333;
        width: 30%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 40px;

        & > button { 
            margin-top: 15px;
            color: white;
            text-decoration: underline;
            background: transparent;
            font-family: 'Oswald', sans-serif;
        }
    }
`;