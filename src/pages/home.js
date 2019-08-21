import React from 'react';
import withLayout from './baseLayout';
import { PageWrapper } from '../components/styledHtml';

const home = () => {
  return (
    <PageWrapper>Index Page</PageWrapper>
  )
}

export default withLayout(home);