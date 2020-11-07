import styled from 'styled-components';

export const HeaderPost = styled.div`
    margin-bottom: 14px;

    div *{
        cursor: pointer;
        margin-left: 12px;
    }
`;

export const Container = styled.li`
    padding: 15px;
    border-radius: 16px;
    background-color: #171717;
    display: flex;
    word-break: break-all;
    font-family: 'Lato', sans-serif;

    @media (max-width: 800px) { border-radius: 0; }

    & > div:first-child {
        margin-right: 10px;
        text-align: center;

        img {
            width: 50px;
            border-radius: 50%;
        }

        p{
            color: #FFF;
        }
    }
`;

export const MessageContainer = styled.div`
    width: 100%;

    span { color: white; font-weight: bold; cursor: pointer; }

    & > div:first-child {
        div {
            display: flex;
            justify-content: space-between;
        }
    }

    .username {
        font-size: 19px;
        color: white;
    }
    
    .lightgray-font { color: #B7B7B7; }
    .gray-font { color: #9B9595; } 
    .big { font-size: 16px; }
    .small { font-size: 12px; }

    textarea {
        background-color: #EFEFEF;
        padding: 8px;
        width: 100%;
        border-radius: 5px;
        outline: none;
        border: none;
        font-size: 15px;
        margin-bottom: 12px;
        font-family: 'Lato', sans-serif;
        resize: none;
    }
`;

export const LinkContainer = styled.div`
    display: flex;
    border: 1px solid #4D4D4D;
    border-radius: 16px;
    width: 100%;
    height: 155px;
    cursor: pointer;
    margin-top: 14px;
    
    p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        margin-bottom: 4px;              
    }

    img {
        width: 35%;
        object-fit: cover;
        margin-left: 6px;
        border-radius: 0 16px 16px 0;
    }
    
    div {
        width: 65%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

export const ModalContainer = styled.div`
    background-color: #333333;
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 597px;
    height: 262px;
    font-family: 'Lato', 'sans-serif';
    border-radius: 50px;

    div {
        margin: 0 auto;

        img { width: 35px; }
    }

    span {
        font-size: 30px;
        color: white;
        margin-bottom: 18px;
        text-align: center;
    }
`;

export const ModalButtons = styled.div`
    display: flex;
    justify-content: center;

    button:first-child {
        background-color: ${({ loading }) => loading ? 'lightgray' : 'white'};
        color: ${({ loading }) => loading ? 'white' : '#1877F2'};
        padding: 8px 12px;
        margin-right: 20px;
        font-size: 17px;
        border-radius: 5px;
    }

    button:last-child {
        background-color: ${({ loading }) => loading ? 'lightgray' : '#1877F2'};
        color: white;
        padding: 5px 10px;
        margin-left: 20px;
        font-size: 17px;
        border-radius: 5px;
    }
`;

export const ModalStyle = {
    overlay: {
        'width': '100vw',
        'height': '100vh',
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center'
    },
    content: {
        'background': 'none',
        'border': 'none',
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center'
    }
}