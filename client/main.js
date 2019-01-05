import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';

import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';

import History from "../imports/api/history";

const authPages = ["/links"];
const unAuthPages = ["/", "/signup"];

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        return true;
    }
    return false;
}

const baseRouter = (
    <Router history={History}>
        <Switch>
            <Route exact path="/" render={() => (
                onEnterPublicPage() ? (
                    <Redirect to="/links"/>
                ) : (
                <Login/>
                )
            )}/>
            <Route path="/signup" render={() => (
                onEnterPublicPage() ? (
                    <Redirect to="/links"/>
                ) : (
                <Signup/>
                )
            )}/>
            <Route path="/links" render={() => (
                !onEnterPublicPage() ? (
                    <Redirect to="/"/>
                ) : (
                <Link/>
                )
            )}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    </Router>
)

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    const path = window.location.pathname;
    const isAuthPage = authPages.includes(path);
    const isUnAuthPage = unAuthPages.includes(path);

    if (isAuthPage && !isAuthenticated ) {
        History.push("/");
    } else if (isUnAuthPage && isAuthenticated) {
        History.push("/links");
    }
});

Meteor.startup(() => {
    ReactDOM.render(baseRouter , document.getElementById('app'));
});