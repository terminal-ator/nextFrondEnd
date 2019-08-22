import gql from 'graphql-tag';

export const GET_CART_ITEMS = gql`
  query getCart{
    getCart {
      items {
        id
        variant {
          id
        }
      }
    }
  }
`

export const typeDefs = gql`
  extend type Query{
    isLoggedIn: Boolean!
  }
  extend type Variant{
    isInCart: ID
  }

  extend type Cart{
    cartTotal: Int
  }
`

export const resolvers = {
  Variant: {
    isInCart: async (variant, _, { cache, client }) => {
      var getCart = null;
      try {
        getCart = await client.query({ query: GET_CART_ITEMS });
      } catch (e) {
        console.log(e);
      }
      const { items } = getCart.data.getCart;
      for (var i = 0; i < items.length; i++) {
        // console.log(items[i]);
        if (items[i].variant.id === variant.id) return items[i].id;
      }
      return null;
    },
  },
  Cart: {
    cartTotal: async (cart, _, { cache }) => {
      const { items } = cart;
      let cartTotal = 0;
      for (var i = 0; i < items.length; i++) {
        cartTotal = cartTotal + items[i].variant.price * items[i].quantity;
      }
      return cartTotal
    }
  }
};