import React from 'react';
import getYouTubeID from 'get-youtube-id';
import styled from 'styled-components';

export default function YTPlayer({ link }) {
    const videoID = getYouTubeID(link);
    const videoLink = `https://www.youtube.com/embed/${videoID}`;

    return (
        <Video 
            width="100%" 
            height="350px" 
            src={videoLink} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        >
        </Video>
    );
}

const Video = styled.iframe`
    margin-top: 15px;
`;