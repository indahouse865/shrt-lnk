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
            <div className="boxed-view">
               <div className="boxed-view__box">
                    <h1>Join SHRT_LNK</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Create Account</button>
                    </form>

                    <Link to="/">Already signed up? Login Here</Link>
                </div>
            </div>
        );
    }
}