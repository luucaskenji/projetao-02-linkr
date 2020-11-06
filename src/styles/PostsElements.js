import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding-top: 125px;
    display: flex;
    justify-content: center;
    align-items: center;

    main { 
        width: 75vw;   

        & > div:first-child {
            width: 100%;
            display: none;
            padding: 0px 10px;
            background-color: #333333;
            * {
                font-size: 17px;
            }

        }
        & > div:nth-child(2) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0px 30px 15px;    
        }
        & > div:last-child {
            display: flex;
            justify-content:space-between;
            
            & > div:first-child { 
                width: 65%;

                @media (max-width: 800px) { width: 100%; }
            }
        }

        @media (max-width: 800px) { 
            width: 100%; 

            & > div:first-child {
                display: flex;
            }
        }
    }

    h2 {
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        color: white;
        letter-spacing: 2px;
        
        @media (max-width: 800px) { font-size: 36px; }
    }

    @media (max-width: 800px) {padding-top: 90px;}
`;