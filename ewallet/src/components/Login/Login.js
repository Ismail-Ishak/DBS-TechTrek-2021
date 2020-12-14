import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css'
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
            this.changeHandler = this.changeHandler.bind(this);
            this.submitHandler = this.submitHandler.bind(this);
            this.redirectToHome = this.redirectToHome.bind(this);
    };

    changeHandler = e => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    redirectToHome = () => {
        this.props.history.push('/home');
    }

    submitHandler = e => {
        e.preventDefault();
        const payload = {
            username: this.state.username,
            password: this.state.password
        };
        axios.post('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login', payload, {
            headers: {                
                'x-api-key': `0307OsNDnD1XEkAoThrwcGzJ2BPu2hD4GMLc5YG8`
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Error in logging in!!!');
                }
                this.redirectToHome();                
            })
            .catch(err => {
                console.log(err);
            })
    }

    render () {
        return (
            <div className="login-card">                
                <form onSubmit={this.submitHandler}>
                    <label for="username">
                        Username:
                        <br />
                        <input name="username" type="text" placeholder="Username" required value={this.state.username} onChange={this.changeHandler} />
                    </label>
                    <br />
                    <label for="password">
                        Password:
                        <br />
                        <input name="password" type="text" placeholder="Password" required value={this.state.password} onChange={this.changeHandler} />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)