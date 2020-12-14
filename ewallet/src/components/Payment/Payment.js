import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            custID: '',
            payeeID: '',
            dateTime: '',
            amount: '',
            expensesCat: '',
            eGift: '',
            message: '',        
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this)
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
            //custID: this.state.custID,
            payeeID: this.state.payeeID,
            //dateTime: this.state.dateTime,            
            amount: this.state.amount,
            //expensesCat: this.state.expensesCat,
            //eGift: this.state.eGift,
            message: this.state.message
        }

        axios.post('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/add', payload, {
            headers: {
                'x-api-key': `0307OsNDnD1XEkAoThrwcGzJ2BPu2hD4GMLc5YG8`
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Payload not posted!');
                }                
                alert('Transaction is successful!')
                this.redirectToHome();
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label for="amount">
                        Amount:
                        <br />
                        <input name="amount" type="number" step="0.01" placeholder="Amount" value={this.state.amount} onChange={this.changeHandler} />
                    </label>
                    <br />
                    <label for="payeeID">
                        Pay To: input payeeID
                        <br />
                        <input name="payeeID" type="text" placeholder="Pay To" value={this.state.payeeID} onChange={this.changeHandler} />
                    </label>
                    <br />
                    <label for="message">
                        Message:
                        <br />
                        <input name="message" type="text" placeholder="Type a message" value={this.state.message} onChange={this.changeHandler} />
                    </label>
                    <br />
                    <br />
                    <button type="submit">Send Payment</button>
                </form>
                <br />
                <button onClick={this.redirectToHome}>Back to Home</button>
            </div>
        )
    }
}

export default withRouter(Payment)