import React from 'react';
import withLayout from './baseLayout';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PDetail from '../components/productDetail';
import { withRouter } from 'react-router-dom';
import { GET_CART_ITEMS } from './cart';
import { GET_ALL_PRODUCTS_UNPAGINATED } from './products';

export const GET_PRODUCT_DETAILS = gql`
query getPrdoduct($id: ID){
  Product(id:$id){
      id
      name
      imageuri
      variants {
        id
        isInCart @client
        name
        price
      }
  }
}
`
export const ADD_TO_CART = gql`
  mutation addToCart($input: AddCartInput!){
    addToCart(input: $input) {
      success
      cart {
        id
        items {
        id
        product {
          imageuri
          name
          id
        }
        variant {
          id
          name
          price
        }
        quantity
      }
      }
    }
  }
`

export const ProductDetails = ({ match }) => {
  // const router = useRouter();
  const { id } = match.params;
  const { data, error, loading } = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      id
    },
    fetchPolicy: "network-only"
  });

  const [addToCart] = useMutation(ADD_TO_CART, {
    onCompleted({ addToCart }) {
      if (addToCart.success) {
        // console.log("Successfuly added to the cart");
      }
    },
    refetchQueries({ data }) {
      const { cart } = data.addToCart
      // console.log(cart);
      const queries = cart.items.map((item) => ({
        query: GET_PRODUCT_DETAILS,
        variables: { id: item.product.id }
      }))
      return [...queries, { query: GET_CART_ITEMS }]
    },
    update(cache, { data }) {
      const { addToCart } = data;
      // console.log("Getting data", addToCart.cart);
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          getCart: data.addToCart.cart
        }
      });

    }
  })

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error</p>
  // console.log(data);

  return (
    <div>
      {data.Product && <PDetail addToCart={addToCart} product={data.Product} />}
    </div>
  )
}

export default withLayout(withRouter(ProductDetails));