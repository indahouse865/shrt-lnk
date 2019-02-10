import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Page Not Found</h1>
                <p>404 Not Found</p>
                <Link to="/" className="button button--link">Return to Login Page</Link>
            </div>

        </div>
    )
}