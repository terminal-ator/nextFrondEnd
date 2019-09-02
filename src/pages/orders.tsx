import React from 'react';
import { withRouter } from 'react-router-dom';
import withLayout from './baseLayout';
import { PageWrapper } from '../components/styledHtml';
import { GetAllOrders } from '../apollo/gql/orders';
import { OrderItem } from '../components/orders';

const Orders = () => {
	const { data, loading, error } = GetAllOrders();
	if (loading) return <div>Loading..</div>;
	if (error) return <div>Error...{error}</div>;
	console.log({ data });
	return (
		<PageWrapper>
			<h1>Orders</h1>
			{ data && data.orders.map((order)=><OrderItem order={order} />)}
		</PageWrapper>
	);
};

export default withLayout(withRouter(Orders));
