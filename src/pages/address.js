import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { PageWrapper, Button } from '../components/styledHtml';
import { useQuery } from '@apollo/react-hooks';
import AllAddress from '../components/addressCard';
import styled from 'styled-components';
import {
	CREATE_ADDRESS,
	GET_ADDRESSES,
	CreateAddressMutation,
	SetDeliveryAddressMutation,
	GET_DELIVERY_ADDRESS
} from '../apollo/gql/address';

const HeaderRow = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`;

const Address = ({ history }) => {
	const { data, loading, error } = useQuery(GET_ADDRESSES);

	const [addAddress] = CreateAddressMutation();

	const deliveryData = useQuery(GET_DELIVERY_ADDRESS);
	const selected = deliveryData.data.selectedAddress;
	// console.log('Logging selected', selected);

	const [setDeliveryAddress] = SetDeliveryAddressMutation();

	if (loading) return <div>Loading....</div>;

	if (error) {
		// console.log(error);
		return <div>Error</div>;
	}

	return (
		<PageWrapper>
			<HeaderRow>
				<h1>Choose Address</h1>
				<Button
					onClick={() => {
						history.push('/checkout/summary');
					}}
					disabled={selected === ''}
				>
					Continue
				</Button>
			</HeaderRow>
			{data.address && (
				<AllAddress
					selected={selected}
					setSelected={setDeliveryAddress}
					addAddress={addAddress}
					addresses={data.address}
				/>
			)}
		</PageWrapper>
	);
};

export default withRouter(Address);
