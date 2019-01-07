import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import LinksList from './LinksList';
import { Meteor } from 'meteor/meteor';

export default class Link extends React.Component {

    onLogout() {
        Accounts.logout();
    }

    onSubmit(e) {
        const url = this.refs.url.value.trim();

        e.preventDefault();

        if (url) {
            Meteor.call('links.insert', url);

            this.refs.url.value = "";
        }
    }

    render() {
        return (
            <div>
                <p>LINKS GO HERE</p>      
                <button type="button" onClick={this.onLogout.bind(this)}>Logout</button>
                <LinksList/>
                <p>Add Link</p>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type='text' ref='url' placeholder='url'/>
                    <button>Add Link</button>
                </form>
            </div>
        )
    }
}