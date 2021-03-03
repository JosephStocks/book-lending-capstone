import styled from 'styled-components';

export const DivSC = styled.div`
    background-color: ${props => props.bgc || "purple"};
    width: 400px;
    height: 400px;
    color: teal;
`

export const H1S = styled.h1`
    text-align: center;
    
`


export const Paper = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
    width: 400px;
    height: ${props => props.height || "400px"};
    background-color: ${props => props.bgc || "purple"};
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    text-align: center;
`