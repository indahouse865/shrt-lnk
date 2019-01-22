import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-config';

import '../imports/api/users';

Meteor.startup(() => {

    WebApp.connectHandlers.use((req, res, next) => {
        const _id = req.url.slice(1);
        const thisLink = Links.findOne({ _id });

        if (thisLink) {
            res.statusCode = 302;
            res.setHeader('Location', thisLink.url);
            res.end();
            Meteor.call('links.trackVisit', _id);
            next();
        } else {
            next();
        }
    });
});

