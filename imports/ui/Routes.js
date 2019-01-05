import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import Signup from './Signup';
import Link from './Link';
import NotFound from './NotFound';
import Login from './Login';

export default class Routes extends React.Component {
    render() {
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/links" component={Link}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    }
}