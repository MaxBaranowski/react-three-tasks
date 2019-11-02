import React from 'react';
import { Link } from "react-router-dom";

import styled from 'styled-components';

const NavBar = styled.nav`
    display: flex;
    
    ul{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        margin: 0;
        
        li{
            list-style: none;
            margin: 0 25px 0 0;
            a{
                color: #000;
                text-decoration: none;
            }
        }
    }
`;

const Navigation = (props) => {
  return (
    <NavBar>
      <ul>
        <li>
          <Link to="/">Start</Link>
        </li>
        <li>
          <Link to="/my-profile">My Profile</Link>
        </li>
      </ul>
    </NavBar>
  );
};

export default Navigation;
