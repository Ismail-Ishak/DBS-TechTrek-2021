import React from 'react';
import { withRouter } from 'react-router-dom';

function Home(props) {
    const redirectToLogin = () => {
        props.history.push('/');
    }

    const logoutHandler = () => {
        localStorage.removeItem('login_access_token');
        redirectToLogin();
    }

    const redirectToPayment = () => {
        props.history.push('/payment');
    }

    const redirectToProfile = () => {
        props.history.push('./profile');
    }

    return (
        <div>
            <h1>Welcome to the home page!</h1>
            <h4>You are logged in and authenticated!!!</h4>            
            <br />
            <br />
            <button onClick={redirectToPayment}>Make a Payment</button>
            <br />
            <br />
            <button onClick={redirectToProfile}>Go to Profile</button>
            <br />
            <br />
            <button onClick={logoutHandler}>Logout!</button>
        </div>
    )
}

export default withRouter(Home);