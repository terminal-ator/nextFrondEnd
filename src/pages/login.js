import React, { useState } from 'react';
import withLayout from './baseLayout';
import LoginForm from '../components/loginForm';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

export const MUT_LOGIN_USER = gql`
  mutation login($input: SignInInput){
    signInUser(input: $input)
  }
`;

const LoginPage = ({ history }) => {

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const client = useApolloClient();

  const [login, { data }] = useMutation(MUT_LOGIN_USER,
    {
      onCompleted({ signInUser }) {
        // console.log(resp);
        if (signInUser === "Denied") {
          setError(true);
          setErrorMessage("Invalid email or password. Try again")
        } else {

          // save to token to localstorage
          localStorage.setItem('token', signInUser);

          // save to cookie
          // Cookie.set('token', signInUser);

          // save to local state that user has signed in
          client.cache.writeData({ data: { isLoggedIn: true } });

          // if redirect link is given then redirect to that 
          // else redirect to index
          history.push("/")
        }
      }
    });


  // login({ email: 'itushargarg@gmail.com', password: 'HOLYMOLY' });

  return (
    <div>
      <LoginForm onLogin={login} error={error} errorMessage={errorMessage} />
    </div>
  )
}

export default withRouter(LoginPage);