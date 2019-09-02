import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PageWrapper, Button } from '../components/styledHtml';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GET_CART_ITEMS } from './cart';
import { GET_DELIVERY_ADDRESS, GET_FULL_DEL_ADDRESS } from '../apollo/gql/address';
import OrderSummary from '../components/order-summary';
import styled from 'styled-components';
import Bill from '../components/bill';
import { CreateOrder } from '../apollo/gql/summary';


const SummaryWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	flex-wrap: nowrap;
`;

interface AddressData{
	selectedAddress:string;
}

interface Product{
	imageuri: string;
	name: string;
	id: string
}

interface Items{
	id: string;
	product: Product;
	variant: Variant;
	quantity: number;
}
interface Variant{
	id: string;
	name: string;
	price: number;
}

interface Cart{
	id: string;
	cartTotal: number;
	items: Items[];
}

interface GetCartItemData{
	getCart: Cart;
}

interface Address{
	id : string;
	pincode: string;
	line1: string;
	line2: string;
	name: string;
	state: string;
	district: string;
}

interface FullDeliveryData{
	getFullAddress: Address
}
interface FullDeliveryVars{
	id: string
}



const Summary = ({ history }: RouteComponentProps) => {
	const { data, loading, error } =useQuery<GetCartItemData>(GET_CART_ITEMS);
	const { data: addData  } = useQuery<AddressData>(GET_DELIVERY_ADDRESS);
	const { data: delData } = useQuery<FullDeliveryData,FullDeliveryVars>(GET_FULL_DEL_ADDRESS,{
		variables:{
			id: addData && addData.selectedAddress || ""
		}
	});
	const xData = delData && delData.getFullAddress;
	const [ shippingCharge, setShippingCharge ] = useState(99);
	const [ createOrder, { data: orderData, loading: loadData }  ] = CreateOrder();
	if (loading) return <div>Loading</div>;
	if (error) return <div>Error</div>;

	async function processOrder(){
		await createOrder({
			variables:{
				input:{
					address: addData && addData.selectedAddress || "",
					itemID: data && data.getCart.items.map(item=>item.id) || [],
					paymentType: 'COD',
					shippingCost: shippingCharge
				}
			}
		});
		history.push('/orders');
	}
	console.log( { orderData })

	const shippingCharges = {
		oneDay: 99,
		twoDay: 50
	};
	return (
		<PageWrapper>
			<h1>Summary</h1>
			<SummaryWrapper>
				<OrderSummary  orders={data && data.getCart.items} />
				<Bill
					onClick={processOrder}
					cartTotal={data && data.getCart.cartTotal || 0}
					shippingCharge={shippingCharges}
					deliveryAddress={xData && xData.name ||""}
					setShippingCharge={setShippingCharge}
					shippingCost={shippingCharge}
				/>
			</SummaryWrapper>
		</PageWrapper>
	);
};

export default withRouter(Summary);
