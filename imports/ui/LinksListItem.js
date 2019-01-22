import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        };
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({ justCopied: true });
            setTimeout(() => this.setState({ justCopied: false}), 1000);
        }).on('error', () => {
            alert("Unable to copy, please manually copy links.");
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? "visit" : "visits";
        let visitedMessage = null;

        if (typeof this.props.lastVisitedAt === "number") {
            visitedMessage = `(visited ${ moment(this.props.lastVisitedAt).fromNow() })`
        }
        return <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    }
    

    render() {
        return (
            <div>
                <p key={this._id}>{this.props.url}</p>
                <p>{this.props.shortUrl}</p>
                {this.renderStats()}
                <a href={this.props.shortUrl} target="_blank">
                    Visit!
                </a>
                <button ref="copy" data-clipboard-text={this.props.shortUrl}>
                    {this.state.justCopied ? 'Copied' : 'Copy'}
                </button>
                <button ref="visible" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                }}>
                    {this.props.visible ? "Hide" : "Show"}
                </button>
            </div>
        )
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
};