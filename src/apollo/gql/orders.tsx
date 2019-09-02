import { useQuery } from '@apollo/react-hooks';
import { Order } from './types';
import gql from 'graphql-tag';

export const ORDER_FRAGMENT = gql`
  fragment orderFragment on Order{
    id
    items {
      id
      variant {
        id
        name
      }
      product {
        id
        imageuri
        name
      }
      quantity
    }
    amount
    delivered
    deliverDate
    orderDate
  }
`

export const GET_ORDERS = gql`
query getOrders{
  orders {
    ...orderFragment    
  }
}
${ORDER_FRAGMENT}
`;

export interface OrderData{
  orders: Order[]
}

export const GetAllOrders = ()=> useQuery<OrderData>(GET_ORDERS);