import { useMutation, } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Order, Item } from './types';
import { ORDER_FRAGMENT, OrderData, GET_ORDERS } from './orders';
import { GET_CART_ITEMS } from '../../pages/cart';


export interface CreateOrderVars{
  input: CreateOrderInput;
}
export interface CreateOrderInput{
  itemID: string[];
  address: string;
  paymentType: string;
  shippingCost: number;
}
interface CreateOrderData{
  createOrder: Order;
}

interface CartData{
  getCart: Item;
}



export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!  ){
    createOrder(input: $input ) {
        ...orderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

export const CreateOrder = () => useMutation<CreateOrderData, CreateOrderVars>(
  CREATE_ORDER_MUTATION,
  {
    update: async (cache, { data: order })=>{
      const data = await cache.readQuery<CartData>({ query: GET_CART_ITEMS});
      const getCart = data && data.getCart || {};
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          getCart: {
            ...getCart,
            items:[],
            cartTotal: 0 
          }
        }
      });
      const orderData = await cache.readQuery<OrderData>({ query:  GET_ORDERS});
      console.log('Here in the update:',orderData);
      if(orderData){
        console.log('In the if statement:', orderData)
        const xorder = orderData.orders;
        console.log({ order })
        cache.writeQuery({
          query: GET_ORDERS,
          data: {
            orders: [order.createOrder , ...xorder ]
          }
        })
      }
    }
  }
)

