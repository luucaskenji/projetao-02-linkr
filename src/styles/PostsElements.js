import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding-top: 125px;
    display: flex;
    justify-content: center;
    align-items: center;

    main { 
        width: 75vw;

        @media (max-width: 800px) { width: 100%; }

        & > div:first-child {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;    
        }

        & > div:last-child {
            display: flex;
            justify-content:space-between;
            
            & > div:first-child { 
                width: 65%;

                @media (max-width: 800px) { width: 100%; }
            }
        }
    }

    h2 {
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        color: white;
        letter-spacing: 2px;
        
        @media (max-width: 800px) { font-size: 36px; margin-left: 15px; }
    }
`;