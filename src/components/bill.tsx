import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Button } from './styledHtml';

const FlexDiv = styled.div`
	flex: 4;
`;

interface BillProps {
	cartTotal: number;
	shippingCharge : {
		oneDay: number;
		twoDay: number;
	}
	deliveryAddress: string;
	setShippingCharge?(value: number): void;
	shippingCost: number;
	onClick?(): void;
}




const Bill = ({ onClick ,cartTotal , shippingCost ,shippingCharge: { oneDay, twoDay } , deliveryAddress, setShippingCharge}: BillProps) => {
	// console.log({ deliveryAddress });
	function handleShippingChange(e: any) {
		if(setShippingCharge)
			setShippingCharge(parseInt(e.target.value || 0));
	}

	return (
		<FlexDiv>
			<Card>
				<h2> Bill Totals</h2>
				<p>{`Order Total: ${cartTotal}`}</p>
				<p>Delivering to {deliveryAddress} </p>
				<select defaultValue={shippingCost.toString()} onChange={handleShippingChange}>
					<option value={oneDay}>One Day Shipping: ₹{oneDay}</option>
					<option value={twoDay}>Two Day Shipping: ₹{twoDay}</option>
				</select>
				<p>{`Total amount: ₹${cartTotal + shippingCost}`}</p>
				<Button onClick={onClick} >Confirm Order</Button>
			</Card>
		</FlexDiv>
	);
};

export default Bill;
