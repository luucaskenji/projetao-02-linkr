import React, { useState } from 'react';
import styled from 'styled-components';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

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
            font-family: 'Lato', sans-serif;
        }
    }

    @media(max-width: 800px) {
        flex-direction: column;       

        div:first-child{  
            height: auto; 
            justify-content: center;
            align-items: center;         
            padding: 15px 0px 25px;
            font-size: 76px;
            letter-spacing: 3px;

            p { 
                font-size: 23px;
                letter-spacing: 1px;
                margin: 0px;
            }
        }
        div:last-child {
            width: 100%;
            height: auto; 
            padding: 40px 20px;
            
            & > button { 
                font-size: 17px;
            }
        }

    }
`;