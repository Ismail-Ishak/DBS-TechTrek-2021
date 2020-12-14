import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: null,
            transactionHistory: [],            
            showTable: false
        }
        this.redirectToHome = this.redirectToHome.bind(this);
        this.getBalance = this.getBalance.bind(this);
        this.getTransactionHistory = this.getTransactionHistory.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.showTransactions = this.showTransactions.bind(this);
    };

    getBalance = () => {
        axios.get('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/view', {
            headers: {
                'x-api-key': `0307OsNDnD1XEkAoThrwcGzJ2BPu2hD4GMLc5YG8`
            }
        })
            .then(res => this.setState({ balance: res.data.availableBal }))
            .catch(err => console.log(err))
    }

    getTransactionHistory = () => {
        axios.get('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view', {
            headers: {
                'x-api-key': `0307OsNDnD1XEkAoThrwcGzJ2BPu2hD4GMLc5YG8`
            }
        })
            .then(res => {
                this.setState({ transactionHistory: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getBalance();
    }

    redirectToHome = () => {
        this.props.history.push('/home');
    }

    showTransactions = () => {
        this.setState({ transactionHistory: [] })
        this.getTransactionHistory();
        if (!this.state.showTable) {
            this.setState({ showTable: true })
        } else {
            this.setState({ showTable: false });
        }
    }

    renderContent() {
        var tableTransactions = ( //to show table of transactions
            <div>
                <table className="striped centered teal lighten-4 class">

                    <thead>
                        <tr>
                            <th>Transaction Date</th>
                            <th>Transaction Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.transactionHistory.map(transactionHistory => <tr key={transactionHistory._id}><td>{transactionHistory.date}</td><td>{transactionHistory.amount}</td></tr>)}
                    </tbody>

                </table>
            </div>
        )

        var tableNothing = (
            <div>
                <h6>Click on "Show Transaction History" to see your previous transactions!</h6>
            </div>
        )

        if (this.state.showTable) {
            return (
                <div>
                    {tableTransactions}
                </div>
            )
        } else {
            return (
                <div>
                    {tableNothing}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h1>Account Balance: {this.state.balance}</h1>
                <br />
                <button onClick={this.showTransactions}>Show Transaction History</button>
                <br />
                <br />
                <button onClick={this.redirectToHome}>Back to Home</button>
                <br />
                <br />
                {this.renderContent()}
            </div>
        )
    }
}


export default withRouter(Profile)