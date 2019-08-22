import React, { useState } from 'react';

import { LoginCard, Button, LoginInput, Errorp } from './styledHtml';

const LoginForm = ({ onLogin, error, errorMessage }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<LoginCard maxWidth={'400px'} width={'400px'} maxHeight={'500px'}>
			<h2>Login to continue</h2>
			{error ? <Errorp className="error-message">{errorMessage}</Errorp> : null}
			<LoginInput
				type="email"
				value={email}
				onChange={e => {
					setEmail(e.target.value);
				}}
				placeholder={'Email'}
			/>
			<LoginInput
				type="password"
				value={password}
				onChange={e => {
					setPassword(e.target.value);
				}}
				placeholder={'Password'}
			/>
			<Button
				onClick={() => {
					onLogin({ variables: { input: { email, password } } });
				}}
			>
				Login
			</Button>
		</LoginCard>
	);
};

export default LoginForm;
