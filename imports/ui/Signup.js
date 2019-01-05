import React from 'react';

import { Link } from 'react-router-dom';

import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if (password.length < 5) {
            return this.setState({ error: 'Password must be at least 5 characters long'});
        }

        Accounts.createUser({email, password}, (err) => {
            if (err) {
                console.log('Signup Callback', err);
                this.setState({ error: err.reason });
            } else {
                this.setState({ err: "" });
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Join SHRT_LNK</h1>

                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="email" ref="email" name="email" placeholder="Email"/>
                    <input type="password" ref="password" name="password" placeholder="Password"/>
                    <button>Create Account</button>
                </form>

                <Link to="/">Already signed up? Login Here</Link>
            </div>
        );s
    }
}