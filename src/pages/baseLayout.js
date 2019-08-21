import React from 'react';
import styled from 'styled-components';
import Header from '../components/header';

const Wrapper = styled.div`
  font-family: 'Arial';
`

const withLayout = Props => {
  return () => (
    <Wrapper>
      <Header />
      <Props />
    </Wrapper>
  )
}

export default withLayout;