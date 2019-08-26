import React from 'react';
import withLayout from './baseLayout';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { PageWrapper, Button } from '../components/styledHtml';
import CartDetail from '../components/cartDetail';
import { withRouter } from 'react-router-dom';

export const CART_DATA = gql`
	fragment CartTile on Cart {
		id
		cartTotal @client
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
`;

export const GET_CART_ITEMS = gql`
	query getCartItems {
		getCart {
			...CartTile
		}
	}
	${CART_DATA}
`;
export const REMOVE_CART_ITEMS = gql`
	mutation removeItem($id: ID!) {
		removeFromCart(cartItemId: $id) {
			...CartTile
		}
	}
	${CART_DATA}
`;
const UPDATE_CART_QUANT = gql`
	mutation updateQuant($cartItemId: ID!, $quant: Int!) {
		updateCartQuant(cartItemId: $cartItemId, quantity: $quant) {
			id
			__typename
			quantity
		}
	}
`;

const Cart = ({ history }) => {
	const { data, loading, error } = useQuery(GET_CART_ITEMS);
	console.log(data);
	const [removeCart] = useMutation(REMOVE_CART_ITEMS, {
		update: (cache, { data: { removeItem } }) => {
			cache.writeQuery({
				query: GET_CART_ITEMS,
				data: { cart: removeItem }
			});
		}
	});

	const [updateQuantity] = useMutation(UPDATE_CART_QUANT, {
		refetchQueries: [
			{
				query: GET_CART_ITEMS
			}
		]
	});
	// console.log("Feteched Cart", data);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	return (
		<PageWrapper>
			<h1>Cart</h1>
			<div style={{ width: '70%' }}>
				{data.getCart && (
					<CartDetail items={data.getCart.items} removeCart={removeCart} updateQuantity={updateQuantity} />
				)}
				<div style={{ float: 'right' }}>Total: ₹{data.getCart.cartTotal}</div>
				<Button
					onClick={() => {
						history.push('/checkout/address');
					}}
				>
					Checkout
				</Button>
			</div>
		</PageWrapper>
	);
};

export default withLayout(withRouter(Cart));
