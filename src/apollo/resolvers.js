import gql from 'graphql-tag';
import { GET_DELIVERY_ADDRESS, GET_ADDRESSES } from './gql/address';

export const GET_CART_ITEMS = gql`
	query getCart {
		getCart {
			items {
				id
				variant {
					id
				}
			}
		}
	}
`;

export const typeDefs = gql`
	extend type Query {
		isLoggedIn: Boolean!
		selectedAddress: ID!
		getFullAddress(id: ID!): Address!
	}

	extend type Variant {
		isInCart: ID
	}

	extend type Cart {
		cartTotal: Int
	}

	extend type Mutation {
		setAddress(id: ID!): ID
	}
`;

export const resolvers = {
	Query: {
		getFullAddress: (_, { id }, { cache }) => {
			console.log(`Resolving getFullAddress with ID: ${id}`);
			try {
				const data = cache.readQuery({ query: GET_ADDRESSES });
				const { address } = data;
				console.log('Fetching objects from cache:', address.find(address => address.id === id));
				return address.find(address => address.id === id);
			} catch (e) {
				console.error(e);
			}
		}
	},
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
		}
	},
	Cart: {
		cartTotal: async (cart, _, {}) => {
			const { items } = cart;
			const cartTotal = items.reduce((cartTotal, item) => cartTotal + item.variant.price * item.quantity, 0);
			return cartTotal;
		}
	},
	Mutation: {
		setAddress: (_, { id }, { cache }) => {
			// const {address }  =cache.readQuery({ query: GET_ADDRESSES })
			// console.log('Setting address for id: ', id);
			cache.writeQuery({
				query: GET_DELIVERY_ADDRESS,
				data: { selectedAddress: id }
			});
			return id;
		}
	}
};
