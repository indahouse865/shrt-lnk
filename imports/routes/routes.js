import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

import History from "../api/history";

const authPages = ["/links"];
const unAuthPages = ["/", "/signup"];

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        return true;
    }
    return false;
}

export const onAuthChange = (isAuthenticated) => {
    const path = window.location.pathname;
    const isAuthPage = authPages.includes(path);
    const isUnAuthPage = unAuthPages.includes(path);

    if (isAuthPage && !isAuthenticated ) {
        History.push("/");
    } else if (isUnAuthPage && isAuthenticated) {
        History.push("/links");
    }
}

export const baseRouter = (
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
            <Route exact path="/login" render={() => (
                <Redirect to="/"/>
            )}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    </Router>
);