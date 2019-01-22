import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class Link extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ""
        }
    }

    onSubmit(e) {
        const { url } = this.state

        e.preventDefault();

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({ error: err.reason });
            }
        });
    }

    onChange(e) {
        this.setState({
            url: e.target.value.trim()
        });
    }

    handleModalClose() {
        this.setState({ url: '', isOpen: false, error: "" })
    }

    render() {
        return (
            <div>
            <button onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen}
                    contentLabel="Add Link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                >
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <input 
                            type='text'
                            placeholder='url' 
                            ref="url"
                            value={this.state.url}
                            onChange={this.state.url}
                            onChange={this.onChange.bind(this)}
                            />
                        <button>Add Link</button>
                    </form>
                    <button onClick={this.handleModalClose.bind(this)}>Cancel</button>
                </Modal>
            </div>
        )
    }
}