import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

// Address Gql
export const ADDRESS_FRAGMENT = gql`
	fragment addressFrag on Address {
		id
		pincode
		line1
		line2
		name
		state
		district
	}
`;

export const CREATE_ADDRESS = gql`
	mutation createAddress($input: AddressInput!) {
		addAddress(input: $input) {
			...addressFrag
		}
	}
	${ADDRESS_FRAGMENT}
`;

export const GET_ADDRESSES = gql`
	query getAddress {
		address {
			...addressFrag
		}
	}
	${ADDRESS_FRAGMENT}
`;

export const GET_DELIVERY_ADDRESS = gql`
	query clientAddress {
		selectedAddress @client
	}
`;

export const SET_DELIVERY_ADDRESS = gql`
	mutation setDeliveryAddress($id: ID!) {
		setAddress(id: $id) @client
	}
`;

export const GET_FULL_DEL_ADDRESS = gql`
	query getFullDelivery($id: ID!) {
		getFullAddress(id: $id) @client {
			...addressFrag
		}
	}
	${ADDRESS_FRAGMENT}
`;

export const CreateAddressMutation = () =>
	useMutation(CREATE_ADDRESS, {
		update: async (cache, { data: { addAddress } }) => {
			const addressArray = await cache.readQuery({
				query: GET_ADDRESSES
			});
			const address = [...addressArray.address, addAddress];

			await cache.writeQuery({
				query: GET_ADDRESSES,
				data: { address }
			});

			await cache.writeQuery({
				query: GET_DELIVERY_ADDRESS,
				data: { selectedAddress: addAddress.id }
			});
		},
		refetchQueries: () => [{ query: GET_ADDRESSES }, { query: GET_DELIVERY_ADDRESS }]
	});

export const SetDeliveryAddressMutation = () =>
	useMutation(SET_DELIVERY_ADDRESS, {
		update: (_, data) => {
			console.log(data);
		}
	});
