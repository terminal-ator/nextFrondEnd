import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { InlineLi, SimpleA } from './styledHtml';

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #ECE2E2;
  padding: 5px;
  font-weight: bold;
  color: blue;
  a{
    color: blue;

    :hover{
      color: black;
    }
  }
`

const header = () => {
  return (
    <Wrapper>
      <ul>
        <InlineLi>
          <Link to='/products' style={{ textDecoration: 'none' }}>
            Products
            </Link>
        </InlineLi>
        <InlineLi>
          <Link to='/cart' style={{ textDecoration: 'none' }}>
            Cart
          </Link>
        </InlineLi>
      </ul>
    </Wrapper>
  );
}

export default header;