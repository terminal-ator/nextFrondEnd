import React from 'react';
import { Card } from './styledHtml';
import {Order} from '../apollo/gql/types';
import moment from 'moment';

interface OrderItemProps{
  order: Order
}

export const OrderItem = ( { order }: OrderItemProps )=>{
  return <Card>
    <h3>{`Order on ${moment(order.orderDate).format('LL')}`}</h3>
  </Card>
}