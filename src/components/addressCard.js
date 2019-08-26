import React, { useState, useEffect } from 'react';
import { Card, Button, LoginInput } from './styledHtml';
import styled from 'styled-components';

export const PlainUl = styled.ul`
	list-style: none;
	color: #757d7b;
	padding-left: 0px;
`;

const AddressCard = ({ address, selected, select }) => {
	return (
		<Card maxHeight={'400px'}>
			<input
				onChange={e => {
					if (e.target.checked) select(address.id);
				}}
				type="checkbox"
				checked={selected}
			/>
			<h4>{address.name}</h4>
			<PlainUl>
				<li>{address.line1}</li>
				<li>{address.line2}</li>
				<li>{address.district}</li>
				<li>{address.state}</li>
				<li>{address.pincode}</li>
				<li></li>
			</PlainUl>
		</Card>
	);
};

export const GenInput = ({ state, setState, ...props }) => {
	return (
		<LoginInput
			value={state}
			onChange={e => {
				setState(e.target.value);
			}}
			{...props}
		/>
	);
};

const AddAddressCard = ({ addAddress }) => {
	const [name, setName] = useState('');
	const [line1, setLine1] = useState('');
	const [line2, setLine2] = useState('');
	const [district, setDistrict] = useState('');
	const [state, setState] = useState('');
	const [pincode, setPincode] = useState('');

	useEffect(() => {
		console.log(`The name is : ${name}`);
	}, [name]);

	return (
		<Card maxHeight={'700px'}>
			<h4>Add a new address</h4>
			<PlainUl>
				<GenInput state={name} setState={setName} placeholder="Name" padding={'5px'} />
				<GenInput state={line1} setState={setLine1} placeholder="Line 1" padding={'5px'} />
				<GenInput state={line2} setState={setLine2} placeholder="Line 2" padding={'5px'} />
				<GenInput state={district} setState={setDistrict} placeholder="District" padding={'5px'} />
				<GenInput state={state} setState={setState} placeholder="State" padding={'5px'} />
				<GenInput state={pincode} setState={setPincode} placeholder="Pincode" padding={'5px'} />
			</PlainUl>
			<Button
				onClick={() => {
					addAddress({
						variables: {
							input: {
								name,
								line1,
								line2,
								district,
								state,
								pincode
							}
						}
					});
				}}
			>
				Add Address
			</Button>
		</Card>
	);
};

const AllAddress = ({ addresses, addAddress, selected, setSelected }) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
			{addresses.map(address => (
				<AddressCard
					key={address.id}
					address={address}
					selected={selected === address.id}
					select={id => {
						setSelected(id);
					}}
				/>
			))}
			<AddAddressCard addAddress={addAddress} />
		</div>
	);
};

export default AllAddress;
