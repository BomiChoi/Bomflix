import React from "react";
import {Link, withRouter} from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: rgba(20, 20, 20, 0.8);
    z-index: 10;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
    display: flex;
`;

const Item = styled.li`
    width: 80px;
    height: 50px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    border-bottom: 3px solid ${props => props.current ? "#79e5cb":"transparent"};
    transition: border-bottom .5s ease-in-out;
`;

const SLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        font-weight: bold;
        font-size: 30px;
        color: #62c1aa;
        text-transform: uppercase;
        margin: 0 20px;
    }
    span:hover {
        color: #79e5cb;
    }
`;

export default withRouter(({location: {pathname}}) => (
    <Header>
        <SLink to="/"><span>Bomflix</span></SLink>
        <List>
            <Item current={pathname === "/"}><SLink to="/">Movies</SLink></Item>
            <Item current={pathname === "/TV"}><SLink to="/TV">TV</SLink></Item>
            <Item current={pathname === "/Search"}><SLink to="/Search">Search</SLink></Item>
        </List>
    </Header>
));