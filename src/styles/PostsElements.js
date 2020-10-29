import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding-top: 125px;
    display: flex;
    justify-content: center;
    align-items: center;

    main { 
        width: 75vw; 

        & > div:last-child {
            display: flex;
            justify-content:space-between;
            
            & > div:first-child { width: 65%; }
        }
    }

    h2 {
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        color: white;
        font-weight: 700;
        letter-spacing: 2px;
        margin-bottom: 25px;
    }
`;