import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import withLayout from './baseLayout';
import { Link } from 'react-router-dom';
import { StyledLink } from '../components/styledHtml';

export const GET_ALL_PRODUCTS_UNPAGINATED = gql`
  query getProducts{
    allProducts {
      id
      name
    }
  }
`;

const Products = () => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS_UNPAGINATED);
  if (loading) return <p>Loading.....</p>
  if (error) return <p>ERROR</p>

  // console.log(data);

  return (
    <div>
      <ul>
        {data.allProducts && data.allProducts.map(product => {
          return (<StyledLink key={product.id} to={`/product/${product.id}`} >
            <li>{product.name}</li>
          </StyledLink>
          )
        })}
      </ul>
    </div>
  )
}

export default withLayout(Products);