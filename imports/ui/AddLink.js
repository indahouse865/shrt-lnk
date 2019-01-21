import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class Link extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    }

    onSubmit(e) {
        const { url } = this.state

        e.preventDefault();

        if (url) {
            Meteor.call('links.insert', url, () => {
                if (!err) {
                    this.setState({ url: '' })
                }
            });

            this.refs.url.value = "";
        }
    }

    onChange(e) {
        this.setState({
            url: e.target.value.trim()
        });
    }

    render() {
        return (
            <div>
                <p>Add Link</p>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input 
                        type='text'
                        placeholder='url' 
                        value={this.state.url}
                        onChange={this.state.url}
                        onChange={this.onChange.bind(this)}
                        />
                    <button>Add Link</button>
                </form>
            </div>
        )
    }
}