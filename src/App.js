import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { typeDefs, resolvers } from './apollo/resolvers';

import Home from './pages/home';
import products from './pages/products';
import product from './pages/product';
import login from './pages/login';
import cart from './pages/cart';
import address from './pages/address';
import Summary from './pages/summary';
import orders from './pages/orders';

const cache = new InMemoryCache();
const link = new HttpLink({
	uri: 'http://localhost:4000/',
	headers: {
		authorization: localStorage.getItem('token')
	}
});

cache.writeData({
	data: {
		isLoggedIn: !!localStorage.getItem('token'),
		selectedAddress: ''
	}
});

const client = new ApolloClient({
	cache,
	link,
	typeDefs,
	resolvers
});

function App() {
	return (
		<Router>
			<ApolloProvider client={client}>
				<Route path="/" exact component={Home} />
				<Route path="/products" component={products} />
				<Route path="/product/:id" component={product} />
				<Route path="/login" component={login} />
				<Route path="/cart" component={cart} />
				<Route path="/checkout/address" component={address} />
				<Route path="/checkout/summary" component={Summary} />
				<Route path="/orders" component={orders} />
			</ApolloProvider>
		</Router>
	);
}

export default App;
