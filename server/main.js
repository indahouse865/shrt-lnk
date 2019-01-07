import { Meteor } from 'meteor/meteor';
import '../imports/api/links';
import '../imports/startup/simple-schema-config';

import '../imports/api/users';

Meteor.startup(() => {
    Meteor.call('greetUser', (err, res) => {
        console.log('Greet User Arguments', err, res);
    });
});

