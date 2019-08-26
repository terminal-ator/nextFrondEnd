import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { PageWrapper, Button } from '../components/styledHtml';
import { useQuery, useMutation } from '@apollo/react-hooks';
import AllAddress from '../components/addressCard';
import styled from 'styled-components';
import {
	CREATE_ADDRESS,
	GET_ADDRESSES,
	CreateAddressMutation,
	SetDeliveryAddressMutation
} from '../apollo/gql/address';

const HeaderRow = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`;

const Address = () => {
	const { data, loading, error } = useQuery(GET_ADDRESSES);

	const [addAddress] = CreateAddressMutation();

	const [setDeliveryAddress] = SetDeliveryAddressMutation();

	const [selected, setSelected] = useState('');

	if (loading) return <div>Loading....</div>;

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}

	return (
		<PageWrapper>
			<HeaderRow>
				<h1>Choose Address</h1>
				<Button
					onClick={() => {
						setDeliveryAddress({
							variables: {
								id: selected
							}
						});
					}}
					disabled={selected === ''}
					bgColor="#34deeb"
				>
					Continue
				</Button>
			</HeaderRow>
			{data.address && (
				<AllAddress
					selected={selected}
					setSelected={setSelected}
					addAddress={addAddress}
					addresses={data.address}
				/>
			)}
		</PageWrapper>
	);
};

export default withRouter(Address);
