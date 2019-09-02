import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
	border-collapse: collapse;

	flex: 8;
	td {
		border-bottom: 1px solid #efeeff;
		padding: 8px;
	}
	th {
		padding: 8px;
		padding-top: 12px;
		padding-bottom: 12px;
		text-align: left;
	}
`;

const OrderRow = ({ thisorder }) => {
	return (
		<tr>
			<td>{thisorder.variant.name}</td>
			<td>{thisorder.quantity}</td>
			<td>₹{thisorder.variant.price}</td>
			<td>₹{thisorder.variant.price * thisorder.quantity}</td>
		</tr>
	);
};

const OrderSummary = ({ orders }) => {
	return (
		<Table>
			<thead>
				<tr>
					<th>Product</th>
					<th>Quantity</th>
					<th>Price</th>
					<th>Net Amount</th>
				</tr>
			</thead>
			<tbody>
				{orders.map(order => (
					<OrderRow key={order.id} thisorder={order} />
				))}
			</tbody>
		</Table>
	);
};

export default OrderSummary;
